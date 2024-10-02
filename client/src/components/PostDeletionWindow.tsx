import { useEffect } from "react";
import { postviewpageWebcontentType } from "../types/postviewpageWebcontentType";
import { useAuth } from "../contexts/useAuth";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function PostDeletionWindow({
  setIsPostDeletionWindowOpened,
  setData,
  postType,
  postId,
  webcontent,
}: Props) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && auth.role && auth.role === "client") {
      setIsPostDeletionWindowOpened(false);
    }
  }, [auth, setIsPostDeletionWindowOpened]);

  const exitTagWindow = () => {
    setIsPostDeletionWindowOpened(false);
  };

  const handleDeleteButton = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (auth && auth.id && postId) {
      const body: {
        id: number;
        is_readable: boolean;
        modification_author: number;
      } = {
        id: postId,
        is_readable: false,
        modification_author: auth.id,
      };

      try {
        const cookies = new Cookies(null, {
          path: "/",
        });
        const jwt = cookies.get("JWT");
        const response = await fetch("http://localhost:3000/post", {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          if (postType === "thread") {
            navigate(-1);
          } else {
            setData(null);
            setIsPostDeletionWindowOpened(false);
          }
        }
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    }
  };

  return (
    <div
      className="absolute h-[120%] w-[100%] bg-gray-400/60 z-20 -translate-y-16"
      onClick={exitTagWindow}
    >
      <div className="h-[100%] w-[100%] relative">
        <div className="h-screen w-screen sticky top-16">
          <div
            className="mx-auto px-4 py-8 h-[430px] md:h-[500px] w-[290px] md:w-[500px] bg-neutral-50 translate-y-[35%] md:translate-y-[25%] xl:translate-y-[30%] justify-between rounded-lg shadow-sm shadow-gray-700 flex flex-col overflow-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <p className="text-center px-8 text-indigo-500 text-3xl md:text-4xl font-bold drop-shadow">
              {webcontent.page.deletionTitle.content}
            </p>
            <p className="mx-auto px-4 md:px-8 text-center text-xl md:text-3xl md:font-semibold">
              {webcontent.page.deletionConfirmMessage.content}
            </p>
            <div className="justify-center gap-4 md:gap-8 flex">
              <button
                className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                onClick={exitTagWindow}
                title={webcontent.commons.buttons.backButton.hover.content}
              >
                {webcontent.commons.buttons.backButton.text.content}
              </button>
              <button
                className="py-1 px-4 md:px-8 text-center text-lg md:text-xl enabled:hover:text-white bg-indigo-400 enabled:hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 disabled:opacity-50"
                onClick={handleDeleteButton}
                title={webcontent.commons.buttons.confirmButton.hover.content}
              >
                {webcontent.commons.buttons.confirmButton.text.content}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  setIsPostDeletionWindowOpened: (arg0: boolean) => void;
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
  postType: string;
  postId: number;
  webcontent: postviewpageWebcontentType;
};
