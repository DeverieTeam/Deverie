import { Test, TestingModule } from '@nestjs/testing';
import { WebContentBackOfficeService } from './web-content-back-office.service';

import * as backOfficeCommonsFr from '../../sitedata/backoffice/commons/backOfficeCommons.fr.json';
import * as backOfficeHomepageFr from '../../sitedata/backoffice/homepage/backOfficeHomepage.fr.json';
import * as backOfficeTagsManagementFr from '../../sitedata/backoffice/tagsManagement/backOfficeTagsManagement.fr.json';
import * as backOfficeMembersManagementFr from '../../sitedata/backoffice/membersManagement/backOfficeMembersManagement.fr.json';

describe('WebContentBackOfficeService', () => {
  let service: WebContentBackOfficeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebContentBackOfficeService],
    }).compile();

    service = module.get<WebContentBackOfficeService>(WebContentBackOfficeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBackOfficeWebContent', () => {
    it('should throw an error for an unvalid type', () => {
      expect(() => service.getBackOfficeWebContent({ type: 'test', lang: 'fr' })).toThrow('Unvalid back office web content name');
    });
    it('should throw an error for a not handled language', () => {
      expect(() => service.getBackOfficeWebContent({ type: 'commons', lang: 'es' })).toThrow('Language not handled');
    });

    describe('type is "commons"', () => {
      it('should return backOfficeCommonsFr if lang is "fr"', () => {
        const result = service.getBackOfficeWebContent({ type: 'commons', lang: 'fr' });
        expect(result).toEqual(backOfficeCommonsFr);
      });
      it('should return all the available languages if lang is "default"', () => {
        const result = service.getBackOfficeWebContent({ type: 'commons', lang: 'default' });
        expect(result).toEqual({ fr: backOfficeCommonsFr });
      });
    });

    describe('type is "homepage"', () => {
      it('should return backOfficeHomepageFr if lang is "fr"', () => {
        const result = service.getBackOfficeWebContent({ type: 'homepage', lang: 'fr' });
        expect(result).toEqual(backOfficeHomepageFr);
      });
      it('should return all the available languages if lang is "default"', () => {
        const result = service.getBackOfficeWebContent({ type: 'homepage', lang: 'default' });
        expect(result).toEqual({ fr: backOfficeHomepageFr });
      });
    });

    describe('type is "tags"', () => {
      it('should return backOfficeTagsManagementFr if lang is "fr"', () => {
        const result = service.getBackOfficeWebContent({ type: 'tags', lang: 'fr' });
        expect(result).toEqual(backOfficeTagsManagementFr);
      });
      it('should return all the available languages if lang is "default"', () => {
        const result = service.getBackOfficeWebContent({ type: 'tags', lang: 'default' });
        expect(result).toEqual({ fr: backOfficeTagsManagementFr });
      });
    });

    describe('type is "members"', () => {
      it('should return backOfficeMembersManagementFr if lang is "fr"', () => {
        const result = service.getBackOfficeWebContent({ type: 'members', lang: 'fr' });
        expect(result).toEqual(backOfficeMembersManagementFr);
      });
      it('should return all the available languages if lang is "default"', () => {
        const result = service.getBackOfficeWebContent({ type: 'members', lang: 'default' });
        expect(result).toEqual({ fr: backOfficeMembersManagementFr });
      });
    });
  });
});
