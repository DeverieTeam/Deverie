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
