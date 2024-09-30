import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { useLoaderData, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { profilepageWebcontentType } from "../types/profilepageWebcontentType";
import DescriptionEditWindow from "../components/DescriptionEditWindow";

export default function ProfilePage() {
  const [isDescriptionEditWindowOpened, setIsDescriptionEditWindowOpened] =
    useState<boolean>(false);

  const [data, setData] = useState<null | {
    id: number;
    name: string;
    email: string;
    is_email_displayed: boolean;
    profile_picture: string;
    pronouns?: string;
    description?: string;
    displayed_name: string;
    theme: string;
    language: string;
  }>(null);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const webcontent = useLoaderData() as profilepageWebcontentType;

  useEffect(() => {
    if (auth && auth.role && auth.role === "client") {
      navigate("/");
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (data === null && auth && auth.id) {
      const cookies = new Cookies(null, {
        path: "/",
      });
      const jwt = cookies.get("JWT");

      fetch(`http://localhost:3000/member/profile/${auth.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
        });
    }
  }, [data, auth]);

  const handleDescriptionEditButton = () => {
    if (data && auth !== undefined && auth.role !== "client") {
      setIsDescriptionEditWindowOpened(true);
    }
  };

  const handleFavouritesButton = () => {
    navigate("/favourites");
  };

  const handleLogoutButton = () => {
    const cookies = new Cookies(null, {
      path: "/",
    });
    cookies.remove("JWT");
    setAuth(undefined);
    navigate("/");
  };

  const handleReturnButton = () => {
    navigate("/");
  };

  return (
    <div className="w-full relative flex flex-col pb-20">
      <div className="md:mx-auto md:w-[600px] xl:w-[1200px] flex flex-col">
        <p className="mx-auto mt-4 text-center text-indigo-500 text-4xl md:text-5xl font-bold drop-shadow">
          {webcontent.page.profileTitle.content}
        </p>
        <div className="mt-6 flex flex-col xl:flex-row xl:flex-wrap">
          <div className="px-2 xl:px-6 xl:w-[50%] gap-3 flex flex-col">
            <p className="text-lg md:text-2xl">
              {webcontent.page.informations.content}
            </p>
            <div className="pl-2 md:pl-4 justify-between flex">
              <p className="text-sm md:text-lg">
                {webcontent.page.usernameTitle.content}
              </p>
              <p className="text-sm md:text-lg">{data?.name}</p>
            </div>
            <div className="pl-2 md:pl-4 justify-between flex">
              <p className="text-sm md:text-lg">
                {webcontent.page.emailTitle.content}
              </p>
              <p className="text-sm md:text-lg">{data?.email}</p>
            </div>
            <div className="pl-2 md:pl-4 justify-between flex">
              <p className="my-auto text-sm md:text-lg">
                {webcontent.page.emailDisplayTitle.content}
              </p>
              <div className="my-auto gap-3 flex">
                <p className="my-auto text-sm md:text-lg">
                  {data?.is_email_displayed
                    ? webcontent.page.yes.content
                    : webcontent.page.no.content}
                </p>
                <button
                  className="my-auto w-7 md:w-8 h-7 md:h-8 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                  // onClick={handleDisplayMailEditButton}
                >
                  <svg
                    width="800px"
                    height="800px"
                    className="m-auto w-5 md:w-6 h-5 md:h-6
                bg-transparent"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="pl-2 md:pl-4 justify-between flex">
              <p className="my-auto text-sm md:text-lg">
                {webcontent.page.passwordTitle.content}
              </p>
              <div className="my-auto gap-3 flex">
                <p className="my-auto text-sm md:text-lg">
                  {webcontent.page.passwordPlaceholder.content}
                </p>
                <button
                  className="my-auto w-7 md:w-8 h-7 md:h-8 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                  // onClick={handlePasswordEditButton}
                >
                  <svg
                    width="800px"
                    height="800px"
                    className="m-auto w-5 md:w-6 h-5 md:h-6
                bg-transparent"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="pl-2 md:pl-4 justify-between flex">
              <p className="my-auto text-sm md:text-lg">
                {webcontent.page.pronounsTitle.content}
              </p>
              <div className="my-auto gap-3 flex">
                <p className="my-auto text-sm md:text-lg">
                  {data?.pronouns
                    ? data.pronouns
                    : webcontent.page.unknown.content}
                </p>
                <button
                  className="my-auto w-7 md:w-8 h-7 md:h-8 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                  // onClick={handlePronounsEditButton}
                >
                  <svg
                    width="800px"
                    height="800px"
                    className="m-auto w-5 md:w-6 h-5 md:h-6
                bg-transparent"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="pl-2 md:pl-4 justify-between flex">
              <p className="my-auto text-sm md:text-lg">
                {webcontent.page.descriptionTitle.content}
              </p>
              <button
                className="my-auto w-7 md:w-8 h-7 md:h-8 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                onClick={handleDescriptionEditButton}
              >
                <svg
                  width="800px"
                  height="800px"
                  className="m-auto w-5 md:w-6 h-5 md:h-6
                bg-transparent"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p className="mx-3 md:mx-6 bg-neutral-100 px-2 py-4 rounded-lg shadow-sm shadow-neutral-400 text-center md:text-xl">
              {data?.description
                ? data.description
                : webcontent.page.descriptionPlaceholder.content}
            </p>
          </div>
          <div className="mt-6 xl:mt-0 px-2 xl:px-6 xl:w-[50%] gap-3 flex flex-col">
            <div className="pl-2 md:pl-4 justify-between flex">
              <p className="my-auto text-sm md:text-lg">
                {webcontent.page.profilePictureTitle.content}
              </p>
              <button
                className="my-auto w-7 md:w-8 h-7 md:h-8 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                // onClick={handleProfilePictureEditButton}
              >
                <svg
                  width="800px"
                  height="800px"
                  className="m-auto w-5 md:w-6 h-5 md:h-6
                bg-transparent"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <img
              className="mx-auto mb-6 h-24 md:h-[180px] xl:h-[240px] w-24 md:w-[180px] xl:w-[240px] rounded-full bg-transparent"
              src={data?.profile_picture}
            />
            <p className="text-lg md:text-2xl">
              {webcontent.page.otherOptions.content}
            </p>
            <div className="pl-2 md:pl-4 justify-between flex">
              <p className="my-auto text-sm md:text-lg">
                {webcontent.page.displayTheme.content}
              </p>
              <div className="w-36 md:w-40 py-1 px-1 text-center justify-center text-lg gap-2 bg-neutral-100 rounded-lg shadow-sm shadow-neutral-400 flex">
                <select className="px-1 text-sm md:text-lg bg-neutral-100 cursor-pointer">
                  <option className="" value="light">
                    {webcontent.page.lightMode.content}
                  </option>
                </select>
              </div>
            </div>
            <div className="pl-2 md:pl-4 justify-between flex">
              <p className="my-auto text-sm md:text-lg">
                {webcontent.page.language.content}
              </p>
              <div className="w-36 md:w-40 py-1 px-1 text-center justify-center text-lg gap-2 bg-neutral-100 rounded-lg shadow-sm shadow-neutral-400 flex">
                <select className="px-1 text-sm md:text-lg bg-neutral-100 cursor-pointer">
                  <option className="" value="french">
                    {webcontent.page.french.content}
                  </option>
                </select>
              </div>
            </div>
            <div className="pl-2 md:pl-4 justify-between flex">
              <p className="my-auto text-sm md:text-lg">
                {webcontent.page.displayedNameTitle.content}
              </p>
              <div className="my-auto gap-3 flex">
                <p className="my-auto text-sm md:text-lg">
                  {data?.displayed_name
                    ? data.displayed_name
                    : webcontent.page.unknown.content}
                </p>
                <button
                  className="my-auto w-7 md:w-8 h-7 md:h-8 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                  // onClick={handleDisplayedNameEditButton}
                >
                  <svg
                    width="800px"
                    height="800px"
                    className="m-auto w-5 md:w-6 h-5 md:h-6
                bg-transparent"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-12 gap-4 md:gap-6 xl:w-full flex flex-col">
            <button
              className="mx-auto py-1 px-8 text-center text-lg md:text-2xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
              // onClick={handleTagsButton}
            >
              {webcontent.page.tagsButton.content}
            </button>
            <button
              className="mx-auto py-1 px-8 text-center text-lg md:text-2xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
              onClick={handleFavouritesButton}
            >
              {webcontent.page.favouriteButton.content}
            </button>
            <button
              className="mx-auto py-1 px-8 text-center text-lg md:text-2xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
              onClick={handleLogoutButton}
            >
              {webcontent.page.disconnectButton.content}
            </button>
            <button
              className="mx-auto py-1 px-8 text-center text-lg md:text-2xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
              onClick={handleReturnButton}
            >
              {webcontent.page.returnButton.content}
            </button>
          </div>
        </div>
      </div>
      {data && isDescriptionEditWindowOpened && (
        <DescriptionEditWindow
          setIsDescriptionEditWindowOpened={setIsDescriptionEditWindowOpened}
          previousContent={data.description}
          webcontent={webcontent}
        />
      )}
    </div>
  );
}
