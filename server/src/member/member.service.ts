import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.entity/member.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  private hash(password): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  async getMembers() {
    return await this.memberRepository.find();
  }

  async addMember(member) {
    const allNames = await this.memberRepository.find({
      select: ['name'],
    });

    const allEmails = await this.memberRepository.find({
      select: ['email'],
    });

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

      await this.memberRepository.save(newMember);
      return { response: 'New member successfully created!' };
    }
  }
}
