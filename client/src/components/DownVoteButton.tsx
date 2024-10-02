import Cookies from "universal-cookie";
import { useAuth } from "../contexts/useAuth";

export default function DownVoteButton({
  data,
  setData,
  setIsConnectionNeededClicked,
}: Props) {
  const { auth } = useAuth();

  const handleVoteWhenClient = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    setIsConnectionNeededClicked(true);
  };

  const handleVoteWhenAlreadyPicked = async (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (data && auth && auth.id) {
      const body: {
        rater: number;
        rated_post: number;
      } = {
        rater: auth.id,
        rated_post: data.id,
      };

      try {
        const cookies = new Cookies(null, {
          path: "/",
        });
        const jwt = cookies.get("JWT");
        const response = await fetch("http://localhost:3000/rating", {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          setData(null);
        }
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    }
  };

  const handleVoteWhenOtherPicked = async (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (data && auth && auth.id) {
      const body: {
        type: "up" | "down";
        rater: number;
        rated_post: number;
      } = {
        type: "down",
        rater: auth.id,
        rated_post: data.id,
      };

      try {
        const cookies = new Cookies(null, {
          path: "/",
        });
        const jwt = cookies.get("JWT");
        const response = await fetch("http://localhost:3000/rating", {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          setData(null);
        }
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    }
  };

  const handleVoteWhenNonePicked = async (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (data && auth && auth.id) {
      const body: {
        type: "up" | "down";
        rater: number;
        rated_post: number;
      } = {
        type: "down",
        rater: auth.id,
        rated_post: data.id,
      };

      try {
        const cookies = new Cookies(null, {
          path: "/",
        });
        const jwt = cookies.get("JWT");
        const response = await fetch("http://localhost:3000/rating", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          setData(null);
        }
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    }
  };

  const getUpvotes = () => {
    if (data && auth && auth.role !== "client") {
      let voteStatus;
      if (data.ratings === null) {
        voteStatus = "novote";
      } else {
        let ratingType;
        for (const rating of data.ratings) {
          if (rating.rater === auth.id) {
            ratingType = rating.type;
            break;
          }
        }
        if (ratingType === "up") {
          voteStatus = "upvote";
        } else if (ratingType === "down") {
          voteStatus = "downvote";
        } else {
          voteStatus = "novote";
        }
      }

      switch (voteStatus) {
        case "downvote":
          return (
            <div
              className="px-1 mr-3 md:mr-0 w-14 h-6 md:h-8 bg-red-500 self-end md:self-center gap-1 hover:text-white justify-center text-center rounded-full shadow-sm shadow-green-700 flex"
              onClick={handleVoteWhenAlreadyPicked}
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
              <p className="my-auto">{data.down_votes}</p>
            </div>
          );
        case "upvote":
          return (
            <div
              className="px-1 mr-3 md:mr-0 w-14 h-6 md:h-8 bg-red-100 self-end md:self-center gap-1 hover:text-white justify-center text-center rounded-full shadow-sm shadow-green-700 flex"
              onClick={handleVoteWhenOtherPicked}
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
              <p className="my-auto">{data.down_votes}</p>
            </div>
          );
        case "novote":
          return (
            <div
              className="px-1 mr-3 md:mr-0 w-14 h-6 md:h-8 bg-red-300 self-end md:self-center gap-1 hover:text-white justify-center text-center rounded-full shadow-sm shadow-green-700 flex"
              onClick={handleVoteWhenNonePicked}
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
              <p className="my-auto">{data.down_votes}</p>
            </div>
          );
      }
    } else {
      return (
        <div
          className="px-1 mr-3 md:mr-0 w-14 h-6 md:h-8 bg-red-300 self-end md:self-center gap-1 hover:text-white justify-center text-center rounded-full shadow-sm shadow-green-700 flex"
          onClick={handleVoteWhenClient}
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
          <p className="my-auto">{data?.down_votes}</p>
        </div>
      );
    }
  };

  return getUpvotes();
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
