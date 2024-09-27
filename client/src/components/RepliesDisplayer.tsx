import { postviewpageWebcontentType } from "../types/postviewpageWebcontentType";
import RepliesRow from "./RepliesRow";

export default function RepliesDisplayer({
  repliesId,
  sort,
  setSourcePostId,
  setIsNewReplyWindowOpened,
  setIsConnectionNeededClicked,
  setPostId,
  setPostContent,
  setIsPostEditWindowOpened,
  setPostType,
  setIsPostDeletionWindowOpened,
  postIsOpened,
  setMemberId,
  setIsMemberViewWindowOpened,
  webcontent,
}: Props) {
  return (
    <div className="w-full">
      {repliesId.map((replyId) => (
        <RepliesRow
          setSourcePostId={setSourcePostId}
          setIsNewReplyWindowOpened={setIsNewReplyWindowOpened}
          setIsConnectionNeededClicked={setIsConnectionNeededClicked}
          setPostId={setPostId}
          setPostContent={setPostContent}
          setIsPostEditWindowOpened={setIsPostEditWindowOpened}
          setPostType={setPostType}
          setIsPostDeletionWindowOpened={setIsPostDeletionWindowOpened}
          postIsOpened={postIsOpened}
          setMemberId={setMemberId}
          setIsMemberViewWindowOpened={setIsMemberViewWindowOpened}
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
  setPostId: (arg0: number) => void;
  setPostContent: (arg0: string) => void;
  setIsPostEditWindowOpened: (arg0: boolean) => void;
  setPostType: (arg0: string) => void;
  setIsPostDeletionWindowOpened: (arg0: boolean) => void;
  postIsOpened: boolean;
  setMemberId: (arg0: number) => void;
  setIsMemberViewWindowOpened: (arg0: boolean) => void;
  webcontent: postviewpageWebcontentType;
};
