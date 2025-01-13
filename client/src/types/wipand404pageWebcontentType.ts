import { webcontentObjectType } from 'samples/webcontentObjectType.ts';
import { mainCommonsWebcontentType } from 'samples/mainCommonsWebcontentType.ts';

export type wipand404pageWebcontentType = {
  commons: mainCommonsWebcontentType;
  page: {
    title: webcontentObjectType;
    description: webcontentObjectType;
    imgSrc: webcontentObjectType;
  };
};
