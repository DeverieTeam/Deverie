import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { newpostpageWebcontentType } from "../types/newpostpageWebcontentType";
import TagSelectionWindow from "../components/TagSelectionWindow";

export default function NewPostPage({ threadType }: Props) {
  const webcontent = useLoaderData() as newpostpageWebcontentType;

  const navigate = useNavigate();
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
  const [emergency, setEmergency] = useState<"" | number>("");
  const [isTagButtonClicked, setIsTagButtonClicked] = useState<boolean>(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleEmergencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof parseInt(e.target.value) === "number") {
      if (parseInt(e.target.value) > 7) {
        setEmergency(7);
      } else if (parseInt(e.target.value) < 1) {
        setEmergency(1);
      } else {
        setEmergency(parseInt(e.target.value));
      }
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

  const handleConfirmButton = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full relative flex flex-col">
      <form className="w-full md:max-w-[750px] md:mx-auto px-4 pb-12 md:px-0 gap-2 xl:gap-4 flex flex-col">
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
                  className="h-5 w-5 bg-neutral-100 rounded-lg"
                  src={tag.icon}
                />
                <p className="md:text-lg">{tag.name}</p>
              </div>
            ))}
        </div>
        {threadType === "question" && (
          <div className=" justify-between flex">
            <p className="my-auto text-sm md:text-lg flex-1">
              {webcontent.page.emergency.content}
            </p>
            <input
              className="h-8 w-16 px-4 py-2 focus:outline-none active:outline-none md:text-lg shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl"
              type="number"
              min={1}
              max={7}
              value={emergency}
              onChange={handleEmergencyChange}
            />
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
          <button
            className="py-1 px-4 md:px-8 text-center text-lg md:text-xl enabled:hover:text-white bg-indigo-400 enabled:hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 disabled:opacity-50"
            onClick={handleConfirmButton}
            disabled={buttonState()}
            title={webcontent.commons.buttons.confirmButton.hover.content}
          >
            {webcontent.commons.buttons.confirmButton.text.content}
          </button>
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
