import { useEffect, useState } from "react";
import TagSelectionDisplayer from "./TagSelectionDisplayer";
import { tagselectionwindowWebcontentType } from "../types/tagselectionwindowWebcontentType";
import { useAuth } from "../contexts/useAuth";
import Cookies from "universal-cookie";

export default function FavouriteTagsWindow({
  setIsFavouriteTagsWindowOpened,
  previousTags,
  webcontent,
}: Props) {
  const [tempTags, setTempTags] = useState<
    {
      id: number;
      name: string;
      icon: string;
      family: string;
    }[]
  >(previousTags);

  const { auth } = useAuth();

  useEffect(() => {
    if (auth && auth.role && auth.role === "client") {
      setIsFavouriteTagsWindowOpened(false);
    }
  }, [auth, setIsFavouriteTagsWindowOpened]);

  const exitTagWindow = () => {
    setIsFavouriteTagsWindowOpened(false);
  };

  const buttonState = () => {
    if (tempTags.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleConfirmButton = async () => {
    if (auth && auth.id) {
      const bodyTags = [];
      for (const tag of tempTags) {
        const newTag = { id: tag.id };
        bodyTags.push(newTag);
      }

      const body: {
        id: number;
        selected_tags: { id: number }[];
      } = {
        id: auth.id,
        selected_tags: bodyTags,
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
      onClick={exitTagWindow}
    >
      <div className="h-[100%] w-[100%] relative">
        <div className="h-screen w-screen sticky top-16">
          <div
            className="mx-auto p-4 h-[530px] md:h-[500px] w-[290px] md:w-[500px] bg-neutral-50 translate-y-[20%] md:translate-y-[25%] xl:translate-y-[30%] justify-between rounded-lg shadow-sm shadow-gray-700 flex flex-col overflow-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex flex-col">
              {["language", "environment", "technology"].map((family) => {
                if (
                  family === "language" ||
                  family === "environment" ||
                  family === "technology"
                ) {
                  return (
                    <TagSelectionDisplayer
                      key={family}
                      tagFamily={family}
                      tempTags={tempTags}
                      setTempTags={setTempTags}
                      webcontent={webcontent}
                    />
                  );
                }
              })}
            </div>
            <div className="gap-4 md:gap-6 flex flex-col">
              <p className="mx-auto w-44 md:w-auto md:text-lg text-center">
                {webcontent.tagNumberDisclaimer.content}
              </p>
              <div className="justify-center gap-4 flex">
                <button
                  className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                  onClick={exitTagWindow}
                  title={webcontent.buttons.cancelButton.hover.content}
                >
                  {webcontent.buttons.cancelButton.text.content}
                </button>
                <button
                  className="py-1 px-4 md:px-8 text-center text-lg md:text-xl enabled:hover:text-white bg-indigo-400 enabled:hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 disabled:opacity-50"
                  onClick={handleConfirmButton}
                  disabled={buttonState()}
                  title={webcontent.buttons.confirmButton.hover.content}
                >
                  {webcontent.buttons.confirmButton.text.content}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  setIsFavouriteTagsWindowOpened: (arg0: boolean) => void;
  previousTags: {
    id: number;
    name: string;
    icon: string;
    family: string;
  }[];
  webcontent: tagselectionwindowWebcontentType;
};
