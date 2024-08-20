export default function ThreadsRow({ post }: Props) {
  return (
    <div className="w-full py-1 odd:bg-neutral-100 even:bg-neutral-50 flex">
      <div className="w-[40%] border-r justify-between flex flex-col">
        <div className="flex-1 flex">
          <div className="w-20 pl-1 flex">
            <div className="m-auto h-16 w-16 bg-neutral-200 rounded-full shadow-sm" />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="mx-1">{post.author}</div>
            <div className="m-auto w-[52px] gap-1 flex flex-wrap">
              {post.tags.map((tag) => (
                <img
                  key={tag.id}
                  className="m-auto h-6 w-6 bg-neutral-100"
                  src={tag.icon}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mx-1 mt-1 border-t">
          <div className="text-sm">Posté le : {post.date}</div>
        </div>
      </div>
      <div className="flex-1 justify-between px-1 flex flex-col">
        <div className="text-lg px-2 pt-1">{post.title}</div>
        <div className="justify-between mt-1 pt-1 px-1 border-t flex">
          <div className="text-xs">Réponses : {post.replies_count}</div>
          <div className="text-xs">
            Dernière réponse le : {post.last_message_date}
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
