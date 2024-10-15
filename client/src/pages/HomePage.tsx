import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import ThreadsDisplayer from "../components/ThreadsDisplayer";
import { homepageWebcontentType } from "../types/homepageWebcontentType";
import { useAuth } from "../contexts/useAuth";
import MemberViewWindow from "../components/MemberViewWindow";
import BanConfirmWindow from "../components/BanConfirmWindow";
import ConnectionWindow from "../components/userAccount/ConnectionWindow";
import ConnectionNeeded from "../components/userAccount/ConnectionNeeded";

export default function HomePage() {
  const [randomThread, setRandomThread] = useState<null | "popular" | "recent">(
    null
  );
  const [isConnectionNeededClicked, setIsConnectionNeededClicked] =
    useState<boolean>(false);
  const [isConnectionWindowDisplayed, setIsConnectionWindowDisplayed] =
    useState<boolean>(false);
  const [isMemberViewWindowOpened, setIsMemberViewWindowOpened] =
    useState<boolean>(false);
  const [isBanConfirmWindowOpened, setIsBanConfirmWindowOpened] =
    useState<boolean>(false);
  const [memberId, setMemberId] = useState<null | number>(null);

  const webcontent = useLoaderData() as homepageWebcontentType;

  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleWelcomeButton = () => {
    if (auth !== undefined && auth.role !== "client") {
      navigate(webcontent.page.shortcutPopUp.connected.link.content);
    } else {
      navigate(webcontent.page.shortcutPopUp.disconnected.link.content);
    }
  };

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
            className="m-auto w-[300px] md:w-[600px] h-[200px] md:h-[400px] bg-neutral-100 rounded-xl"
            src="/images/logo-homepage.png"
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
                {auth !== undefined && auth.role !== "client"
                  ? webcontent.page.shortcutPopUp.connected.message.content.replace(
                      "{username}",
                      `${auth.name}`
                    )
                  : webcontent.page.shortcutPopUp.disconnected.message.content}
              </p>
              <button
                className="bg-indigo-400 hover:bg-indigo-600 hover:text-white text-center text-md md:text-xl rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 px-8 py-2 font-semibold"
                onClick={handleWelcomeButton}
              >
                {auth !== undefined && auth.role !== "client"
                  ? webcontent.page.shortcutPopUp.connected.button.content
                  : webcontent.page.shortcutPopUp.disconnected.button.content}
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
              setMemberId={setMemberId}
              setIsMemberViewWindowOpened={setIsMemberViewWindowOpened}
              setIsConnectionNeededClicked={setIsConnectionNeededClicked}
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
              setMemberId={setMemberId}
              setIsMemberViewWindowOpened={setIsMemberViewWindowOpened}
              setIsConnectionNeededClicked={setIsConnectionNeededClicked}
              webcontent={{
                publications: webcontent.commons.publications,
                noResult: webcontent.commons.noResult,
              }}
            />
          )}
        </div>
      </div>
      {isMemberViewWindowOpened && memberId && (
        <MemberViewWindow
          setIsMemberViewWindowOpened={setIsMemberViewWindowOpened}
          setIsBanConfirmWindowOpened={setIsBanConfirmWindowOpened}
          memberId={memberId}
          webcontent={webcontent.commons.memberWindow}
        />
      )}
      {isBanConfirmWindowOpened && memberId && (
        <BanConfirmWindow
          setIsBanConfirmWindowOpened={setIsBanConfirmWindowOpened}
          memberId={memberId}
          webcontent={webcontent.commons}
        />
      )}
      {isConnectionWindowDisplayed && (
        <ConnectionWindow
          setIsConnectionWindowDisplayed={setIsConnectionWindowDisplayed}
          webcontent={{
            hypertexts: webcontent.commons.hypertexts,
            buttons: webcontent.commons.buttons,
            connection: webcontent.commons.connection,
          }}
        />
      )}
      {isConnectionNeededClicked && (
        <ConnectionNeeded
          setIsConnectionNeededClicked={setIsConnectionNeededClicked}
          setIsConnectionWindowDisplayed={setIsConnectionWindowDisplayed}
          webcontent={{
            hypertexts: webcontent.commons.hypertexts,
            connection: webcontent.commons.connection,
          }}
        />
      )}
    </div>
  );
}
