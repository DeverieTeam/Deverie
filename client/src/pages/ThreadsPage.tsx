import { useEffect, useState } from "react";
import ThreadsDisplayer from "../components/ThreadsDisplayer";
import TagsWindow from "../components/TagsWindow";
import Pagination from "../components/Pagination";
import SortSelection from "../components/SortSelection";
import SearchField from "../components/SearchField";
import { useTags } from "../contexts/useTags";

export default function ThreadsPage({ threadType }: Props) {
  const [isTagButtonClicked, setIsTagButtonClicked] = useState<boolean>(false);
  const [data, setData] = useState<
    | null
    | {
        id: number;
        author: {
          name: string;
          profile_picture: string;
        };
        tags: {
          id: number;
          name: string;
          icon: string;
        }[];
        creation_date: string;
        title: string;
        replies_count: number;
        last_message_date: string;
        results_length: null | number;
      }[]
  >(null);
  const [pagination, setPagination] = useState<number>(1);
  const [sort, setSort] = useState<string>("popular");
  const [searchField, setSearchField] = useState<string>("");
  const [langTags, setLangTags] = useState<null | string[]>(null);
  const [envTags, setEnvTags] = useState<null | string[]>(null);
  const [technoTags, setTechnoTags] = useState<null | string[]>(null);

  const { tags, setTags } = useTags();
  const handleTagFilterButton = () => {
    setIsTagButtonClicked(!isTagButtonClicked);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/tag`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        const arrayLang: string[] = [];
        data.map((item: { id: number; name: string; family: string }) => {
          if (item.family === "Language") {
            arrayLang.push(item.name);
          }
        });
        setLangTags(arrayLang);
        const arrayEnv: string[] = [];
        data.map((item: { id: number; name: string; family: string }) => {
          if (item.family === "Environment") {
            arrayEnv.push(item.name);
          }
        });
        setEnvTags(arrayEnv);
        const arrayTechno: string[] = [];
        data.map((item: { id: number; name: string; family: string }) => {
          if (item.family === "Technology") {
            arrayTechno.push(item.name);
          }
        });
        setTechnoTags(arrayTechno);
      });
  }, []);

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
          <SearchField setSearchField={setSearchField} />
          <div className="gap-6 xl:gap-10 flex flex-col">
            <button
              className="mx-auto w-56 py-1 px-4 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
              onClick={handleTagFilterButton}
            >
              Filtrer par Tags
            </button>
            <SortSelection threadType={threadType} setSort={setSort} />
          </div>
        </div>
      </div>
      <div className="mt-2 mb-6 xl:mb-10 px-1 flex flex-col">
        {tags !== null && (
          <ThreadsDisplayer
            thread={threadType}
            data={data}
            setData={setData}
            pagination={pagination}
            sort={sort}
            searchField={searchField}
            tags={tags}
          />
        )}
      </div>
      <div className="w-full px-1 md:px-0 md:max-w-[750px] md:mx-auto flex flex-col">
        {data !== null && data.length > 0 && (
          <Pagination
            data={data}
            pagination={pagination}
            setPagination={setPagination}
          />
        )}
      </div>
      {isTagButtonClicked &&
        tags !== null &&
        langTags !== null &&
        envTags !== null &&
        technoTags !== null && (
          <TagsWindow
            isTagButtonClicked={isTagButtonClicked}
            setIsTagButtonClicked={setIsTagButtonClicked}
            tags={tags}
            setTags={setTags}
            langTags={langTags}
            envTags={envTags}
            technoTags={technoTags}
          />
        )}
    </div>
  );
}

type Props = {
  threadType: "topics" | "questions";
};
