export default function SortSelection({ threadType, webcontent }: Props) {
  return (
    <div className="self-end mb-1 w-64 py-1 px-1 text-center justify-center text-lg gap-2 bg-neutral-100 rounded-lg shadow-sm shadow-neutral-400 flex">
      <p className="text-base">{ webcontent.text.content } :</p>
      <select className="px-1 text-sm bg-white cursor-pointer">
        <option className="" value="popular">
          { webcontent.filters.mostPopular[threadType.slice(0,-1)].content }
        </option>
        <option className="" value="recent">
          { webcontent.filters.mostRecent[threadType.slice(0,-1)].content }
        </option>
        <option className="" value="discreet">
          { webcontent.filters.lessPopular[threadType.slice(0,-1)].content }
        </option>
        <option className="" value="ancient">
          { webcontent.filters.lessRecent[threadType.slice(0,-1)].content }
        </option>
      </select>
    </div>
  );
}

type Props = {
  threadType: "topics" | "questions",
  webcontent: {
    text: {
      name: string,
      content: string
    },
    filters: {
      mostRecent: {
        topic: {
          name: string,
          content: string
        },
        question: {
          name: string,
          content: string
        }
      },
      lessRecent: {
        topic: {
          name: string,
          content: string
        },
        question: {
          name: string,
          content: string
        }
      },
      mostPopular: {
        topic: {
          name: string,
          content: string
        },
        question: {
          name: string,
          content: string
        }
      },
      lessPopular: {
        topic: {
          name: string,
          content: string
        },
        question: {
          name: string,
          content: string
        }
      }
    }
  };
};
