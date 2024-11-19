import { webcontentObjectType } from '../samples/webcontentObjectType.ts';

export type backOfficeHomepageWebcontentType = {
  page: {
    title: webcontentObjectType;
    statistics: {
      title: webcontentObjectType;
      notBanned: {
        title: webcontentObjectType;
        publicationsNumberPrefix: webcontentObjectType;
        questionsNumberPrefix: webcontentObjectType;
        closedQuestionsNumberPrefix: webcontentObjectType;
        topicsNumberPrefix: webcontentObjectType;
        closedTopicsNumberPrefix: webcontentObjectType;
      };
      banned: {
        title: webcontentObjectType;
        publicationsNumberPrefix: webcontentObjectType;
        questionsNumberPrefix: webcontentObjectType;
        topicsNumberPrefix: webcontentObjectType;
      };
      usersNumberPrefix: webcontentObjectType;
      bannedUsersNumberPrefix: webcontentObjectType;
      membersNumberPrefix: webcontentObjectType;
      moderatorsNumberPrefix: webcontentObjectType;
      administratorsNumberPrefix: webcontentObjectType;
    };
  };
};
