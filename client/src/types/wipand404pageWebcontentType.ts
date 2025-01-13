import { webcontentObjectType } from 'samples/webcontentObjectType.ts';

export type wipand404pageWebcontentType = {
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
      login: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
      profile: {
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
    publications: {
      publishDatePrefix: webcontentObjectType;
      numberOfResponses: webcontentObjectType;
      lastResponseDatePrefix: webcontentObjectType;
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
        };
      };
    };
    pagination: {
      resultsOutOf: webcontentObjectType;
      pagesPrefix: webcontentObjectType;
    };
    tagsFamilies: {
      language: webcontentObjectType;
      environment: webcontentObjectType;
      technology: webcontentObjectType;
    };
    noResult: webcontentObjectType;
  };
  page: {
    title: webcontentObjectType;
    description: webcontentObjectType;
    imgSrc: webcontentObjectType;
  };
};
