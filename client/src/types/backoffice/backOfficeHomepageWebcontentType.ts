import { webcontentObjectType } from '../samples/webcontentObjectType.ts';
import { backOfficeCommonsWebcontentType } from '../samples/backOfficeCommonsWebcontentType.ts';

export type backOfficeHomepageWebcontentType = {
  commons: backOfficeCommonsWebcontentType;
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
