import { RegisterDto } from "@/types/tag.dto";
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
  // withCredentials: true,
  headers: {
    "Content-type": "application/json",
    // "Access-Control-Allow-Origin": "http://localhost:5173", // 허용할 출처 설정
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS", // 허용할 HTTP 메서드 설정
    "Access-Control-Allow-Headers": "content-type", // 허용할 헤더 설정
    "Access-Control-Allow-Credentials": "true", // 이 부분이 추가되었습니다.
    // origin: "http://localhost:3000"/,
  },
});

instance.interceptors.request.use(async (config: any) => {
  const token = getCookie("jwt");
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // } else {
  //   delete config.headers.Authorization;
  // }

  // config.headers = {
  // Authorization : {token ? `Bearer ${token}` : null}
  // Authorization: `Bearer ${token}`,
  // };
  return config;
});

// localhost:3000/user/profile/me
const axiosProfileMeURL = "/user/profile/me";
export const axiosProfileMe = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosProfileMeURL);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosUserCreateURL = "/user/create/";
export const axiosUserCreate = async (data: RegisterDto): Promise<any> => {
  try {
    const response = await instance.post(axiosUserCreateURL, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosFindPWURL = "/auth/reset/email/create";
export const axiosFindPW = async (email: string): Promise<any> => {
  try {
    const response = await instance.post(axiosFindPWURL, { email: email });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosChangePasswordURL = "/auth/reset/email/verify";
export const axiosChangePassword = async (password: string): Promise<any> => {
  try {
    const response = await instance.post(axiosChangePasswordURL, password);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosSearchProfileURL = "/user/find";
export const axiosSearchProfile = async (email: string): Promise<any> => {
  try {
    const response = await instance.post(axiosSearchProfileURL);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosVerifyTwoFactorURL = "/auth/twofactor/verify";
export const axiosVerifyTwoFactor = async (code: string): Promise<any> => {
  try {
    const response = await instance.post(axiosVerifyTwoFactorURL, code);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosCreateTwoFactorURL = "/auth/twofactor/create";
export const axiosCreateTwoFactor = async (email: string): Promise<any> => {
  try {
    const response = await instance.post(axiosCreateTwoFactorURL, email);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosEmailVerifyURL = "/auth/register/email/send";
export const axiosEmailVerify = async (email: string): Promise<any> => {
  try {
    // {}안에 넣어야지 body에 넣어서 보내줌
    const response = await instance.post(axiosEmailVerifyURL, { email: email });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosFindUserURL = "/user/find";
// export const axiosFindUser = async (): Promise<any> => {
//   try {
//     const response = await instance.get(axiosFindUserURL);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export const axiosFindUser = async (
  minAge: number,
  maxAge: number,
  username: string,
  minRate: number,
  maxRate: number,
  si: string,
  gu: string,
  hashtags: string[]
): Promise<any> => {
  try {
    const params = {
      minAge,
      maxAge,
      username,
      minRate,
      maxRate,
      si,
      gu,
      hashtags: hashtags.join(","),
    };
    const response = await instance.get(axiosFindUserURL, { params });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosAuthLoginURL = "/auth/login";
export const axiosAuthLogin = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosAuthLoginURL);
    return response;
  } catch (error) {
    throw error;
  }
};
