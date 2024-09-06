import { useEffect, useState } from "react";
import TagsDisplayer from "./TagsDisplayer";

export default function TagsWindow({
  isTagButtonClicked,
  setIsTagButtonClicked,
  tags,
  setTags,
  langTags,
  envTags,
  technoTags,
  webcontent
}: Props) {
  const [tempTags, setTempTags] = useState<string[]>([]);

  useEffect(() => {
    if (tags !== null) {
      setTempTags(tags);
    }
  }, [tags]);

  const exitTagWindow = () => {
    setIsTagButtonClicked(!isTagButtonClicked);
  };

  const handleConfirmButton = () => {
    setTags(tempTags);
    localStorage.removeItem("Tags");
    localStorage.setItem("Tags", tempTags.join("&"));
    setIsTagButtonClicked(!isTagButtonClicked);
  };

  const handleAddAll = () => {
    const array: string[] = langTags.concat(envTags).concat(technoTags);

    for (const tag of array) {
      if (!tempTags.includes(tag)) {
        setTempTags((pv) => pv.concat([tag]));
      }
    }
  };

  const handleRemoveAll = () => {
    const array: string[] = langTags.concat(envTags).concat(technoTags);

    for (const tag of array) {
      if (tempTags.includes(tag)) {
        setTempTags((pv) => pv.filter((item: string) => item !== tag));
      }
    }
  };

  return (
    <div
      className="absolute h-[108%] md:h-[103%] w-[100%] bg-gray-400/60 z-20 -translate-y-16"
      onClick={exitTagWindow}
    >
      <div className="h-[100%] w-[100%] relative">
        <div className="h-screen w-screen sticky top-16">
          <div
            className="mx-auto p-4 h-[530px] md:h-[500px] w-[290px] md:w-[500px] bg-neutral-50 translate-y-[20%] md:translate-y-[25%] xl:translate-y-[30%] justify-between rounded-lg shadow-sm shadow-gray-700 flex flex-col overflow-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex flex-col">
              {tempTags !== null &&
                ["Langages", "Environnements", "Technologies"].map((family) => (
                  <TagsDisplayer
                    key={family}
                    tagFamily={family}
                    tempTags={tempTags}
                    setTempTags={setTempTags}
                    langTags={langTags}
                    envTags={envTags}
                    technoTags={technoTags}
                    webcontent={webcontent.tagsFamilies.languages}
                  />
                ))}
            </div>
            <div className="gap-4 md:gap-6 flex flex-col">
              <div className="justify-center mt-2 md:mt-4 gap-2 md:gap-4 flex">
                <button
                  className="md:text-lg px-1 md:px-2 py-1 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400"
                  onClick={handleAddAll}
                  title={webcontent.buttons.checkShortcuts.addAll.hover.content}
                >
                  {webcontent.buttons.checkShortcuts.addAll.text.content}
                </button>
                <button
                  className="md:text-lg px-2 py-1 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400"
                  onClick={handleRemoveAll}
                  title={webcontent.buttons.checkShortcuts.removeAll.hover.content}
                >
                  {webcontent.buttons.checkShortcuts.removeAll.text.content}
                </button>
              </div>
              <div className="justify-center gap-4 flex">
                <button
                  className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                  onClick={exitTagWindow}
                  title={webcontent.buttons.cancelButton.hover.content}
                >
                  {webcontent.buttons.confirmButton.text.content}
                </button>
                <button
                  className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
                  onClick={handleConfirmButton}
                  title={webcontent.buttons.confirmButton.hover.content}
                >
                  {webcontent.buttons.confirmButton.text.content}
                </button>
              </div>
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
  tags: string[];
  setTags: (arg0: string[]) => void;
  langTags: string[];
  envTags: string[];
  technoTags: string[];
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
      },
      checkShortcuts: {
			  addEntireSection: {
			  	text: {
		  			name: string,
		  			content: string
		  		},
		  		hover: {
			  		name: string,
				  	content: string
	  			}
		  	},
			  removeEntireSection: {
			  	text: {
		  			name: string,
		  			content: string
		  		},
		  		hover: {
					  name: string,
					  content: string
				  }
			  },
			  addAll: {
				  text: {
  					name: string,
	  				content: string
	  			},
				  hover: {
					  name: string,
					  content: string
				  }
        },
        removeAll: {
				  text: {
					  name: string,
					  content: string
				  },
				  hover: {
					  name: string,
					  content: string
				  }
			  }
			}
    }
  }
};
