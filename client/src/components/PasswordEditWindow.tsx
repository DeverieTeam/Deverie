import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import Cookies from "universal-cookie";
import { profilepageWebcontentType } from "../types/profilepageWebcontentType";

export default function PasswordEditWindow({
  setIsPasswordEditWindowOpened,
  webcontent,
}: Props) {
  const [content, setContent] = useState<string>("");
  const [checker, setChecker] = useState<string>("");
  const [isWarningOn, setIsWarningOn] = useState<boolean>(false);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth && auth.role && auth.role === "client") {
      setIsPasswordEditWindowOpened(false);
    }
  }, [auth, setIsPasswordEditWindowOpened]);

  const exitWindow = () => {
    setIsPasswordEditWindowOpened(false);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleCheckerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecker(e.target.value);
  };

  const buttonState = () => {
    if (content.length > 3 && checker.length > 3) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (content !== checker || content.length < 4) {
      setIsWarningOn(true);
      setContent("");
      setChecker("");
      setTimeout(() => {
        setIsWarningOn(false);
      }, 3000);
    } else {
      if (auth && auth.id) {
        const body: {
          id: number;
          password: string;
        } = {
          id: auth.id,
          password: content,
        };

        try {
          const cookies = new Cookies(null, {
            path: "/",
          });
          const jwt = cookies.get("JWT");
          const response = await fetch("http://localhost:3000/member", {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(body),
          });

          if (response.ok) {
            //   const result = await response.json();
            //   console.log(result);
            window.location.reload();
          }
        } catch (error) {
          console.error("Something went wrong: ", error);
        }
      }
    }
  };

  return (
    <div
      className="absolute h-[120%] w-[100%] bg-gray-400/60 z-20 -translate-y-16"
      onClick={exitWindow}
    >
      <div className="h-[100%] w-[100%] relative">
        <div className="h-screen w-screen sticky top-16">
          <form
            className="mx-auto px-4 py-8 h-[430px] md:h-[500px] w-[290px] md:w-[500px] bg-neutral-50 translate-y-[35%] md:translate-y-[25%] xl:translate-y-[30%] justify-between rounded-lg shadow-sm shadow-gray-700 flex flex-col overflow-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onSubmit={handleSubmit}
          >
            <p className="text-center px-8 text-indigo-500 text-3xl md:text-4xl font-bold drop-shadow">
              {webcontent.page.passwordEditTitle.content}
            </p>
            <div className="flex flex-col">
              <p className="text-lg md:text-2xl">
                {webcontent.page.passwordContent.content}
              </p>
              <input
                className="px-4 py-2 mb-4 w-full focus:outline-none active:outline-none md:text-lg shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl"
                type="password"
                value={content}
                onChange={handleContentChange}
              />
              <p className="text-lg md:text-2xl">
                {webcontent.page.checkerContent.content}
              </p>
              <input
                className="px-4 py-2 mb-4 w-full focus:outline-none active:outline-none md:text-lg shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl"
                type="password"
                value={checker}
                onChange={handleCheckerChange}
              />
              {isWarningOn && (
                <p className="w-[100%] text-center text-xs md:text-base text-red-700 justify-center items-center">
                  {webcontent.page.warningMessage.content}
                </p>
              )}
            </div>
            <div className="justify-center gap-4 md:gap-8 flex">
              <button
                className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                onClick={exitWindow}
                title={webcontent.commons.buttons.backButton.hover.content}
              >
                {webcontent.commons.buttons.backButton.text.content}
              </button>
              <input
                className="py-1 px-4 md:px-8 text-center text-lg md:text-xl enabled:hover:text-white bg-indigo-400 enabled:hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 disabled:opacity-50"
                disabled={buttonState()}
                type="submit"
                title={webcontent.commons.buttons.confirmButton.hover.content}
                value={webcontent.commons.buttons.confirmButton.text.content}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

type Props = {
  setIsPasswordEditWindowOpened: (arg0: boolean) => void;
  webcontent: profilepageWebcontentType;
};
