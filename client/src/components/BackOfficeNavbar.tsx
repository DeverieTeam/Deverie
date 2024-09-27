import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useWindowDimensions from "../scripts/useWindowDimensions";
import { backOfficeNavbarWebcontentType } from "./types/backoffice/backOfficeNavbarWebcontentType";

export default function BackOfficeNavbar({
  webcontent,
}: Props) {

  const { windowWidth, windowHeight } = useWindowDimensions();

  const maximumBurgerMenuWidth = 768;
  
  const [isBurgerMenuDisplayed, setIsBurgerMenuDisplayed] = useState<boolean>(false);

  function handleBurgerMenuClicked() {
    setIsBurgerMenuDisplayed(!isBurgerMenuDisplayed);
  };

  const { pathname } = useLocation();

  return (
    <nav className="w-[20%] min-w-48 max-w-72 h-[calc(100vh-4rem)] float-left fixed md:relative z-10">
      {windowWidth >= maximumBurgerMenuWidth || isBurgerMenuDisplayed ?
        <div className="bg-gray-300 h-full p-3 pb-6 flex flex-col gap-4 overflow-y-scroll">
          {windowWidth < maximumBurgerMenuWidth
          ?
            <button
              className="h-12 w-12"
              onClick={handleBurgerMenuClicked}>
              <img src="/icons/cross.svg"/>
            </button>
          :
            <></>
          }
          <Link
            to='/backoffice'
            title={webcontent.home.hover.content}
            className={
            pathname === '/backoffice'
              ? "w-[90%] min-h-10 mt-5 mx-auto px-2 h-10 xl:px-6 xl:h-12 bg-indigo-600 text-white fill-white rounded-md shadow-sm shadow-indigo-900 flex items-center text-center justify-center"
              : "w-[90%] min-h-10 mt-5 mx-auto px-2 h-10 xl:px-6 xl:h-12 bg-indigo-400 hover:bg-indigo-600 hover:text-white hover:fill-white rounded-md shadow-sm shadow-indigo-700 hover:shadow-indigo-900 flex items-center text-center justify-center"
            }>
              {webcontent.home.text.content}
          </Link>
          <Link
            to='/backoffice/chats'
            title={webcontent.chats.hover.content}
            className={
            pathname === '/backoffice/chats'
              ? "w-[90%] min-h-10 mx-auto px-2 h-10 xl:px-6 xl:h-12 bg-indigo-600 text-white fill-white rounded-md shadow-sm shadow-indigo-900 flex items-center text-center justify-center"
              : "w-[90%] min-h-10 mx-auto px-2 h-10 xl:px-6 xl:h-12 bg-indigo-400 hover:bg-indigo-600 hover:text-white hover:fill-white rounded-md shadow-sm shadow-indigo-700 hover:shadow-indigo-900 flex items-center text-center justify-center"
            }>
              {webcontent.chats.text.content}
          </Link>
          <Link
            to='/backoffice/tags'
            title={webcontent.tags.hover.content}
            className={
            pathname === '/backoffice/tags'
              ? "w-[90%] min-h-10 mx-auto px-2 h-10 xl:px-6 xl:h-12 bg-indigo-600 text-white fill-white rounded-md shadow-sm shadow-indigo-900 flex items-center text-center justify-center"
              : "w-[90%] min-h-10 mx-auto px-2 h-10 xl:px-6 xl:h-12 bg-indigo-400 hover:bg-indigo-600 hover:text-white hover:fill-white rounded-md shadow-sm shadow-indigo-700 hover:shadow-indigo-900 flex items-center text-center justify-center"
            }>
              {webcontent.tags.text.content}
          </Link>
          <Link
            to='/backoffice/moderation'
            title={webcontent.moderation.hover.content}
            className={
            pathname === '/backoffice/moderation'
              ? "w-[90%] min-h-10 mx-auto px-2 h-10 xl:px-6 xl:h-12 bg-indigo-600 text-white fill-white rounded-md shadow-sm shadow-indigo-900 flex items-center text-center justify-center"
              : "w-[90%] min-h-10 mx-auto px-2 h-10 xl:px-6 xl:h-12 bg-indigo-400 hover:bg-indigo-600 hover:text-white hover:fill-white rounded-md shadow-sm shadow-indigo-700 hover:shadow-indigo-900 flex items-center text-center justify-center"
            }>
              {webcontent.moderation.text.content}
          </Link>
          <Link
            to='/backoffice/interface'
            title={webcontent.interface.hover.content}
            className={
            pathname === '/backoffice/interface'
              ? "w-[90%] min-h-10 mx-auto px-2 h-10 xl:px-6 xl:h-12 bg-indigo-600 text-white fill-white rounded-md shadow-sm shadow-indigo-900 flex items-center text-center justify-center"
              : "w-[90%] min-h-10 mx-auto px-2 h-10 xl:px-6 xl:h-12 bg-indigo-400 hover:bg-indigo-600 hover:text-white hover:fill-white rounded-md shadow-sm shadow-indigo-700 hover:shadow-indigo-900 flex items-center text-center justify-center"
            }>
              {webcontent.interface.text.content}
          </Link>
        </div>
        :
        <button
          className="m-3 h-12 w-12 float-left fixed z-10"
          onClick={handleBurgerMenuClicked}>
          <img src="/icons/burgerMenu.svg"/>
        </button>
      }
      </nav>
  );
}

type Props = {
  webcontent: backOfficeNavbarWebcontentType;
}
