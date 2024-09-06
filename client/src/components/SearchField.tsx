import { useState } from "react";

export default function SearchField({ setSearchField }: Props) {
  const [tempSearch, setTempSearch] = useState<string>("");
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearch(e.target.value);
    clearTimeout(timerID);
    const timer = setTimeout(() => {
      setSearchField(e.target.value);
    }, 1500);
    setTimerID(timer);
  };

  return (
    <div className="mx-auto md:mx-0 relative">
      <input
        className="pl-16 py-2 w-72 md:w-96 focus:outline-none active:outline-none md:text-lg shadow-sm shadow-neutral-400 bg-neutral-200 rounded-full"
        type="text"
        placeholder="Recherche par mots clefs"
        value={tempSearch}
        onChange={handleChange}
      />
      <p className="m-auto text-lg absolute top-0 translate-x-6 translate-y-[6px] md:translate-y-2">
        🔎
      </p>
    </div>
  );
}

type Props = {
  setSearchField: (arg0: string) => void;
};
