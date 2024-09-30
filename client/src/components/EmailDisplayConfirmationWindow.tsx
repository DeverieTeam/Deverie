import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import Cookies from "universal-cookie";
import { profilepageWebcontentType } from "../types/profilepageWebcontentType";

export default function EmailDisplayConfirmationWindow({
  setIsEmailDisplayConfirmationWindowOpened,
  previousContent,
  webcontent,
}: Props) {
  const [content, setContent] = useState<boolean>(previousContent);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth && auth.role && auth.role === "client") {
      setIsEmailDisplayConfirmationWindowOpened(false);
    }
  }, [auth, setIsEmailDisplayConfirmationWindowOpened]);

  const exitWindow = () => {
    setIsEmailDisplayConfirmationWindowOpened(false);
  };

  const handleContentChange = () => {
    setContent(!content);
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (auth && auth.id) {
      const body: {
        id: number;
        is_email_displayed: boolean;
      } = {
        id: auth.id,
        is_email_displayed: content,
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
              {webcontent.page.emailDisplayConfirmationTitle.content}
            </p>
            <div className="md:px-8 justify-between flex">
              <p className="my-auto text-lg md:text-2xl">
                {webcontent.page.emailDisplayConfirmationContent.content}
              </p>
              <input
                className="my-auto cursor-pointer"
                type="checkbox"
                checked={content}
                onChange={handleContentChange}
              />
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
  setIsEmailDisplayConfirmationWindowOpened: (arg0: boolean) => void;
  previousContent: boolean;
  webcontent: profilepageWebcontentType;
};
