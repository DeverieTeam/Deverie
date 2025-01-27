import { webcontentObjectType } from 'samples/webcontentObjectType.ts';
import { mainCommonsWebcontentType } from 'samples/mainCommonsWebcontentType.ts';

export type threadspageWebcontentType = {
  commons: mainCommonsWebcontentType;
  page: {
    createButton: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
  };
};
