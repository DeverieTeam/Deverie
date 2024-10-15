import { createContext } from "react";

interface TagsContextType {
  tags: string[] | null;
  setTags: (tags: string[] | null) => void;
}

const defaultContextValue: TagsContextType = {
  tags: [],
  setTags: () => {},
};

export const TagsContext = createContext(defaultContextValue);
