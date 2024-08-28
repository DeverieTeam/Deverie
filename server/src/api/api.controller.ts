import { Param, Query, Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
	constructor(private readonly apiService: ApiService) {}
	
	@Get('/commons')
	getCommonsWebContent(@Query('lang') lang, @Query('posts') posts) {
		if (lang == undefined) {
			lang = 'default';
		}
		if (posts == undefined) {
			posts = 'default';
		}
		return this.apiService.getCommonsWebContent({lang: lang.toLowerCase(), posts: posts.toLowerCase()});
	}

	@Get('/homepage')
	getHomepageWebContent(@Query('lang') lang) {
		if (lang == undefined) {
			lang = 'default';
		}
		return this.apiService.getHomepageWebContent({lang: lang.toLowerCase()});
	}

	@Get('/topicpage')
	getTopicPageWebContent(@Query('lang') lang) {
		if (lang == undefined) {
			lang = 'default';
		}
		return this.apiService.getTopicPageWebContent({lang: lang.toLowerCase()});
	}
}
