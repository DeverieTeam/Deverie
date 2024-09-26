import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
  constructor(private service: PostService) {}

  @Get('homepage')
  async getPopularOrRecentPosts(
    @Query('max') max: string = '10',
    @Query('sort') sort: 'recent' | 'popular',
  ) {
    return this.service.getPopularOrRecentPosts(max, sort);
  }

  @Get('detailed/:id')
  async getPostById(
    @Param('id') id: number,
    @Query('max') max: string = '10',
    @Query('page') page: string = '0',
    @Query('sort')
    sort: 'chrono' | 'recent' | 'rate',
  ) {
    return this.service.getPostById(id, max, page, sort);
  }

  @Get('reply/:id')
  async getReplyById(
    @Param('id') id: number,
    @Query('sort')
    sort: 'chrono' | 'recent' | 'rate',
  ) {
    return this.service.getReplyById(id, sort);
  }

  @Get(':type')
  async getPostsByType(
    @Param('type') type: 'topic' | 'question',
    @Query('max') max: string = '10',
    @Query('page') page: string = '0',
    @Query('tags') tags: string[],
    @Query('search') search: string,
    @Query('sort')
    sort: 'recent' | 'popular' | 'ancient' | 'discreet',
  ) {
    return this.service.getPostsByType(type, max, page, tags, search, sort);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('newThread')
  async createPost(
    @Body()
    post: {
      type: 'topic' | 'question';
      title: string;
      content: string;
      author: number;
      tags: { id: number }[];
    },
  ) {
    return this.service.createPost(post);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('newReply')
  async createReply(
    @Body()
    post: {
      type: 'comment' | 'answer';
      content: string;
      author: number;
      reply_to: number;
    },
  ) {
    return this.service.createReply(post);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updatePost(
    @Body()
    post: {
      id: number;
      content?: string;
      modification_author: number;
      tags?: { id: number }[];
      isreadable?: boolean;
      is_opened?: boolean;
    },
  ) {
    return this.service.updatePost(post);
  }
}
