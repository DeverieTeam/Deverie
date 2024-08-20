import { Link } from "react-router-dom";
import ThreadsDisplayer from "../components/ThreadsDisplayer";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex-1 p-8 hidden lg:flex">
          <img className="m-auto h-full w-full bg-neutral-100" src="" />
        </div>
        <div className="flex-1 flex flex-row-reverse">
          <div className="w-[75%] lg:w-[90%] bg-sky-100 rounded-lg px-4 lg:p-8 py-2 mr-2 lg:mr-8 mb-8 mt-16 shadow-sm relative">
            <div className="h-6 w-6 bg-sky-100 rounded-full absolute top-0 left-0 -translate-y-[56px] -translate-x-[74px] shadow-sm"></div>
            <div className="h-12 w-12 bg-sky-100 rounded-full absolute top-0 left-0 -translate-y-[40px] -translate-x-[50px] shadow-sm"></div>
            <p className="text-center text-xl lg:text-3xl lg:font-semibold">
              Message d'accueil du site
            </p>
            <p className="text-center text-sm lg:text-xl mt-2 lg:mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
              risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
              nec, ultricies sed, dolor.
            </p>
            <div className="w-full pt-8 hidden lg:flex lg:flex-row-reverse">
              <div className="bg-neutral-50 rounded-md shadow-sm py-6 px-6 gap-6 flex">
                <p className="m-auto text-center text-xl">
                  Pas encore inscrit ?
                </p>
                <div className="bg-sky-200 text-center text-xl rounded-md shadow-sm px-4 py-2 font-semibold">
                  Rejoignez-nous !
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row">
        <div className="flex-1 pl-8 pb-8 hidden lg:flex">
          <div className="w-full bg-neutral-100">
            <ThreadsDisplayer thread="populaires" />
          </div>
        </div>
        <div className="h-[320px] flex-1 lg:flex-initial lg:w-[15%] flex flex-col">
          <div className="my-auto flex flex-row-reverse">
            <Link
              to="/topics"
              className="py-4 w-[75%] bg-sky-100 hover:bg-sky-200 rounded-l-lg text-center text-xl lg:text-2xl lg:font-semibold shadow-sm ">
              Forums
            </Link>
          </div>
          <div className="my-auto flex">
            <Link
              to="/questions"
              className="py-4 w-[75%] bg-sky-100 hover:bg-sky-200 rounded-r-lg text-center text-xl lg:text-2xl lg:font-semibold shadow-sm ">
              Questions
            </Link>
          </div>
          <div className="my-auto flex flex-row-reverse">
            <Link
              to="/chats"
              className="py-4 w-[75%] bg-sky-100 hover:bg-sky-200 rounded-l-lg text-center text-xl lg:text-2xl lg:font-semibold shadow-sm ">
              Chats
            </Link>
          </div>
        </div>

        <div className="flex-1 pr-8 pb-8 hidden lg:flex">
          <div className="w-full bg-neutral-100">
            <ThreadsDisplayer thread="récent(e)s" />
          </div>
        </div>
      </div>
    </div>
  );
}
