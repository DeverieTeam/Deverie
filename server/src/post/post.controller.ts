import { Controller, Get, Query } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private service: PostService) {}

  @Get('homepage')
  async getPostsForHomePage(
    @Query('max') max: string,
    @Query('sort') sort: 'recent' | 'popular',
  ) {
    const maxInt = parseInt(max) || 10;
    const sortDef = sort || 'recent';
    return this.service.getPopularOrRecentPosts(maxInt, sortDef);
  }

  @Get('topic')
  async getTopicsForTopicPage(
    @Query('max') max: string,
    @Query('page') page: string,
    @Query('filters') filters: string,
    @Query('search') search: string,
    @Query('sort') sort: string,
  ) {
    const maxInt = parseInt(max) || 10;
    const pageInt = parseInt(page) || 0;
    let filtersDef = [''];
    if (filters) {
      filtersDef = filters.split('%');
    }
    let searchDef = '';
    if (search) {
      searchDef = search.toUpperCase();
    }
    const sortDef = sort || 'recent';
    return this.service.getTopics(
      maxInt,
      pageInt,
      filtersDef,
      searchDef,
      sortDef,
    );
  }
}
