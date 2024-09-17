import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import ThreadsDisplayer from "../components/ThreadsDisplayer";
import TagsWindow from "../components/TagsWindow";
import Pagination from "../components/Pagination";
import SortSelection from "../components/SortSelection";
import SearchField from "../components/SearchField";
import ConnectionNeeded from "../components/userAccount/ConnectionNeeded";
import ConnectionWindow from "../components/userAccount/ConnectionWindow";
import { useTags } from "../contexts/useTags";

export default function ThreadsPage({ threadType }: Props) {
  const [isConnectionNeededClicked, setIsConnectionNeededClicked] = useState<boolean>(false);
  const [isConnectionWindowDisplayed, setIsConnectionWindowDisplayed] = useState<boolean>(false);
  const [isTagButtonClicked, setIsTagButtonClicked] = useState<boolean>(false);
  const [dataForPage, setDataForPage] = useState<
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

  const webcontent = useLoaderData();
  const { tags, setTags } = useTags();

  const handleConnectionWindowDisplayer = () => {
    setIsConnectionWindowDisplayed(!isConnectionWindowDisplayed);
  }

  const handleConnectionNeededAlert = () => {
    setIsConnectionNeededClicked(!isConnectionNeededClicked);
  }

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
          if (item.family === "language") {
            arrayLang.push(item.name);
          }
        });
        setLangTags(arrayLang);
        const arrayEnv: string[] = [];
        data.map((item: { id: number; name: string; family: string }) => {
          if (item.family === "environment") {
            arrayEnv.push(item.name);
          }
        });
        setEnvTags(arrayEnv);
        const arrayTechno: string[] = [];
        data.map((item: { id: number; name: string; family: string }) => {
          if (item.family === "technology") {
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
          {webcontent.commons.sections[threadType].main.content}
        </p>
        <div className="mx-auto w-72 py-2 px-4 bg-neutral-100 gap-4 rounded-lg shadow-sm shadow-neutral-400 flex flex-row">
          <button
          className="w-12 h-12 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center text-5xl rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 font-semibold relative"
          onClick={handleConnectionNeededAlert}
          >
            +
          </button>
          <p className="m-auto flex-1 text-center text-lg">
            {webcontent.page.createButton.text.content}
          </p>
        </div>
        <div className="gap-6 xl:gap-10 md:justify-between flex flex-col md:flex-row">
          <SearchField
            setSearchField={setSearchField}
            webcontent={webcontent.commons.searching.searchBar}
          />
          <div className="gap-6 xl:gap-10 flex flex-col">
            <button
              className="mx-auto w-56 py-1 px-4 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
              onClick={handleTagFilterButton}
            >
              {webcontent.commons.searching.tagFilter.text.content}
            </button>
            <SortSelection
              threadType={threadType}
              setSort={setSort}
              webcontent={webcontent.commons.searching.sortFilter}
            />
          </div>
        </div>
      </div>
      <div className="mt-2 mb-6 xl:mb-10 px-1 flex flex-col">
        {tags !== null && (
          <ThreadsDisplayer
            thread={threadType}
            setDataForPage={setDataForPage}
            pagination={pagination}
            sort={sort}
            searchField={searchField}
            tags={tags}
            webcontent={{
              publications: webcontent.commons.publications,
              noResult: webcontent.commons.noResult,
            }}
          />
        )}
      </div>
      <div className="w-full px-1 md:px-0 md:max-w-[750px] md:mx-auto flex flex-col">
        {dataForPage !== null && dataForPage.length > 0 && (
          <Pagination
            dataForPage={dataForPage}
            pagination={pagination}
            setPagination={setPagination}
            webcontent={webcontent.commons.pagination}
          />
        )}
      </div>
      {isConnectionWindowDisplayed && (
        <ConnectionWindow
          setIsConnectionWindowDisplayed={setIsConnectionWindowDisplayed}
          webcontent={{hypertexts: webcontent.commons.hypertexts, buttons: webcontent.commons.buttons, connection: webcontent.commons.connection}}
        />
      )}
      {isConnectionNeededClicked && (
        <ConnectionNeeded
          setIsConnectionNeededClicked={setIsConnectionNeededClicked}
          setIsConnectionWindowDisplayed={setIsConnectionWindowDisplayed}
          webcontent={{hypertexts: webcontent.commons.hypertexts, connection: webcontent.commons.connection}}
        />
      )}
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
            webcontent={{
              buttons: webcontent.commons.buttons,
              tagsFamilies: webcontent.commons.tagsFamilies,
            }}
          />
        )}
    </div>
  );
}

type Props = {
  threadType: "topic" | "question";
};
