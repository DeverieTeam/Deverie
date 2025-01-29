import { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import ActionConfirmationWindow from '../../components/backoffice/ActionConfirmationWindow';
import { backOfficeMembersManagementWebcontentType } from '../../types/backoffice/backOfficeMembersManagementWebcontentType';
import Cookies from "universal-cookie";
import { useAuth } from "../../contexts/useAuth";
import useWindowDimensions from "../../scripts/useWindowDimensions";

export default function BackOfficeMembersManagement() {
  const serverAddress: string = import.meta.env.VITE_SERVER_ADDRESS;
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { windowWidth } = useWindowDimensions();

  const webcontent = useLoaderData() as backOfficeMembersManagementWebcontentType;

  const maximumEffectiveDetailsWidth = 768;

  const [isActionConfirmWindowDisplayed, setIsActionConfirmWindowDisplayed] = useState<boolean>(false);
  function handleDisplayDeletionConfirmationWindow() {
    if (selectedMember !== 0) {
      setIsActionConfirmWindowDisplayed(true);
    }
  }

  const [allTheMembers, setAllTheMembers] = useState<null | String[]>(null);
  
  const [selectedMember, setSelectedMember] = useState<number>(0);
  const handleSelectedMemberChange = (e: string) => {
    if (e === "") {
      setSelectedMember(0);
    } else {
      setSelectedMember(parseInt(e));
    }
    setSelectedPublication(0);
  }

  const selectedMemberInfos: {
    id: number;
    name: string;
    hashed_password: string;
    email: string;
    is_email_displayed: boolean;
    inscription_date: string;
    profile_picture: string;
    pronouns: string;
    description: string;
    role: string;
    is_banned: boolean;
    displayed_name: null | string;
    theme: string;
    language: string;
  } = (selectedMember === 0 ? null :
                              allTheMembers.filter((member) => member.id === parseInt(selectedMember))[0]);

  const [selectedPublication, setSelectedPublication] = useState<number>(0);
  const handleSelectedPublicationChange = (e: string) => {
    if (e === "") {
      setSelectedPublication(0);
    } else {
      setSelectedPublication(parseInt(e));
    }
  }

  const [selectedPublicationInfos, setSelectedPublicationInfos] = useState<{
    id: number;
    author: {
      id: number;
      name: string;
      profile_picture: string;
      is_banned: boolean;
      role: string;
    };
    tags: {
      id: number;
      name: string;
      icon: string;
    }[];
    creation_date: string;
    type: string;
    title: string;
    content: string;
    is_opened: boolean;
    is_readable: boolean;
    is_favourated_by: number[];
    modification_date: string;
    modification_author: string;
    emergency: number;
    results_length: number;
    replies: {id: number}[];
    up_votes?: number;
    down_votes?: number;
  }
  | null>(null);

  const [selectedPublicationReplyTreeInfos, setSelectedPublicationReplyTreeInfos] = useState<{
    original_publication: number;
    direct_reply: {
      id: number;
      content: string;
      author_id: number;
    };
    reply_depth: number;
  } | null>(null);

  const [selectedPublicationLastReplyDate, setSelectedPublicationLastReplyDate] = useState<string|null>(null);

  const [selectedMemberPublications, setSelectedMemberPublications] = useState<{
    id: number;
    title?: string;
    content: string;
    type: 'question' | 'answer' | 'topic' | 'comment';
  }[]>({});

  const [memberPublicationsNumber, setMemberPublicationsNumber] = useState<number>(0);
  const [memberUpvotedNumber, setMemberUpvotedNumber] = useState<number>(0);
  const [memberDownvotedNumber, setMemberDownvotedNumber] = useState<number>(0);
  const [memberFavoritesNumber, setMemberFavoritesNumber] = useState<number>(0);

  const [memberQuestionsNumber, setMemberQuestionsNumber] = useState<number>(0);
  const [memberClosedQuestionsNumber, setMemberClosedQuestionsNumber] = useState<number>(0);
  const [memberAnswersNumber, setMemberAnswersNumber] = useState<number>(0);
  const [memberDeletedAnswersNumber, setMemberDeletedAnswersNumber] = useState<number>(0);

  const [memberTopicsNumber, setMemberTopicsNumber] = useState<number>(0);
  const [memberClosedTopicsNumber, setMemberClosedTopicsNumber] = useState<number>(0);
  const [memberCommentsNumber, setMemberCommentsNumber] = useState<number>(0);
  const [memberDeletedCommentsNumber, setMemberDeletedCommentsNumber] = useState<number>(0);
  
  async function fetchAllTheMembers() {
    try {
      const cookies = new Cookies(null, {
        path: '/',
      });
      const jwt = cookies.get('JWT');

      const membersPromise = fetch(`${serverAddress}/member`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          }
        }
      ).then(async (response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();
        setAllTheMembers(result);
      });
    } catch (error) {
      console.error("Something went wrong: ", error);
    }
  }

  async function fetchMemberStatistics(args: {
    endopint: 'post' | 'rating';
    type: 'all' | 'question' | 'answer' | 'topic' | 'response';
    isClosed? : boolean;
    isReadable? : boolean;
  }) {
    try {
      let queries = (args.endpoint.toString() === 'post' ? '?authorId' : '?raterId');
      queries += `=${selectedMember.toString()}`;
      if (args.isClosed !== undefined) {
        queries += `&isClosed=${args.isClosed}`;
      }
      if (args.isReadable !== undefined) {
        queries += `&isReadable=${args.isReadable}`;
      }

      const cookies = new Cookies(null, {
        path: "/",
      });
      const jwt = cookies.get("JWT");
      const fetchPromise = await fetch(
        `${serverAddress}/${args.endpoint.toString()}/number/${args.type}${queries}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (fetchPromise.ok) {
        const responseData = await fetchPromise.json();
        return responseData.number;
      }
    } catch (error) {
      console.error("Something went wrong: ", error);
    }
  }

  async function fetchMemberPosts(args: {
    endpoint: 'author' | 'detailed' | 'replypath';
    id: number;
  }) {
    try {
      const cookies = new Cookies(null, {
        path: "/",
      });
      const jwt = cookies.get("JWT");
      const fetchPromise = await fetch(
        `${serverAddress}/post/${args.endpoint}/${args.id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (fetchPromise.ok) {
        return await fetchPromise.json();
      }
    } catch (error) {
      console.error("Something went wrong: ", error);
    }
  }

  const handleToggleMemberBanishment = async () => {
    if (selectedMemberInfos.role === 'member') {
      const body: {
        id: number;
        is_banned: boolean;
      } = {
        id: selectedMember,
        is_banned: (!selectedMemberInfos.is_banned),
      };

      try {
        const cookies = new Cookies(null, {
          path: "/",
        });
        const jwt = cookies.get("JWT");
        const response = await fetch(`${serverAddress}/member`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          setSelectedMember(0);
          fetchAllTheMembers();
        }
      } catch (error) {
        console.error('Something went wrong: ', error);
      }
    }
  };

  useEffect(() => {
    if (selectedMember !== 0) {
      fetchMemberStatistics({ endpoint: 'post', type: 'all' }).then(
        (value) => { setMemberPublicationsNumber(value); });
      fetchMemberStatistics({ endpoint: 'rating', type: 'up' }).then(
        (value) => { setMemberUpvotedNumber(value); });
      fetchMemberStatistics({ endpoint: 'rating', type: 'down' }).then(
        (value) => { setMemberDownvotedNumber(value); });

      fetchMemberStatistics({ endpoint: 'post', type: 'question' }).then(
        (value) => { setMemberQuestionsNumber(value); });
      fetchMemberStatistics({ endpoint: 'post', type: 'question', isClosed: true }).then(
        (value) => { setMemberClosedQuestionsNumber(value); });
      fetchMemberStatistics({ endpoint: 'post', type: 'answer' }).then(
        (value) => { setMemberAnswersNumber(value); });
      fetchMemberStatistics({ endpoint: 'post', type: 'answer', isClosed: false, isReadable: false }).then(
        (value) => { setMemberDeletedAnswersNumber(value); });

      fetchMemberStatistics({ endpoint: 'post', type: 'topic' }).then(
        (value) => { setMemberTopicsNumber(value); });
      fetchMemberStatistics({ endpoint: 'post', type: 'topic', isClosed: true }).then(
        (value) => { setMemberClosedTopicsNumber(value); });
      fetchMemberStatistics({ endpoint: 'post', type: 'comment' }).then(
        (value) => { setMemberCommentsNumber(value); });
      fetchMemberStatistics({ endpoint: 'post', type: 'comment', isClosed: false, isReadable: false }).then(
        (value) => { setMemberDeletedCommentsNumber(value); });

      fetchMemberPosts({ endpoint: 'author', id: selectedMember }).then(
        (value) => { setSelectedMemberPublications(value); });
    }
  }, [selectedMember]);

  useEffect(() => {
    if (selectedPublication !== 0) {
      fetchMemberPosts({ endpoint: 'detailed', id: selectedPublication }).then(
        (value) => {
          setSelectedPublicationInfos(value);
          if (value.replies !== null) {
            let tmpLastId = 0;
            for (let reply of value.replies) {
              if (reply.id > tmpLastId) {
                tmpLastId = reply.id;
              }
            }
            fetchMemberPosts({ endpoint: 'detailed', id: tmpLastId }).then(
              (lastReplyValue) => {
                setSelectedPublicationLastReplyDate(lastReplyValue.creation_date);
              });
          }
          if (value.type === 'answer' || value.type === 'comment') {
            fetchMemberPosts({ endpoint: 'replypath', id: selectedPublication}).then(
              (replyTreeValue) => {
                setSelectedPublicationReplyTreeInfos(replyTreeValue);
              });
          }
        });
    } else {
      setSelectedPublicationInfos(null);
      setSelectedPublicationLastReplyDate(null);
      setSelectedPublicationReplyTreeInfos(null);
    }
  }, [selectedPublication])

  useEffect(() => {
    if (auth && auth.role && auth.role !== "administrator") {
      navigate("/");
    }
  }, [auth, navigate]);

  useEffect(() => {
    fetchAllTheMembers();
  }, []);

  return (
    <div className="flex flex-col gap-8 md:gap-6">
      <p className="mx-auto text-center text-indigo-500 text-2xl md:text-4xl font-semibold drop-shadow">
        {webcontent.page.title.content}
      </p>
      <div className="mx-auto h-8 md:h-10 md:w-full max-w-80 md:max-w-xl p-6 flex flex-row md:gap-1 bg-neutral-100 rounded-lg shadow-sm shadow-neutral-400 items-center justify-between">
        <label
          htmlFor="selectAMember"
          className="pl-4 md:pl-0 flex-1 xl:text-lg">
          {webcontent.page.fields.memberSelect.content}
        </label>
        {allTheMembers && (
          <select
            id="selectAMember"
            className="max-w-[60%] px-2 py-1 text-xs md:text-base mx-auto text-center bg-white cursor-pointer shadow-sm shadow-neutral-400 rounded-lg"
            onChange={(e) => handleSelectedMemberChange(e.target.value)}
            value={selectedMember}>
            <option value="">
              {webcontent.page.placeholders.memberSelect.content}
            </option>
            {allTheMembers.map((member, index) =>
              <option key={index} value={member.id}>
                {member[member.displayed_name ? 'displayed_name' : 'name']}
              </option> 
            )}
          </select>
        )}
      </div>

      {selectedMember !== 0 && (
      <div className="flex flex-row flex-wrap gap-6 p-6 xl:px-24 justify-evenly">
        
        <details className="w-full max-w-lg md:w-[45%] xl:max-w-xl"
          open={windowWidth >= maximumEffectiveDetailsWidth}>
          <summary className={(windowWidth >= maximumEffectiveDetailsWidth ? "hidden " : "" ) + "text-center md:text-lg py-1 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400"}>
            {webcontent.page.actions.informations.title.content}
          </summary>

          <div className="flex flex-col gap-6 w-full bg-neutral-100 mt-3 p-4 rounded-lg shadow-sm shadow-neutral-400">
            <div className="flex flex-col gap-1 md:gap-2">
              <p>
                {webcontent.page.informationsPrefixes.member.accountName.content} :{" "}
                <span>{selectedMemberInfos.name}</span>
              </p>
              <p>
                {webcontent.page.informationsPrefixes.member.inscriptionDate.content} :{" "}
                <span>{selectedMemberInfos.inscription_date}</span>
              </p>
              <p>
                {webcontent.page.informationsPrefixes.member.isBanned.content} :{" "}
                <span>{selectedMemberInfos.is_banned ?
                        webcontent.commons.boolean.yes.content :
                        webcontent.commons.boolean.no.content}</span>
              </p>
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <p>
                {webcontent.page.informationsPrefixes.member.publicationsNumber.content} :{" "}
                <span>{memberPublicationsNumber}</span>
              </p>
               <p>
                {webcontent.page.informationsPrefixes.member.upvotesNumber.content} :{" "}
                <span>{memberUpvotedNumber}</span>
              </p>
               <p>
                {webcontent.page.informationsPrefixes.member.downvotesNumber.content} :{" "}
                <span>{memberDownvotedNumber}</span>
              </p>
               <p>
                {webcontent.page.informationsPrefixes.member.favoritesNumber.content} :{" "}
                <span>{memberFavoritesNumber}</span>
              </p>
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <p>
                {webcontent.page.informationsPrefixes.member.questionsNumber.content} :{" "}
                <span>{memberQuestionsNumber}</span>
              </p>
              <p>
                {webcontent.page.informationsPrefixes.member.closedQuestionsNumber.content} :{" "}
                <span>{memberClosedQuestionsNumber}</span>
              </p>
              <p>
                {webcontent.page.informationsPrefixes.member.answersNumber.content} :{" "}
                <span>{memberAnswersNumber}</span>
              </p>
              <p>
                {webcontent.page.informationsPrefixes.member.deletedAnswersNumber.content} :{" "}
                <span>{memberDeletedAnswersNumber}</span>
              </p>
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <p>
                {webcontent.page.informationsPrefixes.member.topicsNumber.content} :{" "}
                <span>{memberTopicsNumber}</span>
              </p>
              <p>
                {webcontent.page.informationsPrefixes.member.closedTopicsNumber.content} :{" "}
                <span>{memberClosedTopicsNumber}</span>
              </p>
              <p>
                {webcontent.page.informationsPrefixes.member.commentsNumber.content} :{" "}
                <span>{memberCommentsNumber}</span>
              </p>
              <p>
                {webcontent.page.informationsPrefixes.member.deletedCommentsNumber.content} :{" "}
                <span>{memberDeletedCommentsNumber}</span>
              </p>
            </div>
          </div>
        </details>

        <details className="w-full max-w-lg md:w-[45%] xl:max-w-xl"
          open={windowWidth >= maximumEffectiveDetailsWidth}>
          <summary className={(windowWidth >= maximumEffectiveDetailsWidth ? "hidden " : "" ) + "text-center md:text-lg py-1 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400"}>
            {webcontent.page.actions.publications.title.content}
          </summary>

          <div className="flex flex-col gap-6 w-full bg-neutral-100 mt-3 p-4 rounded-lg shadow-sm shadow-neutral-400">
            <div className="flex flex-col gap-1 md:gap-2">

              <div className="mx-auto h-8 md:h-10 w-full p-6 flex flex-row md:gap-1 bg-white rounded-lg shadow-sm shadow-neutral-400 items-center justify-between">
                <label
                  htmlFor="selectAPublication"
                  className="md:pl-0 flex-1 xl:text-lg">
                  {webcontent.page.fields.publicationSelect.content}
                </label>
                {selectedMember !== 0 && (
                  <select
                    id="selectAPublication"
                    className="max-w-[60%] h-auto px-2 py-1 text-xs md:text-base mx-auto text-center bg-neutral-100 cursor-pointer shadow-sm shadow-neutral-400 rounded-lg"
                    onChange={(e) => handleSelectedPublicationChange(e.target.value)}
                    value={selectedPublication}>
                    <option value="">
                      {webcontent.page.placeholders.publicationSelect.content}
                    </option>
                    {selectedMemberPublications.length > 0 && (
                      selectedMemberPublications.map((publication, index) =>
                        <option key={index} value={publication.id}>
                          {publication[publication.title ? 'title' : 'content'].slice(0,25)}
                        </option> 
                      )
                    )}
                  </select>
                )}
              </div>

              {selectedPublicationInfos !== null && (
                <div className="flex flex-col gap-1 md:gap-2">
                  <div className="flex flex-row w-full justify-evenly">
                    <div className="w-[40%]">
                      {selectedPublicationInfos.tags.length > 0 && (
                        <div className="flex flex-col gap-2 mx-auto p-3 bg-white rounded-lg shadow-sm shadow-neutral-400">
                          <p className="text-center md:text-lg">
                            {webcontent.page.fields.associatedTags.content}
                          </p>
                          <div className="place-self-center gap-2 flex flex-wrap">
                            {selectedPublicationInfos.tags.map((tag) => (
                                <div key={tag.id} className="m-auto gap-1 flex">
                                  <img
                                    className="m-auto h-5 w-5 bg-neutral-100 rounded-lg"
                                    src={tag.icon}
                                  />
                                  <p className="m-auto text-sm md:text-base hidden md:flex">
                                    {tag.name}
                                  </p>
                                </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {(selectedPublicationInfos.type === 'answer' || selectedPublicationInfos.type === 'comment') && selectedPublicationReplyTreeInfos !== null && (
                        <div className="flex flex-col gap-2 mx-auto w-full p-3 px-1 bg-white rounded-lg shadow-sm shadow-neutral-400">
                          <p className="text-center"
                            dangerouslySetInnerHTML={{__html: (webcontent.page.fields.replyTo.content
                                                              .replace('{link_start}', `<a href="/postView?id=${selectedPublicationReplyTreeInfos.original_publication_id}">`)
                                                              .replace('{publication_id}', selectedPublicationReplyTreeInfos.direct_reply.id.toString())
                                                              .replace('{link_end}', '</a>'))
                          }}>
                          </p>
                          {selectedPublicationReplyTreeInfos.reply_depth > 1 &&(
                            <p className="text-center">
                              {webcontent.page.fields.replyDepth.content} :{" "}
                              <span>{selectedPublicationReplyTreeInfos.reply_depth}</span>
                            </p>
                          )}

                          <div className="justify-center gap-1 md:gap-2 flex flex-col md:flex-row">
                            
                            <div className="px-1 mx-auto md:mx-0 w-14 h-6 md:h-8 bg-green-300 self-end md:self-center gap-1 justify-center text-center rounded-full shadow-sm shadow-green-700 flex">
                              <svg
                                width="800px"
                                height="800px"
                                className="my-auto w-5 md:w-6 h-5 md:h-6 bg-transparent"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M15 11L12 8M12 8L9 11M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="my-auto">{selectedPublicationInfos.up_votes}</p>
                            </div>
                            <div className="px-1 mx-auto md:mx-0 w-14 h-6 md:h-8 bg-red-300 self-end md:self-center gap-1 justify-center text-center rounded-full shadow-sm shadow-red-700 flex">
                              <svg
                                width="800px"
                                height="800px"
                                className="my-auto w-5 md:w-6 h-5 md:h-6 bg-transparent"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M9 13L12 16M12 16L15 13M12 16V8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="my-auto">{selectedPublicationInfos.down_votes}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2 mx-auto w-[60%] p-3 bg-white rounded-lg shadow-sm shadow-neutral-400">
                      <p>
                        {webcontent.page.informationsPrefixes.publication.type.content} :{" "}
                        <span>{webcontent.commons.publicationTypes[selectedPublicationInfos.type].content}</span>
                      </p>
                      <p>
                        {webcontent.page.informationsPrefixes.publication.publicationDate.content} :{" "}
                        <span>{selectedPublicationInfos.creation_date}</span>
                      </p>
                      <p>
                        {webcontent.page.informationsPrefixes.publication.isReadable.content} :{" "}
                        <span>{selectedPublicationInfos.is_readable ?
                                webcontent.commons.boolean.yes.content :
                                webcontent.commons.boolean.no.content}</span>
                      </p>
                      {selectedPublicationInfos.title && (
                        <p>
                          {webcontent.page.informationsPrefixes.publication.isOpened.content} :{" "}
                          <span>{selectedPublicationInfos.is_opened ?
                                  webcontent.commons.boolean.yes.content :
                                  webcontent.commons.boolean.no.content}</span>
                        </p>
                      )}
                      {selectedPublicationInfos.results_length && (
                        <>
                          <p>
                            {webcontent.page.informationsPrefixes.publication.repliesNumber.content} :{" "}
                            <span>{selectedPublicationInfos.results_length}</span>
                          </p>
                          <p>
                            {webcontent.page.informationsPrefixes.publication.lastReplyDate.content} :{" "}
                            <span>{selectedPublicationLastReplyDate}</span>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 md:gap-2 mx-auto w-full p-3 bg-white rounded-lg shadow-sm shadow-neutral-400">
                    {selectedPublicationInfos.title !== null && (
                      <a
                        href={"/postView?id=" + selectedPublication}
                        className="mb-4 text-center text-indigo-500 text-xl md:text-3xl font-bold drop-shadow">
                        {selectedPublicationInfos.title}
                      </a>
                    )}
                    <p className="text-justify text-base md:text-lg"
                      dangerouslySetInnerHTML={{__html: (selectedPublicationInfos.content
                                                        .replace(/(<a href=")?((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))(">(.*)<\/a>)?/gi,
                                                          function () {
                                                            return (`<a href="${arguments[2]}" target="_blank">${(arguments[7] || arguments[2])}</a>`);
                                                          })
                                                        .split("\n")
                                                        .map((line: string, i: number) => `${line}<br key=${i} />`)
                                                        .join(""))
                    }}>
                    </p>
                    {selectedPublicationInfos.modification_author !== null && (
                      <div className="my-auto text-xs md:text-base">
                        {webcontent.page.fields.modificationNotification.content
                          .replace("{modification_date}",selectedPublicationInfos.modification_date)
                          .replace("{modification_author}",selectedPublicationInfos.modification_author)}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </details>

        <details className="w-full max-w-lg md:w-[45%] xl:max-w-xl"
          open={windowWidth >= maximumEffectiveDetailsWidth}>
          <summary className={(windowWidth >= maximumEffectiveDetailsWidth ? "hidden " : "" ) + "text-center md:text-lg py-1 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400"}>
            {webcontent.page.actions.banish.title.content}
          </summary>
          <div className="flex flex-col gap-6 w-full bg-neutral-100 mt-3 p-4 rounded-lg shadow-sm shadow-neutral-400">
            <p>
              {webcontent.page.banishmentMessages[selectedMemberInfos.role !== 'member' ? 'unbannable' : selectedMemberInfos.is_banned ? 'banned' : 'unbanned'].content
                .replace('{user_name_displayer}', (selectedMemberInfos.displayed_name ?
                  `"${selectedMemberInfos.displayed_name}" (${selectedMemberInfos.name})` :
                  selectedMemberInfos.name))
                .replace('{user_role}', webcontent.commons.roles[selectedMemberInfos.role].content.toLowerCase())
                .split("\n")
                .flatMap((line: string, i: number) => [line, <br key={i} />])
              }
            </p>
            {selectedMemberInfos.role === 'member' && (
              <button
                className="mx-auto py-1 px-4 md:px-8 text-center text-lg md:text-xl enabled:hover:text-white bg-indigo-400 enabled:hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 disabled:opacity-50"
                onClick={handleDisplayDeletionConfirmationWindow}
                title={webcontent.page.buttons[selectedMemberInfos.is_banned ? 'unban' : 'ban'].hover.content}>
                  {webcontent.page.buttons[selectedMemberInfos.is_banned ? 'unban' : 'ban'].text.content}
              </button>
            )}
          </div>
        </details>
      </div>
      )}
      {isActionConfirmWindowDisplayed && (
        <ActionConfirmationWindow
          setIsActionConfirmWindowDisplayed={setIsActionConfirmWindowDisplayed}
          handleConfirm={handleToggleMemberBanishment}
          warningMessage={webcontent.page.warnings[(selectedMemberInfos.is_banned ? 'unban' : 'ban') + 'ConfirmationAlert'].content.replace("{user_name_displayer}",
                                                                                      (selectedMemberInfos.displayed_name ?
                                                                                      `"${selectedMemberInfos.displayed_name}" (${selectedMemberInfos.name})` :
                                                                                      selectedMemberInfos.name))}
          webcontent={{buttons: {confirm: webcontent.page.buttons.confirm,
                                 cancel: webcontent.page.buttons.cancel}}}
        />
      )}
    </div>
  );
}
