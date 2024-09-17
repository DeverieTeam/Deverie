import { Outlet, useLoaderData } from "react-router-dom";
import Header from "./components/Header";
import MobileNavbar from "./components/MobileNavbar";
import { commonsWebcontentType } from "./types/commonsWebcontentType";

export default function App() {
  const webcontent = useLoaderData() as commonsWebcontentType;

  return (
    <div className="bg-neutral-50 w-screen relative">
      <Header
        webcontent={{
          logo: webcontent.logo,
          sections: webcontent.sections,
          hypertexts: webcontent.hypertexts,
          buttons: webcontent.buttons,
          connection: webcontent.connection,
        }}
      />
      <MobileNavbar />
      <div className="mt-16 mb-16 md:mb-0">
        <Outlet />
      </div>
    </div>
  );
}
