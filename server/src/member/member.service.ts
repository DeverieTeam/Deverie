import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.entity/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

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

  async getMemberById(id: number) {
    return this.memberRepository.findOne({
      select: ['id', 'name', 'profile_picture', 'role'],
      where: { id: id },
    });
  }
}
