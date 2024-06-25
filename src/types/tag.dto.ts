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

// {
//   "email" : "email@gmail",
//   "username" : "hihi",
//   "password" : "hello",
//   "lastName" : "min",
//   "firstName" : "yeomin",
//   "gender" : "male",
//   "preference" : "female",
//   "biography" : "hello, world",
//   "age": "22",
//   "isGpsAllowed" : null,
//   "hashtags" : ["running", "game"],
//   "region" : { "si" : "seoul" , "gu" : "gwanak"},
//   "profileImages" : ["abc", "def"]
//   백에서 처리
//   "isOauth" : false,
//   "isValid" : false,
// }

// chatroom dto
// content :"hello"
// createdAt : "2019-12-31T15:00:00.000Z"
// profileImage : "https://naver.com"
// username :"" "User2"

// chatcontent dto
// message : "world"
// time :  "2019-12-31T15:00:00.000Z"
// username :  "User3"

// export interface OverdueUserDto {
//   building: string;
//   floor: number;
//   section: string;
//   cabinetId: number;
//   visibleNum: number;
//   name: string;
//   overdueDays: number;
// }

// export interface ICabinetNumbersPerFloor {
//   floor: number;
//   total: number;
//   used: number;
//   overdue: number;
//   unused: number;
//   disabled: number;
// }
