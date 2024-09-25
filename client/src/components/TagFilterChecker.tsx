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
        id={`tag_${tag.id}`}
        type="checkbox"
        checked={handleChecked()}
        className="hover:cursor-pointer"
        onChange={handleChange}
      />
      <label
        htmlFor={`tag_${tag.id}`}
        className="text-sm md:text-base gap-1 flex hover:cursor-pointer">
        <img
          className="h-5 w-5 bg-neutral-100 rounded-lg hover:cursor-pointer"
          src={tag.icon}
        />
        {tag.name}
      </label>
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
