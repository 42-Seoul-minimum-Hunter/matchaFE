import { GenderType, InterestType, PreferenceType } from "./tag.enum";

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
  lastName: string;
  firstName: string;
  gender: GenderType;
  preference: PreferenceType;
  biography: string;
  age: number;
  gpsAllowedAt: boolean;
  hashtags: InterestType[];
  region: string;
  rate?: number;
  profileImages: string[];
}

export interface SearchUserDto {
  age: number;
  gender: GenderType;
  preference: PreferenceType;
  hashtags: InterestType[];
  region: string;
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
//   "gpsAllowedAt" : null,
//   "hashtags" : ["running", "game"],
//   "region" : { "si" : "seoul" , "gu" : "gwanak"},
//   "profileImages" : ["abc", "def"]
//   백에서 처리
//   "isOauth" : false,
//   "isValid" : false,
// }

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
