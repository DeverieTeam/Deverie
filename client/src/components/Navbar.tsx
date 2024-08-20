import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <div className="bg-sky-100 w-full lg:w-96 h-18 lg:h-16 lg:gap-4 fixed bottom-0 lg:top-0 lg:left-1/2 lg:-translate-x-1/2 z-20 flex">
      <div className="m-auto flex lg:hidden">
        <div className="m-auto h-14 lg:h-12 w-14 lg:w-12 bg-neutral-100 rounded-full shadow-sm lg:hidden"></div>
      </div>
      <div className="m-auto flex">
        <div className="m-auto h-14 lg:h-12 w-14 lg:w-12 bg-neutral-100 rounded-full shadow-sm lg:hidden"></div>
        <Link
          to="/topics"
          className={
            pathname === "/topics"
              ? "m-auto px-6 h-12 bg-sky-200 rounded-lg shadow-sm hidden lg:flex"
              : "m-auto px-6 h-12 hover:bg-sky-200 rounded-lg hover:shadow-sm hidden lg:flex"
          }>
          <p className="m-auto text-3xl font-semibold">Forums</p>
        </Link>
      </div>
      <div className="m-auto flex">
        <div className="m-auto h-16 lg:h-12 w-16 lg:w-12 bg-neutral-100 rounded-full shadow-sm -translate-y-2 lg:hidden"></div>
        <Link
          to="/questions"
          className={
            pathname === "/questions"
              ? "m-auto px-6 h-12 bg-sky-200 rounded-lg shadow-sm hidden lg:flex"
              : "m-auto px-6 h-12 hover:bg-sky-200 rounded-lg hover:shadow-sm hidden lg:flex"
          }>
          <p className="m-auto text-3xl font-semibold">Questions</p>
        </Link>
      </div>
      <div className="m-auto flex">
        <div className="m-auto h-14 lg:h-12 w-14 lg:w-12 bg-neutral-100 rounded-full shadow-sm lg:hidden"></div>
        <Link
          to="/chats"
          className={
            pathname === "/chats"
              ? "m-auto px-6 h-12 bg-sky-200 rounded-lg shadow-sm hidden lg:flex"
              : "m-auto px-6 h-12 hover:bg-sky-200 rounded-lg hover:shadow-sm hidden lg:flex"
          }>
          <p className="m-auto text-3xl font-semibold">Chats</p>
        </Link>
      </div>
      <div className="m-auto flex lg:hidden">
        <div className="m-auto h-14 lg:h-12 w-14 lg:w-12 bg-neutral-100 rounded-full shadow-sm lg:hidden"></div>
      </div>
    </div>
  );
}
