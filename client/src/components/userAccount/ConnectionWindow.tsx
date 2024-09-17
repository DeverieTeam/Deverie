import { Link } from "react-router-dom";

export default function ConnectionWindow({
	setIsConnectionWindowDisplayed,
	webcontent,
}: Props) {
	const exitConnectionWindow = () => {
		setIsConnectionWindowDisplayed(false);
	}

	return (
		<div
		className="absolute h-[108%] md:h-[103%] w-[100%] bg-gray-400/60 z-20 -translate-y-16"
		onClick={exitConnectionWindow}
		>
			<div className="h-[100%] w-[100%] relative">
				<div className="h-screen w-screen sticky top-16">
					<div
					className="mx-auto p-4 h-[500px] w-[300px] md:h-[600px] md:w-[400px] translate-y-[25%] md:translate-y-[15%] bg-neutral-50 rounded-lg shadow-sm shadow-gray-700 flex flex-col justify-between items-center"
					onClick={(e) => {
					  e.stopPropagation();
					}}
					>
						<div>
							<img
								className="mx-auto w-[300px] h-[180px] md:w-[350px] md:h-[230px] bg-neutral-100"
								src=""
							/>
							<p
							className="text-center text-indigo-500 text-2xl md:text-3xl xl:text-4xl font-bold drop-shadow"
							>
								{webcontent.connection.title.connectionPage.content}
							</p>
						</div>
						<div
							className="w-[100%] md:w-[90%] flex flex-row justify-between"
						>
							<p className="w-[75%] md:w-auto">
								{webcontent.connection.fields.username.content}
							</p>
							<input
					        className="px-2 w-[60%] md:w-[50%] focus:outline-none active:outline-none shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl"
							type="text"
					      	/>
						</div>
						<div
						className="w-[100%] md:w-[90%] flex flex-row justify-between"
						>
							<p className="w-[75%] md:w-auto">
								{webcontent.connection.fields.username.content}
							</p>
							<input
					        className="px-2 w-[60%] md:w-[50%] focus:outline-none active:outline-none shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl"
							type="password"
					      	/>
						</div>
						<div
						className="w-[90%] flex flex-col items-center gap-1 md:flex-row"
						>
							<p>
								{webcontent.connection.unregistered.prefix.content}
							</p>
							<Link to="/register"
							className="text-indigo-800 hover:text-indigo-500"
							title={webcontent.hypertexts.joinUs.hover.content}
							>
								{webcontent.hypertexts.joinUs.text.content}
							</Link>
						</div>
						<div
						className="flex justify-center gap-4 w-[100%]">
							<button
							className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
							title={webcontent.buttons.cancelButton.hover.content}
							onClick={exitConnectionWindow}
			                >
			                  {webcontent.buttons.cancelButton.text.content}
							</button>
							<button
							className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
							title={webcontent.hypertexts.login.hover.content}
			                >
			                  {webcontent.buttons.confirmButton.text.content}
							</button>
						</div>
					</div>
	        	</div>
	        </div>
	    </div>
    );
}

type Props = {
	setIsConnectionWindowDisplayed: (arg0: boolean) => void;
	webcontent: {
		hypertexts: {
		  home: {
		    text: {
		      name: string;
		      content: string;
		    };
		    hover: {
		      name: string;
		      content: string;
		    };
		  };
		  contact: {
		    text: {
		      name: string;
		      content: string;
		    };
		    hover: {
		      name: string;
		      content: string;
		    };
		  };
		  termsOfUse: {
		    text: {
		      name: string;
		      content: string;
		    };
		    hover: {
		      name: string;
		      content: string;
		    };
		  };
		  legalNotices: {
		    text: {
		      name: string;
		      content: string;
		    };
		    hover: {
		      name: string;
		      content: string;
		    };
		  };
		  joinUs: {
		    text: {
		      name: string;
		      content: string;
		    };
		    hover: {
		      name: string;
		      content: string;
		    };
		  };
		  login: {
		    text: {
		      name: string;
		      content: string;
		    };
		    hover: {
		      name: string;
		      content: string;
		    };
		  };
		  profile: {
		    text: {
		      name: string;
		      content: string;
		    };
		    hover: {
		      name: string;
		      content: string;
		    };
		  };
		};
		buttons: {
		  backButton: {
		    text: {
		      name: string;
		      content: string;
		    };
		    hover: {
		      name: string;
		      content: string;
		    };
		  };
		  backToHomeButton: {
		    text: {
		      name: string;
		      content: string;
		    };
		    hover: {
		      name: string;
		      content: string;
		    };
		  };
		  quitButton: {
		    text: {
		      name: string;
		      content: string;
		    };
		    hover: {
		      name: string;
		      content: string;
		    };
		  };
		  cancelButton: {
		    text: {
		      name: string;
		      content: string;
		    };
		    hover: {
		      name: string;
		      content: string;
		    };
		  };
		  confirmButton: {
		    text: {
		      name: string;
		      content: string;
		    };
		    hover: {
		      name: string;
		      content: string;
		    };
		  };
		  checkShortcuts: {
		    addEntireSection: {
		      text: {
		        name: string;
		        content: string;
		      };
		      hover: {
		        name: string;
		        content: string;
		      };
		    };
		    removeEntireSection: {
		      text: {
		        name: string;
		        content: string;
		      };
		      hover: {
		        name: string;
		        content: string;
		      };
		    };
		    addAll: {
		      text: {
		        name: string;
		        content: string;
		      };
		      hover: {
		        name: string;
		        content: string;
		      };
		    };
		    removeAll: {
		      text: {
		        name: string;
		        content: string;
		      };
		      hover: {
		        name: string;
		        content: string;
		      };
		    };
		  };
		};
		connection: {
		  title: {
		  	connectionPage: {
			    name: string;
			    content: string;
			};
			connectionNeeded: {
				name: string;
				content: string;
			};
		  };
		  fields: {
		    username: {
		      name: string;
		      content: string;
		    };
		    password: {
		      name: string;
		      content: string;
		    };
		  };
		  unregistered: {
		    prefix: {
		      name: string;
		      content: string;
		    };
		  };
		};
	};
}
