import { useRouteError } from "react-router-dom";

export default function ErrorHandlerPage({ language }: Props) {
  const pageData = {
    fr: {
      tabTitle: 'Erreur',
      buttonText: 'Recharger la page',
      type: {
        fetch: {
          title: 'Erreur serveur',
          description: 'Le serveur est en train de redémarrer, un peu de patience...',
        },
        other: {
          title: 'Erreur interne',
          description: 'Quelque chose s\'est mal passé',
        }
      }
    }
  };
  document.title = `${pageData[language].tabTitle} - Deverie`;

  const error = useRouteError();
  const webcontent = (error.message.includes('fetch') ? pageData[language].type.fetch : pageData[language].type.other);

  return (
    <div className="text-center justify-between flex flex-col">
      <p className="my-8 text-xl lg:text-5xl font-bold">
        {webcontent.title}
      </p>
      <div className="m-auto w-[240px] h-[240px] lg:w-[400px] lg:h-[400px]">
        <img
          src={'/images/' + (error.message.includes('fetch') ? 'server-error.svg' : 'intern-error.svg')}
          width="100%"
        />
      </div>
      <p className="my-8 text-lg lg:text-2xl font-semibold">
        {webcontent.description}
      </p>
      <div className="py-8">
        <button
          className="bg-indigo-400 hover:bg-indigo-600 text-xl lg:text-3xl hover:text-white font-semibold py-2 px-6 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
          onClick={() => window.location.reload()}>
          {pageData[language].buttonText}
        </button>
      </div>
    </div>
  );
}

type Props = {
  language: string;
}
