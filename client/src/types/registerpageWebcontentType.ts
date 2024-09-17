export type registerpageWebcontentType = {
	title: {
    name: string;
    content: string;
  };
  form: {
    generalInformations: {
      main: {
        name: string;
        content: string;
      };
      fields: {
        username: {
          name: string;
          content: string;
        };
        password: {
          name: string;
          content: string;
        };
        confirmPassword: {
          name: string;
          content: string;
        };
        email: {
          name: string;
          content: string;
        };
      };
    };
    complementaryInformations: {
      main: {
        name: string;
        content: string;
      };
      fields: {
        pronouns: {
          name: string;
          content: string;
        };
        showEmail: {
          name: string;
          content: string;
        };
        description: {
          name: string;
          content: string;
        };
      };
    };
    obligatoryFieldsMessage: {
      name: string;
      content: string;
    }
  };
  submitButton: {
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
