import { useEffect, useState } from "react";
import ThreadsDisplayer from "../components/ThreadsDisplayer";

export default function HomePage() {
  const [data, setData] = useState<
    | null
    | {
        id: number;
        author: {
          name: string;
          profile_picture: string;
        };
        tags: {
          id: number;
          name: string;
          icon: string;
        }[];
        creation_date: string;
        title: string;
        replies_count: number;
        last_message_date: string;
        results_length: null | number;
      }[]
  >(null);

  const [randomThread, setRandomThread] = useState<null | "popular" | "recent">(
    null
  );

  useEffect(() => {
    const random = Math.floor(Math.random() * 2);
    switch (random) {
      case 0:
        setRandomThread("popular");
        break;
      case 1:
        setRandomThread("recent");
        break;
      default:
        setRandomThread("popular");
        break;
    }
  }, []);

  const otherThread = () => {
    switch (randomThread) {
      case "popular":
        return "recent";
      case "recent":
        return "popular";
      default:
        return "recent";
    }
  };

  return (
    <div className="flex flex-col">
      <div className="xl:flex">
        <div className="xl:flex-1 py-8 flex">
          <img
            className="m-auto w-[300px] md:w-[600px] h-[200px] md:h-[400px] bg-neutral-100"
            src=""
          />
        </div>
        <div className="xl:flex-1">
          <div className="xl:mx-auto xl:max-w-[600px] gap-2 flex flex-col">
            <p className="mx-auto px-[10%] xl:mt-8 text-center text-indigo-500 text-2xl md:text-4xl font-semibold drop-shadow">
              Bienvenue sur Deverie
            </p>
            <p className="mx-auto px-[10%] text-center text-md md:text-xl mt-2 ">
              Deverie est un espace communautaire francophone, dédié aux
              développeurs de tous horizons.
              <br />
              Que vous soyez ici pour découvrir le monde du développement, mais
              aussi ses à côtés, pour partager votre avis sur certaines
              technologies, pour demander un coup de main, ou tout simplement
              pour discuter tranquillement, vous êtes au bon endroit !
            </p>
          </div>
          <div className="py-8 flex">
            <div className="mx-auto py-4 px-8 bg-neutral-100 gap-4 md:gap-8 rounded-lg shadow-sm shadow-neutral-400 flex flex-col md:flex-row">
              <p className="m-auto text-center text-md md:text-xl">
                Pas encore inscrit ?
              </p>
              <button className="bg-indigo-400 hover:bg-indigo-600 hover:text-white text-center text-md md:text-xl rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 px-8 py-2 font-semibold">
                Rejoignez-nous !
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex">
        <div className="flex-1 mx-8 flex flex-col">
          <p className="text-indigo-500 mt-4 mb-8 mx-auto text-center text-3xl font-semibold drop-shadow">
            {randomThread === "popular"
              ? "Les Forums et Questions les plus populaires"
              : "Les Forums et Questions les plus récent(e)s"}
          </p>
          {randomThread !== null && (
            <ThreadsDisplayer
              thread={randomThread}
              data={data}
              setData={setData}
            />
          )}
        </div>
        <div className="flex-1 mx-8 hidden lg:flex flex-col">
          <p className="text-indigo-500 mt-4 mb-8 mx-auto text-center text-3xl font-semibold drop-shadow">
            {randomThread === "recent"
              ? "Les Forums et Questions les plus populaires"
              : "Les Forums et Questions les plus récent(e)s"}
          </p>
          {randomThread !== null && (
            <ThreadsDisplayer
              thread={otherThread()}
              data={data}
              setData={setData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
