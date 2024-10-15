import { useEffect } from "react";
import { useAuth } from "../contexts/useAuth";
import Cookies from "universal-cookie";
import { banconfirmwindowWebcontentType } from "../types/banconfirmwindowWebcontentType";

export default function BanConfirmWindow({
  setIsBanConfirmWindowOpened,
  memberId,
  webcontent,
}: Props) {
  const { auth } = useAuth();

  useEffect(() => {
    if (auth && auth.role && auth.role === "client") {
      setIsBanConfirmWindowOpened(false);
    }
  }, [auth, setIsBanConfirmWindowOpened]);

  const exitBanConfirmWindow = () => {
    setIsBanConfirmWindowOpened(false);
  };

  const handleBanButton = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (auth && auth.id && memberId) {
      const body: {
        id: number;
        is_banned: boolean;
      } = {
        id: memberId,
        is_banned: true,
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
          window.location.reload();
        }
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    }
  };

  return (
    <div
      className="absolute h-[120%] w-[100%] bg-gray-400/60 z-30 -translate-y-16"
      onClick={exitBanConfirmWindow}
    >
      <div className="h-[100%] w-[100%] relative">
        <div className="h-screen w-screen sticky top-16">
          <div
            className="mx-auto px-4 py-8 h-[430px] md:h-[500px] w-[290px] md:w-[500px] bg-neutral-50 translate-y-[35%] md:translate-y-[25%] xl:translate-y-[30%] justify-between rounded-lg shadow-sm shadow-gray-700 flex flex-col overflow-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <p className="text-center px-8 text-indigo-500 text-3xl md:text-4xl font-bold drop-shadow">
              {webcontent.memberWindow.banTitle.content}
            </p>
            <p className="mx-auto px-4 md:px-8 text-center text-xl md:text-3xl md:font-semibold">
              {webcontent.memberWindow.banConfirmMessage.content}
            </p>
            <div className="justify-center gap-4 md:gap-8 flex">
              <button
                className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                onClick={exitBanConfirmWindow}
                title={webcontent.buttons.backButton.hover.content}
              >
                {webcontent.buttons.backButton.text.content}
              </button>
              <button
                className="py-1 px-4 md:px-8 text-center text-lg md:text-xl enabled:hover:text-white bg-indigo-400 enabled:hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 disabled:opacity-50"
                onClick={handleBanButton}
                title={webcontent.buttons.confirmButton.hover.content}
              >
                {webcontent.buttons.confirmButton.text.content}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  setIsBanConfirmWindowOpened: (arg0: boolean) => void;
  memberId: number;
  webcontent: banconfirmwindowWebcontentType;
};
