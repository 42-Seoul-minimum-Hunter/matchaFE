import { tagItem } from "@/pages/LoginPage";
import { InterestLableMap } from "./maps";

export const HashTagsList: tagItem[] = Object.entries(InterestLableMap).map(
  ([value, label]) => ({ value, label })
);
