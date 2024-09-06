import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private service: PostService) {}

  @Get('homepage')
  async getPostsForHomePage(
    @Query('max') max: string = '10',
    @Query('sort') sort: 'recent' | 'popular',
  ) {
    return this.service.getPopularOrRecentPosts(max, sort);
  }

  @Get(':type')
  async getPostsForTheirPage(
    @Param('type') type: 'Topic' | 'Question',
    @Query('max') max: string = '10',
    @Query('page') page: string = '0',
    @Query('tags') tags: string[],
    @Query('search') search: string,
    @Query('sort')
    sort: 'recent' | 'popular' | 'ancient' | 'discreet',
  ) {
    return this.service.getPostsByType(type, max, page, tags, search, sort);
  }
}
