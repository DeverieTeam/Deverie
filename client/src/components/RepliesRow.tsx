import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import RepliesDisplayer from "./RepliesDisplayer";
import { postviewpageWebcontentType } from "../types/postviewpageWebcontentType";

export default function RepliesRow({ id, sort, webcontent }: Props) {
  const [data, setData] = useState<null | {
    id: number;
    author: {
      id: number;
      name: string;
      profile_picture: string;
    };
    creation_date: string;
    content: string;
    modification_date: string;
    modification_author: null | string;
    replies: null | { id: number }[];
  }>(null);

  const [areDetailsOpened, setAreDetailsOpened] = useState<boolean>(false);

  const { auth } = useAuth();

  useEffect(() => {
    const fetchType = `reply/${id}${sort ? `?sort=${sort}` : ""}`;

    fetch(`http://localhost:3000/post/${fetchType}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [id, sort]);

  const handleDetailsClick = () => {
    setAreDetailsOpened(!areDetailsOpened);
  };

  return (
    <div>
      <div className="w-full py-2 md:px-0 self-center gap-2 md:gap-4 flex flex-col">
        {data !== null && (
          <div className="bg-neutral-100 gap-2 p-1 md:p-4 rounded-lg shadow-sm shadow-neutral-400 flex flex-col">
            <button className="h-16 md:h-[104px] bg-neutral-200 px-1 hover:bg-white gap-2 md:gap-4 rounded-full shadow-sm shadow-neutral-500 flex">
              <img
                className="my-auto h-14 md:h-[96px] w-14 md:w-[96px] rounded-full shadow-sm shadow-neutral-500 bg-transparent"
                src={data.author.profile_picture}
              />
              <div className="my-auto text-center md:text-2xl font-semibold text-indigo-500">
                {data.author.name}
              </div>
              <div className="md:pr-2 flex-1 justify-center md:justify-end gap-1 md:gap-2 flex flex-col md:flex-row">
                <div className="px-1 mr-3 md:mr-0 w-14 h-6 md:h-8 bg-green-400 self-end md:self-center gap-1 hover:text-white justify-center text-center rounded-full shadow-sm shadow-green-700 flex">
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
                  <p className="my-auto">33</p>
                </div>
                <div className="px-1 mr-3 md:mr-0 w-14 h-6 md:h-8 bg-red-400 self-end md:self-center gap-1 hover:text-white justify-center text-center rounded-full shadow-sm shadow-red-700 flex">
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
                  <p className="my-auto">10</p>
                </div>
              </div>
            </button>
            <div className="justify-between gap-1 flex">
              <div className="self-start text-center text-xs md:text-base">
                {webcontent.commons.publications.publishDatePrefix.content} :{" "}
                {data.creation_date}
              </div>
            </div>
            <div className="md:py-2 text-justify text-base md:text-xl">
              {data.content}
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
                  auth.role === "moderator" ||
                  auth.role === "administrator") && (
                  <div className="flex-1 justify-end gap-2 flex">
                    <button className="w-7 md:w-8 h-7 md:h-8 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900">
                      <svg
                        width="800px"
                        height="800px"
                        className="m-auto w-5 md:w-6 h-5 md:h-6 bg-transparent"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button className="w-7 md:w-8 h-7 md:h-8 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900">
                      <svg
                        width="800px"
                        height="800px"
                        className="m-auto w-5 md:w-6 h-5 md:h-6 bg-transparent"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg">
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
        <div className="px-1 justify-between gap-2 md:px-0 md:max-w-[750px] md:mx-auto flex flex-col">
          <div className="justify-start gap-2 flex">
            <button className="px-4 py-0.5 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center text-base md:text-lg rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900">
              {webcontent.page.answerButton.content}
            </button>
          </div>
          {data.replies !== null && data.replies.length > 0 && (
            <details className="w-full mb-4 items-end flex flex-col">
              <summary
                className="w-60 md:w-72 md:text-lg py-1 pl-4 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400"
                onClick={handleDetailsClick}>
                {areDetailsOpened
                  ? `${webcontent.page.hideAnswers.content} (${data.replies.length})`
                  : `${webcontent.page.displayAnswers.content} (${data.replies.length})`}
              </summary>
              <div className="w-full flex flex-col">
                <RepliesDisplayer
                  repliesId={data.replies}
                  sort={sort}
                  webcontent={webcontent}
                />
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

type Props = {
  id: number;
  sort: string;
  webcontent: postviewpageWebcontentType;
};
