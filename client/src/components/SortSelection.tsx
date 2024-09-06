export default function SortSelection({ threadType, setSort }: Props) {
  return (
    <div className="self-end mb-1 w-64 py-1 px-1 text-center justify-center text-lg gap-2 bg-neutral-100 rounded-lg shadow-sm shadow-neutral-400 flex">
      <p className="text-base">Trier par :</p>
      <select
        className="px-1 text-sm bg-white cursor-pointer"
        onChange={(e) => {
          setSort(e.target.value);
        }}
      >
        <option className="" value="popular">
          Les plus populaires
        </option>
        <option className="" value="recent">
          {threadType === "topics" ? "Les plus récents" : "Les plus récentes"}
        </option>
        <option className="" value="discreet">
          {threadType === "topics" ? "Les plus discrets" : "Les plus discrètes"}
        </option>
        <option className="" value="ancient">
          {threadType === "topics" ? "Les plus anciens" : "Les plus anciennes"}
        </option>
      </select>
    </div>
  );
}

type Props = {
  threadType: "topics" | "questions";
  setSort: (arg0: string) => void;
};
