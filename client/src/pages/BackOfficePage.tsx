import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAuth } from "../contexts/useAuth";
import { backOfficeHomepageWebcontentType } from "../types/backoffice/backOfficeHomepageWebcontentType";

export default function BackOfficePage() {
  const webcontent = useLoaderData() as backOfficeHomepageWebcontentType;

  const navigate = useNavigate();
  const { auth } = useAuth();

  const [usersNumber, setUsersNumber] = useState<number>(0);
  const [bannedUsersNumber, setBannedUsersNumber] = useState<number>(0);
  const [membersNumber, setMembersNumber] = useState<number>(0);
  const [moderatorsNumber, setModeratorsNumber] = useState<number>(0);
  const [administratorsNumber, setAdministratorsNumber] = useState<number>(0);

  const [publicationsNumber, setPublicationsNumber] = useState<number>(0);
  const [questionsNumber, setQuestionsNumber] = useState<number>(0);
  const [closedQuestionsNumber, setClosedQuestionsNumber] = useState<number>(0);
  const [topicsNumber, setTopicsNumber] = useState<number>(0);
  const [closedTopicsNumber, setClosedTopicsNumber] = useState<number>(0);

  const [bannedUsersPublicationsNumber, setBannedUsersPublicationsNumber] =
    useState<number>(0);
  const [bannedUsersQuestionsNumber, setBannedUsersQuestionsNumber] =
    useState<number>(0);
  const [bannedUsersTopicsNumber, setBannedUsersTopicsNumber] =
    useState<number>(0);

  async function numberRequest(args: {
    endpoint: "member" | "post";
    type: string;
    isClosed?: boolean;
    isBanned?: boolean;
  }) {
    try {
      let queries =
        args.isClosed !== undefined ? `?isClosed=${args.isClosed}` : "";
      if (args.isBanned !== undefined) {
        if (queries.length < 1) {
          queries = `?isBanned=${args.isBanned}`;
        } else {
          queries += `&isBanned=${args.isBanned}`;
        }
      }

      const cookies = new Cookies(null, {
        path: "/",
      });
      const jwt = cookies.get("JWT");
      const fetchPromise = await fetch(
        `http://localhost:3000/${args.endpoint.toString()}/number/${
          args.type
        }${queries}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (fetchPromise.ok) {
        const responseData = await fetchPromise.json();
        return responseData.number;
      }
    } catch (error) {
      console.error("Something went wrong: ", error);
    }
  }

  useEffect(() => {
    if (auth && auth.role && auth.role !== "administrator") {
      navigate("/");
    }
  }, [auth, navigate]);

  useEffect(() => {
    numberRequest({ endpoint: "member", type: "all", isBanned: false }).then(
      (value) => {
        setUsersNumber(value);
      }
    );
    numberRequest({ endpoint: "member", type: "all", isBanned: true }).then(
      (value) => {
        setBannedUsersNumber(value);
      }
    );
    numberRequest({ endpoint: "member", type: "member", isBanned: false }).then(
      (value) => {
        setMembersNumber(value);
      }
    );
    numberRequest({
      endpoint: "member",
      type: "moderator",
      isBanned: false,
    }).then((value) => {
      setModeratorsNumber(value);
    });
    numberRequest({
      endpoint: "member",
      type: "administrator",
      isBanned: false,
    }).then((value) => {
      setAdministratorsNumber(value);
    });

    numberRequest({ endpoint: "post", type: "all", isBanned: false }).then(
      (value) => {
        setPublicationsNumber(value);
      }
    );
    numberRequest({ endpoint: "post", type: "question", isBanned: false }).then(
      (value) => {
        setQuestionsNumber(value);
      }
    );
    numberRequest({
      endpoint: "post",
      type: "question",
      isClosed: true,
      isBanned: false,
    }).then((value) => {
      setClosedQuestionsNumber(value);
    });
    numberRequest({ endpoint: "post", type: "topic", isBanned: false }).then(
      (value) => {
        setTopicsNumber(value);
      }
    );
    numberRequest({
      endpoint: "post",
      type: "topic",
      isClosed: true,
      isBanned: false,
    }).then((value) => {
      setClosedTopicsNumber(value);
    });

    numberRequest({ endpoint: "post", type: "all", isBanned: true }).then(
      (value) => {
        setBannedUsersPublicationsNumber(value);
      }
    );
    numberRequest({ endpoint: "post", type: "question", isBanned: true }).then(
      (value) => {
        setBannedUsersQuestionsNumber(value);
      }
    );
    numberRequest({ endpoint: "post", type: "topic", isBanned: true }).then(
      (value) => {
        setBannedUsersTopicsNumber(value);
      }
    );
  }, []);

  return (
    <div className="flex flex-col gap-12 md:gap-8">
      <p className="mx-auto text-center text-indigo-500 text-2xl md:text-4xl font-semibold drop-shadow">
        {webcontent.page.title.content}
      </p>
      <div className="w-full flex flex-row justify-evenly">
        <img
          className="hidden md:block w-[300px] xl:w-[350px] h-[200px] xl:h-[250px] mt-12 mb-auto"
          src=""
        />

        <div className="flex flex-col gap-4 md:gap-6 xl:gap-8">
          <p className="-ml-2 md:-ml-6 xl:-ml-12 text-lg md:text-xl">
            {webcontent.page.statistics.title.content}
          </p>
          <div className="flex flex-col gap-1 md:gap-2">
            <p>
              {webcontent.page.statistics.usersNumberPrefix.content} :{" "}
              <span>{usersNumber}</span>
            </p>
            <p>
              {webcontent.page.statistics.bannedUsersNumberPrefix.content} :{" "}
              <span>{bannedUsersNumber}</span>
            </p>
            <p>
              {webcontent.page.statistics.membersNumberPrefix.content} :{" "}
              <span>{membersNumber}</span>
            </p>
            <p>
              {webcontent.page.statistics.moderatorsNumberPrefix.content} :{" "}
              <span>{moderatorsNumber}</span>
            </p>
            <p>
              {webcontent.page.statistics.administratorsNumberPrefix.content} :{" "}
              <span>{administratorsNumber}</span>
            </p>
          </div>

          <details>
            <summary className="md:text-lg py-1 pl-6 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400">
              {webcontent.page.statistics.notBanned.title.content}
            </summary>
            <div className="mt-6 ml-6 flex flex-col gap-1 md:gap-2">
              <p>
                {
                  webcontent.page.statistics.notBanned.publicationsNumberPrefix
                    .content
                }{" "}
                : <span>{publicationsNumber}</span>
              </p>
              <p>
                {
                  webcontent.page.statistics.notBanned.questionsNumberPrefix
                    .content
                }{" "}
                : <span>{questionsNumber}</span>
              </p>
              <p>
                {
                  webcontent.page.statistics.notBanned
                    .closedQuestionsNumberPrefix.content
                }{" "}
                : <span>{closedQuestionsNumber}</span>
              </p>
              <p>
                {
                  webcontent.page.statistics.notBanned.topicsNumberPrefix
                    .content
                }{" "}
                : <span>{topicsNumber}</span>
              </p>
              <p>
                {
                  webcontent.page.statistics.notBanned.closedTopicsNumberPrefix
                    .content
                }{" "}
                : <span>{closedTopicsNumber}</span>
              </p>
            </div>
          </details>

          <details>
            <summary className="md:text-lg py-1 pl-6 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400">
              {webcontent.page.statistics.banned.title.content}
            </summary>
            <div className="mt-6 ml-6 flex flex-col gap-1 md:gap-2">
              <p>
                {
                  webcontent.page.statistics.banned.publicationsNumberPrefix
                    .content
                }{" "}
                : <span>{bannedUsersPublicationsNumber}</span>
              </p>
              <p>
                {
                  webcontent.page.statistics.banned.questionsNumberPrefix
                    .content
                }{" "}
                : <span>{bannedUsersQuestionsNumber}</span>
              </p>
              <p>
                {webcontent.page.statistics.banned.topicsNumberPrefix.content} :{" "}
                <span>{bannedUsersTopicsNumber}</span>
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
