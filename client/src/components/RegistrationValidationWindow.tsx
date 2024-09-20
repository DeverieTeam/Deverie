import { Link } from "react-router-dom";
import { registrationvalidationwindowWebcontentType } from "../types/registrationvalidationwindowWebcontentType";

export default function RegistrationValidationWindow({
  usernameFieldData,
  webcontent,
}: Props) {
  return (
    <div className="absolute  h-[120%] w-[100%] bg-gray-400/60 z-20 -translate-y-16">
      <div className="h-[100%] w-[100%] relative">
        <div className="h-screen w-screen sticky top-16">
          <div className="mx-auto px-4 py-8 h-[530px] md:h-[500px] w-[290px] md:w-[500px] bg-neutral-50 translate-y-[20%] md:translate-y-[25%] xl:translate-y-[30%] justify-between rounded-lg shadow-sm shadow-gray-700 flex flex-col overflow-auto">
            <p className="text-center px-8 text-indigo-500 text-3xl md:text-4xl font-bold drop-shadow">
              {webcontent.welcomeTitle.content.replace(
                "{username}",
                usernameFieldData
              )}
            </p>
            <p className="text-center px-8 text-base md:text-2xl">
              {webcontent.mainText.content}
            </p>
            <div className="gap-4 md:gap-6 flex flex-col">
              <div className="justify-center flex">
                <Link
                  to={"/"}
                  className="py-1 px-4 md:px-8 text-center md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                >
                  {webcontent.exitButton.content}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  usernameFieldData: string;
  webcontent: registrationvalidationwindowWebcontentType;
};
