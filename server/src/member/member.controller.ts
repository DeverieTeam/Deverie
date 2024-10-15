import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Post,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/:id')
  async getProfileById(@Param('id') id: number) {
    return this.service.getProfileById(id);
  }

  @Get(':id')
  async getMemberById(@Param('id') id: number) {
    return this.service.getMemberById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('number/:role')
  async getMemberNumberByRole(
    @Param('role') role: 'all' | 'member' | 'moderator' | 'administrator',
    @Query('isBanned') isBanned: 'true' | 'false' | undefined,
  ) {
    return this.service.getMemberNumberByRole({
      role: role,
      isBanned: isBanned === undefined ? undefined : isBanned === 'true',
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateMember(
    @Body()
    member: {
      id: number;
      name?: string;
      password?: string;
      is_email_displayed?: boolean;
      profile_picture_filename?: string;
      pronouns?: string;
      description?: string;
      displayed_name?: string;
      is_banned?: boolean;
      selected_tags?: {
        id: number;
      }[];
    },
  ) {
    return this.service.updateMember(member);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('pp')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads/profilePictures',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename };
  }
}
