export default function PostPagination({
  data,
  pagination,
  setPagination,
  webcontent,
}: Props) {
  return (
    <div className="gap-6 flex flex-col">
      <div className="text-center md:text-lg xl:text-xl">
        {data !== null && data.replies !== null && data.replies.length}{" "}
        {webcontent.answer.content}
        {data !== null && data.replies !== null && data.replies.length === 1
          ? ""
          : "s"}{" "}
        {webcontent.outOf.content}{" "}
        {data !== null && data.results_length !== null && data.results_length}
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
          {data !== null && data.results_length !== null
            ? Math.ceil(data.results_length / 10)
            : "????"}
        </div>
        <div className="justify-between flex">
          <div className="gap-4 md:gap-6 flex">
            <button
              className="w-10 h-10 bg-indigo-400 enabled:hover:bg-indigo-600 self-center enabled:hover:text-white disabled:text-gray-400 text-center text-xl rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 font-bold"
              disabled={
                data !== null &&
                data.results_length !== null &&
                pagination === Math.ceil(data.results_length / 10)
              }
              onClick={() => {
                setPagination(pagination + 1);
              }}>
              ⮞
            </button>
            <button
              className="w-10 h-10 bg-indigo-400 enabled:hover:bg-indigo-600 self-center enabled:hover:text-white disabled:text-gray-400 text-center text-xl rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 font-bold"
              disabled={
                data !== null &&
                data.results_length !== null &&
                pagination === Math.ceil(data.results_length / 10)
              }
              onClick={() => {
                if (data !== null && data.results_length !== null) {
                  setPagination(Math.ceil(data.results_length / 10));
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
  data: null | {
    id: number;
    author: {
      id: number;
      name: string;
      profile_picture: string;
    };
    tags: {
      id: number;
      name: string;
      icon: string;
    }[];
    creation_date: string;
    type: "topic" | "question";
    title: string;
    content: string;
    is_opened: boolean;
    modification_date: string;
    modification_author: null | string;
    emergency: null | number;
    results_length: null | number;
    replies: null | { id: number }[];
  };
  pagination: number;
  setPagination: (arg0: number) => void;
  webcontent: {
    result: {
      name: string;
      content: string;
    };
    answer: {
      name: string;
      content: string;
    };
    outOf: {
      name: string;
      content: string;
    };
    pagesPrefix: {
      name: string;
      content: string;
    };
  };
};
