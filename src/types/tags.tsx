import { tagItem } from "@/pages/LoginPage";
import { GenderLableMap, InterestLableMap, PreferenceLableMap } from "./maps";
import { LocationData } from "@/assets/mock/mock";

export const HashTagsList: tagItem[] = Object.entries(InterestLableMap).map(
  ([value, label]) => ({ value, label })
);
export const genderTagList: tagItem[] = Object.entries(GenderLableMap).map(
  ([value, label]) => ({ value, label })
);
export const preferenceTagList: tagItem[] = Object.entries(
  PreferenceLableMap
).map(([value, label]) => ({ value, label }));

export const locationSiTagList: tagItem[] = LocationData.map((area) => ({
  value: area.name,
  label: area.name,
}));
