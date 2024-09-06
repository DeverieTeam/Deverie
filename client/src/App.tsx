import { Outlet, useLoaderData } from "react-router-dom";
import Header from "./components/Header";
import MobileNavbar from "./components/MobileNavbar";

export default function App() {

const webcontent = useLoaderData();

  return (
    <div className="bg-neutral-50 w-screen relative">
      <Header webcontent={{sections: webcontent.commons.sections, hypertexts: webcontent.commons.hypertexts}}/>
      <MobileNavbar />
      <div className="mt-16 mb-16 md:mb-0">
        <Outlet />
      </div>
    </div>
  );
}
