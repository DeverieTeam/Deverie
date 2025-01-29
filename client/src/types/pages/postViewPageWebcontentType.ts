import { webcontentObjectType } from 'samples/webcontentObjectType.ts';
import { mainCommonsWebcontentType } from 'samples/mainCommonsWebcontentType.ts';

export type postViewPageWebcontentType = {
  commons: mainCommonsWebcontentType;
  page: {
    associatedTags: webcontentObjectType;
    addingFavourite: webcontentObjectType;
    removingFavourite: webcontentObjectType;
    questionEmergency: webcontentObjectType;
    modificationNotification: webcontentObjectType;
    modificationSuffix: webcontentObjectType;
    closureButton: {
      topic: webcontentObjectType;
      question: webcontentObjectType;
    };
    answerButton: webcontentObjectType;
    displayAnswers: webcontentObjectType;
    hideAnswers: webcontentObjectType;
    postContent: webcontentObjectType;
    postContentPlaceholder: webcontentObjectType;
    editTitle: webcontentObjectType;
    tagNumberDisclaimer: webcontentObjectType;
    deletionTitle: webcontentObjectType;
    deletionConfirmMessage: webcontentObjectType;
    closureTitle: webcontentObjectType;
    closureConfirmMessage: webcontentObjectType;
  };
};
