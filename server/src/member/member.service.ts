import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.entity/member.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  private hash(password: string): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  refineAuthData(data: Member) {
    const refinedTags = [];
    for (const tag of data.selected_tags) {
      refinedTags.push({
        id: tag.id,
        name: tag.name,
        icon: tag.icon,
        family: tag.family,
      });
    }

    const refinedData: {
      id: number;
      name: string;
      profile_picture: string;
      role: string;
      selected_tags?: {
        id: number;
        name: string;
        icon: string;
        family: string;
      }[];
    } = {
      id: data.id,
      name: data.name,
      profile_picture: data.profile_picture,
      role: data.role,
      selected_tags: refinedTags,
    };

    return refinedData;
  }

  refineMemberData(data: Member) {
    const refinedData: {
      id: number;
      name: string;
      email: string;
      is_email_displayed: boolean;
      profile_picture: string;
      role: 'member' | 'moderator' | 'administrator';
      pronouns?: string;
      description?: string;
      inscription_date: Date;
      post_count: number;
    } = {
      id: data.id,
      name: data.name,
      email: data.email,
      is_email_displayed: data.is_email_displayed,
      profile_picture: data.profile_picture,
      role: data.role,
      pronouns: data.pronouns,
      description: data.description,
      inscription_date: data.inscription_date,
      post_count: data.posts.length,
    };

    if (data.displayed_name) {
      refinedData.name = data.displayed_name;
    }

    return refinedData;
  }

  refineProfileData(data: Member) {
    const refinedData: {
      id: number;
      name: string;
      email: string;
      is_email_displayed: boolean;
      profile_picture: string;
      pronouns?: string;
      description?: string;
      displayed_name: string;
      theme: string;
      language: string;
    } = {
      id: data.id,
      name: data.name,
      email: data.email,
      is_email_displayed: data.is_email_displayed,
      profile_picture: data.profile_picture,
      pronouns: data.pronouns,
      description: data.description,
      displayed_name: data.displayed_name,
      theme: data.theme,
      language: data.language,
    };

    return refinedData;
  }

  async getAllMembers() {
    return await this.memberRepository.find();
  }

  async getAllMemberNames() {
    return await this.memberRepository.find({ select: ['name'] });
  }

  async getAllMemberEmails() {
    return await this.memberRepository.find({ select: ['email'] });
  }

  async saveNewMember(member: {
    name: string;
    hashed_password: string;
    email: string;
    is_email_displayed: boolean;
    pronouns: string;
    description: string;
  }) {
    return await this.memberRepository.save(member);
  }

  async getAllMemberLogs() {
    return await this.memberRepository.find({
      select: ['id', 'name', 'email', 'hashed_password', 'is_banned'],
    });
  }

  async getAuthById(id: number) {
    const response = await this.memberRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.selected_tags', 'selected_tags')
      .where('member.id = :id', { id: id })
      .getOne();

    return this.refineAuthData(response);
  }

  async getMemberNumberByRole(args: {
    role: 'all' | 'member' | 'moderator' | 'administrator';
    isBanned?: boolean;
  }) {
    const response = await this.memberRepository
      .createQueryBuilder('member')
      .getMany();

    switch (args.role) {
      case 'member':
      case 'moderator':
      case 'administrator': {
        const filteredResponse = response.filter(
          (member) =>
            member.role === args.role.toString() &&
            (args.isBanned === undefined
              ? true
              : member.is_banned === args.isBanned),
        );
        return { number: filteredResponse.length };
      }
      case 'all':
      default: {
        const filteredResponse = response.filter((member) =>
          args.isBanned === undefined
            ? true
            : member.is_banned === args.isBanned,
        );
        return { number: filteredResponse.length };
      }
    }
  }

  async getMemberById(id: number) {
    const response = await this.memberRepository
      .createQueryBuilder('member')
      .where('member.id = :id', { id: id })
      .innerJoinAndSelect('member.posts', 'posts')
      .getOne();

    response.posts = response.posts.filter((post) => post.is_readable);

    return this.refineMemberData(response);
  }

  async getProfileById(id: number) {
    const response = await this.memberRepository.findOne({
      where: {
        id: id,
      },
    });

    return this.refineProfileData(response);
  }

  async updateMember(member) {
    let returnedValue;
    if (member.password) {
      const hashedPassword = this.hash(member.password);

      const updatedMember = {
        id: member.id,
        hashed_password: hashedPassword,
      };

      returnedValue = await this.memberRepository.save(updatedMember);
    } else {
      returnedValue = await this.memberRepository.save(member);
    }

    return {
      id: returnedValue.id,
    };
  }
}
