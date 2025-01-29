import { useState, useEffect } from "react";
import { postViewPageWebcontentType } from "../types/pages/postViewPageWebcontentType";
import PostDeletionWindow from "./windows/PostDeletionWindow";
import RepliesRow from "./RepliesRow";

export default function RepliesDisplayer({
  data,
  sort,
  isPostOpened,
  setIsConnectionNeededClicked,
  webcontent,
}: Props) {

  const [localData, setLocalData] = useState<null | {
    id: number;
    author: {
      id: number;
      name: string;
      profile_picture: string;
      is_banned: boolean;
      role: "member" | "moderator" | "administrator";
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
    is_readable: boolean;
    is_favourited_by: null | number[];
    modification_date: string;
    modification_author: null | string;
    emergency: null | number;
    results_length: null | number;
    replies: null | { id: number }[];
  }>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const [postToDelete, setPostToDelete] = useState<number>(0);
  const [isPostDeletionWindowOpened, setIsPostDeletionWindowOpened] = useState<boolean>(false);

  const handleDelete = (postId: number) => {
    if (postId) {
      setPostToDelete(postId);
      setIsPostDeletionWindowOpened(true);
    }
  };

  return (
    <>
      <div className="w-full">
        {localData.replies.map((replyId) => (
          <RepliesRow
            key={replyId.id}
            id={replyId.id}
            sort={sort}
            handleDelete={handleDelete}
            isPostOpened={isPostOpened}
            setIsConnectionNeededClicked={setIsConnectionNeededClicked}
            webcontent={webcontent}
          />
        ))}
      </div>
      {isPostDeletionWindowOpened && postToDelete && (
        <PostDeletionWindow
          setIsSelfOpened={setIsPostDeletionWindowOpened}
          postId={postToDelete}
          data={localData}
          setData={setLocalData}
          webcontent={webcontent}
        />
      )}
    </>
  );
}

type Props = {
  data: {
    id: number;
    author: {
      id: number;
      name: string;
      profile_picture: string;
      is_banned: boolean;
      role: "member" | "moderator" | "administrator";
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
    is_readable: boolean;
    is_favourited_by: null | number[];
    modification_date: string;
    modification_author: null | string;
    emergency: null | number;
    results_length: null | number;
    replies: null | { id: number }[];
  };
  sort: string;
  isPostOpened: boolean;
  setIsConnectionNeededClicked: (arg0: boolean) => null;
  webcontent: postViewPageWebcontentType;
};
