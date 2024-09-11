import { Body, Controller, Get, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from './member.entity/member.entity';

@Controller('member')
export class MemberController {
  constructor(private service: MemberService) {}

  @Get()
  async getAllMembers() {
    return this.service.getMembers();
  }

  @Post()
  async newMember(@Body() member: Member) {
    return this.service.addMember(member);
  }
}
