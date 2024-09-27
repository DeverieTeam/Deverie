import { Body, Controller, Get, Param, Query, Put, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('member')
export class MemberController {
  constructor(private service: MemberService) {}

  // For now this route is unused by app, and only serves test purposes
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllMembers() {
    return this.service.getAllMembers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('auth/:id')
  async getAuthById(@Param('id') id: number) {
    return this.service.getAuthById(id);
  }

  @Get(':id')
  async getMemberById(@Param('id') id: number) {
    return this.service.getMemberById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('number/:role')
  async getMemberNumberByRole(
    @Param('role') role: 'all' | 'member' | 'moderator' | 'administrator',
    @Query ('isBanned') isBanned: 'true' | 'false' | undefined,
  ) {
    return this.service.getMemberNumberByRole({
      role: role,
      isBanned: (isBanned === undefined ? undefined : isBanned === 'true'),
      });

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateMember(
    @Body()
    member: {
      id: number;
      is_banned?: boolean;
    },
  ) {
    return this.service.updateMember(member);
  }
}
