import { useEffect } from "react";
import ThreadsRow from "./ThreadsRow";

export default function ThreadsDisplayer({
  thread,
  data,
  setData,
  pagination,
  sort,
  searchField,
  tags,
}: Props) {
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
      case "topics":
        fetchType = "Topic" + queryHandler();
        break;
      case "questions":
        fetchType = "Question" + queryHandler();
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
      });
  }, [thread, setData, pagination, sort, searchField, tags]);

  return (
    <div className="w-full md:max-w-[750px] self-center gap-2 md:gap-4 flex flex-col">
      {data !== null &&
        data.length > 0 &&
        data.map((post) => <ThreadsRow key={post.id} post={post} />)}
      {data !== null && data.length === 0 && (
        <div className="text-2xl md:text-4xl text-center mt-8 font-semibold text-indigo-500 drop-shadow">
          Aucun résultat !!
        </div>
      )}
    </div>
  );
}

type Props = {
  thread: "popular" | "recent" | "topics" | "questions";
  data:
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
      }[];
  setData: (
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
  tags: string[];
};
