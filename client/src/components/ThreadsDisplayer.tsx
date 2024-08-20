import { useEffect, useState } from "react";
import ThreadsRow from "./ThreadsRow";
import { fakeData1, fakeData2 } from "../assets/fakeData";

export default function ThreadsDisplayer({ thread }: Props) {
  const [data, setData] = useState(fakeData1);

  useEffect(() => {
    switch (thread) {
      case "populaires":
        setData(fakeData1);
        break;
      case "récent(e)s":
        setData(fakeData2);
        break;
      default:
        break;
    }
  }, [thread]);

  return (
    <div className="w-full p-4 text-center flex flex-col">
      <p className="pb-4 text-2xl font-semibold">
        Forums et Questions {thread}
      </p>
      {data && data.map((item) => <ThreadsRow key={item.id} post={item} />)}
    </div>
  );
}

type Props = {
  thread: "populaires" | "récent(e)s";
};
