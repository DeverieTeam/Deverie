import { useState } from "react";
import ThreadsDisplayer from "../components/ThreadsDisplayer";
import TagsWindow from "../components/TagsWindow";
import Pagination from "../components/Pagination";
import SortSelection from "../components/SortSelection";
import SearchField from "../components/SearchField";

export default function ThreadsPage({ threadType }: Props) {
  const [isTagButtonClicked, setIsTagButtonClicked] = useState<boolean>(false);

  const handleTagFilterButton = () => {
    setIsTagButtonClicked(!isTagButtonClicked);
  };

  return (
    <div className="w-full relative flex flex-col">
      <div className="w-full md:max-w-[750px] md:mx-auto px-1 md:px-0 gap-6 xl:gap-10 flex flex-col">
        <p className="mx-auto mt-4 text-center text-indigo-500 text-4xl md:text-5xl font-bold drop-shadow">
          {threadType === "topics" ? "Forums" : "Questions"}
        </p>
        <div className="mx-auto w-72 py-2 px-4 bg-neutral-100 gap-4 rounded-lg shadow-sm shadow-neutral-400 flex flex-row">
          <button className="w-12 h-12 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center text-5xl rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 font-semibold relative">
            +
          </button>
          <p className="m-auto flex-1 text-center text-lg">
            {threadType === "topics"
              ? "Créer un Nouveau Sujet de Forum"
              : "Créer une Nouvelle Question"}
          </p>
        </div>
        <div className="gap-6 xl:gap-10 md:justify-between flex flex-col md:flex-row">
          <SearchField />
          <div className="gap-6 xl:gap-10 flex flex-col">
            <button
              className="mx-auto w-56 py-1 px-4 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
              onClick={handleTagFilterButton}>
              Filtrer par Tags
            </button>
            <SortSelection threadType={threadType} />
          </div>
        </div>
      </div>
      <div className="mt-2 mb-6 xl:mb-10 px-1 flex flex-col">
        <ThreadsDisplayer thread={threadType} />
      </div>
      <div className="w-full px-1 md:px-0 md:max-w-[750px] md:mx-auto flex flex-col">
        <Pagination />
      </div>
      {isTagButtonClicked && (
        <TagsWindow
          isTagButtonClicked={isTagButtonClicked}
          setIsTagButtonClicked={setIsTagButtonClicked}
        />
      )}
    </div>
  );
}

type Props = {
  threadType: "topics" | "questions";
};
