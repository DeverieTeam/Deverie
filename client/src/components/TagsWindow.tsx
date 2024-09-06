import TagsDisplayer from "./TagsDisplayer";

export default function TagsWindow({
  isTagButtonClicked,
  setIsTagButtonClicked,
  webcontent,
}: Props) {
  const exitTagWindow = () => {
    setIsTagButtonClicked(!isTagButtonClicked);
  };

  return (
    <div
      className="absolute h-[108%] md:h-[103%] w-[100%] bg-gray-400/60 z-20 -translate-y-16"
      onClick={exitTagWindow}>
      <div className="h-[100%] w-[100%] relative">
        <div className="h-screen w-screen sticky top-16">
          <div
            className="mx-auto p-4 h-[530px] md:h-[500px] w-[290px] md:w-[500px] bg-neutral-50 translate-y-[20%] md:translate-y-[25%] xl:translate-y-[30%] justify-between rounded-lg shadow-sm shadow-gray-700 flex flex-col overflow-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}>
            <div className="gap-6 flex flex-col">
              <TagsDisplayer tagFamily="Langages" webcontent={webcontent.tagsFamilies.languages}/>
              <TagsDisplayer tagFamily="Environnements" webcontent={webcontent.tagsFamilies.environments}/>
              <TagsDisplayer tagFamily="Technologies" webcontent={webcontent.tagsFamilies.technologies}/>
            </div>
            <div className="flex">
              <button
                className="mx-auto py-1 px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                onClick={exitTagWindow}
                title={webcontent.buttons.quitButton.hover.content}>
                {webcontent.buttons.quitButton.text.content}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  isTagButtonClicked: boolean;
  setIsTagButtonClicked: (arg0: boolean) => void;
  webcontent: {
    buttons: {
      backButton: {
        text: {
          name: string,
          content: string
        },
        hover: {
          name: string,
          content: string
        }
      },
      quitButton: {
        text: {
          name: string,
          content: string
        },
        hover: {
          name: string,
          content: string
        }
      },
      cancelButton: {
        text: {
          name: string,
          content: string
        },
        hover: {
          name: string,
          content: string
        }
      },
      confirmButton: {
        text: {
          name: string,
          content: string
        },
        hover: {
          name: string,
          content: string
        }
      }
    },
    tagsFamilies: {
      languages: {
        name: string,
        content: string
      },
      environments: {
        name: string,
        content: string
      },
      technologies: {
        name: string,
        content: string
      }
    }
  }
};
