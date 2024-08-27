import { Injectable } from '@nestjs/common';
import * as commonsFr from '../sitedata/commons/commons.fr.json';

@Injectable()
export class ApiService {

	getCommons(params: {lang: string, posts: string}) {
		if (params.lang !== 'default') {
			let currentLang = {};
			switch (params.lang) {
				case 'fr':
					currentLang = commonsFr;
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
				return (currentLang);
			} else {
				return ({
					'logo': currentLang.logo,
					'buttons': currentLang.buttons,
					'hypertexts': currentLang.hypertexts,
					'sections': currentLang.sections
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
