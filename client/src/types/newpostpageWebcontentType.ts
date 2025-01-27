import { webcontentObjectType } from 'samples/webcontentObjectType.ts';
import { mainCommonsWebcontentType } from 'samples/mainCommonsWebcontentType.ts';

export type newpostpageWebcontentType = {
  commons: mainCommonsWebcontentType;
  page: {
    title: {
      topic: webcontentObjectType;
      question: webcontentObjectType;
    };
    postTitle: webcontentObjectType;
    postTitlePlaceholder: webcontentObjectType;
    postContent: webcontentObjectType;
    postContentPlaceholder: webcontentObjectType;
    tagsButton: webcontentObjectType;
    emergency: webcontentObjectType;
    tagNumberDisclaimer: webcontentObjectType;
    titleConflict: webcontentObjectType;
  };
};
