export default function TagSelectionChecker({
  tag,
  tempTags,
  setTempTags,
}: Props) {
  const handleChecked = () => {
    for (const tempTag of tempTags) {
      if (tempTag.name === tag.name) {
        return true;
      }
    }
    return false;
  };

  const handleChange = () => {
    let check = false;
    for (const tempTag of tempTags) {
      if (tempTag.name === tag.name) {
        check = true;
      }
    }
    if (check) {
      setTempTags((pv) =>
        pv.filter(
          (item: { id: number; name: string; icon: string; family: string }) =>
            item.name !== tag.name
        )
      );
    } else {
      setTempTags((pv) => pv.concat([tag]));
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
        className="text-sm md:text-base gap-1 flex hover:cursor-pointer"
      >
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
  tempTags: {
    id: number;
    name: string;
    icon: string;
    family: string;
  }[];
  setTempTags: (
    arg0:
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
  ) => void;
};
