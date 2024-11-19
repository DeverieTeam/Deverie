import { webcontentObjectType } from 'samples/webcontentObjectType.ts';

export type tagfilterwindowWebcontentType = {
  buttons: {
    backButton: {
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
  tagsFamilies: {
    language: webcontentObjectType;
    environment: webcontentObjectType;
    technology: webcontentObjectType;
  };
};
