async function fetchWebContent(args: {
  page: string;
  lang: string;
  hasPosts?: boolean;
  isBackOffice?: boolean;
}): Promise<
  | {
      commons: JSON;
      page?: JSON;
    }
  | JSON
> {
  const url: string = "http://localhost:3000/webcontent";
  let endpoint: string = args.isBackOffice ? "/backoffice" : "";
  const addPosts: boolean =
    args.hasPosts !== undefined && args.hasPosts === true;

  const fetchCommonsPromise = fetch(
    `${url}${args.page !== "header" ? endpoint : ""}/commons?lang=${args.lang}${
      addPosts ? "&posts=true" : ""
    }`
  ).then((response) => {
    return response;
  });

  //if the page is not "header" and not a BackOffice page
  if (args.page !== "header" || args.isBackOffice) {
    switch (args.page) {
      case "home":
      case "homepage":
        endpoint += "/homepage";
        break;
      case "topic":
      case "topics":
        endpoint += "/threads/topic";
        break;
      case "question":
      case "questions":
        endpoint += "/threads/question";
        break;
      case "register":
        endpoint += "/register";
        break;
      case "newPost":
        endpoint += "/newPost";
        break;
      case "postView":
        endpoint += "/postView";
        break;
      case "wip":
      case "wipage":
        endpoint += "/wip";
        break;
      case "404":
      case "notfound":
      default:
        if (args.isBackOffice) {
          endpoint += "/commons";
        } else {
          endpoint += "/notfound";
        }
        break;
    }

    const fetchPagePromise = fetch(`${url}${endpoint}?lang=${args.lang}`).then(
      (response) => {
        return response;
      }
    );

    const [responseCommons, responsePage] = await Promise.all([
      fetchCommonsPromise,
      fetchPagePromise,
    ]);
    const dataCommons = await responseCommons.json();
    const dataPage = await responsePage.json();

    return {
      commons: dataCommons,
      page: dataPage,
    };
  }
  //if the page is "header" and this is not a BackOffice page
  else {
    const responseCommons = await fetchCommonsPromise;
    const dataCommons = await responseCommons.json();
    return {
      commons: dataCommons,
    };
  }
}

export default fetchWebContent;
