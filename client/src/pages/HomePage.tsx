import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import ThreadsDisplayer from "../components/ThreadsDisplayer";

export default function HomePage() {
  const [randomThread, setRandomThread] = useState<null | "popular" | "recent">(
    null
  );

  const webcontent = useLoaderData();

  const navigate = useNavigate();

  const handleRegistrationButton = () => {
    navigate(webcontent.page.shortcutPopUp.disconnected.link.content);
  }

  useEffect(() => {
    const random = Math.floor(Math.random() * 2);
    switch (random) {
      case 0:
        setRandomThread("popular");
        break;
      case 1:
      default:
        setRandomThread("recent");
        break;
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="xl:flex">
        <div className="xl:flex-1 py-8 flex">
          <img
            className="m-auto w-[300px] md:w-[600px] h-[200px] md:h-[400px] bg-neutral-100"
            src=""
          />
        </div>
        <div className="xl:flex-1">
          <div className="xl:mx-auto xl:max-w-[600px] gap-2 flex flex-col">
            <p className="mx-auto px-[10%] xl:mt-8 text-center text-indigo-500 text-2xl md:text-4xl font-semibold drop-shadow">
              {webcontent.page.welcomeMessage.title.content}
            </p>
            <p className="mx-auto px-[10%] text-center text-md md:text-xl mt-2 ">
              {webcontent.page.welcomeMessage.description.content
                .split("\n")
                .flatMap((line: string, i: number) => [line, <br key={i} />])}
            </p>
          </div>
          <div className="py-8 flex">
            <div className="mx-auto py-4 px-8 bg-neutral-100 gap-4 md:gap-8 rounded-lg shadow-sm shadow-neutral-400 flex flex-col md:flex-row">
              <p className="m-auto text-center text-md md:text-xl">
                {webcontent.page.shortcutPopUp.disconnected.message.content}
              </p>
              <button
              className="bg-indigo-400 hover:bg-indigo-600 hover:text-white text-center text-md md:text-xl rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 px-8 py-2 font-semibold"
              onClick={handleRegistrationButton}>
                {webcontent.page.shortcutPopUp.disconnected.button.content}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex">
        <div className="flex-1 mx-8 pb-8 flex flex-col">
          <p className="text-indigo-500 mt-4 mb-8 mx-auto text-center text-3xl font-semibold drop-shadow">
            {randomThread === "popular"
              ? webcontent.page.trends.popular.content
              : webcontent.page.trends.recent.content}
          </p>
          {randomThread !== null && (
            <ThreadsDisplayer
              thread={randomThread}
              webcontent={{
                publications: webcontent.commons.publications,
                noResult: webcontent.commons.noResult,
              }}
            />
          )}
        </div>
        <div className="flex-1 mx-8 hidden lg:flex flex-col">
          <p className="text-indigo-500 mt-4 mb-8 mx-auto text-center text-3xl font-semibold drop-shadow">
            {randomThread === "recent"
              ? webcontent.page.trends.popular.content
              : webcontent.page.trends.recent.content}
          </p>
          {randomThread !== null && (
            <ThreadsDisplayer
              thread={randomThread === "recent" ? "popular" : "recent"}
              webcontent={{
                publications: webcontent.commons.publications,
                noResult: webcontent.commons.noResult,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
