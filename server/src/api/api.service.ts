import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as commonsFr from '../sitedata/commons/commons.fr.json';
import * as homepageFr from '../sitedata/homepage/homepage.fr.json';
import * as topicpageFr from '../sitedata/topicpage/topicpage.fr.json';

const languageNotHandled = () => {
	throw new HttpException({
		message: 'Language not handled',
		error: 'Not Found',
		statusCode: HttpStatus.NOT_FOUND
	}, HttpStatus.NOT_FOUND, {
		cause: 'Language not handled'
	});
}

@Injectable()
export class ApiService {

	getCommonsWebContent(params: {lang: string, posts: string}) {
		if (params.lang !== 'default') {
			let currentLangData: any;
			switch (params.lang) {
				case 'fr':
					currentLangData = commonsFr;
					break;
				default:
					languageNotHandled();
					break;
			}
			if (params.posts == 'true') {
				return (currentLangData);
			} else {
				return ({
					'logo': currentLangData.logo,
					'buttons': currentLangData.buttons,
					'hypertexts': currentLangData.hypertexts,
					'sections': currentLangData.sections
				});
			}
		} else {
			switch (params.posts) {
				case 'true':
					return ({
						'fr': commonsFr
					});
					break;
				case 'false':
				default:
					return ({
						'fr': {
							'logo': commonsFr.logo,
							'buttons': commonsFr.buttons,
							'hypertexts': commonsFr.hypertexts,
							'sections': commonsFr.sections
						}
					});
					break;
			}
		}
	}

	getHomepageWebContent(params: {lang: string}) {
		if (params.lang !== 'default') {
			let currentLangData: any;
			switch(params.lang) {
				case 'fr':
					currentLangData = homepageFr;
					break;
				default:
					languageNotHandled();
					break;
			}
			return (currentLangData);
		} else {
			return ({
				'fr': homepageFr
			});
		}
	}

	getTopicPageWebContent(params: {lang: string}) {
		if (params.lang !== 'default') {
			let currentLangData: any;
			switch(params.lang) {
			case 'fr':
				currentLangData = topicpageFr;
				break;
			default:
				languageNotHandled();
				break;
			}
			return (currentLangData);
		} else {
			return ({
				'fr': topicpageFr
			});
		}
	}
}
