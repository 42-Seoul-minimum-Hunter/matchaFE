import { RegisterDto } from "@/types/tag.dto";
import axios from "axios";

// axios 요청 파라미터 옵션인 withCredentials의 기본값은 fals로 설정되어 CORS 요청을 허용하지 않음
// instance.interceptors.request.use
// instance.interceptors.response.use
// axios의 요청과 응답을 가로채는 인터셉터를 사용하여 요청과 응답을 하기 전 가공할 수 있음
// ex) 모든 헤더에 Authorization을 추가하거나, 응답에 대한 에러 처리를 추가할 수 있음

const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  // const token = getCookie("admin_access_token") ?? getCookie("access_token");
  // config.headers = {
  // Authorization: `Bearer ${token}`,
  // Authorization :
  // };
  return config;
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

// useriD 나중에 jwt 대체
const axiosProfileURL = "/user/profile";
export const axiosProfile = async (
  username: string,
  userID: number
): Promise<any> => {
  try {
    console.log(
      "back url : ",
      `${axiosProfileURL}?username=${username}&id=${userID}`
    );
    const response = await instance.get(
      `${axiosProfileURL}?username=${username}&id=${userID}`
    );
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
