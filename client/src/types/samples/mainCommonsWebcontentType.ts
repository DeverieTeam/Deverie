import { webcontentObjectType } from './webcontentObjectType.ts';

export type mainCommonsWebcontentType = {
  commons: {
    logo: {
      hover: webcontentObjectType;
      alt: webcontentObjectType;
    };
    img: {
      imgPath: webcontentObjectType;
    };
    buttons: {
      backButton: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      backToHomeButton: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      quitButton: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      cancelButton: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      confirmButton: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      checkShortcuts: {
        addEntireSection: {
          text: webcontentObjectType;
          hover: webcontentObjectType;
        };
        removeEntireSection: {
          text: webcontentObjectType;
          hover: webcontentObjectType;
        };
        addAll: {
          text: webcontentObjectType;
          hover: webcontentObjectType;
        };
        removeAll: {
          text: webcontentObjectType;
          hover: webcontentObjectType;
        };
      };
    };
    hypertexts: {
      home: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      contact: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      termsOfUse: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      legalNotices: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      joinUs: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      login: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      userMenu: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
    };
    sections: {
      topic: {
        main: webcontentObjectType;
        element: webcontentObjectType;
      };
      question: {
        main: webcontentObjectType;
        element: webcontentObjectType;
      };
      chat: {
        main: webcontentObjectType;
      };
      favourite: {
        main: webcontentObjectType;
        element: webcontentObjectType;
      };
    };
    connection: {
      title: {
        connectionPage: webcontentObjectType;
        connectionNeeded: webcontentObjectType;
      };
      fields: {
        username: webcontentObjectType;
        password: webcontentObjectType;
      };
      unregistered: {
        prefix: webcontentObjectType;
      };
      warning: webcontentObjectType;
    };
    publications: {
      publishDatePrefix: webcontentObjectType;
      numberOfResponses: webcontentObjectType;
      lastResponseDatePrefix: webcontentObjectType;
      closureText: {
        topic: webcontentObjectType;
        question: webcontentObjectType;
      };
      favourite: {
        add: {
          hover: webcontentObjectType;
        };
        remove: {
          hover: webcontentObjectType;
        };
      };
    };
    searching: {
      searchBar: {
        text: webcontentObjectType;
      };
      tagFilter: {
        text: webcontentObjectType;
      };
      sortFilter: {
        text: webcontentObjectType;
        filters: {
          mostRecent: {
            topic: webcontentObjectType;
            question: webcontentObjectType;
          };
          lessRecent: {
            topic: webcontentObjectType;
            question: webcontentObjectType;
          };
          mostPopular: {
            topic: webcontentObjectType;
            question: webcontentObjectType;
          };
          lessPopular: {
            topic: webcontentObjectType;
            question: webcontentObjectType;
          };
          chronologicalOrder: webcontentObjectType;
          relevance: webcontentObjectType;
        };
      };
    };
    pagination: {
      result: webcontentObjectType;
      answer: webcontentObjectType;
      outOf: webcontentObjectType;
      pagesPrefix: webcontentObjectType;
    };
    tagsFamilies: {
      language: webcontentObjectType;
      environment: webcontentObjectType;
      technology: webcontentObjectType;
    };
    noResult: webcontentObjectType;
    dropDownMenu: {
      profile: webcontentObjectType;
      favourites: webcontentObjectType;
      backoffice: webcontentObjectType;
      logout: webcontentObjectType;
    };
    memberWindow: {
      role: {
        member: webcontentObjectType;
        moderator: webcontentObjectType;
        administrator: webcontentObjectType;
      };
      pronounsPrefix: webcontentObjectType;
      messageCount: webcontentObjectType;
      inscriptionDate: webcontentObjectType;
      descriptionPlaceholder: webcontentObjectType;
      banButton: webcontentObjectType;
      banTitle: webcontentObjectType;
      banConfirmMessage: webcontentObjectType;
    };
  };
};
