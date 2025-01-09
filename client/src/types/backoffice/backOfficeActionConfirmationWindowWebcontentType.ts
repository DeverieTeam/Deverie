import { webcontentObjectType } from '../samples/webcontentObjectType.ts';

export type backOfficeActionConfirmationWindowWebcontentType = {
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
};
