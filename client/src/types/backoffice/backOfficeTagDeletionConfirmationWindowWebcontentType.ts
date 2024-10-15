export type backOfficeTagDeletionConfirmationWindowWebcontentType = {
	buttons: {
    cancel: {
      text: {
        name: string;
        content: string;
      };
      hover: {
        name: string;
        content: string;
      };
    };
    confirm: {
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
  warnings: {
    deletionConfirmationAlert: {
      name: string;
      content: string;
    };
  };
};
