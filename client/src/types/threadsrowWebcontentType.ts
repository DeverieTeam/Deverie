export type threadsrowWebcontentType = {
  publishDatePrefix: {
    name: string;
    content: string;
  };
  numberOfResponses: {
    name: string;
    content: string;
  };
  lastResponseDatePrefix: {
    name: string;
    content: string;
  };
  closureText: {
    topic: {
      name: string;
      content: string;
    };
    question: {
      name: string;
      content: string;
    };
  };
  favorite: {
    add: {
      hover: {
        name: string;
        content: string;
      };
    };
    remove: {
      hover: {
        name: string;
        content: string;
      };
    };
  };
};
