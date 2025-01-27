import { webcontentObjectType } from 'samples/webcontentObjectType.ts';

export type contentEditWindowWebcontentType = {
    actionTitle: webcontentObjectType;
    contentTitle: webcontentObjectType;
    contentPlaceholder: webcontentObjectType;
    buttons: {
      cancelButton?: webcontentObjectType;
      backButton?: webcontentObjectType;
      confirmButton: webcontentObjectType;
    };
};
