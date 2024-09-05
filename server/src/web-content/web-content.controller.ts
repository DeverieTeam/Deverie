import { Param, Query, Controller, Get } from '@nestjs/common';
import { WebContentService } from './web-content.service';

@Controller('webcontent')
export class WebContentController {
	constructor(private readonly webContentService: WebContentService) {}
	
	@Get('/commons')
	getCommonsWebContent(
		@Query('lang') lang: string, 
		@Query('posts') posts: string
	){
		if (lang == undefined) {
			lang = 'default';
		}
		if (posts == undefined) {
			posts = 'default';
		}
		return this.webContentService.getCommonsWebContent({lang: lang.toLowerCase(), posts: posts.toLowerCase()});
	}

	@Get('/homepage')
	getHomepageWebContent(
		@Query('lang') lang: string
	){
		if (lang == undefined) {
			lang = 'default';
		}
		return this.webContentService.getHomepageWebContent({lang: lang.toLowerCase()});
	}

	@Get('/trends/:type')
	getTrendsWebContent(
		@Param('type') type: string,
		@Query('lang') lang: string
	){
		if (lang == undefined) {
			lang = 'default';
		}
		return this.webContentService.getTrendsWebContent({type: type.toLowerCase(), lang: lang.toLowerCase()});
	}
}
