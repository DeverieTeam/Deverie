import { postviewpageWebcontentType } from "../types/postviewpageWebcontentType";
import RepliesRow from "./RepliesRow";

export default function RepliesDisplayer({
  repliesId,
  sort,
  webcontent,
}: Props) {
  return (
    <div className="w-full">
      {repliesId.map((replyId) => (
        <RepliesRow
          key={replyId.id}
          id={replyId.id}
          sort={sort}
          webcontent={webcontent}
        />
      ))}
    </div>
  );
}

type Props = {
  repliesId: { id: number }[];
  sort: string;
  webcontent: postviewpageWebcontentType;
};
