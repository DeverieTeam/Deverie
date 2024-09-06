export default function SearchField({ webcontent }: Props) {
  return (
    <div className="mx-auto md:mx-0 relative">
      <input
        className="pl-16 py-2 w-72 md:w-96 focus:outline-none active:outline-none md:text-lg shadow-sm shadow-neutral-400 bg-neutral-200 rounded-full"
        type="text"
        placeholder={ webcontent.text.content }
      />
      <p className="m-auto text-lg absolute top-0 translate-x-6 translate-y-[6px] md:translate-y-2">
        🔎
      </p>
    </div>
  );
}

type Props = {
  webcontent: {
    text: {
      name: string,
      content: string
    }
  }
};
