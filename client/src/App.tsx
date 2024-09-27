import { Outlet, useLoaderData } from "react-router-dom";

import Header from "./components/Header";
import MobileNavbar from "./components/MobileNavbar";
import BackOfficeNavbar from "./components/BackOfficeNavbar";
import { appWebcontentType } from "./types/appWebcontentType";

export default function App({ isBackOfficeHeader }: Props) {
  const webcontent = useLoaderData() as appWebcontentType;

  return (
    <div className="bg-neutral-50 w-screen relative">
      <Header
        webcontent={{
          logo: webcontent.commons.logo,
          sections: webcontent.commons.sections,
          hypertexts: webcontent.commons.hypertexts,
          buttons: webcontent.commons.buttons,
          connection: webcontent.commons.connection,
          dropDownMenu: webcontent.commons.dropDownMenu,
        }}
        isBackOfficeHeader={isBackOfficeHeader}
      />
      {isBackOfficeHeader && webcontent.page ? (
        <BackOfficeNavbar webcontent={webcontent.page.sections} />
      ) : (
        <MobileNavbar />
      )}
      <div className="mt-16 mb-16 md:mb-0">
        <Outlet />
      </div>
    </div>
  );
}

type Props = {
  isBackOfficeHeader?: boolean;
};
