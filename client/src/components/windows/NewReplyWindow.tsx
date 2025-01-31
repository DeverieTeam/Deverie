import { useEffect, useState } from "react";
import { postViewPageWebcontentType } from "../../types/postViewPageWebcontentType";
import { useAuth } from "../../contexts/useAuth";
import Cookies from "universal-cookie";

export default function NewReplyWindow({
  setIsSelfOpened,
  data,
  setData,
  webcontent,
}: Props) {
  const serverAddress: string = import.meta.env.VITE_SERVER_ADDRESS;
  const { auth } = useAuth();
  
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (auth && auth.role && auth.role === "client") {
      setIsSelfOpened(false);
    }
  }, [auth, setIsSelfOpened]);

  const closeWindow = () => {
    setIsSelfOpened(false);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const buttonState = () => {
    if (auth && auth.role !== "client" && content.length > 3) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (auth && auth.id) {
      const body: {
        type: string;
        content: string;
        author: number;
        reply_to: number;
      } = {
        type: ((data.type === 'topic' || data.type === 'comment') ? 'comment' : 'answer'),
        content: content,
        author: auth.id,
        reply_to: data.id,
      };

      try {
        const cookies = new Cookies(null, {
          path: "/",
        });
        const jwt = cookies.get("JWT");
        const response = await fetch(`${serverAddress}/post/newReply`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          await response.json()
          .then((newReply) => {
            const tmpUpdatedData = data;
            if (!tmpUpdatedData.replies) {
              tmpUpdatedData.replies = [];
            }
            tmpUpdatedData.replies.unshift(newReply);
            tmpUpdatedData.results_length += 1;
            setData(tmpUpdatedData);
          });
          closeWindow();
        }
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    }
  };

  return (
    <div
      className="inset-0 absolute h-[120%] w-[100%] bg-gray-400/60 z-20 -translate-y-16"
      onClick={closeWindow}
    >
      <div className="h-[100%] w-[100%] relative">
        <div className="h-screen w-screen sticky top-16">
          <form
            className="mx-auto px-4 py-8 h-[430px] md:h-[500px] w-[290px] md:w-[500px] bg-neutral-50 translate-y-[35%] md:translate-y-[25%] xl:translate-y-[30%] justify-between rounded-lg shadow-sm shadow-gray-700 flex flex-col overflow-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onSubmit={handleSubmit}
          >
            <p className="text-center px-8 text-indigo-500 text-3xl md:text-4xl font-bold drop-shadow">
              {webcontent.page.answerButton.content}
            </p>
            <div className="flex flex-col">
              <p className="text-lg md:text-2xl">
                {webcontent.page.postContent.content}
              </p>
              <textarea
                className="px-4 py-2 mb-4 w-full resize-none focus:outline-none active:outline-none md:text-lg shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl"
                placeholder={webcontent.page.postContentPlaceholder.content}
                rows={8}
                value={content}
                onChange={handleContentChange}
              />
            </div>
            <div className="justify-center gap-4 md:gap-8 flex">
              <button
                className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                onClick={closeWindow}
                title={webcontent.commons.buttons.backButton.hover.content}
              >
                {webcontent.commons.buttons.backButton.text.content}
              </button>
              <input
                className="py-1 px-4 md:px-8 text-center text-lg md:text-xl enabled:hover:text-white bg-indigo-400 enabled:hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 disabled:opacity-50"
                disabled={buttonState()}
                type="submit"
                title={webcontent.commons.buttons.confirmButton.hover.content}
                value={webcontent.commons.buttons.confirmButton.text.content}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

type Props = {
  setIsSelfOpened: (arg0: boolean) => void;
  data: {
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
    is_favourited_by: null | number[];
    modification_date: string;
    modification_author: null | string;
    emergency: null | number;
    results_length: null | number;
    replies: null | { id: number }[];
  };
  setData: (
    arg0: null | {
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
      is_favourited_by: null | number[];
      modification_date: string;
      modification_author: null | string;
      emergency: null | number;
      results_length: null | number;
      replies: null | { id: number }[];
    }
  ) => void;
  webcontent: postViewPageWebcontentType;
};
