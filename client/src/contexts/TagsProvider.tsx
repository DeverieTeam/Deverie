import { useEffect, useState } from "react";
import { TagsContext } from "./TagsContext";
import { useAuth } from "./useAuth";

export default function TagsProvider({ children }: Props) {
  const { auth } = useAuth();
  const [tags, setTags] = useState<null | string[]>(null);

  useEffect(() => {
    if (auth && tags === null) {
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
          const storageChecked = localStorage.getItem("Tags");
          if (storageChecked) {
            let storedTags = storageChecked.split("&");
            storedTags = storedTags.filter((tag) => tagArray.includes(tag));
            setTags(storedTags);
          } else if (auth.selected_tags && auth.selected_tags.length > 0) {
            const favouriteTags: string[] = [];
            auth.selected_tags.map((item) => {
              favouriteTags.push(item.name);
            });
            setTags(favouriteTags);
          } else {
            setTags(tagArray);
          }
        });
    }
  }, [tags, auth, auth?.selected_tags]);

  return (
    <TagsContext.Provider value={{ tags, setTags }}>
      {children}
    </TagsContext.Provider>
  );
}

type Props = {
  children: React.ReactNode;
};
