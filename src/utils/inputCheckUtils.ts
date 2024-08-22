// const CheckName = (name: string) => {};

import { GenderType, InterestType, PreferenceType } from "@/types/tag.enum";

// username 검사 함수
export function validateUsername(username: string) {
  const usernameRegex = /^[a-zA-Z0-9]{4,15}$/;
  return usernameRegex.test(username);
}

// password 검사 함수
export function validatePassword(password: string) {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#.])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
}

// password Check 검사 함수
export function validateCheckPassword(password: string, checkPW?: string) {
  return password === checkPW;
}

// lastName, firstName 검사 함수
export function validateName(name: string) {
  const nameRegex = /^[a-zA-Z]{1,10}$/;
  return nameRegex.test(name);
}

// biography 검사 함수
export function validateBiography(biography: string) {
  const biographyRegex =
    /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:"\\|,.\/?' ']{1,100}$/;
  return biographyRegex.test(biography);
}

// age 검사 함수
export function validateAge(age: string) {
  const ageRegex = /^[0-9]{1,3}$/;
  return ageRegex.test(age);
}

// gender 검사 함수
export function validateGender(gender: GenderType | undefined): boolean {
  if (gender === undefined) {
    return false;
  }
  return gender === GenderType.MALE || gender === GenderType.FEMALE;
}

// preference 검사 함수
export function validatePreference(
  preference: PreferenceType | undefined
): boolean {
  if (preference === undefined) {
    return false;
  }
  return (
    preference === PreferenceType.BISEXUAL ||
    preference === PreferenceType.HETEROSEXUAL ||
    preference === PreferenceType.HOMOSEXUAL ||
    preference === PreferenceType.ASEXUAL
  );
}

// hashtags 검사 함수
export function validateHashtags(hashtags: InterestType[] | undefined) {
  if (hashtags === undefined) {
    return false;
  }
  const validInterestTypes = Object.values(InterestType);

  for (let hashtag of hashtags) {
    if (!validInterestTypes.includes(hashtag)) {
      return false;
    }
  }
  return true;
}

// si 검사 함수
function validateSi(si) {
  if (
    !si === "서울" ||
    !si === "부산" ||
    !si === "대구" ||
    !si === "인천" ||
    !si === "광주" ||
    !si === "대전" ||
    !si === "울산" ||
    !si === "세종" ||
    !si === "경기" ||
    !si === "강원" ||
    !si === "충북" ||
    !si === "충남" ||
    !si === "전북" ||
    !si === "전남" ||
    !si === "경북" ||
    !si === "경남" ||
    !si === "제주"
  ) {
    return false;
  }
  return true;
}

function validateGu(si, gu) {
  if (si === "서울") {
    if (
      !gu === "종로구" ||
      !gu === "중구" ||
      !gu === "용산구" ||
      !gu === "성동구" ||
      !gu === "광진구" ||
      !gu === "동대문구" ||
      !gu === "중랑구" ||
      !gu === "성북구" ||
      !gu === "강북구" ||
      !gu === "도봉구" ||
      !gu === "노원구" ||
      !gu === "은평구" ||
      !gu === "서대문구" ||
      !gu === "마포구" ||
      !gu === "양천구" ||
      !gu === "강서구" ||
      !gu === "구로구" ||
      !gu === "금천구" ||
      !gu === "영등포구" ||
      !gu === "동작구" ||
      !gu === "관악구" ||
      !gu === "서초구" ||
      !gu === "강남구" ||
      !gu === "송파구" ||
      !gu === "강동구"
    ) {
      return false;
    }
    return true;
  }
  if (si === "부산") {
    if (
      !gu === "중구" ||
      !gu === "서구" ||
      !gu === "동구" ||
      !gu === "영도구" ||
      !gu === "부산진구" ||
      !gu === "동래구" ||
      !gu === "남구" ||
      !gu === "북구" ||
      !gu === "해운대구" ||
      !gu === "사하구" ||
      !gu === "금정구" ||
      !gu === "강서구" ||
      !gu === "연제구" ||
      !gu === "수영구" ||
      !gu === "사상구" ||
      !gu === "기장"
    ) {
      return false;
    }
    return true;
  }
  if (si === "대구") {
    if (
      !gu === "중구" ||
      !gu === "동구" ||
      !gu === "서구" ||
      !gu === "남구" ||
      !gu === "북구" ||
      !gu === "수성구" ||
      !gu === "달서구" ||
      !gu === "달성군"
    ) {
      return false;
    }
    return true;
  }
  if (si === "인천") {
    if (
      !gu === "중구" ||
      !gu === "동구" ||
      !gu === "미추홀구" ||
      !gu === "연수구" ||
      !gu === "남동구" ||
      !gu === "부평구" ||
      !gu === "계양구" ||
      !gu === "서구" ||
      !gu === "강화군" ||
      !gu === "옹진군"
    ) {
      return false;
    }
    return true;
  }
  if (si === "광주") {
    if (
      !gu === "동구" ||
      !gu === "서구" ||
      !gu === "남구" ||
      !gu === "북구" ||
      !gu === "광산구"
    ) {
      return false;
    }
    return true;
  }
  if (si === "대전") {
    if (
      !gu === "동구" ||
      !gu === "중구" ||
      !gu === "서구" ||
      !gu === "유성구" ||
      !gu === "대덕구"
    ) {
      return false;
    }
    return true;
  }
  if (si === "울산") {
    if (
      !gu === "중구" ||
      !gu === "남구" ||
      !gu === "동구" ||
      !gu === "북구" ||
      !gu === "울주군"
    ) {
      return false;
    }
    return true;
  }
  if (si === "세종") {
    if (!gu === "세종") {
      return false;
    }
    return true;
  }
  if (si === "경기") {
    if (
      !gu === "수원시" ||
      !gu === "성남시" ||
      !gu === "안양시" ||
      !gu === "안산시" ||
      !gu === "용인시" ||
      !gu === "부천시" ||
      !gu === "광명시" ||
      !gu === "평택시" ||
      !gu === "과천시" ||
      !gu === "의왕시" ||
      !gu === "군포시" ||
      !gu === "하남시" ||
      !gu === "오산시" ||
      !gu === "시흥시" ||
      !gu === "군포시" ||
      !gu === "의왕시" ||
      !gu === "하남시" ||
      !gu === "오산시" ||
      !gu === "시흥시" ||
      !gu === "파주시" ||
      !gu === "이천시" ||
      !gu === "안성시" ||
      !gu === "김포시" ||
      !gu === "화성시" ||
      !gu === "광주시" ||
      !gu === "양주시" ||
      !gu === "포천시" ||
      !gu === "여주군" ||
      !gu === "연천군" ||
      !gu === "가평군" ||
      !gu === "양평군"
    ) {
      return false;
    }
    return true;
  }
  if (si === "강원") {
    if (
      !gu === "춘천시" ||
      !gu === "원주시" ||
      !gu === "강릉시" ||
      !gu === "동해시" ||
      !gu === "태백시" ||
      !gu === "속초시" ||
      !gu === "삼척시" ||
      !gu === "홍천군" ||
      !gu === "횡성군" ||
      !gu === "영월군" ||
      !gu === "평창군" ||
      !gu === "정선군" ||
      !gu === "철원군" ||
      !gu === "화천군" ||
      !gu === "양구군" ||
      !gu === "인제군" ||
      !gu === "고성시" ||
      !gu === "양양군"
    ) {
      return false;
    }
    return true;
  }
  if (si === "충북") {
    if (
      !gu === "청주시" ||
      !gu === "충주시" ||
      !gu === "제천시" ||
      !gu === "보은군" ||
      !gu === "옥천군" ||
      !gu === "영동군" ||
      !gu === "증평군" ||
      !gu === "진천군" ||
      !gu === "괴산군" ||
      !gu === "음성군" ||
      !gu === "단양군"
    ) {
      return false;
    }
    return true;
  }
  if (si === "충남") {
    if (
      !gu === "천안시" ||
      !gu === "공주시" ||
      !gu === "보령시" ||
      !gu === "아산시" ||
      !gu === "서산시" ||
      !gu === "논산시" ||
      !gu === "계룡시" ||
      !gu === "당진군" ||
      !gu === "금산군" ||
      !gu === "부여군" ||
      !gu === "서천군" ||
      !gu === "청양시" ||
      !gu === "홍성군" ||
      !gu === "예산군" ||
      !gu === "태안군"
    ) {
      return false;
    }
    return true;
  }
  if (si === "전북") {
    if (
      !gu === "전주시" ||
      !gu === "군산시" ||
      !gu === "익산시" ||
      !gu === "정읍시" ||
      !gu === "남원시" ||
      !gu === "김제시" ||
      !gu === "완주군" ||
      !gu === "진안군" ||
      !gu === "무주군" ||
      !gu === "장수군" ||
      !gu === "임실군" ||
      !gu === "순창군" ||
      !gu === "고창군" ||
      !gu === "부안군"
    ) {
      return false;
    }
    return true;
  }
  if (si === "전남") {
    if (
      !gu === "목포시" ||
      !gu === "여수시" ||
      !gu === "순천시" ||
      !gu === "나주시" ||
      !gu === "광양시" ||
      !gu === "담양군" ||
      !gu === "곡성군" ||
      !gu === "구례군" ||
      !gu === "고흥군" ||
      !gu === "보성군" ||
      !gu === "화순군" ||
      !gu === "장흥군" ||
      !gu === "강진군" ||
      !gu === "해남군" ||
      !gu === "영암군" ||
      !gu === "무안군" ||
      !gu === "함평군" ||
      !gu === "영광군" ||
      !gu === "장성군" ||
      !gu === "완도군" ||
      !gu === "진도군" ||
      !gu === "신안군"
    ) {
      return false;
    }
    return true;
  }
  if (si === "경북") {
    if (
      !gu === "포항시" ||
      !gu === "경주시" ||
      !gu === "김천시" ||
      !gu === "안동시" ||
      !gu === "구미시" ||
      !gu === "영주시" ||
      !gu === "영천시" ||
      !gu === "상주시" ||
      !gu === "문경시" ||
      !gu === "경산시" ||
      !gu === "군위군" ||
      !gu === "의성군" ||
      !gu === "청송군" ||
      !gu === "영양군" ||
      !gu === "영덕군" ||
      !gu === "청도군" ||
      !gu === "고령군" ||
      !gu === "성주군" ||
      !gu === "칠곡군" ||
      !gu === "예천군" ||
      !gu === "봉화군" ||
      !gu === "울릉군" ||
      !gu === "울진군"
    ) {
      return false;
    }
    return true;
  }
  if (si === "경남") {
    if (
      !gu === "창원시" ||
      !gu === "진주시" ||
      !gu === "통영시" ||
      !gu === "사천시" ||
      !gu === "김해시" ||
      !gu === "밀양시" ||
      !gu === "거제시" ||
      !gu === "양산시" ||
      !gu === "의령군" ||
      !gu === "함안군" ||
      !gu === "창녕군" ||
      !gu === "고성군" ||
      !gu === "남해군" ||
      !gu === "하동군" ||
      !gu === "산청군" ||
      !gu === "함양군" ||
      !gu === "거창군" ||
      !gu === "합천군" ||
      !gu === "사천시" ||
      !gu === "김해시"
    ) {
      return false;
    }
    return true;
  }
  if (si === "제주") {
    if (!gu === "제주시" || !gu === "서귀포시") {
      return false;
    }
    return true;
  }
}

export function validateEmail(email: string) {
  // 이메일 형식 정규식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 정규식을 이용하여 이메일 형식 검증
  return emailRegex.test(email);
}

export function convertToUpperCase(arr: any) {
  return arr.map((item: string) => item.toUpperCase());
}

export function convertToLowerCase(arr: any) {
  return arr.map((item: string) => item.toLowerCase());
}

// export const validateMessage = (message: string) => {
//   const messageRegex =
//     /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}:"\\|,.\/?|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1,255}$/;
//   return messageRegex.test(message);
// };

export function validateMessage(message: string) {
  const messageRegex =
    /^[a-zA-Z0-9!@\s#$%^&*()_+\-=\[\]{}:"\\|,.\/?|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1,255}$/;
  return messageRegex.test(message);
}

export const useInputValidation = (
  type: string,
  value: string,
  checkPW?: string
): string | null => {
  switch (type) {
    case "username":
      return !validateUsername(value) ? "유저네임은 4-15자여야 합니다." : null;
    case "password":
      return !validatePassword(value)
        ? "비밀번호는 최소 8글자이며, 알파벳, 숫자, 특수문자 '!@#.'를 포함해야 합니다."
        : null;
    case "firstname":
    case "lastname":
      return !validateName(value) ? "이름은 알파벳 1~10글자여야 합니다." : null;
    case "checkPassword":
      return !validateCheckPassword(value, checkPW)
        ? "비밀번호가 일치하지 않습니다."
        : null;
    case "bio":
      return !validateBiography(value)
        ? "약력은 알파벳 1-100자여야 합니다."
        : null;
    case "email":
      return !validateEmail(value) ? "올바른 이메일 주소가 아닙니다." : null;
    default:
      return null;
  }
};
export default useInputValidation;
