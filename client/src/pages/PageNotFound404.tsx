import { Link } from "react-router-dom";

export default function PageNotFound404() {
  return (
    <div className="text-center justify-between flex flex-col">
      <p className="my-8 text-3xl lg:text-5xl font-bold">Page Not Found</p>
      <div className="m-auto lg:w-[50%] lg:max-w-[600px]">
        <img src="/src/assets/images/error-404.png" width="100%" />
      </div>
      <p className="my-8 text-lg lg:text-2xl font-semibold">
        La classique erreur 404... <br />
        Peut-être la page n'existe-t-elle plus ? <br />
        S'est perdue dans la forêt ? <br />
        Ou a disparu dans le vide intersidéral ? <br />
        En tout cas, pas grand chose à voir ici.
      </p>
      <div className="py-8">
        <Link
          className="bg-indigo-400 hover:bg-indigo-600 text-xl lg:text-3xl hover:text-white font-semibold py-2 px-6 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
          to="/">
          Retour à la Page d'Accueil
        </Link>
      </div>
    </div>
  );
}
