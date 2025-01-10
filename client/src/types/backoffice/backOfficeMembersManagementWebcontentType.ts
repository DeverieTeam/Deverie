import { webcontentObjectType } from '../samples/webcontentObjectType.ts';
import { backOfficeCommonsWebcontentType } from '../samples/backOfficeCommonsWebcontentType.ts';

export type backOfficeMembersManagementWebcontentType = {
  commons: backOfficeCommonsWebcontentType;
  page: {
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
        downvotesNumber: webcontentObjectType;
        favoritesNumber: webcontentObjectType;
        questionsNumber: webcontentObjectType;
        closedQuestionsNumber: webcontentObjectType;
        answersNumber: webcontentObjectType;
        deletedAnswersNumber: webcontentObjectType;
        topicsNumber: webcontentObjectType;
        closedTopicsNumber: webcontentObjectType;
        commentsNumber: webcontentObjectType;
        deletedCommentsNumber: webcontentObjectType;
      };
      publication: {
        type: webcontentObjectType;
        publicationDate: webcontentObjectType;
        isReadable: webcontentObjectType;
        isOpened: webcontentObjectType;
        repliesNumber: webcontentObjectType;
        lastReplyDate: webcontentObjectType;
      };
    };
    fields: {
      memberSelect: webcontentObjectType;
      publicationSelect: webcontentObjectType;
      associatedTags: webcontentObjectType;
      replyTo: webcontentObjectType;
      replyDepth: webcontentObjectType;
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
      unbannable: webcontentObjectType;
    };
    warnings: {
      banConfirmationAlert: webcontentObjectType;
      unbanConfirmationAlert: webcontentObjectType;
    };
  };
};
