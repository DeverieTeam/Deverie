async function fetchWebContent(
  page: string,
  lang: string,
  posts?: boolean
): Promise<
  | {
      commons: JSON;
      page: JSON;
    }
  | JSON
> {
  const url: string = "http://localhost:3000/webcontent";
  let endpoint: string = "";
  const addPosts: boolean = posts !== undefined && posts === true;

  const fetchCommonsPromise = fetch(
    `${url}/commons?lang=${lang}${addPosts ? "&posts=true" : ""}`
  ).then((response) => {
    return response;
  });

  if (page !== "header") {
    switch (page) {
      case "home":
      case "homepage":
        endpoint = "/homepage";
        break;
      case "topic":
      case "topics":
        endpoint = "/threads/topic";
        break;
      case "question":
      case "questions":
        endpoint = "/threads/question";
        break;
      case "register":
      	endpoint = "/register";
      	break;
      case "newPost":
        endpoint = "/newPost";
        break;
      case "wip":
      case "wipage":
        endpoint = "/wip";
        break;
      case "404":
      case "notfound":
      default:
        endpoint = "/notfound";
        break;
    }
    const fetchPagePromise = fetch(`${url}${endpoint}?lang=${lang}`).then(
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
  } else {
    const responseCommons = await fetchCommonsPromise;
    const dataCommons = await responseCommons.json();
    return dataCommons;
  }
}

export default fetchWebContent;
