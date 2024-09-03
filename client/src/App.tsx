import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import MobileNavbar from "./components/MobileNavbar";

export default function App() {
  return (
    <div className="bg-neutral-50 w-screen relative">
      <Header />
      <MobileNavbar />
      <div className="mt-16 mb-16 md:mb-0">
        <Outlet />
      </div>
    </div>
  );
}
