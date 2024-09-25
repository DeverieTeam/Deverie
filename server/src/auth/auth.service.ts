import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberService } from 'src/member/member.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberService: MemberService,
    private readonly jwtService: JwtService,
  ) {}

  private hash(password: string): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  async validate(id: number) {
    return this.memberService.getMemberById(id);
  }

  public async registerMember(member: {
    name: string;
    password: string;
    email: string;
    is_email_displayed: boolean;
    pronouns: string;
    description: string;
  }) {
    const allNames = await this.memberService.getAllMemberNames();

    const allEmails = await this.memberService.getAllMemberEmails();

    let nameTaken = false;
    let emailTaken = false;

    for (const name of allNames) {
      if (name.name === member.name) {
        nameTaken = true;
        break;
      }
    }
    for (const email of allEmails) {
      if (email.email === member.email) {
        emailTaken = true;
        break;
      }
    }

    if (nameTaken && emailTaken) {
      throw new HttpException(
        {
          message: 'Invalid name and email',
          error: 'Invalid name and email',
          statusCode: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
        {
          cause: 'Invalid name and email',
        },
      );
    } else if (nameTaken) {
      throw new HttpException(
        {
          message: 'Invalid name',
          error: 'Invalid name',
          statusCode: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
        {
          cause: 'Invalid name',
        },
      );
    } else if (emailTaken) {
      throw new HttpException(
        {
          message: 'Invalid email',
          error: 'Invalid email',
          statusCode: HttpStatus.CONFLICT,
        },
        HttpStatus.CONFLICT,
        {
          cause: 'Invalid email',
        },
      );
    } else {
      const hashedPassword = this.hash(member.password);

      const newMember = {
        name: member.name,
        hashed_password: hashedPassword,
        email: member.email,
        is_email_displayed: member.is_email_displayed,
        pronouns: member.pronouns,
        description: member.description,
      };

      const returnedValue = await this.memberService.saveNewMember(newMember);
      return {
        response: `New member successfully created! (Id: ${returnedValue.id})`,
      };
    }
  }

  public async login(member: { login: string; password: string }) {
    const allLogs = await this.memberService.getAllMemberLogs();

    let hashToCheck: string = '';
    let payload: { id: number };
    let memberFound: boolean = false;
    let memberBanned: boolean;

    for (const log of allLogs) {
      if (log.name === member.login || log.email === member.login) {
        memberFound = true;
        memberBanned = log.is_banned;
        hashToCheck = log.hashed_password;
        payload = { id: log.id };
        break;
      }
    }

    if (!memberFound) {
      throw new HttpException(
        {
          message: 'Login not found',
          error: 'Login not found',
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: 'Login not found',
        },
      );
    } else {
      if (hashToCheck !== this.hash(member.password)) {
        throw new HttpException(
          {
            message: 'Password is incorrect',
            error: 'Password is incorrect',
            statusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: 'Password is incorrect',
          },
        );
      } else if (memberBanned) {
        throw new HttpException(
          {
            message: 'Member is banned',
            error: 'Member is banned',
            statusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: 'Member is banned',
          },
        );
      } else {
        const accessToken = this.jwtService.sign(payload);

        return {
          expires_in: 3600,
          access_token: accessToken,
        };
      }
    }
  }
}
