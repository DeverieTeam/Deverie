import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-neutral-50 w-full h-24 lg:h-16 gap-4 lg:gap-0 fixed top-0 z-10 lg:shadow-sm flex">
      <div className="pl-2 bg-sky-100 flex-1 rounded-br-[90px] lg:rounded-br-none shadow-sm lg:shadow-none flex">
        <Link to="/" className="flex">
          <img className="my-auto h-16 lg:h-12 w-16 bg-neutral-100" src="" />
          <p className="pl-4 my-auto text-3xl lg:text-4xl font-bold text-sky-600">
            Deverie
          </p>
        </Link>
      </div>
      <div className="bg-transparent lg:bg-sky-100 w-24 flex">
        <div className="m-auto h-20 lg:h-12 w-20 lg:w-12 bg-neutral-100 rounded-full shadow-sm relative flex">
          <p className="m-auto text-sm lg:text-lg lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-translate-x-28">
            Connexion
          </p>
        </div>
      </div>
    </div>
  );
}
