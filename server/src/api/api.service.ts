import { Injectable } from '@nestjs/common';
import * as commonsFr from '../sitedata/commons/commons.fr.json';

@Injectable()
export class ApiService {

	getCommons(params: {lang: string, posts: string}) {
		if (params.lang !== 'default') {
			let currentLangData: any;
			switch (params.lang) {
				case 'fr':
					currentLangData = commonsFr;
					break;
				default:
					return ({
						'message': 'Language not handled',
						'error': 'Not Found',
						'statusCode': 404
					});
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
		} else if (params.lang === 'default') {
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
}
