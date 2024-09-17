import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ConnectionWindow from "../components/ConnectionWindow";

export default function ConnectionNeeded({
	setIsConnectionNeededClicked,
	setIsConnectionWindowDisplayed,
	webcontent,
}: Props) {
	const exitConnectionNeeded = () => {
		setIsConnectionNeededClicked(false);
	}

	const handleIndirectConnectionWindowDisplayer = () => {
		setIsConnectionWindowDisplayed(true);
		setIsConnectionNeededClicked(false);
	}

	const navigate = useNavigate();

	const handleRegistrationButton = () => {
		navigate("/register");
	}

	return (
		<div
	      className="absolute h-[108%] md:h-[103%] w-[100%] bg-gray-400/60 z-20 -translate-y-16"
	      onClick={exitConnectionNeeded}
	    >
	    	<div className="h-[100%] w-[100%] relative">
	        	<div className="h-screen w-screen sticky top-16">
	        		<div
					className="mx-auto p-4 h-[190px] md:h-[250px] w-[310px] md:w-[400px] bg-neutral-50 translate-y-[150%] md:translate-y-[100%] xl:translate-y-[100%] rounded-lg shadow-sm shadow-gray-700 flex flex-col justify-evenly items-center"
					onClick={(e) => {
					  e.stopPropagation();
					}}
					>
						<p className="text-center text-indigo-500 text-xl md:text-2xl font-semibold drop-shadow">
							{webcontent.connection.title.connectionNeeded.content}
						</p>
						<div
						className="flex justify-center gap-4 w-[100%]">
							<button
							className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
							title={webcontent.hypertexts.joinUs.text.content}
							onClick={handleRegistrationButton}
							>
							{webcontent.hypertexts.joinUs.hover.content}
							</button>
							<button
							className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
							title={webcontent.hypertexts.login.text.content}
							onClick={handleIndirectConnectionWindowDisplayer}
							>
							{webcontent.hypertexts.login.hover.content}
							</button>
						</div>
					</div>
	        	</div>
	        </div>
	    </div>
    );
}

type Props = {
	setIsConnectionNeededClicked: (arg0: boolean) => void;
	setIsConnectionWindowDisplayed: (arg0: boolean) => void;
	webcontent: Object;
}
