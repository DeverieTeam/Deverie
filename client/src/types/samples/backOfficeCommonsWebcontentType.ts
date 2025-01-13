import { webcontentObjectType } from './webcontentObjectType.ts';

export type backOfficeCommonsWebcontentType = {
  boolean: {
    yes: webcontentObjectType;
    no: webcontentObjectType;
  };
  publicationTypes: {
    question: webcontentObjectType;
    answer: webcontentObjectType;
    topic: webcontentObjectType;
    comment: webcontentObjectType;
  };
  roles: {
    member: webcontentObjectType;
    moderator: webcontentObjectType;
    administrator: webcontentObjectType;
  };
  sections: {
    home: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    chats: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    tags: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    members: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    moderation: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    threads: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
    interface: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
  };
  buttons: {
    submit: {
      text: webcontentObjectType;
      hover: webcontentObjectType;
    };
  };
}
