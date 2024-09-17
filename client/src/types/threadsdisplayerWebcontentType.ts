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
  noResult: {
    name: string;
    content: string;
  };
};
