import { sortselectionWebcontentType } from "../types/sortselectionWebcontentType";

export default function PostSortSelection({ setSort, webcontent }: Props) {
  return (
    <div className="self-end mb-1 w-[220px] md:w-[300px] py-1 px-1 text-center justify-center text-lg gap-1 md:gap-2 bg-neutral-100 rounded-lg shadow-sm shadow-neutral-400 flex flex-row">
      <p className="text-xs md:text-base">{webcontent.text.content} :</p>
      <select
        className="px-1 text-xs md:text-base bg-white cursor-pointer"
        onChange={(e) => {
          setSort(e.target.value);
        }}>
        <option className="" value="chrono">
          Ordre chronologique
        </option>
        <option className="" value="recent">
          Les plus récentes
        </option>
        <option className="" value="rate">
          Les plus pertinentes
        </option>
      </select>
    </div>
  );
}

type Props = {
  setSort: (arg0: string) => void;
  webcontent: sortselectionWebcontentType;
};
