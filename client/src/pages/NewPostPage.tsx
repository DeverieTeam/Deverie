import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { newpostpageWebcontentType } from "../types/newpostpageWebcontentType";
import TagSelectionWindow from "../components/TagSelectionWindow";
import Cookies from "universal-cookie";
import { useAuth } from "../contexts/useAuth";

export default function NewPostPage({ threadType }: Props) {
  const webcontent = useLoaderData() as newpostpageWebcontentType;

  const navigate = useNavigate();
  const { auth } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<
    | null
    | {
        id: number;
        name: string;
        icon: string;
        family: string;
      }[]
  >(null);
  const [emergency, setEmergency] = useState<string>("0");
  const [isTagButtonClicked, setIsTagButtonClicked] = useState<boolean>(false);
  const [isTitleConflictOn, setIsTitleConflictOn] = useState<boolean>(false);

  useEffect(() => {
    if (auth && auth.role && auth.role === "client") {
      navigate("/");
    }
  }, [auth, navigate]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleEmergencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      typeof parseInt(e.target.value) === "number" &&
      !isNaN(parseInt(e.target.value))
    ) {
      if (parseInt(e.target.value) > 7) {
        setEmergency("7");
      } else if (parseInt(e.target.value) < 0) {
        setEmergency("0");
      } else {
        setEmergency(e.target.value);
      }
    } else {
      setEmergency("0");
      e.target.value = "0";
    }
  };

  const handleTagSelectionButton = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTagButtonClicked(!isTagButtonClicked);
  };

  const handleReturnButton = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(-1);
  };

  const buttonState = () => {
    if (
      auth &&
      auth.role !== "client" &&
      title.length > 3 &&
      title.length <= 255 &&
      content.length > 3 &&
      tags &&
      tags.length > 0 &&
      tags.length < 5
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    if (auth && auth.id) {
      let body: {
        type: string;
        title: string;
        content: string;
        author: number;
        tags?: { id: number }[];
        emergency?: number;
      } = {
        type: threadType,
        title: title,
        content: content,
        author: auth.id,
      };

      if (tags) {
        const bodyTags = [];
        for (const tag of tags) {
          bodyTags.push({ id: tag.id });
        }
        body = { ...body, tags: bodyTags };
      }

      if (
        typeof parseInt(emergency) === "number" &&
        parseInt(emergency) >= 1 &&
        parseInt(emergency) <= 7
      ) {
        body = { ...body, emergency: parseInt(emergency) };
      }

      try {
        const cookies = new Cookies(null, {
          path: "/",
        });
        const jwt = cookies.get("JWT");
        const response = await fetch("http://localhost:3000/post/newThread", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const result = await response.json();
          navigate(`/${threadType}`);
        } else {
          setIsTitleConflictOn(true);
          setTitle("");
          setTimeout(() => {
            setIsTitleConflictOn(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    }
  };

  return (
    <div className="w-full relative flex flex-col">
      <form
        className="w-full md:max-w-[750px] md:mx-auto px-4 pb-12 md:px-0 gap-2 xl:gap-4 flex flex-col"
        onSubmit={handleSubmit}
      >
        <p className="mx-auto my-4 text-center text-indigo-500 text-4xl md:text-5xl font-bold drop-shadow">
          {webcontent.page.title[threadType].content}
        </p>
        <p className="text-lg md:text-2xl">
          {webcontent.page.postTitle.content}
        </p>
        <textarea
          className="px-4 py-2 mb-4 w-full resize-none focus:outline-none active:outline-none md:text-lg shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl"
          placeholder={webcontent.page.postTitlePlaceholder.content}
          maxLength={255}
          rows={4}
          value={title}
          onChange={handleTitleChange}
        />
        <p className="text-lg md:text-2xl">
          {webcontent.page.postContent.content}
        </p>
        <textarea
          className="px-4 py-2 mb-4 w-full resize-none focus:outline-none active:outline-none md:text-lg shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl"
          placeholder={webcontent.page.postContentPlaceholder.content}
          rows={10}
          value={content}
          onChange={handleContentChange}
        />
        <button
          className="w-64 md:w-72 py-1 px-4 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
          onClick={handleTagSelectionButton}
        >
          {webcontent.page.tagsButton.content}
        </button>
        <div className="px-6 py-4 mt-2 mb-4 w-full h-20 md:h-14 justify-center shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl flex flex-wrap">
          {tags &&
            tags.map((tag) => (
              <div
                key={tag.id}
                className="w-[120px] md:w-[132px] justify-center gap-1 flex"
              >
                <img
                  className="my-auto h-5 w-5 bg-neutral-100 rounded-lg"
                  src={tag.icon}
                />
                <p className="md:text-lg self-center">{tag.name}</p>
              </div>
            ))}
        </div>
        {threadType === "question" && (
          <div className=" justify-between flex">
            <p className="my-auto text-sm md:text-lg flex-1">
              {webcontent.page.emergency.content}
            </p>
            <input
              className="h-8 w-16 pl-4 pr-2 py-2 focus:outline-none active:outline-none md:text-lg shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl"
              type="number"
              min={0}
              max={7}
              value={emergency}
              onChange={handleEmergencyChange}
            />
          </div>
        )}
        {isTitleConflictOn && (
          <div className="w-[100%] text-center text-sm md:text-lg md:text-base text-red-700 justify-center items-center">
            {webcontent.page.titleConflict.content}
          </div>
        )}
        <div className="mt-6 justify-center gap-8 flex">
          <button
            className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
            onClick={handleReturnButton}
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
      {isTagButtonClicked && (
        <TagSelectionWindow
          isTagButtonClicked={isTagButtonClicked}
          setIsTagButtonClicked={setIsTagButtonClicked}
          tags={tags}
          setTags={setTags}
          webcontent={{
            buttons: webcontent.commons.buttons,
            tagsFamilies: webcontent.commons.tagsFamilies,
            tagNumberDisclaimer: webcontent.page.tagNumberDisclaimer,
          }}
        />
      )}
    </div>
  );
}

type Props = {
  threadType: "topic" | "question";
};
