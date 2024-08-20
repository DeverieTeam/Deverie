import { Link } from "react-router-dom";

export default function WIPage() {
  return (
    <div className="text-center justify-between flex flex-col">
      <p className="my-8 text-xl lg:text-5xl font-bold">
        Cette page n'est pas encore prête !
      </p>
      <div className="m-auto lg:w-[50%] lg:max-w-[600px]">
        <img src="/src/assets/images/WIP.png" width="100%" />
      </div>
      <p className="my-8 text-lg lg:text-2xl font-semibold">
        Du contenu bientôt... <br />
        Ou pas, ça dépend... <br />
        Ça dépend, ça dépasse... <br />
        Mais ça bosse dur (peut-être) ! <br />
        En tout cas, pas grand chose à voir ici.
      </p>
      <div className="py-8">
        <Link
          className="bg-sky-100 text-xl lg:text-3xl font-semibold py-2 px-6 rounded-lg shadow-sm"
          to="/">
          Retour à la Page d'Accueil
        </Link>
      </div>
    </div>
  );
}
