export type backOfficeHomepageWebcontentType = {
  title: {
    name: string;
    content: string;
  };
  statistics: {
    title: {
      name: string;
      content: string;
    };
    notBanned: {
      title: {
        name: string;
        content: string;
      };
      publicationsNumberPrefix: {
        name: string;
        content: string;
      };
      questionsNumberPrefix: {
        name: string;
        content: string;
      };
      closedQuestionsNumberPrefix: {
        name: string;
        content: string;
      };
      topicsNumberPrefix: {
        name: string;
        content: string;
      };
      closedTopicsNumberPrefix: {
        name: string;
        content: string;
      };
    };
    banned: {
      title: {
        name: string;
        content: string;
      };
      publicationsNumberPrefix: {
        name: string;
        content: string;
      };
      questionsNumberPrefix: {
        name: string;
        content: string;
      };
      topicsNumberPrefix: {
        name: string;
        content: string;
      };
    };
    usersNumberPrefix: {
      name: string;
      content: string;
    };
    bannedUsersNumberPrefix: {
      name: string;
      content: string;
    };
    membersNumberPrefix: {
      name: string;
      content: string;
    };
    moderatorsNumberPrefix: {
      name: string;
      content: string;
    };
    administratorsNumberPrefix: {
      name: string;
      content: string;
    };
  };
};
