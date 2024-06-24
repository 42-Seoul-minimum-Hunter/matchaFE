export interface RegisterDto {
  FirstName: string;
  LastName: string;
  Email: string;
  bio: string;
  location: string;
  age: number;
  Gender: string;
  Preference: string;
  tag: string;
  isGps: boolean;
}

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
