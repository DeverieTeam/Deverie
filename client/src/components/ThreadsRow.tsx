import { useNavigate } from "react-router-dom";
import { threadsrowWebcontentType } from "../types/threadsrowWebcontentType";
import { useAuth } from "../contexts/useAuth";
import Cookies from "universal-cookie";

export default function ThreadsRow({
  post,
  setMemberId,
  setIsMemberViewWindowOpened,
  setIsConnectionNeededClicked,
  webcontent,
}: Props) {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleRowClick = () => {
    navigate({ pathname: "/postView", search: `?id=${post.id}` });
  };

  const handleFavButton = async (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (auth && auth.role !== "client" && auth.id) {
      const body: {
        id: number;
        addFav: { id: number };
      } = {
        id: post.id,
        addFav: { id: auth.id },
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
          //   const result = await response.json();
          //   console.log(result);
          window.location.reload();
        }
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    } else {
      setIsConnectionNeededClicked(true);
    }
  };

  const handleUnfavButton = async (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (auth && auth.role !== "client" && auth.id) {
      const body: {
        id: number;
        removeFav: { id: number };
      } = {
        id: post.id,
        removeFav: { id: auth.id },
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
          //   const result = await response.json();
          //   console.log(result);
          window.location.reload();
        }
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    }
  };

  const getfavourite = () => {
    if (auth && auth.id && post.is_favourited_by.includes(auth.id)) {
      return (
        <div
          title={webcontent.favourite.remove.hover.content}
          onClick={handleUnfavButton}
        >
          <img
            className="m-auto w-5 md:w-8 h-5 md:h-8 bg-transparent"
            src="/icons/favourite.png"
          />
        </div>
      );
    } else {
      return (
        <div
          title={webcontent.favourite.add.hover.content}
          onClick={handleFavButton}
        >
          <img
            className="m-auto w-5 md:w-8 h-5 md:h-8 bg-transparent"
            src="/icons/notFavourite.svg"
          />
        </div>
      );
    }
  };

  const handleMemberButton = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    setMemberId(post.author.id);
    setIsMemberViewWindowOpened(true);
  };

  return (
    <button
      className="bg-neutral-100 hover:bg-white gap-2 p-1 md:p-4 rounded-lg shadow-sm shadow-neutral-400 flex"
      onClick={handleRowClick}
    >
      <div className="w-[35%] justify-between gap-1 md:gap-2 flex flex-col">
        <div
          className="m-auto h-14 md:h-32 w-14 md:w-32 bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-neutral-500 flex"
          onClick={handleMemberButton}
        >
          <img
            className="m-auto h-12 md:h-[120px] w-12 md:w-[120px] rounded-full bg-transparent"
            src={post.author.profile_picture}
          />
        </div>
        <div className="text-center md:text-xl font-semibold text-indigo-500">
          {post.author.name}
        </div>
        <div className="w-[50px] md:w-[210px] place-self-center gap-2 flex flex-wrap">
          {post.tags.map((tag) => (
            <div key={tag.id} className="m-auto gap-1 flex">
              <img
                className="m-auto h-5 w-5 bg-neutral-100 rounded-lg"
                src={tag.icon}
              />
              <p className="m-auto text-sm hidden md:flex">{tag.name}</p>
            </div>
          ))}
        </div>
        <div className="text-center text-xs md:text-base">
          {webcontent.publishDatePrefix.content} : {post.creation_date}
        </div>
      </div>
      <div className="flex-1 justify-between gap-1 md:gap-2 flex flex-col">
        <div className="pt-2 md:pt-4 text-center text-lg md:text-2xl">
          {post.title}
        </div>
        <div className="flex">
          <div className="flex-1 justify-between flex flex-col">
            {!post.is_opened && (
              <div className="text-center text-xs md:text-base">
                {webcontent.closureText[post.type].content}
              </div>
            )}
            <div className="text-center text-xs md:text-base">
              {webcontent.numberOfResponses.content} : {post.replies_count}
            </div>
            <div className="text-center text-xs md:text-base">
              {webcontent.lastResponseDatePrefix.content} :{" "}
              {post.last_message_date}
            </div>
          </div>
          <div className="m-auto w-6 md:w-10 h-6 md:h-10 flex ">
            {getfavourite()}
          </div>
        </div>
      </div>
    </button>
  );
}

type Props = {
  post: {
    id: number;
    author: { id: number; name: string; profile_picture: string };
    tags: {
      id: number;
      name: string;
      icon: string;
    }[];
    creation_date: string;
    type: "topic" | "question";
    is_opened: boolean;
    is_favourited_by: number[];
    title: string;
    replies_count: number;
    last_message_date: string;
  };
  setMemberId: (arg0: number) => void;
  setIsMemberViewWindowOpened: (arg0: boolean) => void;
  setIsConnectionNeededClicked: (arg0: boolean) => void;
  webcontent: threadsrowWebcontentType;
};
