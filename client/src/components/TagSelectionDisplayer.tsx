import { useEffect, useState } from "react";
import { tagfilterdisplayerWebcontentType } from "../types/tagfilterdisplayerWebcontentType";
import TagSelectionChecker from "./TagSelectionChecker";

export default function TagSelectionDisplayer({
  tagFamily,
  tempTags,
  setTempTags,
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

  return (
    <details className="mb-6" open={tagFamily === "language"}>
      <summary className="w-48 md:w-56 md:text-lg py-1 pl-6 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400">
        {webcontent.tagsFamilies[tagFamily].content}
      </summary>

      <div className="md:px-4 mt-6 mb-4 gap-2 md:gap-4 justify-start flex flex-wrap">
        {data !== null &&
          data.map((tag) => (
            <TagSelectionChecker
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
  tempTags: {
    id: number;
    name: string;
    icon: string;
    family: string;
  }[];
  setTempTags: (
    arg0:
      | {
          id: number;
          name: string;
          icon: string;
          family: string;
        }[]
      | ((
          pv: {
            id: number;
            name: string;
            icon: string;
            family: string;
          }[]
        ) => {
          id: number;
          name: string;
          icon: string;
          family: string;
        }[])
  ) => void;
  webcontent: tagfilterdisplayerWebcontentType;
};
