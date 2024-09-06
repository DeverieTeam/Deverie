import { useEffect, useState } from "react";
import TagChecker from "./TagChecker";

export default function TagsDisplayer({
  tagFamily,
  tempTags,
  setTempTags,
  langTags,
  envTags,
  technoTags,
  webcontent
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
    let family: string;

    switch (tagFamily) {
      case "Technologies":
        family = "Technology";
        break;
      case "Environnements":
        family = "Environment";
        break;
      case "Langages":
      default:
        family = "Language";
        break;
    }

    fetch(`http://localhost:3000/tag/${family}`)
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
      case "Technologies":
        array = technoTags;
        break;
      case "Environnements":
        array = envTags;
        break;
      case "Langages":
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
      case "Technologies":
        array = technoTags;
        break;
      case "Environnements":
        array = envTags;
        break;
      case "Langages":
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
    <details className="mb-6" open={tagFamily === "Langages"}>
      <summary className="w-48 md:w-56 md:text-lg py-1 pl-6 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400">
        {webcontent.content}
      </summary>
      <div className="justify-start mt-2 md:mt-4 gap-2 md:gap-4 flex">
        <button
          className="text-sm md:text-base px-1 md:px-2 py-1 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400"
          onClick={handleAddAll}
        >
          Ajouter tout
        </button>
        <button
          className="text-sm md:text-base px-2 py-1 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400"
          onClick={handleRemoveAll}
        >
          Enlever tout
        </button>
      </div>
      <div className="md:px-4 mt-6 mb-4 gap-2 md:gap-4 justify-start flex flex-wrap">
        {data !== null &&
          data.map((tag) => (
            <TagChecker
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
  tagFamily: string;
  tempTags: string[];
  setTempTags: (arg0: string[] | ((pv: string[]) => string[])) => void;
  langTags: string[];
  envTags: string[];
  technoTags: string[];
    webcontent: {
    name: string,
    content: string
  };
};
