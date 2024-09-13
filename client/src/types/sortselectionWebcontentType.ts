export type sortselectionWebcontentType = {
  text: {
    name: string;
    content: string;
  };
  filters: {
    mostRecent: {
      topic: {
        name: string;
        content: string;
      };
      question: {
        name: string;
        content: string;
      };
    };
    lessRecent: {
      topic: {
        name: string;
        content: string;
      };
      question: {
        name: string;
        content: string;
      };
    };
    mostPopular: {
      topic: {
        name: string;
        content: string;
      };
      question: {
        name: string;
        content: string;
      };
    };
    lessPopular: {
      topic: {
        name: string;
        content: string;
      };
      question: {
        name: string;
        content: string;
      };
    };
  };
};
