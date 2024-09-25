import { postviewpageWebcontentType } from "../types/postviewpageWebcontentType";
import RepliesRow from "./RepliesRow";

export default function RepliesDisplayer({
  repliesId,
  sort,
  setSourcePostId,
  setIsNewReplyWindowOpened,
  setIsConnectionNeededClicked,
  webcontent,
}: Props) {
  return (
    <div className="w-full">
      {repliesId.map((replyId) => (
        <RepliesRow
          setSourcePostId={setSourcePostId}
          setIsNewReplyWindowOpened={setIsNewReplyWindowOpened}
          setIsConnectionNeededClicked={setIsConnectionNeededClicked}
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
  setSourcePostId: (arg0: number) => void;
  setIsNewReplyWindowOpened: (arg0: boolean) => void;
  setIsConnectionNeededClicked: (arg0: boolean) => void;
  webcontent: postviewpageWebcontentType;
};
