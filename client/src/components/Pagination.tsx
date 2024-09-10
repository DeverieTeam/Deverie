export default function Pagination({
  dataForPage,
  pagination,
  setPagination,
  webcontent,
}: Props) {
  return (
    <div className="gap-6 flex flex-col">
      <div className="text-center md:text-lg xl:text-xl">
        {dataForPage !== null && dataForPage.length} résultat
        {dataForPage !== null && dataForPage.length === 1 ? "" : "s"}{" "}
        {webcontent.resultsOutOf.content}{" "}
        {dataForPage !== null &&
          dataForPage[0].results_length !== null &&
          dataForPage[0].results_length}
      </div>
      <div className="mb-12 flex">
        <div className="justify-between flex">
          <div className="gap-4 md:gap-6 flex">
            <button
              className="w-10 h-10 bg-indigo-400 enabled:hover:bg-indigo-600 self-center enabled:hover:text-white disabled:text-gray-400 text-center text-xl rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 font-bold"
              disabled={pagination === 1}
              onClick={() => {
                setPagination(1);
              }}>
              ⮜⮜
            </button>
            <button
              className="w-10 h-10 bg-indigo-400 enabled:hover:bg-indigo-600 self-center enabled:hover:text-white disabled:text-gray-400 text-center text-xl rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 font-bold"
              disabled={pagination === 1}
              onClick={() => {
                setPagination(pagination - 1);
              }}>
              ⮜
            </button>
          </div>
        </div>
        <div className="flex-1 my-auto text-center md:text-lg xl:text-xl">
          {webcontent.pagesPrefix.content} {pagination}/
          {dataForPage !== null && dataForPage[0].results_length !== null
            ? Math.ceil(dataForPage[0].results_length / 10)
            : "????"}
        </div>
        <div className="justify-between flex">
          <div className="gap-4 md:gap-6 flex">
            <button
              className="w-10 h-10 bg-indigo-400 enabled:hover:bg-indigo-600 self-center enabled:hover:text-white disabled:text-gray-400 text-center text-xl rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 font-bold"
              disabled={
                dataForPage !== null &&
                dataForPage[0].results_length !== null &&
                pagination === Math.ceil(dataForPage[0].results_length / 10)
              }
              onClick={() => {
                setPagination(pagination + 1);
              }}>
              ⮞
            </button>
            <button
              className="w-10 h-10 bg-indigo-400 enabled:hover:bg-indigo-600 self-center enabled:hover:text-white disabled:text-gray-400 text-center text-xl rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 font-bold"
              disabled={
                dataForPage !== null &&
                dataForPage[0].results_length !== null &&
                pagination === Math.ceil(dataForPage[0].results_length / 10)
              }
              onClick={() => {
                if (
                  dataForPage !== null &&
                  dataForPage[0].results_length !== null
                ) {
                  setPagination(Math.ceil(dataForPage[0].results_length / 10));
                }
              }}>
              ⮞⮞
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  dataForPage:
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
      }[];
  pagination: number;
  setPagination: (arg0: number) => void;
  webcontent: {
    resultsOutOf: {
      name: string;
      content: string;
    };
    pagesPrefix: {
      name: string;
      content: string;
    };
  };
};
