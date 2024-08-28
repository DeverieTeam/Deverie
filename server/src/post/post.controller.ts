import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private service: PostService) {}

  @Get('homepage')
  async getPostsForHomePage(
    @Query('max') max: number = 10,
    @Query('sort') sort: 'recent' | 'popular' = 'recent',
  ) {
    return this.service.getPopularOrRecentPosts(max, sort);
  }

  @Get(':type')
  async getPostsForTheirPage(
    @Param('type') type: 'Topic' | 'Question',
    @Query('max') max: number = 10,
    @Query('page') page: number = 0,
    @Query('filters') tags: string[],
    @Query('search') search: string,
    @Query('sort')
    sort: 'recent' | 'popular' | 'ancient' | 'discreet' = 'recent',
  ) {
    return this.service.getPostsByType(type, max, page, tags, search, sort);
  }
}
