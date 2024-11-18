import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as backOfficeCommonsFr from '../../sitedata/backoffice/commons/backOfficeCommons.fr.json';
import * as backOfficeHomepageFr from '../../sitedata/backoffice/homepage/backOfficeHomepage.fr.json';
import * as backOfficeTagsManagementFr from '../../sitedata/backoffice/tagsManagement/backOfficeTagsManagement.fr.json';
import * as backOfficeUsersManagementFr from '../../sitedata/backoffice/usersManagement/backOfficeUsersManagement.fr.json';

const httpError = (customMessage: string) => {
  throw new HttpException(
    {
      message: customMessage,
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    },
    HttpStatus.NOT_FOUND,
    {
      cause: customMessage,
    },
  );
};

@Injectable()
export class WebContentBackOfficeService {
  getBackOfficeWebContent(params: { type: string; lang: string }) {
    const validTypes: Array<string> = ['commons', 'homepage', 'tags', 'users'];
    if (!validTypes.includes(params.type)) {
      httpError('Unvalid back office web content name');
    }

    if (params.lang !== 'default') {
      let currentLangData: any;
      switch (params.lang) {
        case 'fr':
          switch (params.type) {
            case 'homepage':
              currentLangData = backOfficeHomepageFr;
              break;
            case 'tags':
              currentLangData = backOfficeTagsManagementFr;
              break;
            case 'users':
              currentLangData = backOfficeUsersManagementFr;
              break;
            default:
              currentLangData = backOfficeCommonsFr;
              break;
          }
          break;
        default:
          httpError('Language not handled');
          break;
      }
      return currentLangData;
    } else {
      switch (params.type) {
        case 'homepage':
          return {
            fr: backOfficeHomepageFr,
          };
        case 'tags':
          return {
            fr: backOfficeTagsManagementFr,
          };
        case 'users':
          return {
            fr: backOfficeUsersManagementFr,
          }
        default:
          return {
            fr: backOfficeCommonsFr,
          };
      }
    }
  }
}
