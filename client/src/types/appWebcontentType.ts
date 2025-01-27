import { webcontentObjectType } from 'samples/webcontentObjectType.ts';
import { mainCommonsWebcontentType } from 'samples/mainCommonsWebcontentType.ts';

export type appWebcontentType = {
  commons: mainCommonsWebcontentType;
  page?: {
    // for the backoffice navigation
    sections: {
      home: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      chats: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      tags: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      moderation: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      interface: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
    };
    buttons: {
      submit: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
    };
  };
};
