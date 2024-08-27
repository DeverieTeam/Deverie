import { Param, Query, Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
	constructor(private readonly apiService: ApiService) {}
	
	@Get('/commons')
	getCommons(@Query('lang') lang, @Query('posts') posts) {
		if (lang == undefined) {
			lang = 'default';
		}
		if (posts == undefined) {
			posts = 'default';
		}
		return this.apiService.getCommons({lang: lang.toLowerCase(), posts: posts.toLowerCase()});
	}
}
