import { Link, useLocation } from "react-router-dom";

export default function MobileNavbar() {
  const { pathname } = useLocation();

  return (
    <div className="bg-indigo-500 rounded-t-xl w-full h-18 px-4 z-10 fixed bottom-0 flex md:hidden">
      <Link
        to="/topics"
        className={
          pathname === "/topics"
            ? "m-auto h-16 w-16 bg-indigo-600 text-white fill-white rounded-full shadow-sm shadow-indigo-900 -translate-y-2 flex"
            : "m-auto h-16 w-16 bg-indigo-400 hover:bg-indigo-600 hover:text-white hover:fill-white rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 -translate-y-2 flex"
        }>
        <svg
          width="800px"
          height="800px"
          className="m-auto h-10 w-10 bg-transparent"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zm-.692-2H20V5H4v13.385L5.763 17zM11 10h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2z" />
          </g>
        </svg>
      </Link>
      <Link
        to="/questions"
        className={
          pathname === "/questions"
            ? "m-auto h-16 w-16 bg-indigo-600 text-white fill-white rounded-full shadow-sm shadow-indigo-900 -translate-y-2 flex"
            : "m-auto h-16 w-16 bg-indigo-400 hover:bg-indigo-600 hover:text-white hover:fill-white rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 -translate-y-2 flex"
        }>
        <svg
          width="800px"
          height="800px"
          className="m-auto h-10 w-10 bg-transparent"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fillRule="nonzero"
              d="M5.763 17H20V5H4v13.385L5.763 17zm.692 2L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM11 14h2v2h-2v-2zM8.567 8.813A3.501 3.501 0 1 1 12 13h-1v-2h1a1.5 1.5 0 1 0-1.471-1.794l-1.962-.393z"
            />
          </g>
        </svg>
      </Link>
      <Link
        to="/chats"
        className={
          pathname === "/chats"
            ? "m-auto h-16 w-16 bg-indigo-600 text-white fill-white rounded-full shadow-sm shadow-indigo-900 -translate-y-2 flex"
            : "m-auto h-16 w-16 bg-indigo-400 hover:bg-indigo-600 hover:text-white hover:fill-white rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 -translate-y-2 flex"
        }>
        <svg
          width="800px"
          height="800px"
          className="m-auto h-10 w-10 bg-transparent"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M5.455 15L1 18.5V3a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v12H5.455zm-.692-2H16V4H3v10.385L4.763 13zM8 17h10.237L20 18.385V8h1a1 1 0 0 1 1 1v13.5L17.545 19H9a1 1 0 0 1-1-1v-1z" />
          </g>
        </svg>
      </Link>
    </div>
  );
}
