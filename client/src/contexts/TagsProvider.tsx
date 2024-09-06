import { useEffect, useState } from "react";
import { TagsContext } from "./TagsContext";

export default function TagsProvider({ children }: Props) {
  const [tags, setTags] = useState<null | string[]>(() => {
    const storedTags = localStorage.getItem("Tags");

    if (storedTags) {
      return storedTags.split("&");
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (tags === null) {
      fetch("http://localhost:3000/tag")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          return response.json();
        })
        .then((data) => {
          const tagArray: string[] = [];
          data.map((item: { id: number; name: string; family: string }) => {
            tagArray.push(item.name);
          });
          setTags(tagArray);
        });
    }
  }, [tags]);

  return (
    <TagsContext.Provider value={{ tags, setTags }}>
      {children}
    </TagsContext.Provider>
  );
}

type Props = {
  children: React.ReactNode;
};
