import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('register')
  async registerMember(
    @Body()
    member: {
      name: string;
      password: string;
      email: string;
      is_email_displayed: boolean;
      pronouns: string;
      description: string;
    },
  ) {
    return this.service.registerMember(member);
  }

  @Post('login')
  async login(@Body() member: { login: string; password: string }) {
    return this.service.login(member);
  }
}
