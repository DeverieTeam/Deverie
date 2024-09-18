import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { dropdownmenuWebcontentType } from "../../types/dropdownmenuWebcontentType";
import Cookies from "universal-cookie";

export default function DropDownMenu({
  isDropDownMenuClicked,
  setIsDropDownMenuClicked,
  webcontent,
}: Props) {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const exitMenu = () => {
    setIsDropDownMenuClicked(!isDropDownMenuClicked);
  };

  const handleProfileButton = () => {
    navigate("/profile");
    setIsDropDownMenuClicked(!isDropDownMenuClicked);
  };

  const handleFavouritesButton = () => {
    navigate("/favourites");
    setIsDropDownMenuClicked(!isDropDownMenuClicked);
  };

  const handleBackofficeButton = () => {
    navigate("/backoffice");
    setIsDropDownMenuClicked(!isDropDownMenuClicked);
  };

  const handleLogoutButton = () => {
    const cookies = new Cookies(null, {
      path: "/",
    });
    cookies.remove("JWT");
    setAuth(undefined);

    setIsDropDownMenuClicked(!isDropDownMenuClicked);
  };

  return (
    <div
      className="absolute h-[120%] w-[100%] bg-transparent z-20 -translate-y-16"
      onClick={exitMenu}
    >
      <div className="h-[100%] w-[100%] relative">
        <div className="h-screen w-screen sticky top-16 flex flex-row-reverse">
          <div
            className=" mr-3 p-4 w-[270px] gap-1 bg-neutral-100 translate-y-[74px] justify-between rounded-lg text-lg shadow-sm shadow-gray-700 self-start flex flex-col"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              className="px-4 py-2 hover:bg-neutral-50 hover:shadow-sm hover:shadow-neutral-400 rounded-lg flex"
              onClick={handleProfileButton}
            >
              {webcontent.profile.content}
            </button>
            <button
              className="px-4 py-2 hover:bg-neutral-50 hover:shadow-sm hover:shadow-neutral-400 rounded-lg flex"
              onClick={handleFavouritesButton}
            >
              {webcontent.favourites.content}
            </button>
            {auth && auth.role === "administrator" && (
              <button
                className="px-4 py-2 hover:bg-neutral-50 hover:shadow-sm hover:shadow-neutral-400 rounded-lg flex"
                onClick={handleBackofficeButton}
              >
                {webcontent.backoffice.content}
              </button>
            )}
            <button
              className="px-4 py-2 hover:bg-neutral-50 hover:shadow-sm hover:shadow-neutral-400 rounded-lg flex"
              onClick={handleLogoutButton}
            >
              {webcontent.logout.content}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  isDropDownMenuClicked: boolean;
  setIsDropDownMenuClicked: (arg0: boolean) => void;
  webcontent: dropdownmenuWebcontentType;
};
