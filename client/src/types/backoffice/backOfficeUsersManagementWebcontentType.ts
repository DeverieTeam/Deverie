import { webcontentObjectType } from '../samples/webcontentObjectType.ts';

export type backOfficeUsersManagementWebcontentType = {
  title: webcontentObjectType;
  actions: {
    informations: {
      title: webcontentObjectType;
    };
    publications: {
      title: webcontentObjectType;
    };
    banish: {
      title: webcontentObjectType;
    };
  };
  informationsPrefixes: {
    member: {
      accountName: webcontentObjectType;
      inscriptionDate: webcontentObjectType;
      isBanned: webcontentObjectType;
      publicationsNumber: webcontentObjectType;
      upvotesNumber: webcontentObjectType;
      downvotesPublicationsNumber: webcontentObjectType;
      favoritesNumber: webcontentObjectType;
      questionsNumber: webcontentObjectType;
      closedQuestionsNumber: webcontentObjectType;
      answersNumber: webcontentObjectType;
      deletedAnswersNumber: webcontentObjectType;
      topicsNumber: webcontentObjectType;
      closedTopicsNumber: webcontentObjectType;
      commentariesNumber: webcontentObjectType;
      deletedCommentariesNumber: webcontentObjectType;
    };
    publication: {
      type: webcontentObjectType;
      publicationDate: webcontentObjectType;
      isPublicationVisible: webcontentObjectType;
      isPublicationClosed: webcontentObjectType;
      responsesNumber: webcontentObjectType;
      lastResponseDate: webcontentObjectType;
    };
  };
  fields: {
    memberSelect: webcontentObjectType;
    publicationSelect: webcontentObjectType;
    associatedTags: webcontentObjectType;
    replyTo: webcontentObjectType;
    modificationNotification: webcontentObjectType;
  };
  buttons: {
    cancel: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    confirm: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    ban: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    unban: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
  };
  placeholders: {
    memberSelect: webcontentObjectType;
    publicationSelect: webcontentObjectType;
  };
  banishmentMessages: {
    banned: webcontentObjectType;
    unbanned: webcontentObjectType;
  };
  warnings: {
    banConfirmationAlert: webcontentObjectType;
    unbanConfirmationAlert: webcontentObjectType;
  };
};
