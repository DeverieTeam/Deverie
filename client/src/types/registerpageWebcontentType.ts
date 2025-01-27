import { webcontentObjectType } from 'samples/webcontentObjectType.ts';
import { mainCommonsWebcontentType } from 'samples/mainCommonsWebcontentType.ts';

export type registerpageWebcontentType = {
  commons: mainCommonsWebcontentType;
  page: {
    title: webcontentObjectType;
    form: {
      generalInformations: {
        main: webcontentObjectType;
        fields: {
          username: webcontentObjectType;
          password: webcontentObjectType;
          confirmPassword: webcontentObjectType;
          email: webcontentObjectType;
        };
      };
      complementaryInformations: {
        main: webcontentObjectType;
        fields: {
          pronouns: webcontentObjectType;
          showEmail: webcontentObjectType;
          description: webcontentObjectType;
        };
      };
      obligatoryFieldsMessage: webcontentObjectType;
    };
    submitButton: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    warningMessages: {
      unvalidField: {
        tooShort: webcontentObjectType;
        tooLong: webcontentObjectType;
      };
      passwordsNotMatching: webcontentObjectType;
      emailNotMatching: webcontentObjectType;
      conflicts: {
        unvalidNameAndEmail: webcontentObjectType;
        unvalidName: webcontentObjectType;
        unvalidEmail: webcontentObjectType;
      };
    };
    validationWindow: {
      welcomeTitle: webcontentObjectType;
      mainText: webcontentObjectType;
      exitButton: webcontentObjectType;
    };
  };
};
