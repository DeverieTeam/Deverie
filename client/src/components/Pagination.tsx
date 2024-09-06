export default function Pagination({ webcontent }: Props) {
  return (
    <div className="gap-6 flex flex-col">
      <div className="text-center md:text-lg xl:text-xl">
        10 {webcontent.resultsOutOf.content} 63110
      </div>
      <div className="mb-12 flex">
        <div className="justify-between flex">
          <div className="gap-4 md:gap-6 flex">
            <button className="w-10 h-10 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center text-xl rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 font-bold">
              ⮜⮜
            </button>
            <button className="w-10 h-10 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center text-xl rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 font-bold">
              ⮜
            </button>
          </div>
        </div>
        <div className="flex-1 my-auto text-center md:text-lg xl:text-xl">
          {webcontent.pagesPrefix.content} 1/6311
        </div>
        <div className="justify-between flex">
          <div className="gap-4 md:gap-6 flex">
            <button className="w-10 h-10 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center text-xl rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 font-bold">
              ⮞
            </button>
            <button className="w-10 h-10 bg-indigo-400 hover:bg-indigo-600 self-center hover:text-white text-center text-xl rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900 font-bold">
              ⮞⮞
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  webcontent: {
    resultsOutOf: {
      name: string,
      content: string
    },
    pagesPrefix: {
      name: string,
      content: string
    }
  }
};
