import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import Cookies from "universal-cookie";
import { profilepageWebcontentType } from "../types/profilepageWebcontentType";

export default function ProfilePictureEditWindow({
  setIsProfilePictureEditWindowOpened,
  setData,
  webcontent,
}: Props) {
  const [content, setContent] = useState(null);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (auth && auth.role && auth.role === "client") {
      setIsProfilePictureEditWindowOpened(false);
    }
  }, [auth, setIsProfilePictureEditWindowOpened]);

  const exitWindow = () => {
    setIsProfilePictureEditWindowOpened(false);
  };

  const handleContentChange = (e: React.BaseSyntheticEvent) => {
    setContent(e.target.files[0]);
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (auth && auth.id && auth.name) {
      if (!content) {
        const body: {
          id: number;
          name: string;
          profile_picture_filename: string;
        } = {
          id: auth.id,
          name: auth.name,
          profile_picture_filename: "default",
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
            setData(null);
            setAuth(undefined);
            setIsProfilePictureEditWindowOpened(false);
          }
        } catch (error) {
          console.error("Something went wrong: ", error);
        }
      } else {
        try {
          const cookies = new Cookies(null, {
            path: "/",
          });
          const jwt = cookies.get("JWT");
          const formData = new FormData();
          formData.append("file", content);

          const response = await fetch("http://localhost:3000/member/pp", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            body: formData,
          });

          if (response.ok) {
            const result = await response.json();

            const body: {
              id: number;
              name: string;
              profile_picture_filename?: string;
            } = {
              id: auth.id,
              name: auth.name,
              profile_picture_filename: result.filename,
            };

            const response2 = await fetch("http://localhost:3000/member", {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify(body),
            });

            if (response2.ok) {
              setData(null);
              setAuth(undefined);
              setIsProfilePictureEditWindowOpened(false);
            }
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
              {webcontent.page.profilePictureEditTitle.content}
            </p>
            <div className="md:px-8 gap-4 md:gap-8 justify-between flex flex-col">
              <p className="text-center text-lg md:text-2xl">
                {webcontent.page.profilePictureEditContent.content}
              </p>
              <input
                type="file"
                className="mx-auto max-w-[250px] md:max-w-none cursor-pointer"
                accept=".png, .jpg"
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
  setIsProfilePictureEditWindowOpened: (arg0: boolean) => void;
  setData: (
    arg0: null | {
      id: number;
      name: string;
      email: string;
      is_email_displayed: boolean;
      profile_picture: string;
      pronouns?: string;
      description?: string;
      displayed_name: string;
      theme: string;
      language: string;
    }
  ) => void;
  webcontent: profilepageWebcontentType;
};
