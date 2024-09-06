import { useContext } from "react";
import { TagsContext } from "./TagsContext";

export const useTags = () => useContext(TagsContext);
