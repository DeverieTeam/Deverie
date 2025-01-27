export default function TagChecker({
  type,
  tag,
  tmpTags,
  setTmpTags,
}: Props) {

  const handleChecked = () => {
    if (type === 'filter') {
      return tmpTags.includes(tag.name);
    } else {
      return tmpTags.some(iTag => iTag.id === tag.id);
    }
  };

  const handleChange = () => {
    if (handleChecked()) {
      if (type === 'filter') {
        setTmpTags((pv) => pv.filter(
          (item: string) =>
          item !== tag.name));
      } else {
        setTmpTags((pv) => pv.filter(
          (item: { id: number; name: string; icon: string; family: string }) =>
          item.id !== tag.id));
      }
    } else {
      if (type === 'filter') {
        setTmpTags((pv) => pv.concat([tag.name]));
      } else {
        setTmpTags((pv) => pv.concat([tag]));
      }
    }
  };

  return (
    <div className="w-[120px] md:w-[132px] gap-1 flex items-center">
      <input
        id={`tag_${tag.id}`}
        type="checkbox"
        checked={handleChecked()}
        className="hover:cursor-pointer"
        onChange={handleChange}
      />
      <label
        htmlFor={`tag_${tag.id}`}
        className="text-sm md:text-base gap-1 flex items-center hover:cursor-pointer">
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
  type: 'filter' | 'selection';
  tag: {
    id: number;
    name: string;
    icon: string;
    family: string;
  };
  tmpTags: {
    id: number;
    name: string;
    icon: string;
    family: string;
  }[] |
  string[];
  setTmpTags: (
    arg0: (
      | {
          id: number;
          name: string;
          icon: string;
          family: string;
        }[]
      | ((
          pv: {
            id: number;
            name: string;
            icon: string;
            family: string;
          }[]
        ) => {
          id: number;
          name: string;
          icon: string;
          family: string;
        }[])
      |
        string[]
      |
        ((pv: string[]) => string[])
  )) => void;
};
