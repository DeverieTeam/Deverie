import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { memberviewwindowWebcontentType } from "../types/memberviewwindowWebcontentType";

export default function MemberViewWindow({
  setIsMemberViewWindowOpened,
  setIsBanConfirmWindowOpened,
  memberId,
  webcontent,
}: Props) {
  const [data, setData] = useState<null | {
    id: number;
    name: string;
    email: string;
    is_email_displayed: boolean;
    profile_picture: string;
    role: "member" | "moderator" | "administrator";
    pronouns?: string;
    description?: string;
    inscription_date: string;
    post_count: number;
  }>(null);
  const { auth } = useAuth();

  useEffect(() => {
    if (data === null) {
      fetch(`http://localhost:3000/member/${memberId}`)
        .then((response) => {
          if (!response.ok) {
            setIsMemberViewWindowOpened(false);
            throw new Error("Something went wrong");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
        });
    }
  }, [data, memberId, setIsMemberViewWindowOpened]);

  const exitMemberViewWindow = () => {
    setIsMemberViewWindowOpened(false);
  };

  const handleBanButton = () => {
    setIsBanConfirmWindowOpened(true);
  };

  const roleDisplay = () => {
    if (data) {
      switch (data.role) {
        case "member":
          return "Membre";
        case "moderator":
          return "Modérateur";
        case "administrator":
          return "Administrateur";
      }
    }
  };

  return (
    <div
      className="absolute h-[120%] w-[100%] bg-gray-400/60 z-20 -translate-y-16"
      onClick={exitMemberViewWindow}
    >
      <div className="h-[100%] w-[100%] relative">
        <div className="h-screen w-screen sticky top-16">
          <div
            className="relative mx-auto px-4 py-6 xl:py-12 h-[530px] md:h-[600px] w-[290px] md:w-[600px] xl:w-[1000px] bg-neutral-50 translate-y-[20%] md:translate-y-[15%] justify-between rounded-lg shadow-sm shadow-gray-700 flex flex-col overflow-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              className="absolute top-4 right-4 w-7 md:w-8 h-7 md:h-8 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
              onClick={exitMemberViewWindow}
            >
              <svg
                width="800px"
                height="800px"
                className="m-auto w-5 md:w-6 h-5 md:h-6 bg-transparent"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                />
              </svg>
            </button>
            <div className="w-full flex flex-col xl:flex-row">
              <div className="xl:w-[50%] mb-6 xl:mb-0 flex flex-col">
                <img
                  className="mx-auto mb-6 h-24 md:h-[180px] xl:h-[240px] w-24 md:w-[180px] xl:w-[240px] rounded-full bg-transparent"
                  src={data?.profile_picture}
                />
                <p className="text-center px-4 text-indigo-500 text-3xl md:text-5xl font-bold drop-shadow">
                  {data?.name}
                </p>
                <p className="text-center px-4 text-lg md:text-2xl">
                  {roleDisplay()}
                </p>
                {data && data.pronouns && (
                  <p className="text-center px-4 text-lg md:text-2xl">
                    {webcontent.pronounsPrefix.content}
                    {data.pronouns}
                  </p>
                )}
                {data?.is_email_displayed && (
                  <p className="text-center px-4 text-lg md:text-2xl">
                    {data?.email}
                  </p>
                )}
                <p className="text-center px-4 text-lg md:text-2xl">
                  {webcontent.messageCount.content}
                  {data?.post_count}
                </p>
                <p className="text-center px-4 text-lg md:text-2xl">
                  {webcontent.inscriptionDate.content}
                  {data?.inscription_date}
                </p>
              </div>
              <div className="xl:w-[50%] mb-6 gap-6 md:gap-12 justify-center flex flex-col">
                {data && (
                  <p className="bg-neutral-100 px-2 py-4 md:mx-4 xl:px-4 xl:py-6 rounded-lg shadow-sm shadow-neutral-400 text-center md:text-xl xl:text-2xl">
                    {data.description
                      ? data.description
                          .split("\n")
                          .flatMap((line: string, i: number) => [
                            line,
                            <br key={i} />,
                          ])
                      : webcontent.descriptionPlaceholder.content}
                  </p>
                )}
                <div className="justify-center flex">
                  {data &&
                    auth &&
                    (auth.role === "moderator" ||
                      auth.role === "administrator") &&
                    data.role !== "moderator" &&
                    data.role !== "administrator" && (
                      <button
                        className="py-1 px-4 md:px-8 text-center text-lg md:text-2xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                        onClick={handleBanButton}
                      >
                        {webcontent.banButton.content}
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  setIsMemberViewWindowOpened: (arg0: boolean) => void;
  setIsBanConfirmWindowOpened: (arg0: boolean) => void;
  memberId: number;
  webcontent: memberviewwindowWebcontentType;
};
