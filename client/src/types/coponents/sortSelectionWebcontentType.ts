import { webcontentObjectType } from 'samples/webcontentObjectType.ts';

export type sortselectionWebcontentType = {
  text: webcontentObjectType;
  filters: {
    mostRecent: {
      topic: webcontentObjectType;
      question: webcontentObjectType;
    };
    lessRecent: {
      topic: webcontentObjectType;
      question: webcontentObjectType;
    };
    mostPopular: {
      topic: webcontentObjectType;
      question: webcontentObjectType;
    };
    lessPopular: {
      topic: webcontentObjectType;
      question: webcontentObjectType;
    };
    chronologicalOrder: webcontentObjectType;
    relevance: webcontentObjectType;
  };
};
