import { Link, useLocation } from "react-router-dom";

export default function MobileNavbar() {
  const { pathname } = useLocation();

  return (
    <div className="bg-indigo-500 rounded-t-xl w-full h-18 px-4 fixed bottom-0 flex md:hidden">
      <Link
        to="/topics"
        className={
          pathname === "/topics"
            ? "m-auto h-16 w-16 bg-indigo-600 text-white rounded-full shadow-sm shadow-indigo-900 -translate-y-2 flex"
            : "m-auto h-16 w-16 bg-indigo-400 hover:bg-indigo-600 hover:text-white rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 -translate-y-2 flex"
        }
      >
        <img className="m-auto h-10 w-10 bg-neutral-100" src="" />
      </Link>
      <Link
        to="/questions"
        className={
          pathname === "/questions"
            ? "m-auto h-16 w-16 bg-indigo-600 text-white rounded-full shadow-sm shadow-indigo-900 -translate-y-2 flex"
            : "m-auto h-16 w-16 bg-indigo-400 hover:bg-indigo-600 hover:text-white rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 -translate-y-2 flex"
        }
      >
        <img className="m-auto h-10 w-10 bg-neutral-100" src="" />
      </Link>
      <Link
        to="/chats"
        className={
          pathname === "/chats"
            ? "m-auto h-16 w-16 bg-indigo-600 text-white rounded-full shadow-sm shadow-indigo-900 -translate-y-2 flex"
            : "m-auto h-16 w-16 bg-indigo-400 hover:bg-indigo-600 hover:text-white rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 -translate-y-2 flex"
        }
      >
        <img className="m-auto h-10 w-10 bg-neutral-100" src="" />
      </Link>
    </div>
  );
}
