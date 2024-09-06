import { useEffect, useState } from "react";
import ThreadsRow from "./ThreadsRow";
import { fakeData1, fakeData2 } from "../assets/fakedata";

export default function ThreadsDisplayer({ thread, webcontent }: Props) {
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
      }[]
  >(null);

  useEffect(() => {
    switch (thread) {
      case "topics":
      case "questions":
      case "popular":
        setData(fakeData1);
        break;
      case "recent":
        setData(fakeData2);
        break;
      default:
        break;
    }
  }, [thread]);

  return (
    <div className="w-full md:max-w-[750px] self-center gap-2 md:gap-4 flex flex-col">
      {data !== null &&
        data.map((post) => <ThreadsRow key={post.id} post={post} webcontent={webcontent} />)}
    </div>
  );
}

type Props = {
  thread: "popular" | "recent" | "topics" | "questions",
  webcontent: {
    publishDatePrefix: {
      name: string,
      content: string
    },
    numberOfResponses: {
      name: string,
      content: string
    },
    lastResponseDatePrefix: {
      name: string,
      content: string
    },
    favorite: {
      add: {
        hover: {
          name: string,
          content: string
        }
      },
      remove: {
        hover: {
          name: string,
          content: string
        }
      }
    }
  };
};
