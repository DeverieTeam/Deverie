import {
  Controller, Get, Post, Put, Delete, Param, Query, Body,
  UseGuards, UseInterceptors, UploadedFile
} from '@nestjs/common';
import { TagService } from './tag.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('tag')
export class TagController {
  constructor(private service: TagService) {}

  @Get(':family')
  async getTagsByFamily(@Param('family') family: string) {
    return this.service.getTagsByFamily(family);
  }

  @Get()
  async getAllTagsNames() {
    return this.service.getAllTagsNames();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createTag(
    @Body()
    tag: {
      name: string;
      icon: string;
      family: 'language' | 'environment' | 'technology';
    },
  ) {
    return this.service.createTag(tag);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateTag(
    @Body()
    tag: {
      id: number;
      name: string;
      icon: string;
      family: 'language' | 'environment' | 'technology';
    },
  ) {
    return this.service.updateTag(tag);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteTagById(
    @Query('id') id: number,
  ) {
    return this.service.deleteTagById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('tagIcon')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads/tagIcons',
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
