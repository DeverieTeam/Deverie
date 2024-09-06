import { Link, useLocation } from "react-router-dom";

export default function Header({ webcontent }: Props) {
  const { pathname } = useLocation();

  return (
    <div className="bg-neutral-50 w-full h-16 justify-between fixed top-0 z-10 shadow-sm shadow-neutral-4OO flex">
      <Link
        to="/"
        className="pl-2 bg-indigo-500 w-60 rounded-br-[90px] shadow-sm shadow-indigo-800 flex">
        <img className="my-auto h-12 w-40 bg-neutral-100" src=""
        alt={webcontent.logo.alt.content}
        title={webcontent.hypertexts.home.hover.content}/>
      </Link>

      <div className="bg-indigo-500 rounded-b-[90px] px-[5%] w-[50%] xl:w-[60%] shadow-sm shadow-indigo-800 hidden md:flex">
        <Link
          to="/topics"
          className={
            pathname === "/topics"
              ? "m-auto px-4 h-10 gap-2 xl:px-6 xl:h-12 bg-indigo-600 text-white rounded-full shadow-sm shadow-indigo-900 flex"
              : "m-auto px-4 h-10 gap-2 xl:px-6 xl:h-12 bg-indigo-400 hover:bg-indigo-600 hover:text-white rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 flex"
          }>
          <img
            className="m-auto h-8 w-8 bg-neutral-100 hidden xl:flex"
            src=""
          />
          <p className="m-auto text-lg xl:text-3xl font-semibold">{webcontent.sections.topic.main.content}</p>
        </Link>
        <Link
          to="/questions"
          className={
            pathname === "/questions"
              ? "m-auto px-4 h-10 gap-2 xl:px-6 xl:h-12 bg-indigo-600 text-white rounded-full shadow-sm shadow-indigo-900 flex"
              : "m-auto px-4 h-10 gap-2 xl:px-6 xl:h-12 bg-indigo-400 hover:bg-indigo-600 hover:text-white rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 flex"
          }>
          <img
            className="m-auto h-8 w-8 bg-neutral-100 hidden xl:flex"
            src=""
          />
          <p className="m-auto text-lg xl:text-3xl font-semibold">{webcontent.sections.question.main.content}</p>
        </Link>
        <Link
          to="/chats"
          className={
            pathname === "/chats"
              ? "m-auto px-4 h-10 gap-2 xl:px-6 xl:h-12 bg-indigo-600 text-white rounded-full shadow-sm shadow-indigo-900 flex"
              : "m-auto px-4 h-10 gap-2 xl:px-6 xl:h-12 bg-indigo-400 hover:bg-indigo-600 hover:text-white rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 flex"
          }>
          <img
            className="m-auto h-8 w-8 bg-neutral-100 hidden xl:flex"
            src=""
          />
          <p className="m-auto text-lg xl:text-3xl font-semibold">{webcontent.sections.chat.main.content}</p>
        </Link>
      </div>
      <div className="bg-transparent w-[72px] flex">
        <button className="m-auto h-14 w-14 bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 relative flex"
                title={webcontent.hypertexts.login.hover.content}>
          <img
            className="m-auto h-12 w-12 rounded-full bg-neutral-100"
            src=""
          />
        </button>
      </div>
    </div>
  );
}

type Props = {
  logo: {
    hover: {
      name: string,
      content: string
    },
    alt: {
      name: string,
      content: string
    }
  },
  sections: {
    topic: {
      main: {
        name: string,
        content: string
      },
      element: {
        name: string,
        content: string
      }
    },
    question: {
      main: {
        name: string,
        content: string
      },
      element: {
        name: string,
        content: string
      },
    },
    chat: {
      main: {
        name: string,
        content: string
      }
    },
    favorite: {
      main: {
        name: string,
        content: string
      },
      element: {
        name: string,
        content: string
      }
    }
  },
  hypertexts: {
    home: {
      text: {
        name: string,
        content: string
      },
      hover: {
        name: string,
        content: string
      }
    },
    contact: {
      text: {
        name: string,
        content: string
      },
      hover: {
        name: string,
        content: string
      }
    },
    termsOfUse: {
      text: {
        name: string,
        content: string
      },
      hover: {
        name: string,
        content: string
      }
    },
    legalNotices: {
      text: {
        name: string,
        content: string
      },
      hover: {
        name: string,
        content: string
      }
    },
    login: {
      text: {
        name: string,
        content: string
      },
      hover: {
        name: string,
        content: string
      }
    },
    profile: {
      text: {
        name: string,
        content: string
      },
      hover: {
        name: string,
        content: string
      }
    }
  }
};
