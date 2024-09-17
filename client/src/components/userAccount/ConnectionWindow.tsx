import { useNavigate } from "react-router-dom";
import { connectionwindowWebcontentType } from "../../types/connectionwindowWebcontentType";
import { useState } from "react";
import { useAuth } from "../../contexts/useAuth";

import Cookies from "universal-cookie";

export default function ConnectionWindow({
  setIsConnectionWindowDisplayed,
  webcontent,
}: Props) {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const exitConnectionWindow = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsConnectionWindowDisplayed(false);
  };

  const handleRegisterButton = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsConnectionWindowDisplayed(false);
    navigate("/register");
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const body = {
      login: login,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        const cookies = new Cookies(null, {
          path: "/",
          maxAge: result.expires_in,
        });
        cookies.set("JWT", result.access_token);
        setAuth(undefined);
        setIsConnectionWindowDisplayed(false);
      } else {
        console.error("Une erreur s'est produite");
      }
    } catch (error) {
      console.error("Une erreur s'est produite: ", error);
    }
  };

  return (
    <div
      className="absolute h-[120%] w-[100%] bg-gray-400/60 z-20 -translate-y-16"
      onClick={exitConnectionWindow}>
      <div className="h-[100%] w-[100%] relative">
        <div className="h-screen w-screen sticky top-16">
          <form
            className="mx-auto p-4 h-[500px] w-[300px] md:h-[600px] md:w-[400px] translate-y-[25%] md:translate-y-[15%] bg-neutral-50 rounded-lg shadow-sm shadow-gray-700 flex flex-col justify-between items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onSubmit={handleSubmit}>
            <div>
              <img
                className="mx-auto w-[300px] h-[180px] md:w-[350px] md:h-[230px] bg-neutral-100"
                src=""
              />
              <p className="text-center text-indigo-500 text-2xl md:text-3xl xl:text-4xl font-bold drop-shadow">
                {webcontent.connection.title.connectionPage.content}
              </p>
            </div>
            <div className="w-[100%] md:w-[90%] flex flex-row justify-between">
              <p className="w-[75%] md:w-auto">
                {webcontent.connection.fields.username.content}
              </p>
              <input
                className="px-2 w-[60%] md:w-[50%] focus:outline-none active:outline-none shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl"
                type="text"
                value={login}
                onChange={handleLoginChange}
              />
            </div>
            <div className="w-[100%] md:w-[90%] flex flex-row justify-between">
              <p className="w-[75%] md:w-auto">
                {webcontent.connection.fields.password.content}
              </p>
              <input
                className="px-2 w-[60%] md:w-[50%] focus:outline-none active:outline-none shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="w-[90%] flex flex-col items-center gap-1 md:flex-row">
              <p>{webcontent.connection.unregistered.prefix.content}</p>
              <button
                className="text-indigo-800 hover:text-indigo-500"
                title={webcontent.hypertexts.joinUs.hover.content}
                onClick={handleRegisterButton}>
                {webcontent.hypertexts.joinUs.text.content}
              </button>
            </div>
            <div className="flex justify-center gap-4 w-[100%]">
              <button
                className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                title={webcontent.buttons.cancelButton.hover.content}
                onClick={exitConnectionWindow}>
                {webcontent.buttons.cancelButton.text.content}
              </button>
              <button
                className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                title={webcontent.hypertexts.login.hover.content}
                type="submit">
                {webcontent.buttons.confirmButton.text.content}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

type Props = {
  setIsConnectionWindowDisplayed: (arg0: boolean) => void;
  webcontent: connectionwindowWebcontentType;
};
