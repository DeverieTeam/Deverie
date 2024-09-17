import { useEffect, useState } from "react";
import TagFilterChecker from "./TagFilterChecker";
import { tagfilterdisplayerWebcontentType } from "../types/tagfilterdisplayerWebcontentType";

export default function TagFilterDisplayer({
  tagFamily,
  tempTags,
  setTempTags,
  langTags,
  envTags,
  technoTags,
  webcontent,
}: Props) {
  const [data, setData] = useState<
    | null
    | {
        id: number;
        name: string;
        icon: string;
        family: string;
      }[]
  >(null);

  useEffect(() => {
    fetch(`http://localhost:3000/tag/${tagFamily}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [tagFamily]);

  const handleAddAll = () => {
    let array: string[];

    switch (tagFamily) {
      case "technology":
        array = technoTags;
        break;
      case "environment":
        array = envTags;
        break;
      case "language":
      default:
        array = langTags;
        break;
    }
    for (const tag of array) {
      if (!tempTags.includes(tag)) {
        setTempTags((pv) => pv.concat([tag]));
      }
    }
  };

  const handleRemoveAll = () => {
    let array: string[];

    switch (tagFamily) {
      case "technology":
        array = technoTags;
        break;
      case "environment":
        array = envTags;
        break;
      case "language":
      default:
        array = langTags;
        break;
    }

    for (const tag of array) {
      if (tempTags.includes(tag)) {
        setTempTags((pv) => pv.filter((item: string) => item !== tag));
      }
    }
  };

  return (
    <details className="mb-6" open={tagFamily === "language"}>
      <summary className="w-48 md:w-56 md:text-lg py-1 pl-6 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400">
        {webcontent.tagsFamilies[tagFamily].content}
      </summary>
      <div className="justify-start mt-2 md:mt-4 gap-2 md:gap-4 flex">
        <button
          className="text-sm md:text-base px-1 md:px-2 py-1 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400"
          onClick={handleAddAll}
          title={
            webcontent.buttons.checkShortcuts.addEntireSection.hover.content
          }
        >
          {webcontent.buttons.checkShortcuts.addEntireSection.text.content}
        </button>
        <button
          className="text-sm md:text-base px-2 py-1 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400"
          onClick={handleRemoveAll}
          title={
            webcontent.buttons.checkShortcuts.removeEntireSection.hover.content
          }
        >
          {webcontent.buttons.checkShortcuts.removeEntireSection.text.content}
        </button>
      </div>
      <div className="md:px-4 mt-6 mb-4 gap-2 md:gap-4 justify-start flex flex-wrap">
        {data !== null &&
          data.map((tag) => (
            <TagFilterChecker
              tag={tag}
              tempTags={tempTags}
              setTempTags={setTempTags}
              key={tag.id}
            />
          ))}
      </div>
    </details>
  );
}

type Props = {
  tagFamily: "language" | "environment" | "technology";
  tempTags: string[];
  setTempTags: (arg0: string[] | ((pv: string[]) => string[])) => void;
  langTags: string[];
  envTags: string[];
  technoTags: string[];
  webcontent: tagfilterdisplayerWebcontentType;
};
