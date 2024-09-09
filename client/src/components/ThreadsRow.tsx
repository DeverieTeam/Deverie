export default function ThreadsRow({ post, webcontent }: Props) {
  return (
    <button className="bg-neutral-100 hover:bg-white gap-2 p-1 md:p-4 rounded-lg shadow-sm shadow-neutral-400 flex">
      <div className="w-[35%] justify-between gap-1 md:gap-2 flex flex-col">
        <div className="m-auto h-14 md:h-32 w-14 md:w-32 bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-neutral-500 flex">
          <img
            className="m-auto h-12 md:h-[120px] w-12 md:w-[120px] rounded-full bg-transparent"
            src={post.author.profile_picture}
          />
        </div>
        <div className="text-center md:text-xl font-semibold text-indigo-500">
          {post.author.name}
        </div>
        <div className="w-[50px] md:w-[210px] place-self-center gap-2 flex flex-wrap">
          {post.tags.map((tag) => (
            <div key={tag.id} className="m-auto gap-1 flex">
              <img
                className="m-auto h-5 w-5 bg-neutral-100 rounded-lg"
                src={tag.icon}
              />
              <p className="m-auto text-sm hidden md:flex">{tag.name}</p>
            </div>
          ))}
        </div>
        <div className="text-center text-xs md:text-base">
          {webcontent.publishDatePrefix.content} : {post.creation_date}
        </div>
      </div>
      <div className="flex-1 justify-between gap-1 md:gap-2 flex flex-col">
        <div className="pt-2 md:pt-4 text-center text-lg md:text-2xl">
          {post.title}
        </div>
        <div className="flex">
          <div className="flex-1 justify-between flex flex-col">
            <div className="text-center text-xs md:text-base">
              {webcontent.numberOfResponses.content} : {post.replies_count}
            </div>
            <div className="text-center text-xs md:text-base">
              {webcontent.lastResponseDatePrefix.content} :{" "}
              {post.last_message_date}
            </div>
          </div>
          <div className="m-auto w-6 md:w-10 h-6 md:h-10 flex ">
            <img
              className="m-auto w-5 md:w-8 h-5 md:h-8 bg-transparent"
              src="/public/icons/favourite.svg"
              title={webcontent.favorite.add.hover.content}
            />
          </div>
        </div>
      </div>
    </button>
  );
}

type Props = {
  post: {
    id: number;
    author: { name: string; profile_picture: string };
    tags: {
      id: number;
      name: string;
      icon: string;
    }[];
    creation_date: string;
    title: string;
    replies_count: number;
    last_message_date: string;
  };
  webcontent: {
    publishDatePrefix: {
      name: string;
      content: string;
    };
    numberOfResponses: {
      name: string;
      content: string;
    };
    lastResponseDatePrefix: {
      name: string;
      content: string;
    };
    favorite: {
      add: {
        hover: {
          name: string;
          content: string;
        };
      };
      remove: {
        hover: {
          name: string;
          content: string;
        };
      };
    };
  };
};
