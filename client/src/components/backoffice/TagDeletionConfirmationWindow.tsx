import { backOfficeTagDeletionConfirmationWindowWebcontentType } from '../../types/backoffice/backOfficeTagDeletionConfirmationWindowWebcontentType';

export default function TagDeletionConfirmationWindow({
  setIsDeletionConfirmWindowDisplayed,
  handleConfirm,
  tagName,
  webcontent
}: Props){
  const exitTagDeletionConfirmationWindow = () => {
    setIsDeletionConfirmWindowDisplayed(false);
  };

  const handleConfirmAction = () => {
    handleConfirm();
    exitTagDeletionConfirmationWindow();
  }

  return(
    <div
      className="z-30 absolute z-10 h-screen w-screen bg-gray-400/60 -translate-y-16 md:left-0"
      onClick={exitTagDeletionConfirmationWindow}>
      <div className="sticky top-16">
        <div
          className="mx-auto p-4 h-[190px] md:h-[250px] w-[310px] md:w-[400px] bg-neutral-50 translate-y-[150%] md:translate-y-[100%] xl:translate-y-[100%] rounded-lg shadow-sm shadow-gray-700 flex flex-col justify-evenly items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <p className="text-center text-lg md:text-xl drop-shadow">
            {webcontent.warnings.deletionConfirmationAlert.content.replace("{tag_name}", tagName)}
          </p>
          <div className="flex justify-center gap-4 w-[100%]">
            <button
              className="py-1 px-4 md:px-8 text-center text-lg md:text-xl hover:text-white bg-indigo-400 hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
              title={webcontent.buttons.cancel.hover.content}
              onClick={exitTagDeletionConfirmationWindow}>
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
  setIsDeletionConfirmWindowDisplayed: (arg0: boolean) => void;
  handleConfirm: (arg0: string) => void;
  tagName: string;
  webcontent: backOfficeTagDeletionConfirmationWindowWebcontentType;
};
