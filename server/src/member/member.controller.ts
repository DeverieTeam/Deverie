import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
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
  }
}
