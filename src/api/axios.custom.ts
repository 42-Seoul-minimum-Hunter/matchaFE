import { RegisterDto } from "@/types/tag.dto";
import axios from "axios";

// axios 요청 파라미터 옵션인 withCredentials의 기본값은 fals로 설정되어 CORS 요청을 허용하지 않음
// instance.interceptors.request.use
// instance.interceptors.response.use
// axios의 요청과 응답을 가로채는 인터셉터를 사용하여 요청과 응답을 하기 전 가공할 수 있음
// ex) 모든 헤더에 Authorization을 추가하거나, 응답에 대한 에러 처리를 추가할 수 있음

const instance = axios.create({
  baseURL: import.meta.env.VITE_BE_HOST,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const axiosResgisterURL = "";
export const axiosRegister = async (register: RegisterDto): Promise<any> => {
  try {
    const response = await instance.post(axiosResgisterURL, register);
    return response;
  } catch (error) {
    throw error;
  }
};
