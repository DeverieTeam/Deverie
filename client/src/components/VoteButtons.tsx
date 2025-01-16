import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import Cookies from "universal-cookie";

export default function VoteButtons({
  data,
  setData,
  setIsConnectionNeededClicked,
}: Props) {
  const { auth } = useAuth();

  const currentRate = (data.ratings ? data.ratings.filter((rating) => rating.rater === auth.id)[0]?.type : null);

  const [currentPublicationScore, setCurrentPublicationScore] = useState<{
    up_votes: number;
    down_votes: number
  }>({
    up_votes: data.up_votes,
    down_votes: data.down_votes
  });

  async function handleVoteInteraction (e: React.BaseSyntheticEvent, type: string) {
    e.stopPropagation();
    e.preventDefault();
    if (data && auth && auth.id) {
      const httpMethod: string = (currentRate && currentRate === type ? 'DELETE' :
                                (!currentRate ? 'POST' : 'PUT'));
      const body: {
        type?: 'up' | 'down';
        rater: number;
        rated_post: number;
      } = {
        rater: auth.id,
        rated_post: data.id,
      };
      if (currentRate !== type) {
        body.type = type;
      }

      try {
        const cookies = new Cookies(null, {
          path: '/',
        });
        const jwt = cookies.get('JWT');
        const response = await fetch('http://localhost:3000/rating', {
          method: httpMethod,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const tmpUpdatedData = data;
          if (!tmpUpdatedData.ratings) {
            tmpUpdatedData.ratings = [];
          }
          switch (httpMethod) {
            case 'POST':
              tmpUpdatedData[type + '_votes'] = tmpUpdatedData[type + '_votes'] + 1;
              tmpUpdatedData.ratings.push({ id: data.id, type: type, rater: auth.id });
              break;
            case 'PUT':
              if (type === 'up') {
                tmpUpdatedData.up_votes = tmpUpdatedData.up_votes + 1;
                tmpUpdatedData.down_votes = tmpUpdatedData.down_votes - 1;
                tmpUpdatedData.ratings[tmpUpdatedData.ratings.indexOf(tmpUpdatedData.ratings.filter((rating) => rating.rater === auth.id)[0])].type = 'up';
              } else {
                tmpUpdatedData.down_votes = tmpUpdatedData.down_votes + 1;
                tmpUpdatedData.up_votes = tmpUpdatedData.up_votes - 1;
                tmpUpdatedData.ratings[tmpUpdatedData.ratings.indexOf(tmpUpdatedData.ratings.filter((rating) => rating.rater === auth.id)[0])].type = 'down';
              }
              break;
            case 'DELETE':
              tmpUpdatedData[type + '_votes'] = tmpUpdatedData[type + '_votes'] - 1;
              tmpUpdatedData.ratings.splice(tmpUpdatedData.ratings.indexOf(tmpUpdatedData.ratings.filter((rating) => rating.rater === auth.id)[0]), 1);
              break;
          }
          setData(tmpUpdatedData);
          setCurrentPublicationScore({up_votes: tmpUpdatedData.up_votes, down_votes: tmpUpdatedData.down_votes});
        }
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    } else {
      setIsConnectionNeededClicked(true);
    }
  };

  return (
    <>
      {data && auth && (
      <>
        <div
          className={'bg-green-' + (currentRate === 'up' ? '500 ' : !currentRate ? '300 ' : '100') +
            " px-1 mr-3 md:mr-0 w-14 h-6 md:h-8 self-end md:self-center gap-1 hover:text-white justify-center text-center rounded-full shadow-sm shadow-green-700 flex"}
          value="up"
          onClick={(e) => handleVoteInteraction(e, 'up')}
        >
          <svg
            width="800px"
            height="800px"
            className="my-auto w-5 md:w-6 h-5 md:h-6 bg-transparent"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
          <path
            d="M15 11L12 8M12 8L9 11M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="my-auto">{currentPublicationScore.up_votes}</p>
      </div>
      <div
          className={'bg-red-' + (currentRate === 'down' ? '500 ' : !currentRate ? '300 ' : '100') +
            " px-1 mr-3 md:mr-0 w-14 h-6 md:h-8 self-end md:self-center gap-1 hover:text-white justify-center text-center rounded-full shadow-sm shadow-red-700 flex"}
          value="down"
          onClick={(e) => handleVoteInteraction(e, 'down')}
        >
          <svg
              width="800px"
              height="800px"
              className="my-auto w-5 md:w-6 h-5 md:h-6 bg-transparent"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
            <path
              d="M9 13L12 16M12 16L15 13M12 16V8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="my-auto">{currentPublicationScore.down_votes}</p>
        </div>
        </>
      )}
    </>
  );
}

type Props = {
  data: null | {
    id: number;
    author: {
      id: number;
      name: string;
      profile_picture: string;
      role: "member" | "moderator" | "administrator";
    };
    creation_date: string;
    content: string;
    modification_date: string;
    modification_author: null | string;
    replies: null | { id: number }[];
    ratings:
      | null
      | {
          id: number;
          type: string;
          rater: number;
        }[];
    up_votes: number;
    down_votes: number;
  };
  setData: (
    arg0: null | {
      id: number;
      author: {
        id: number;
        name: string;
        profile_picture: string;
        role: "member" | "moderator" | "administrator";
      };
      creation_date: string;
      content: string;
      modification_date: string;
      modification_author: null | string;
      replies: null | { id: number }[];
      ratings:
        | null
        | {
            id: number;
            type: string;
            rater: number;
          }[];
      up_votes: number;
      down_votes: number;
    }
  ) => void;
  setIsConnectionNeededClicked: (arg0: boolean) => void;
};
