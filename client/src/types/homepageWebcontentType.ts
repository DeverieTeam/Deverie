export type homepageWebcontentType = {
  commons: {
    logo: {
      hover: {
        name: string;
        content: string;
      };
      alt: {
        name: string;
        content: string;
      };
    };
    img: {
      imgPath: {
        name: string;
        content: string;
      };
    };
    buttons: {
      backButton: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      backToHomeButton: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      quitButton: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      cancelButton: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      confirmButton: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      checkShortcuts: {
        addEntireSection: {
          text: {
            name: string;
            content: string;
          };
          hover: {
            name: string;
            content: string;
          };
        };
        removeEntireSection: {
          text: {
            name: string;
            content: string;
          };
          hover: {
            name: string;
            content: string;
          };
        };
        addAll: {
          text: {
            name: string;
            content: string;
          };
          hover: {
            name: string;
            content: string;
          };
        };
        removeAll: {
          text: {
            name: string;
            content: string;
          };
          hover: {
            name: string;
            content: string;
          };
        };
      };
    };
    hypertexts: {
      home: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      contact: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      termsOfUse: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      legalNotices: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      login: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      profile: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
    };
    sections: {
      topic: {
        main: {
          name: string;
          content: string;
        };
        element: {
          name: string;
          content: string;
        };
      };
      question: {
        main: {
          name: string;
          content: string;
        };
        element: {
          name: string;
          content: string;
        };
      };
      chat: {
        main: {
          name: string;
          content: string;
        };
      };
      favourite: {
        main: {
          name: string;
          content: string;
        };
        element: {
          name: string;
          content: string;
        };
      };
    };
    publications: {
      publishDatePrefix: {
        name: string;
        content: string;
      };
      numberOfResponses: {
        name: string;
        content: string;
      };
      lastResponseDatePrefix: {
        name: string;
        content: string;
      };
      closureText: {
        topic: {
          name: string;
          content: string;
        };
        question: {
          name: string;
          content: string;
        };
      };
      favourite: {
        add: {
          hover: {
            name: string;
            content: string;
          };
        };
        remove: {
          hover: {
            name: string;
            content: string;
          };
        };
      };
    };
    searching: {
      searchBar: {
        text: {
          name: string;
          content: string;
        };
      };
      tagFilter: {
        text: {
          name: string;
          content: string;
        };
      };
      sortFilter: {
        text: {
          name: string;
          content: string;
        };
        filters: {
          mostRecent: {
            topic: {
              name: string;
              content: string;
            };
            question: {
              name: string;
              content: string;
            };
          };
          lessRecent: {
            topic: {
              name: string;
              content: string;
            };
            question: {
              name: string;
              content: string;
            };
          };
          mostPopular: {
            topic: {
              name: string;
              content: string;
            };
            question: {
              name: string;
              content: string;
            };
          };
          lessPopular: {
            topic: {
              name: string;
              content: string;
            };
            question: {
              name: string;
              content: string;
            };
          };
        };
      };
    };
    pagination: {
      resultsOutOf: {
        name: string;
        content: string;
      };
      pagesPrefix: {
        name: string;
        content: string;
      };
    };
    tagsFamilies: {
      language: {
        name: string;
        content: string;
      };
      environment: {
        name: string;
        content: string;
      };
      technology: {
        name: string;
        content: string;
      };
    };
    noResult: {
      name: string;
      content: string;
    };
  };
  page: {
    welcomeMessage: {
      title: {
        name: string;
        content: string;
      };
      description: {
        name: string;
        content: string;
      };
    };
    shortcutPopUp: {
      isIdenticalWhenConnected: {
        name: string;
        content: boolean;
      };
      disconnected: {
        message: {
          name: string;
          content: string;
        };
        button: {
          name: string;
          content: string;
        };
        link: {
          name: string;
          content: string;
        };
      };
      connected: {
        message: {
          name: string;
          content: string;
        };
        button: {
          name: string;
          content: string;
        };
        link: {
          name: string;
          content: string;
        };
      };
    };
    trends: {
      popular: {
        name: string;
        content: string;
      };
      recent: {
        name: string;
        content: string;
      };
    };
  };
};
