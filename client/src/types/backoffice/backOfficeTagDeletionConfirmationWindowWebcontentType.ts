import { webcontentObjectType } from '../samples/webcontentObjectType.ts';

export type backOfficeTagDeletionConfirmationWindowWebcontentType = {
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
  warnings: {
    deletionConfirmationAlert: webcontentObjectType;
  };
};
