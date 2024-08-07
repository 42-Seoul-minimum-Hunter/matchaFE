import { b } from "vite/dist/node/types.d-aGj9QkWt";
import { GenderType, InterestType, PreferenceType } from "./tag.enum";

export interface RegisterDto {
  email: string; //
  username: string; // 4 ~15, 영어, 숫자
  password: string; // 4 ~ 15, 영어, 숫자, 특수문자
  lastName: string; // 4 ~ 15 영어
  firstName: string; // 4 ~ 15 영어
  gender: GenderType;
  preference: PreferenceType;
  biography: string; // 1 ~ 100 영어 숫자만
  age: number; // 1 ~ 100
  isGpsAllowed: boolean;
  hashtags: InterestType[];

  // region: string;
  si: string;
  gu: string;
  rate: number; // 0 ~ 5
  profileImages: string[];
}

export interface SearchUserDto {
  age: number;
  gender: GenderType;
  preference: PreferenceType;
  hashtags: InterestType[];
  region: string;
}

export interface ProfileDto {
  username: string;
  firstName: string;
  lastName: string;
  gender: GenderType;
  preference: PreferenceType;
  age: number;
  biography: string;

  hashtags: InterestType[];
  si: string;
  gu: string;
  rate: number;
  profileImages: string[];
}

export interface SettingDto {
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  preference: string;
  age: number;
  biography: string;

  hashtags: string[];
  si: string;
  gu: string;

  profileImages: string[];

  isGpsAllowed: boolean;
  isTwofa: boolean;
  email: string;
}

export interface SignupDto {
  username: string;
  lastName: string;
  firstName: string;
  gender: string;
  preference: string;
  biography: string;
  age: number;
  isGpsAllowed: boolean;
  hashtags: string[];
  si: string;
  gu: string;
  profileImages: string[];
}
