import { webcontentObjectType } from '../samples/webcontentObjectType.ts';

export type backOfficeTagsManagementWebcontentType = {
  commons: {
    buttons: {
      submit: {
        text: webcontentObjectType;
        hover: webcontentObjectType;
      };
    };
  };
  page: {
    title: webcontentObjectType;
    actions: {
      create: {
        title: webcontentObjectType;
        windowTitle: webcontentObjectType;
      };
      modify: {
        title: webcontentObjectType;
        windowTitle: webcontentObjectType;
      };
      delete: {
        title: webcontentObjectType;
        windowTitle: webcontentObjectType;
      };
    };
    fields: {
      tagName: webcontentObjectType;
      tagLogo: webcontentObjectType;
      tagFamily: webcontentObjectType;
      tagPreview: webcontentObjectType;
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
    };
    placeholders: {
      tagSelect: webcontentObjectType;
      familySelect: webcontentObjectType;
    };
    tagsFamilies: {
      language: webcontentObjectType;
      environment: webcontentObjectType;
      technology: webcontentObjectType;
    };
    warnings: {
      deletionConfirmationAlert: webcontentObjectType
    };
  };
};
