import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('member')
export class MemberController {
  constructor(private service: MemberService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllMembers() {
    return this.service.getAllMembers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getMemberById(@Param('id') id: number) {
    return this.service.getMemberById(id);
  }
}
