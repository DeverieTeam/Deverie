import { Injectable } from '@nestjs/common';
import * as commonsFr from '../sitedata/commons/commons.fr.json';
import * as homepageFr from '../sitedata/homepage/homepage.fr.json';
import * as topicpageFr from '../sitedata/topicpage/topicpage.fr.json';

const languageNotHandled: {
							message: string,
							error: string,
							statusCode: number
						} = {
							message: 'Language not handled',
							error: 'Not Found',
							statusCode: 404
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
					return (languageNotHandled);
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
					return (languageNotHandled);
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
				return (languageNotHandled);
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
