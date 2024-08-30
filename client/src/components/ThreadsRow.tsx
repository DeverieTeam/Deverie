export default function ThreadsRow({ post }: Props) {
  return (
    <div className="bg-neutral-100 hover:bg-white gap-2 p-4 rounded-lg shadow-sm shadow-neutral-400 flex">
      <div className="w-[35%] justify-between gap-2 flex flex-col">
        <div className="m-auto h-32 w-32 bg-neutral-200 hover:bg-white rounded-full shadow-sm shadow-neutral-500 flex">
          <img
            className="m-auto h-[120px] w-[120px] rounded-full bg-neutral-100"
            src=""
          />
        </div>
        <div className="text-center text-lg">{post.author}</div>
        <div className="m-auto gap-2 flex flex-wrap">
          {post.tags.map((tag) => (
            <div className="m-auto gap-1 flex">
              <img
                key={tag.id}
                className="m-auto h-6 w-6 bg-neutral-100"
                src={tag.icon}
              />
              <p className="">{tag.name}</p>
            </div>
          ))}
        </div>
        <div className="text-center">Posté le : {post.date}</div>
      </div>
      <div className="flex-1 justify-between gap-2 flex flex-col">
        <div className="text-center text-2xl">{post.title}</div>
        <div className="flex">
          <div className="flex-1 justify-between flex flex-col">
            <div className="text-center">Réponses : {post.replies_count}</div>
            <div className="text-center">
              Dernière réponse le : {post.last_message_date}
            </div>
          </div>
          <div className="m-auto w-12 h-12 flex ">
            <img className="m-auto h-10 w-10 bg-neutral-100" src="" />
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  post: {
    id: number;
    author: string;
    profile_picture: string;
    tags: {
      id: number;
      name: string;
      icon: string;
    }[];
    date: string;
    title: string;
    replies_count: number;
    last_message_date: string;
  };
};
