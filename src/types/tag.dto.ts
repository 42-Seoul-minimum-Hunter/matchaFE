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
  rate?: number; // 0 ~ 5
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
  age: number;
  biography: string;
  firstName: string;
  lastName: string;
  si: string;
  gu: string;
  hashtags: InterestType[];
  gender: GenderType;
  preference: PreferenceType;
  rate: number;
  isBlocked: boolean;
  username: string;
  profileImages: string[];
}

export interface SignupDto {
  email: string;
  password: string;
}
