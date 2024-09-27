export type threadsdisplayerWebcontentType = {
  publications: {
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
    favourite: {
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
  noResult: {
    name: string;
    content: string;
  };
};
