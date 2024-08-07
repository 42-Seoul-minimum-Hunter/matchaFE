import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "alarm",
  storage: localStorage,
});

export const userAlarm = atom({
  key: "alarm",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
