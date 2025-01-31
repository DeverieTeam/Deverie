import { webcontentObjectType } from 'samples/webcontentObjectType.ts';
import { mainCommonsWebcontentType } from 'samples/mainCommonsWebcontentType.ts';

export type favouritespageWebcontentType = {
  commons: mainCommonsWebcontentType;
  page: {
    title: webcontentObjectType;
  };
};
