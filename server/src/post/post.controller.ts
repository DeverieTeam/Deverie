import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
// import { AuthGuard } from '@nestjs/passport';

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

  // @UseGuards(AuthGuard('jwt'))
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
}
