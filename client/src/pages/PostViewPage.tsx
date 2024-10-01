import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PostSortSelection from "../components/PostSortSelection";
import ConnectionNeeded from "../components/userAccount/ConnectionNeeded";
import ConnectionWindow from "../components/userAccount/ConnectionWindow";
import { useAuth } from "../contexts/useAuth";
import PostPagination from "../components/PostPagination";
import RepliesDisplayer from "../components/RepliesDisplayer";
import { postviewpageWebcontentType } from "../types/postviewpageWebcontentType";
import NewReplyWindow from "../components/NewReplyWindow";
import PostEditWindow from "../components/PostEditWindow";
import TagEditWindow from "../components/TagEditWindow";
import PostDeletionWindow from "../components/PostDeletionWindow";
import PostClosureWindow from "../components/PostClosureWindow";
import MemberViewWindow from "../components/MemberViewWindow";
import BanConfirmWindow from "../components/BanConfirmWindow";

export default function PostViewPage() {
  const [isNewReplyWindowOpened, setIsNewReplyWindowOpened] =
    useState<boolean>(false);
  const [isPostEditWindowOpened, setIsPostEditWindowOpened] =
    useState<boolean>(false);
  const [isPostDeletionWindowOpened, setIsPostDeletionWindowOpened] =
    useState<boolean>(false);
  const [isTagEditWindowOpened, setIsTagEditWindowOpened] =
    useState<boolean>(false);
  const [isPostClosureWindowOpened, setIsPostClosureWindowOpened] =
    useState<boolean>(false);
  const [isConnectionNeededClicked, setIsConnectionNeededClicked] =
    useState<boolean>(false);
  const [isConnectionWindowDisplayed, setIsConnectionWindowDisplayed] =
    useState<boolean>(false);
  const [isMemberViewWindowOpened, setIsMemberViewWindowOpened] =
    useState<boolean>(false);
  const [isBanConfirmWindowOpened, setIsBanConfirmWindowOpened] =
    useState<boolean>(false);

  const [data, setData] = useState<null | {
    id: number;
    author: {
      id: number;
      name: string;
      profile_picture: string;
      is_banned: boolean;
      role: "member" | "moderator" | "administrator";
    };
    tags: {
      id: number;
      name: string;
      icon: string;
    }[];
    creation_date: string;
    type: "topic" | "question";
    title: string;
    content: string;
    is_opened: boolean;
    is_readable: boolean;
    modification_date: string;
    modification_author: null | string;
    emergency: null | number;
    results_length: null | number;
    replies: null | { id: number }[];
  }>(null);
  const [pagination, setPagination] = useState<number>(1);
  const [sort, setSort] = useState<string>("popular");
  const [sourcePostId, setSourcePostId] = useState<null | number>(null);
  const [postId, setPostId] = useState<null | number>(null);
  const [postContent, setPostContent] = useState<null | string>(null);
  const [postType, setPostType] = useState<null | string>(null);
  const [postIsOpened, setPostIsOpened] = useState<null | boolean>(null);
  const [memberId, setMemberId] = useState<null | number>(null);

  const webcontent = useLoaderData() as postviewpageWebcontentType;

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();
  const { auth } = useAuth();

  const getPreviousTags = () => {
    if (data) {
      const previousTags = [];
      for (const tag of data.tags) {
        const newTag = { ...tag, family: "" };
        previousTags.push(newTag);
      }
      return previousTags;
    } else {
      return [
        {
          id: 0,
          name: "",
          icon: "",
          family: "",
        },
      ];
    }
  };

  const handleReplyButton = () => {
    if (data && auth !== undefined && auth.role !== "client") {
      setSourcePostId(data.id);
      setIsNewReplyWindowOpened(true);
    } else {
      setIsConnectionNeededClicked(true);
    }
  };

  const handleEditButton = () => {
    if (data && auth !== undefined && auth.role !== "client") {
      setPostId(data.id);
      setPostContent(data.content);
      setIsPostEditWindowOpened(true);
    }
  };

  const handleTagEditButton = () => {
    if (data && auth !== undefined && auth.role !== "client") {
      setPostId(data.id);
      setIsTagEditWindowOpened(true);
    }
  };

  const handleDeleteButton = () => {
    if (data && auth !== undefined && auth.role !== "client") {
      setPostId(data.id);
      setPostType("thread");
      setIsPostDeletionWindowOpened(true);
    }
  };

  const handleClosureButton = () => {
    if (data && auth !== undefined && auth.role !== "client") {
      setPostId(data.id);
      setIsPostClosureWindowOpened(true);
    }
  };

  const handleMemberButton = () => {
    if (data) {
      setMemberId(data.author.id);
      setIsMemberViewWindowOpened(true);
    }
  };

  useEffect(() => {
    if (query !== null) {
      const queryHandler = () => {
        const queryArray = [];
        if (pagination !== 1) {
          queryArray.push(`page=${pagination}`);
        }
        if (sort) {
          queryArray.push(`sort=${sort}`);
        }
        if (queryArray.length > 0) {
          return `?${queryArray.join("&")}`;
        } else {
          return "";
        }
      };

      const fetchType = `detailed/${query}` + queryHandler();

      fetch(`http://localhost:3000/post/${fetchType}`)
        .then((response) => {
          if (!response.ok) {
            navigate(-1);
            throw new Error("Something went wrong");
          }
          return response.json();
        })
        .then((data) => {
          if (data.author.is_banned || !data.is_readable) {
            navigate(-1);
          } else {
            setData(data);
          }
        });
    } else {
      navigate(-1);
    }
  }, [pagination, sort, query, navigate]);

  useEffect(() => {
    if (data && postIsOpened === null) {
      setPostIsOpened(data.is_opened);
    }
  }, [data, postIsOpened]);

  return (
    <div className="w-full relative flex flex-col pb-48">
      <div className="w-full md:max-w-[750px] md:mx-auto px-1 md:px-0 gap-6 xl:gap-10 flex flex-col">
        <p className="mx-auto mt-4 text-center text-indigo-500 text-xl md:text-3xl font-bold drop-shadow">
          {data && data.title}
        </p>
        <div className="gap-2 justify-between flex flex-row">
          <div className="mb-1 w-[130px] md:w-[240px] py-1 px-1 justify-between gap-2 bg-neutral-100 rounded-lg shadow-sm shadow-neutral-400 relative flex flex-col">
            <p className="text-center md:text-lg">
              {webcontent.page.associatedTags.content}
            </p>
            <div className="w-[50px] md:w-[210px] flex-1 place-self-center gap-2 flex flex-wrap">
              {data &&
                data.tags.map((tag) => (
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
            {auth &&
              data &&
              ((auth.id && auth.id === data.author.id) ||
                auth.role === "moderator" ||
                auth.role === "administrator") && (
                <button
                  className="absolute right-0 w-7 md:w-8 h-7 md:h-8 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 translate-x-[36px] md:translate-x-[40px]"
                  onClick={handleTagEditButton}
                >
                  <svg
                    width="800px"
                    height="800px"
                    className="m-auto w-5 md:w-6 h-5 md:h-6
                bg-transparent"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
          </div>
          <div className="gap-2 xl:gap-4 justify-between flex flex-col">
            <button className="self-end mb-1 md:w-56 py-1 px-1 text-center justify-center text-lg gap-2 bg-neutral-100 hover:bg-white rounded-lg shadow-sm shadow-neutral-400 flex">
              <p className="text-sm md:text-base">
                {webcontent.page.addingFavourite.content}
              </p>
              <img
                className="my-auto w-5 md:w-6 h-5 md:h-6 bg-transparent"
                src="/icons/notFavourite.svg"
                title={
                  webcontent.commons.publications.favourite.add.hover.content
                }
              />
            </button>
            <PostSortSelection
              setSort={setSort}
              webcontent={webcontent.commons.searching.sortFilter}
            />
          </div>
        </div>
      </div>
      <div className="w-full md:max-w-[750px] px-1 py-2 md:px-0 self-center gap-2 md:gap-4 flex flex-col">
        {data !== null && (
          <div className="bg-neutral-100 gap-2 p-1 md:p-4 rounded-lg shadow-sm shadow-neutral-400 flex flex-col">
            <button
              className="h-16 md:h-[104px] bg-neutral-200 px-1 hover:bg-white gap-4 rounded-full shadow-sm shadow-neutral-500 flex"
              onClick={handleMemberButton}
            >
              <img
                className="my-auto h-14 md:h-[96px] w-14 md:w-[96px] rounded-full shadow-sm shadow-neutral-500 bg-transparent"
                src={data.author.profile_picture}
              />
              <div className="my-auto text-center md:text-2xl font-semibold text-indigo-500">
                {data.author.name}
              </div>
            </button>
            <div className="justify-between gap-1 flex">
              <div className="self-start text-center text-xs md:text-base">
                {webcontent.commons.publications.publishDatePrefix.content}
                {" : "}
                {data.creation_date}
              </div>
              {data.emergency !== null && (
                <div className="text-center text-xs md:text-base">
                  {webcontent.page.questionEmergency.content}
                  {" : "}
                  {data.emergency}
                </div>
              )}
            </div>
            <div className="md:py-2 text-justify text-base md:text-xl">
              {data.content
                .split("\n")
                .flatMap((line: string, i: number) => [line, <br key={i} />])}
            </div>
            <div className="justify-between flex">
              {data.modification_author !== null && (
                <div className="my-auto text-center text-xs md:text-base">
                  {webcontent.page.modificationNotification.content}{" "}
                  {data.modification_date}{" "}
                  {webcontent.page.modificationSuffix.content}{" "}
                  {data.modification_author}
                </div>
              )}
              {auth &&
                data &&
                ((auth.id && auth.id === data.author.id) ||
                  ((auth.role === "moderator" ||
                    auth.role === "administrator") &&
                    data.author.role !== "moderator" &&
                    data.author.role !== "administrator")) && (
                  <div className="flex-1 justify-end gap-2 flex">
                    <button
                      className="w-7 md:w-8 h-7 md:h-8 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                      onClick={handleEditButton}
                    >
                      <svg
                        width="800px"
                        height="800px"
                        className="m-auto w-5 md:w-6 h-5 md:h-6 bg-transparent"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      className="w-7 md:w-8 h-7 md:h-8 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                      onClick={handleDeleteButton}
                    >
                      <svg
                        width="800px"
                        height="800px"
                        className="m-auto w-5 md:w-6 h-5 md:h-6 bg-transparent"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="currentColor"
                          d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
      {data !== null && (
        <div className="w-full px-1 justify-between md:px-0 md:max-w-[750px] md:mx-auto flex">
          {!data.is_opened && (
            <p>
              {webcontent.commons.publications.closureText[data.type].content}
            </p>
          )}
          {auth &&
            data &&
            data.is_opened &&
            ((auth.id && auth.id === data.author.id) ||
              ((auth.role === "moderator" || auth.role === "administrator") &&
                data.author.role !== "moderator" &&
                data.author.role !== "administrator")) && (
              <button
                className="mb-1 py-1 px-2 md:px-4 text-center justify-center text-lg md:text-xl gap-2 bg-neutral-100 hover:bg-white rounded-lg shadow-sm shadow-neutral-400 flex"
                onClick={handleClosureButton}
              >
                <p className="text-sm md:text-base">
                  {webcontent.page.closureButton[data.type].content}
                </p>
              </button>
            )}
          <div className="flex-1 justify-end gap-2 flex">
            {auth &&
              data &&
              data.is_opened &&
              (auth.role === "client" ||
                (auth.id && auth.id !== data.author.id)) && (
                <button
                  className="px-4 py-0.5 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center text-base md:text-lg rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                  onClick={handleReplyButton}
                >
                  {webcontent.page.answerButton.content}
                </button>
              )}
          </div>
        </div>
      )}
      {data !== null &&
        data.replies !== null &&
        data.replies.length > 0 &&
        postIsOpened !== null && (
          <div className="w-full mr-1 mt-2 md:mr-0 self-center items-end md:max-w-[750px] flex flex-col">
            <div className="w-[90%] flex flex-col">
              <RepliesDisplayer
                repliesId={data.replies}
                sort={sort}
                setSourcePostId={setSourcePostId}
                setIsNewReplyWindowOpened={setIsNewReplyWindowOpened}
                setIsConnectionNeededClicked={setIsConnectionNeededClicked}
                setPostId={setPostId}
                setPostContent={setPostContent}
                setIsPostEditWindowOpened={setIsPostEditWindowOpened}
                setPostType={setPostType}
                setIsPostDeletionWindowOpened={setIsPostDeletionWindowOpened}
                postIsOpened={postIsOpened}
                setMemberId={setMemberId}
                setIsMemberViewWindowOpened={setIsMemberViewWindowOpened}
                webcontent={webcontent}
              />
            </div>
          </div>
        )}
      {data !== null && data.replies !== null && data.replies.length > 0 && (
        <div className="w-full px-1 mt-6 md:px-0 md:max-w-[750px] md:mx-auto flex flex-col">
          <PostPagination
            data={data}
            pagination={pagination}
            setPagination={setPagination}
            webcontent={webcontent.commons.pagination}
          />
        </div>
      )}
      {data && sourcePostId && isNewReplyWindowOpened && (
        <NewReplyWindow
          setIsNewReplyWindowOpened={setIsNewReplyWindowOpened}
          sourcePostType={data.type}
          sourcePostId={sourcePostId}
          webcontent={webcontent}
        />
      )}
      {data && postId && postContent && isPostEditWindowOpened && (
        <PostEditWindow
          setIsPostEditWindowOpened={setIsPostEditWindowOpened}
          postId={postId}
          previousContent={postContent}
          webcontent={webcontent}
        />
      )}
      {postId && postType && isPostDeletionWindowOpened && (
        <PostDeletionWindow
          setIsPostDeletionWindowOpened={setIsPostDeletionWindowOpened}
          postType={postType}
          postId={postId}
          webcontent={webcontent}
        />
      )}
      {postId && isPostClosureWindowOpened && (
        <PostClosureWindow
          setIsPostClosureWindowOpened={setIsPostClosureWindowOpened}
          postId={postId}
          webcontent={webcontent}
        />
      )}
      {data && postId && isTagEditWindowOpened && (
        <TagEditWindow
          setIsTagEditWindowOpened={setIsTagEditWindowOpened}
          postId={postId}
          previousTags={getPreviousTags()}
          webcontent={{
            buttons: webcontent.commons.buttons,
            tagsFamilies: webcontent.commons.tagsFamilies,
            tagNumberDisclaimer: webcontent.page.tagNumberDisclaimer,
          }}
        />
      )}
      {isConnectionWindowDisplayed && (
        <ConnectionWindow
          setIsConnectionWindowDisplayed={setIsConnectionWindowDisplayed}
          webcontent={{
            hypertexts: webcontent.commons.hypertexts,
            buttons: webcontent.commons.buttons,
            connection: webcontent.commons.connection,
          }}
        />
      )}
      {isConnectionNeededClicked && (
        <ConnectionNeeded
          setIsConnectionNeededClicked={setIsConnectionNeededClicked}
          setIsConnectionWindowDisplayed={setIsConnectionWindowDisplayed}
          webcontent={{
            hypertexts: webcontent.commons.hypertexts,
            connection: webcontent.commons.connection,
          }}
        />
      )}
      {isMemberViewWindowOpened && memberId && (
        <MemberViewWindow
          setIsMemberViewWindowOpened={setIsMemberViewWindowOpened}
          setIsBanConfirmWindowOpened={setIsBanConfirmWindowOpened}
          memberId={memberId}
          webcontent={webcontent.commons.memberWindow}
        />
      )}
      {isBanConfirmWindowOpened && memberId && (
        <BanConfirmWindow
          setIsBanConfirmWindowOpened={setIsBanConfirmWindowOpened}
          memberId={memberId}
          webcontent={webcontent.commons}
        />
      )}
    </div>
  );
}
