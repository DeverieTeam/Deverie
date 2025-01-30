import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import Cookies from "universal-cookie";
import { contentEditWindowWebcontentType } from '../../types/coponents/windows/contentEditWindowWebcontentType';

export default function ContentEditWindow({
  confirmEndpoint,
  fieldName,
  isLargeFormat,
  canBeEmpty,
  setIsSelfOpened,
  data,
  setData,
  webcontent,
  content,
}: Props) {
  const serverAddress: string = import.meta.env.VITE_SERVER_ADDRESS;
  const { auth } = useAuth();

  const [fieldContent, setFieldContent] = useState<string>(content ? content : null);

  useEffect(() => {
    if (auth && auth.role && auth.role === "client") {
      setIsSelfOpened(false);
    }
  }, [auth, setIsSelfOpened]);

  const closeWindow = () => {
    setIsSelfOpened(false);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFieldContent(e.target.value);
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (auth && auth.id) {
      const body: {
        id: number;
        content?: string;
        modification_author?: number;
        displayed_name?: string | undefined;
        description?: string | undefined;
        pronouns?: string | undefined;
      } = { id: (data.id ? data.id : auth.id) };
      body[fieldName] = fieldContent;
      if (confirmEndpoint === 'post') {
        body.modification_author = auth.id;
      }

      try {
        const cookies = new Cookies(null, {
          path: '/',
        });
        const jwt = cookies.get('JWT');
        const response = await fetch(`${serverAddress}/${confirmEndpoint}`, {
          method: 'PUT',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          const tmpUpdatedData = data;
          tmpUpdatedData[fieldName] = body[fieldName];
          if (confirmEndpoint === 'post') {
            tmpUpdatedData.modification_author = auth.name;
            tmpUpdatedData.modification_date = new Date().toJSON().slice(0, 10);
          }
          setData(tmpUpdatedData);
          setIsSelfOpened(false);
        }
      } catch (error) {
        console.error('Something went wrong: ', error);
      }
    }
  };

  return(
    <div
      className="inset-0 absolute h-[120%] w-[100%] bg-gray-400/60 z-20 -translate-y-16"
      onClick={closeWindow}
    >
      <div className="h-[100%] w-[100%] relative">
        <div className="h-screen w-screen sticky top-16">
          <form
            className="mx-auto px-4 py-8 h-[430px] md:h-[500px] w-[290px] md:w-[500px] bg-neutral-50 translate-y-[35%] md:translate-y-[25%] xl:translate-y-[30%] justify-between rounded-lg shadow-sm shadow-gray-700 flex flex-col overflow-auto"
            onClick={(e) => {e.stopPropagation();}}
            onSubmit={handleSubmit}>
            <p className="text-center px-8 text-indigo-500 text-3xl md:text-4xl font-bold drop-shadow">
              {webcontent.actionTitle.content}
            </p>
            <div className="flex flex-col">
              <p className="text-lg md:text-2xl">
                {webcontent.contentTitle.content}
              </p>
              <textarea
                className="px-4 py-2 mb-4 w-full resize-none focus:outline-none active:outline-none md:text-lg shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl"
                placeholder={webcontent.contentPlaceholder.content}
                rows={isLargeFormat ? 8 : 1}
                value={fieldContent}
                onChange={handleContentChange}
              />
            </div>
            <div className="justify-center gap-4 md:gap-8 flex">
              <button
                className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                onClick={closeWindow}
                title={webcontent.buttons.cancelButton.hover.content}
              >
                {webcontent.buttons.cancelButton.text.content}
              </button>
              <input
                className="py-1 px-4 md:px-8 text-center text-lg md:text-xl enabled:hover:text-white bg-indigo-400 enabled:hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 disabled:opacity-50"
                disabled={!(auth && auth.role !== 'client' && (canBeEmpty ? true : fieldContent.length > 3))}
                type="submit"
                title={webcontent.buttons.confirmButton.hover.content}
                value={webcontent.buttons.confirmButton.text.content}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

type Props = {
  confirmEndpoint: 'post' | 'member';
  fieldName: 'content' | 'displayed_name' | 'description' | 'pronouns';
  isLargeFormat: boolean;
  canBeEmpty: boolean;
  setIsSelfOpened: (arg0: boolean) => void;
  data: {
    id: number;
    author: {
      id: number;
      name: string;
      profile_picture: string;
      is_banned: boolean;
      role: "member" | "moderator" | "administrator";
    };
    tags: {
      id: number;
      name: string;
      icon: string;
    }[];
    creation_date: string;
    type: "topic" | "question";
    title: string;
    content: string;
    is_opened: boolean;
    is_readable: boolean;
    is_favourited_by: null | number[];
    modification_date: string;
    modification_author: null | string;
    emergency: null | number;
    results_length: null | number;
    replies: null | { id: number }[];
  };
  setData: (
    arg0: null |
    {
      id: number;
      author: {
        id: number;
        name: string;
        profile_picture: string;
        is_banned: boolean;
        role: "member" | "moderator" | "administrator";
      };
      tags: {
        id: number;
        name: string;
        icon: string;
      }[];
      creation_date: string;
      type: "topic" | "question";
      title: string;
      content: string;
      is_opened: boolean;
      is_readable: boolean;
      is_favourited_by: null | number[];
      modification_date: string;
      modification_author: null | string;
      emergency: null | number;
      results_length: null | number;
      replies: null | { id: number }[];
    }
  ) => void;
  webcontent: contentEditWindowWebcontentType;
};
