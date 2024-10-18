export type backOfficeTagsManagementWebcontentType = {
  commons: {
    buttons: {
      submit: {
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
  page: {
    title: {
      name: string;
      content: string;
    };
    actions: {
      create: {
        title: {
          name: string;
          content: string;
        };
        windowTitle: {
          name: string;
          content: string;
        };
      };
      modify: {
        title: {
          name: string;
          content: string;
        };
        windowTitle: {
          name: string;
          content: string;
        };
      };
      delete: {
        title: {
          name: string;
          content: string;
        };
        windowTitle: {
          name: string;
          content: string;
        };
      };
    };
    fields: {
      tagName: {
        name: string;
        content: string;
      };
      tagLogo: {
        name: string;
        content: string;
      };
      tagFamily: {
        name: string;
        content: string;
      };
      tagPreview: {
        name: string;
        content: string;
      };
    };
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
    placeholders: {
      tagSelect: {
        name: string;
        content: string;
      };
      familySelect: {
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
    warnings: {
      deletionConfirmationAlert: {
        name: string;
        content: string;
      }
    };
  };
};
