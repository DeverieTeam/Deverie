import { webcontentObjectType } from 'samples/webcontentObjectType.ts';
import { mainCommonsWebcontentType } from 'samples/mainCommonsWebcontentType.ts';

export type homepageWebcontentType = {
  commons: mainCommonsWebcontentType;
  page: {
    welcomeMessage: {
      title: webcontentObjectType;
      description: webcontentObjectType;
    };
    shortcutPopUp: {
      isIdenticalWhenConnected: webcontentObjectType;
      disconnected: {
        message: webcontentObjectType;
        button: webcontentObjectType;
        link: webcontentObjectType;
      };
      connected: {
        message: webcontentObjectType;
        button: webcontentObjectType;
        link: webcontentObjectType;
      };
    };
    trends: {
      popular: webcontentObjectType;
      recent: webcontentObjectType;
    };
  };
};
