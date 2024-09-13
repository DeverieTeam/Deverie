import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import ConnectionWindow from "../components/userAccount/ConnectionWindow";

export default function Header({ webcontent }: Props) {
  const [isConnectionWindowDisplayed, setIsConnectionWindowDisplayed] = useState<boolean>(false);

  const handleConnectionWindowDisplayer = () => {
    setIsConnectionWindowDisplayed(!isConnectionWindowDisplayed);
  }
  
  const { pathname } = useLocation();
  
  return (
    <>
    <div className="bg-neutral-50 w-full h-16 justify-between fixed top-0 z-10 shadow-sm shadow-neutral-4OO flex">
      <Link
        to="/"
        className="pl-2 bg-indigo-500 w-60 rounded-br-[90px] shadow-sm shadow-indigo-800 flex"
      >
        <img
          className="my-auto h-12 w-40 bg-neutral-100"
          src=""
          alt={webcontent.logo.alt.content}
          title={webcontent.hypertexts.home.hover.content}
        />
      </Link>

      <div className="bg-indigo-500 rounded-b-[90px] px-[5%] w-[50%] xl:w-[60%] shadow-sm shadow-indigo-800 hidden md:flex">
        <Link
          to="/topic"
          className={
            pathname === "/topic"
              ? "m-auto px-4 h-10 gap-2 xl:px-6 xl:h-12 bg-indigo-600 text-white fill-white rounded-full shadow-sm shadow-indigo-900 flex"
              : "m-auto px-4 h-10 gap-2 xl:px-6 xl:h-12 bg-indigo-400 hover:bg-indigo-600 hover:text-white hover:fill-white rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 flex"
          }
        >
          <svg
            width="800px"
            height="800px"
            className="m-auto h-8 w-8 bg-transparent hidden xl:flex"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zm-.692-2H20V5H4v13.385L5.763 17zM11 10h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2z" />
            </g>
          </svg>
          <p className="m-auto text-lg xl:text-3xl font-semibold">
            {webcontent.sections.topic.main.content}
          </p>
        </Link>
        <Link
          to="/question"
          className={
            pathname === "/question"
              ? "m-auto px-4 h-10 gap-2 xl:px-6 xl:h-12 bg-indigo-600 text-white fill-white rounded-full shadow-sm shadow-indigo-900 flex"
              : "m-auto px-4 h-10 gap-2 xl:px-6 xl:h-12 bg-indigo-400 hover:bg-indigo-600 hover:text-white hover:fill-white rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 flex"
          }
        >
          <svg
            width="800px"
            height="800px"
            className="m-auto h-8 w-8 bg-transparent hidden xl:flex"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fillRule="nonzero"
                d="M5.763 17H20V5H4v13.385L5.763 17zm.692 2L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM11 14h2v2h-2v-2zM8.567 8.813A3.501 3.501 0 1 1 12 13h-1v-2h1a1.5 1.5 0 1 0-1.471-1.794l-1.962-.393z"
              />
            </g>
          </svg>
          <p className="m-auto text-lg xl:text-3xl font-semibold">
            {webcontent.sections.question.main.content}
          </p>
        </Link>
        <Link
          to="/chat"
          className={
            pathname === "/chat"
              ? "m-auto px-4 h-10 gap-2 xl:px-6 xl:h-12 bg-indigo-600 text-white fill-white rounded-full shadow-sm shadow-indigo-900 flex"
              : "m-auto px-4 h-10 gap-2 xl:px-6 xl:h-12 bg-indigo-400 hover:bg-indigo-600 hover:text-white hover:fill-white rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 flex"
          }
        >
          <svg
            width="800px"
            height="800px"
            className="m-auto h-8 w-8 bg-transparent hidden xl:flex"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M5.455 15L1 18.5V3a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v12H5.455zm-.692-2H16V4H3v10.385L4.763 13zM8 17h10.237L20 18.385V8h1a1 1 0 0 1 1 1v13.5L17.545 19H9a1 1 0 0 1-1-1v-1z" />
            </g>
          </svg>
          <p className="m-auto text-lg xl:text-3xl font-semibold">
            {webcontent.sections.chat.main.content}
          </p>
        </Link>
      </div>
      <div className="bg-transparent w-[72px] flex">
        <button
          className="m-auto h-14 w-14 bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 relative flex"
          title={webcontent.hypertexts.login.hover.content}
          onClick={handleConnectionWindowDisplayer}
        >
          <img
            className="m-auto h-12 w-12 rounded-full bg-transparent"
            src="/icons/profile-picture.png"
          />
        </button>
      </div>
    </div>
    {isConnectionWindowDisplayed && (
      <ConnectionWindow
        setIsConnectionWindowDisplayed={setIsConnectionWindowDisplayed}
      />
    )}
    </>
  );
}

type Props = {
  webcontent: {
    logo: {
      hover: {
        name: string;
        content: string;
      };
      alt: {
        name: string;
        content: string;
      };
    };
    sections: {
      topic: {
        main: {
          name: string;
          content: string;
        };
        element: {
          name: string;
          content: string;
        };
      };
      question: {
        main: {
          name: string;
          content: string;
        };
        element: {
          name: string;
          content: string;
        };
      };
      chat: {
        main: {
          name: string;
          content: string;
        };
      };
      favorite: {
        main: {
          name: string;
          content: string;
        };
        element: {
          name: string;
          content: string;
        };
      };
    };
    hypertexts: {
      home: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      contact: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      termsOfUse: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      legalNotices: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      login: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
      profile: {
        text: {
          name: string;
          content: string;
        };
        hover: {
          name: string;
          content: string;
        };
      };
    };
  };
};
