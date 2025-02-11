import { Test, TestingModule } from '@nestjs/testing';
import { WebContentService } from './web-content.service';

import * as commonsFr from '../sitedata/commons/commons.fr.json';
import * as homepageFr from '../sitedata/homepage/homepage.fr.json';
import * as threadsFr from '../sitedata/threads/threads.fr.json';
import * as wipAndNotFoundPageFr from '../sitedata/wipAndNotFoundPage/wipAndNotFoundPage.fr.json';
import * as newPostPageFr from '../sitedata/newPost/newPost.fr.json';
import * as postViewPageFr from '../sitedata/postView/postView.fr.json';
import * as registerPageFr from '../sitedata/register/register.fr.json';
import * as profilePageFr from '../sitedata/profile/profile.fr.json';
import * as favouritesPageFr from '../sitedata/favourites/favourites.fr.json';

describe('WebContentService', () => {
  let service: WebContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebContentService],
    }).compile();

    service = module.get<WebContentService>(WebContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHomepageWebContent', () => {
    it('should return homepageFr if lang is "fr"', () => {
      const result = service.getHomepageWebContent({ lang: 'fr' });
      expect(result).toEqual(homepageFr);
    });
    it('should return all the available languages if lang is "default"', () => {
      const result = service.getHomepageWebContent({ lang: 'default' });
      expect(result).toEqual({ fr: homepageFr });
    });
    it('should throw an error if lang is not handled', () => {
      expect(() => service.getHomepageWebContent({ lang: 'es' })).toThrow('Language not handled');
    });
  });

  describe('getCommonsWebContent', () => {
    describe('if posts is false', () => {
      const commonsFrWithoutPosts = {
        logo: commonsFr.logo,
        img: commonsFr.img,
        buttons: commonsFr.buttons,
        hypertexts: commonsFr.hypertexts,
        sections: commonsFr.sections,
        connection: commonsFr.connection,
        dropDownMenu: commonsFr.dropDownMenu,
        memberWindow: commonsFr.memberWindow,
      };
      it('should return commonsFr without posts content if lang is "fr"', () => {
        const result = service.getCommonsWebContent({ lang: 'fr', posts: false });
        expect(result).toEqual(commonsFrWithoutPosts);
      });
      it('should return all available languages without posts content if lang is "default"', () => {
        const result = service.getCommonsWebContent({ lang: 'default', posts: false });
        expect(result).toEqual({ fr: commonsFrWithoutPosts });
      });
      it('should throw an error if lang is not handled', () => {
        expect(() => service.getCommonsWebContent({ lang: 'es', posts: false })).toThrow('Language not handled');
      });
    });

    describe('if post is true', () => {
      it('should return commonsFr if lang is "fr"', () => {
        const result = service.getCommonsWebContent({ lang: 'fr', posts: true });
        expect(result).toEqual(commonsFr);
      });
      it('should return all available languages if lang is "default"', () => {
        const result = service.getCommonsWebContent({ lang: 'default', posts: true });
        expect(result).toEqual({ fr: commonsFr });
      });
      it('should throw an error if lang is not handled', () => {
        expect(() => service.getCommonsWebContent({ lang: 'es', posts: true })).toThrow('Language not handled');
      });
    });
  });

  describe('getWIPAndNotFoundPageWebContent', () => {
    it('should return wipAndNotFoundPageFr if lang is "fr"', () => {
      const result = service.getWIPAndNotFoundPageWebContent({ lang: 'fr' });
      expect(result).toEqual(wipAndNotFoundPageFr);
    });
    it('should return all the available languages if lang is "default"', () => {
      const result = service.getWIPAndNotFoundPageWebContent({ lang: 'default' });
      expect(result).toEqual({ fr: wipAndNotFoundPageFr });
    });
    it('should throw an error if lang is not handled', () => {
      expect(() => service.getWIPAndNotFoundPageWebContent({ lang: 'es' })).toThrow('Language not handled');
    });
  });

  describe('getThreadsWebContent', () => {
    it('should throw an error for an unvalid thread type even with handled language', () => {
      expect(() => service.getThreadsWebContent({ type: 'test', lang: 'fr' })).toThrow('Unvalid threads name');
    });
    it('should throw an error for an unvalid thread type with not handled language', () => {
      expect(() => service.getThreadsWebContent({ type: 'test', lang: 'es' })).toThrow('Unvalid threads name');
    });
    it('should throw an error for a not handled language even with a valid thread type', () => {
      expect(() => service.getThreadsWebContent({ type: 'topic', lang: 'es' })).toThrow('Language not handled');
    });

    describe('lang is "fr"', () => {
      it('should return threadsFr.topic if the type is "topic"', () => {
        const result = service.getThreadsWebContent({ type: 'topic', lang: 'fr' });
        expect(result).toEqual(threadsFr.topic);
      });
      it('should return threadsFr.topic if the type is "topics"', () => {
        const result = service.getThreadsWebContent({ type: 'topics', lang: 'fr' });
        expect(result).toEqual(threadsFr.topic);
      });
      it('should return threadsFr.question if the type is "question"', () => {
        const result = service.getThreadsWebContent({ type: 'question', lang: 'fr' });
        expect(result).toEqual(threadsFr.question);
      });
      it('should return threadsFr.question if the type is "questions"', () => {
        const result = service.getThreadsWebContent({ type: 'questions', lang: 'fr' });
        expect(result).toEqual(threadsFr.question);
      });
    });

    describe('lang is "default"', () => {
      it('should return threads.topic of all available languages if the type is "topic"', () => {
        const result = service.getThreadsWebContent({ type: 'topic', lang: 'default' });
        expect(result).toEqual({ fr: threadsFr.topic });
      });
      it('should return threads.topic of all available languages if the type is "topics"', () => {
        const result = service.getThreadsWebContent({ type: 'topics', lang: 'default' });
        expect(result).toEqual({ fr: threadsFr.topic });
      });
      it('should return threads.question of all available languages if the type is "question"', () => {
        const result = service.getThreadsWebContent({ type: 'question', lang: 'default' });
        expect(result).toEqual({ fr: threadsFr.question });
      });
      it('should return threads.question of all available languages if the type is "questions"', () => {
        const result = service.getThreadsWebContent({ type: 'questions', lang: 'default' });
        expect(result).toEqual({ fr: threadsFr.question });
      });
    });
  });

  describe('getNewPostPageWebContent', () => {
    it('should return newPostPageFr if lang is "fr"', () => {
      const result = service.getNewPostPageWebContent({ lang: 'fr' });
      expect(result).toEqual(newPostPageFr);
    });
    it('should return all the available languages if lang is "default"', () => {
      const result = service.getNewPostPageWebContent({ lang: 'default' });
      expect(result).toEqual({ fr: newPostPageFr });
    });
    it('should throw an error if lang is not handled', () => {
      expect(() => service.getNewPostPageWebContent({ lang: 'es' })).toThrow('Language not handled');
    });
  });

  describe('getRegisterPageWebContent', () => {
    it('should return registerPageFr if lang is "fr"', () => {
      const result = service.getRegisterPageWebContent({ lang: 'fr' });
      expect(result).toEqual(registerPageFr);
    });
    it('should return all the available languages if lang is "default"', () => {
      const result = service.getRegisterPageWebContent({ lang: 'default' });
      expect(result).toEqual({ fr: registerPageFr });
    });
    it('should throw an error if lang is not handled', () => {
      expect(() => service.getRegisterPageWebContent({ lang: 'es' })).toThrow('Language not handled');
    });
  });

  describe('getPostViewPageWebContent', () => {
    it('should return postViewPageFr if lang is "fr"', () => {
      const result = service.getPostViewPageWebContent({ lang: 'fr' });
      expect(result).toEqual(postViewPageFr);
    });
    it('should return all the available languages if lang is "default"', () => {
      const result = service.getPostViewPageWebContent({ lang: 'default' });
      expect(result).toEqual({ fr: postViewPageFr });
    });
    it('should throw an error if lang is not handled', () => {
      expect(() => service.getPostViewPageWebContent({ lang: 'es' })).toThrow('Language not handled');
    });
  });

  describe('getProfilePageWebContent', () => {
    it('should return profilePageFr if lang is "fr"', () => {
      const result = service.getProfilePageWebContent({ lang: 'fr' });
      expect(result).toEqual(profilePageFr);
    });
    it('should return all the available languages if lang is "default"', () => {
      const result = service.getProfilePageWebContent({ lang: 'default' });
      expect(result).toEqual({ fr: profilePageFr });
    });
    it('should throw an error if lang is not handled', () => {
      expect(() => service.getProfilePageWebContent({ lang: 'es' })).toThrow('Language not handled');
    });
  });

  describe('getFavouritesPageWebContent', () => {
    it('should return favouritesPageFr if lang is "fr"', () => {
      const result = service.getFavouritesPageWebContent({ lang: 'fr' });
      expect(result).toEqual(favouritesPageFr);
    });
    it('should return all the available languages if lang is "default"', () => {
      const result = service.getFavouritesPageWebContent({ lang: 'default' });
      expect(result).toEqual({ fr: favouritesPageFr });
    });
    it('should throw an error if lang is not handled', () => {
      expect(() => service.getFavouritesPageWebContent({ lang: 'es' })).toThrow('Language not handled');
    });
  });
});