import { RegisterDto, SignupDto } from "@/types/tag.dto";
import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "./cookie";

// axios 요청 파라미터 옵션인 withCredentials의 기본값은 fals로 설정되어 CORS 요청을 허용하지 않음
// instance.interceptors.request.use
// instance.interceptors.response.use
// axios의 요청과 응답을 가로채는 인터셉터를 사용하여 요청과 응답을 하기 전 가공할 수 있음
// ex) 모든 헤더에 Authorization을 추가하거나, 응답에 대한 에러 처리를 추가할 수 있음
// axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    // "Access-Control-Allow-Origin": "http://localhost:5173", // 허용할 출처 설정
    // "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS", // 허용할 HTTP 메서드 설정
    "Access-Control-Allow-Headers": "content-type", // 허용할 헤더 설정
    "Access-Control-Allow-Credentials": "true", // 이 부분이 추가되었습니다.
    origin: "http://localhost:5173",
  },
});

instance.interceptors.request.use(async (config: any) => {
  const token = getCookie("jwt");
  // console.log("token : ", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  // config.headers = {
  // Authorization : {token ? `Bearer ${token}` : null}
  // Authorization: `Bearer ${token}`,

  // instance.interceptors.request.use(async (config) => {
  // const token = getCookie("admin_access_token") ?? getCookie("access_token");
  // config.headers = {
  // Authorization: `Bearer ${token}`,
  // Authorization :
  // };
  return config;
});

interface ClaudeResponse {
  reply: string;
}
const axiosClaudeURL = "/claude";
export const sendMessageToClaude = async (message: string): Promise<string> => {
  console.log("sendMessageToClaude", message);
  try {
    const response = await instance.post<ClaudeResponse>(axiosClaudeURL, {
      message,
    });
    return response.data.reply;
  } catch (error) {
    console.error("Error calling Claude API:", error);
    throw error;
  }
};

const axiosResgisterURL = "";
export const axiosRegister = async (register: RegisterDto): Promise<any> => {
  try {
    const response = await instance.get(axiosResgisterURL);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosUserCreateURL = "/user/create/";
export const axiosUserCreate = async (data: SignupDto): Promise<any> => {
  try {
    console.log("data : ", data);
    const response = await instance.post(axiosUserCreateURL, data);
    console.log("data : 2", response);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * 비밀번호 찾기 요청
 */
const axiosResetCreateURL = "/auth/reset/email/create";
export const axiosFindPW = async (email: string): Promise<any> => {
  try {
    const response = await instance.post(axiosResetCreateURL, { email: email });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosResetVerifyURL = "/auth/reset/email/verify";
export const axiosChangePassword = async (password: string): Promise<any> => {
  try {
    const response = await instance.post(axiosResetVerifyURL, {
      password: password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosVerifyTwoFactorURL = "/auth/twofactor/verify";
export const axiosVerifyTwoFactor = async (code: string): Promise<any> => {
  try {
    console.log("co'de : ", code);
    const response = await instance.post(axiosVerifyTwoFactorURL, {
      code: code,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosCreateTwoFactorURL = "/auth/twofactor/create";
export const axiosCreateTwoFactor = async (): Promise<any> => {
  try {
    const response = await instance.post(axiosCreateTwoFactorURL);
    return response;
  } catch (error) {
    throw error;
  }
};

// 로그인시 이메일 인증
const axiosEmailVerifyURL = "/auth/register/email/send";
export const axiosEmailVerify = async (): Promise<any> => {
  // console.log("token", token);
  try {
    // {}안에 넣어야지 body에 넣어서 보내줌
    const response = await instance.post(axiosEmailVerifyURL);
    return response;
  } catch (error) {
    throw error;
  }
};

// 유저 쿼리 검색 -> SEARCH
const axiosFindUserURL = "/user/find";
export const axiosFindUser = async (
  si?: string | undefined,
  gu?: string | undefined,
  minAge?: number,
  maxAge?: number,
  minRate?: number,
  maxRate?: number,
  hashtags?: string[]
): Promise<any> => {
  try {
    const params: Record<string, string> = {};
    if (minAge !== undefined) params.minAge = minAge.toString();
    if (maxAge !== undefined) params.maxAge = maxAge.toString();
    if (minRate !== undefined) params.minRate = minRate.toString();
    if (maxRate !== undefined) params.maxRate = maxRate.toString();
    if (si) params.si = si;
    if (gu) params.gu = gu;

    // hashtags 처리: undefined나 빈 배열일 경우 빈 문자열 할당
    params.hashtags = hashtags && hashtags.length > 0 ? hashtags.join(",") : "";

    const queryString = new URLSearchParams(params).toString();
    const url = queryString
      ? `${axiosFindUserURL}?${queryString}`
      : axiosFindUserURL;
    console.log("search user url", url);
    const response = await instance.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosAuthLoginURL = "/auth/login";
export const axiosAuthLogin = async (
  username: string,
  password: string
): Promise<any> => {
  try {
    const response = await instance.post(axiosAuthLoginURL, {
      username: username,
      password: password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// PROFILE 유저 페이지
const axiosProfileMeURL = "/user/profile/me";
export const axiosProfileMe = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosProfileMeURL);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosProfileURL = "/user/profile";
export const axiosProfile = async (username: string): Promise<any> => {
  try {
    const response = await instance.get(
      `${axiosProfileURL}?username=${username}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosUserRateURL = "/rateUser";
export const axiosUserRate = async (rate: number): Promise<any> => {
  try {
    const response = await instance.post(axiosUserRateURL, { rate: rate });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosLogoutURL = "/auth/logout";
export const axiosLogout = async (): Promise<any> => {
  try {
    const response = await instance.delete(axiosLogoutURL);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosUserBlockURL = "/user/block";
export const axiosUserBlock = async (username: string): Promise<any> => {
  try {
    const response = await instance.post(`${axiosUserBlockURL}`, {
      blockUsername: username,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// chatroom id로 채팅방 정보 가져오기
const axiosChatroomURL = "/user/chat";
export const axiosChatroom = async (
  // username: string,
  userID: number
): Promise<any> => {
  try {
    console.log("back url : ", `${axiosChatroomURL}?id=${userID}`);
    const response = await instance.get(`${axiosChatroomURL}?id=${userID}`);
    return response;
  } catch (error) {
    throw error;
  }
};
