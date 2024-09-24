export default function AutoFormField({
  type,
  id,
  title,
  state,
  handleChange,
  isObligatory,
  isError,
  warningMessage,
}: Props) {
  return (
    <div
      className={
        (isObligatory ? "text-center " : "") +
        (type === "textarea" ? "h-36 xl:h-48" : "h-8 md:h-10") +
        " w-full flex " +
        (type === "textarea" ? "flex-col" : "flex-row") +
        " gap-2 " +
        (type === "textarea" ? "" : "items-center justify-between")
      }>
      <label
        htmlFor={id}
        className={
          (isObligatory ? "" : "pl-4 md:pl-8 ") + "flex-1 md:text-lg xl:text-xl"
        }>
        {title}
        {isObligatory ? <span className="text-red-600">*</span> : ""}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          className="px-2 py-2 h-full md:w-[90%] md:mx-auto resize-none focus:outline-none active:outline-none shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl"
          onChange={(e) => handleChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          className={
            (isError ? "border-2 border-red-700 " : "") +
            (type === "checkbox"
              ? "hover:cursor-pointer h-[50%]"
              : "flex-1 px-2 h-[80%] w-[60%] md:w-[50%] focus:outline-none active:outline-none shadow-sm shadow-neutral-400 bg-neutral-200 rounded-xl")
          }
          type={type}
          required={isObligatory}
          value={state.toString()}
          onChange={
            type === "checkbox"
              ? () => handleChange
              : (e) => handleChange(e.target.value)
          }
          title={warningMessage}
        />
      )}
    </div>
  );
}

type Props = {
  type: string;
  id: string;
  title: string;
  state: string | boolean;
  handleChange: (arg0: string) => void;
  isObligatory?: boolean;
  isError?: boolean;
  warningMessage?: string;
};
