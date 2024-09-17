export default function TagFilterChecker({
  tag,
  tempTags,
  setTempTags,
}: Props) {
  const handleChecked = () => {
    return tempTags.includes(tag.name);
  };

  const handleChange = () => {
    if (tempTags.includes(tag.name)) {
      setTempTags((pv) => pv.filter((item: string) => item !== tag.name));
    } else {
      setTempTags((pv) => pv.concat([tag.name]));
    }
  };

  return (
    <div className="w-[120px] md:w-[132px] gap-1 flex">
      <input
        type="checkbox"
        checked={handleChecked()}
        onChange={handleChange}
      />
      <img className="h-5 w-5 bg-neutral-100 rounded-lg" src={tag.icon} />
      <p className="text-sm md:text-base">{tag.name}</p>
    </div>
  );
}

type Props = {
  tag: {
    id: number;
    name: string;
    icon: string;
    family: string;
  };
  tempTags: string[];
  setTempTags: (arg0: string[] | ((pv: string[]) => string[])) => void;
};
