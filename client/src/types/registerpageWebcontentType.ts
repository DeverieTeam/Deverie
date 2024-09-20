export type registerpageWebcontentType = {
  page: {
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
      };
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
    warningMessages: {
      unvalidField: {
        tooShort: {
          name: string;
          content: string;
        };
        tooLong: {
          name: string;
          content: string;
        };
      };
      passwordsNotMatching: {
        name: string;
        content: string;
      };
      emailNotMatching: {
        name: string;
        content: string;
      };
      conflicts: {
        unvalidNameAndEmail: {
          name: string;
          content: string;
        };
        unvalidName: {
          name: string;
          content: string;
        };
        unvalidEmail: {
          name: string;
          content: string;
        };
      };
    };
  };
};
