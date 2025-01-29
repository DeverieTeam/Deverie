import { webcontentObjectType } from 'samples/webcontentObjectType.ts';
import { mainCommonsWebcontentType } from 'samples/mainCommonsWebcontentType.ts';

export type wipAndPageNotFoundWebcontentType = {
  commons: mainCommonsWebcontentType;
  page: {
    wip: {
      title: webcontentObjectType;
      tabTitle: webcontentObjectType;
      description: webcontentObjectType;
      imgSrc: webcontentObjectType;
    };
    notFound: {
      title: webcontentObjectType;
      tabTitle: webcontentObjectType;
      description: webcontentObjectType;
      imgSrc: webcontentObjectType;
    };
  };
};
