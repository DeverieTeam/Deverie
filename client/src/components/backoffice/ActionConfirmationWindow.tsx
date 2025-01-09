import { backOfficeActionConfirmationWindowWebcontentType } from '../../types/backoffice/backOfficeActionConfirmationWindowWebcontentType';

export default function ActionConfirmationWindow({
  setIsActionConfirmWindowDisplayed,
  handleConfirm,
  warningMessage,
  webcontent
}: Props){
  const exitActionConfirmationWindow = () => {
    setIsActionConfirmWindowDisplayed(false);
  };

  const handleConfirmAction = () => {
    handleConfirm();
    exitActionConfirmationWindow();
  }

  return(
    <div
      className="z-30 absolute z-10 h-screen w-screen bg-gray-400/60 -translate-y-16 md:left-0"
      onClick={exitActionConfirmationWindow}>
      <div className="sticky top-16">
        <div
          className="mx-auto p-4 h-[275px] md:h-[300px] w-[310px] md:w-[400px] bg-neutral-50 translate-y-[275px] md:translate-y-[300px] xl:translate-y-[100%] rounded-lg shadow-sm shadow-gray-700 flex flex-col justify-evenly items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <p className="text-center text-lg md:text-xl drop-shadow">
            {warningMessage}
          </p>
          <div className="flex justify-center gap-4 w-[100%]">
            <button
              className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
              title={webcontent.buttons.cancel.hover.content}
              onClick={exitActionConfirmationWindow}>
              {webcontent.buttons.cancel.text.content}
            </button>
            <button
              className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
              title={webcontent.buttons.confirm.hover.content}
              onClick={handleConfirmAction}>
              {webcontent.buttons.confirm.text.content}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  setIsActionConfirmWindowDisplayed: (arg0: boolean) => void;
  handleConfirm: (arg0: string) => void; string;
  warningMessage: string;
  webcontent: backOfficeActionConfirmationWindowWebcontentType;
};
