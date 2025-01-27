import { webcontentObjectType } from 'samples/webcontentObjectType.ts';

export type headerWebcontentType = {
  logo: {
    hover: webcontentObjectType;
    alt: webcontentObjectType;
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
  dropDownMenu: {
    profile: webcontentObjectType;
    favourites: webcontentObjectType;
    backoffice: webcontentObjectType;
    logout: webcontentObjectType;
  };
};
