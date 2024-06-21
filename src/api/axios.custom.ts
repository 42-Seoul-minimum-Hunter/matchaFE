import { RegisterDto } from "@/types/tag.dto";
import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "./cookie";

// axios 요청 파라미터 옵션인 withCredentials의 기본값은 fals로 설정되어 CORS 요청을 허용하지 않음
// instance.interceptors.request.use
// instance.interceptors.response.use
// axios의 요청과 응답을 가로채는 인터셉터를 사용하여 요청과 응답을 하기 전 가공할 수 있음
// ex) 모든 헤더에 Authorization을 추가하거나, 응답에 대한 에러 처리를 추가할 수 있음
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    // origin: "http://localhost:3000",
  },
});

instance.interceptors.request.use(async (config: any) => {
  const token = getCookie("admin_access_token") ?? getCookie("access_token");
  config.headers = {
    Authorization: `Bearer ${token}`,
  };
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

const axiosUserCreateURL = "/user/create";
export const axiosUserCreate = async (data: RegisterDto): Promise<any> => {
  try {
    const response = await instance.post(axiosUserCreateURL, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosFindPWURL = "/user/findpw";
export const axiosFindPW = async (email: string): Promise<any> => {
  try {
    const response = await instance.post(axiosFindPWURL, email);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosChangePasswordURL = "/user/change/password";
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
