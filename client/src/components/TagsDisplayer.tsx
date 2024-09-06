import { useEffect, useState } from "react";
import { fakeTags1, fakeTags2, fakeTags3 } from "../assets/fakedata";

export default function TagsDisplayer({ tagFamily, webcontent }: Props) {
  const [data, setData] = useState<
    | null
    | {
        id: number;
        name: string;
        icon: string;
      }[]
  >(null);

  useEffect(() => {
    switch (tagFamily) {
      case "Langages":
        setData(fakeTags1);
        break;
      case "Environnements":
        setData(fakeTags2);
        break;
      case "Technologies":
        setData(fakeTags3);
        break;
      default:
        break;
    }
  }, [tagFamily]);

  return (
    <details open={tagFamily === "Langages" ? true : false}>
      <summary className="w-48 md:w-56 md:text-lg py-1 pl-6 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400">
        {webcontent.content}
      </summary>
      <div className="md:px-4 mt-6 mb-4 gap-2 md:gap-4 justify-between flex flex-wrap">
        {data !== null &&
          data.map((tag) => (
            <div key={tag.id} className="w-[120px] md:w-[132px] gap-1 flex">
              <input type="checkbox" checked />
              <img
                className="h-5 w-5 bg-neutral-100 rounded-lg"
                src={tag.icon}
              />
              <p className="text-sm md:text-base">{tag.name}</p>
            </div>
          ))}
      </div>
    </details>
  );
}

type Props = {
  tagFamily: "Langages" | "Environnements" | "Technologies";
  webcontent: {
    name: string,
    content: string
  };
};
