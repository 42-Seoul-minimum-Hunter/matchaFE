import styled from "styled-components";
import { axiosEmailVerify } from "@/api/axios.custom";

const EmailPage = () => {
  const onCLickEmailVerify = async () => {
    try {
      // 이메일 인증 절차 -> 통과하면 바로 search로 이동
      const res = await axiosEmailVerify();
      console.log("email res", res);
      // navigate("/search");
    } catch (error) {
      // setIsEmail(false);
      // 이메일 인증 실패해도 login이동
      // navigate("/login");
      console.log("email enpmrror", error);
    }
  };
  return (
    <div>
      <h1>EmailPage</h1>
      <button onClick={onCLickEmailVerify}>이메일로 인증링크 받기 버튼</button>
    </div>
  );
};

export default EmailPage;

const Wrapper = styled.div``;
