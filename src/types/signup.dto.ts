import { GenderType, InterestType, PreferenceType } from "./tag.enum";

export interface SignupDto {
  email: string; //
  username: string; // 4 ~15, 영어, 숫자
  password: string; // 4 ~ 15, 영어, 숫자, 특수문자
  lastName: string; // 4 ~ 15 영어
  firstName: string; // 4 ~ 15 영어
  gender: GenderType;
  preference: PreferenceType;
  biography: string; // 1 ~ 100 영어 숫자만
  age: number; // 1 ~ 100
  //   ////

  isGpsAllowed: boolean;

  //   ///
  hashtags: InterestType[];

  // region: string;
  si: string;
  gu: string;
  profileImages: string[];
}

export interface settingUserDto {
  // User Profile
  firstName: string; // 4 ~ 15 영어
  lastName: string; // 4 ~ 15 영어

  password: string; // 4 ~ 15, 영어, 숫자, 특수문자

  //   User Photos
  profileImages: string[];

  //   UserToggle
  isGpsAllowed: boolean;
  isTwoFactor: boolean;

  //   UserDetail
  username: string; // 4 ~15, 영어, 숫자
  gender: GenderType;
  preference: PreferenceType;
  biography: string; // 1 ~ 100 영어 숫자만
  age: number; // 1 ~ 100
  hashtags: InterestType[];
  si: string;
  gu: string;
}
