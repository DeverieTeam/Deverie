import { useEffect, useState } from "react";
import ThreadsRow from "./ThreadsRow";
import { threadsdisplayerWebcontentType } from "../types/threadsdisplayerWebcontentType";

export default function ThreadsDisplayer({
  thread,
  pagination,
  sort,
  searchField,
  tags,
  webcontent,
  setDataForPage,
}: Props) {
  const [data, setData] = useState<
    | null
    | {
        id: number;
        author: {
          name: string;
          profile_picture: string;
        };
        tags: {
          id: number;
          name: string;
          icon: string;
        }[];
        creation_date: string;
        title: string;
        replies_count: number;
        last_message_date: string;
        results_length: null | number;
      }[]
  >(null);

  useEffect(() => {
    const queryHandler = () => {
      const queryArray = [];
      if (pagination !== 1) {
        queryArray.push(`page=${pagination}`);
      }
      if (sort) {
        queryArray.push(`sort=${sort}`);
      }
      if (searchField) {
        queryArray.push(`search=${searchField}`);
      }
      if (tags) {
        tags.map((item) => queryArray.push(`tags=${item}`));
      }
      if (queryArray.length > 0) {
        return `?${queryArray.join("&")}`;
      } else {
        return "";
      }
    };

    let fetchType: string;
    switch (thread) {
      case "topic":
        fetchType = "topic" + queryHandler();
        break;
      case "question":
        fetchType = "question" + queryHandler();
        break;
      case "popular":
        fetchType = "homepage?sort=popular";
        break;
      case "recent":
      default:
        fetchType = "homepage?sort=recent";
        break;
    }

    fetch(`http://localhost:3000/post/${fetchType}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        if (setDataForPage !== undefined) {
          setDataForPage(data);
        }
      });
  }, [thread, setData, setDataForPage, pagination, sort, searchField, tags]);

  return (
    <div className="w-full md:max-w-[750px] self-center gap-2 md:gap-4 flex flex-col">
      {data !== null &&
        data.length > 0 &&
        data.map((post) => (
          <ThreadsRow
            key={post.id}
            post={post}
            webcontent={webcontent.publications}
          />
        ))}
      {data !== null && data.length === 0 && (
        <div className="text-2xl md:text-4xl text-center mt-8 pb-[600px] md:pb-[800px] font-semibold text-indigo-500 drop-shadow">
          {webcontent.noResult.content}
        </div>
      )}
    </div>
  );
}

type Props = {
  thread: "popular" | "recent" | "topic" | "question";
  setDataForPage?: (
    arg0:
      | null
      | {
          id: number;
          author: {
            name: string;
            profile_picture: string;
          };
          tags: {
            id: number;
            name: string;
            icon: string;
          }[];
          creation_date: string;
          title: string;
          replies_count: number;
          last_message_date: string;
          results_length: null | number;
        }[]
  ) => void;
  pagination?: number;
  sort?: string;
  searchField?: string;
  tags?: string[];
  webcontent: threadsdisplayerWebcontentType;
};
