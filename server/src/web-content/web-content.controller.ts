import { Param, Query, Controller, Get } from '@nestjs/common';
import { WebContentService } from './web-content.service';

@Controller('webcontent')
export class WebContentController {
  constructor(private readonly webContentService: WebContentService) {}

  @Get('/commons')
  getCommonsWebContent(
    @Query('lang') lang: string,
    @Query('posts') posts: string,
  ) {
    if (lang == undefined) {
      lang = 'default';
    }
    if (posts == undefined) {
      posts = 'default';
    }
    return this.webContentService.getCommonsWebContent({
      lang: lang.toLowerCase(),
      posts: posts.toLowerCase(),
    });
  }

  @Get('/homepage')
  getHomepageWebContent(@Query('lang') lang: string) {
    if (lang == undefined) {
      lang = 'default';
    }
    return this.webContentService.getHomepageWebContent({
      lang: lang.toLowerCase(),
    });
  }

  @Get('/threads/:type')
  getThreadsWebContent(
    @Param('type') type: string,
    @Query('lang') lang: string,
  ) {
    if (lang == undefined) {
      lang = 'default';
    }
    return this.webContentService.getThreadsWebContent({
      type: type.toLowerCase(),
      lang: lang.toLowerCase(),
    });
  }

  @Get('/wip')
  getWIPageWebContent(@Query('lang') lang: string) {
    if (lang == undefined) {
      lang = 'default';
    }
    return this.webContentService.getWIPageWebContent({
      lang: lang.toLowerCase(),
    });
  }

  @Get('/notfound')
  getNotFoundWebContent(@Query('lang') lang: string) {
    if (lang == undefined) {
      lang = 'default';
    }
    return this.webContentService.getNotFoundWebContent({
      lang: lang.toLowerCase(),
    });
  }

  @Get('/newPost')
  getNewPostPageWebContent(@Query('lang') lang: string) {
    if (lang == undefined) {
      lang = 'default';
    }
    return this.webContentService.getNewPostPageWebContent({
      lang: lang.toLowerCase(),
    });
  }

  @Get('/register')
  getRegisterPageWebContent(@Query('lang') lang: string) {
    if (lang === undefined) {
      lang = 'default';
    }
    return this.webContentService.getRegisterPageWebContent({
      lang: lang.toLowerCase(),
    });
  }

  @Get('/postView')
  getPostViewPageWebContent(@Query('lang') lang: string) {
    if (lang == undefined) {
      lang = 'default';
    }
    return this.webContentService.getPostViewPageWebContent({
      lang: lang.toLowerCase(),
    });
  }

  @Get('/profile')
  getProfilePageWebContent(@Query('lang') lang: string) {
    if (lang == undefined) {
      lang = 'default';
    }
    return this.webContentService.getProfilePageWebContent({
      lang: lang.toLowerCase(),
    });
  }
}
