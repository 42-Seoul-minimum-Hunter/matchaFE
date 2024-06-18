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
