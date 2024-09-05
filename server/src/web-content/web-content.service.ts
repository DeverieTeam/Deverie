import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as commonsFr from '../sitedata/commons/commons.fr.json';
import * as homepageFr from '../sitedata/homepage/homepage.fr.json';
import * as trendsFr from '../sitedata/trends/trends.fr.json';

const httpError = (customMessage: string) => {
	throw new HttpException({
		message: customMessage,
		error: 'Not Found',
		statusCode: HttpStatus.NOT_FOUND
	}, HttpStatus.NOT_FOUND, {
		cause: customMessage
	});
}

@Injectable()
export class WebContentService {

	getCommonsWebContent(params: {lang: string, posts: string}) {
		if (params.lang !== 'default') {
			let currentLangData: any;
			switch (params.lang) {
				case 'fr':
					currentLangData = commonsFr;
					break;
				default:
					httpError('Language not handled');
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
					httpError('Language not handled');
					break;
			}
			return (currentLangData);
		} else {
			return ({
				'fr': homepageFr
			});
		}
	}

	getTrendsWebContent(params: {type: string, lang: string}) {
		const validTypes: Array<string> = ["topic", "topics", "question", "questions"];
		if (! validTypes.includes(params.type)) {
			httpError('Unvalid trends name');
		} else {
			if (params.lang !== 'default') {
				let currentLangData: any;
				switch(params.lang) {
					case 'fr':
						if (params.type === 'topic' || params.type === 'topics') {
							currentLangData = trendsFr.topic;
						} else {
							currentLangData = trendsFr.question;
						}
						break;
					default:
						httpError('Language not handled');
						break;
				}
				return (currentLangData);
			} else {
				if (params.type === 'topic' || params.type === 'topics') {
					return ({
						'fr': trendsFr.topic
					});
				} else {
					return ({
						'fr': trendsFr.question
					});
				}
			}
		}
	}
}
