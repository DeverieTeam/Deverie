import { webcontentObjectType } from 'samples/webcontentObjectType.ts';

export type connectionneededWebcontentType = {
  hypertexts: {
    home: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    contact: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    termsOfUse: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    legalNotices: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    joinUs: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    login: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    profile: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
  };
  connection: {
    title: {
      connectionPage: webcontentObjectType;
      connectionNeeded: webcontentObjectType;
    };
    fields: {
      username: webcontentObjectType;
      password: webcontentObjectType;
    };
    unregistered: {
      prefix: webcontentObjectType;
    };
  };
};
