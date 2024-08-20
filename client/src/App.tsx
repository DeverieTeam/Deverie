import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="bg-neutral-50 w-screen relative">
      <Header />
      <Navbar />
      <div className="mt-24 mb-[72px] lg:mt-16 lg:mb-0">
        <Outlet />
      </div>
    </div>
  );
}
