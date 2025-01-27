import { webcontentObjectType } from 'samples/webcontentObjectType.ts';

export type banConfirmWindowWebcontentType = {
  memberWindow: webcontentObjectType;
  buttons: {
    backButton?: webcontentObjectType;
    cancelButton?: webcontentObjectType;
    confirmButton: webcontentObjectType;
  }
};
