import { webcontentObjectType } from 'samples/webcontentObjectType.ts';

export type threadsrowWebcontentType = {
  publishDatePrefix: webcontentObjectType;
  numberOfResponses: webcontentObjectType;
  lastResponseDatePrefix: webcontentObjectType;
  closureText: {
    topic: webcontentObjectType;
    question: webcontentObjectType;
  };
  favourite: {
    add: {
      hover: webcontentObjectType;
    };
    remove: {
      hover: webcontentObjectType;
    };
  };
};
