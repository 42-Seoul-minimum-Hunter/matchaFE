import {
  axiosCreateTwoFactor,
  axiosEmailVerify,
  axiosVerifyTwoFactor,
} from "@/api/axios.custom";
import InputTemplate from "@/components/InputTemplate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TwoFactor = () => {
  const [password, setPassword] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  // const [isTimer, setIsTimer] = useState(false);
  const navigator = useNavigate();

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const email = "miyu@student.42seoul.kr";
  useEffect(() => {
    try {
      // 여기서 email을 보내줘야 하나? -> 지금은 jwt가 적용 안되어있으니까 지금만 이메일 보내기
      const res = axiosCreateTwoFactor(email);
      console.log("res", res);
      setIsEmail(true);
      // setIsTimer(true);
      // navigator("/search");
    } catch (error: any) {
      setIsEmail(false);
      console.log("error", error);
      throw error;
    }
  }, []);

  const onCLickEmailVerify = async () => {
    try {
      // 이메일 인증 절차 -> 통과하면 바로 search로 이동
      const res = await axiosEmailVerify();
      console.log("email res", res);
      // navigate("/search");
    } catch (error) {
      setIsEmail(false);
      // 이메일 인증 실패해도 login이동
      // navigate("/login");
      console.log("email error", error);
    }
  };

  // const onClickSubmit = async () => {
  //   try {
  //     console.log("password", password);
  //     const res = await axiosVerifyTwoFactor(password);
  //     console.log("res", res);
  //   } catch (error: any) {
  //     console.log("error", error);
  //     alert("인증번호가 일치하지 않습니다.");
  //     throw error;
  //   }
  //   // navigator("/search");
  // };

  return (
    <Wrapper>
      {isEmail ? (
        <>
          <div>이메일 함을 확인해주세요</div>
          <button onClick={onCLickEmailVerify}>
            이메일로 인증링크 받기 버튼
          </button>
        </>
      ) : (
        <>
          <CardStyled>
            <InputContainer>
              <HeaderStyled>
                <h1>Check 2fa</h1>
                <InfoTextStyled>
                  <p>본인 계정의 이메일로 코드가 전송되었습니다.</p>
                  <p>코드를 입력해주세요</p>
                </InfoTextStyled>
              </HeaderStyled>
              <InputTemplate
                title="password"
                placeholder="Add a your password"
                value={password}
                onChange={changePassword}
                type="password"
              />
              {/* {isTimer ? <UseCounter /> : null} */}
              {/* <SubmitButtonStyled onClick={onClickSubmit}>
            submit
          </SubmitButtonStyled> */}
            </InputContainer>
          </CardStyled>
        </>
      )}
    </Wrapper>
  );
};

export default TwoFactor;

const HeaderStyled = styled.div`
  & > h1 {
    font-size: 2.5rem;
    font-weight: 500;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const InfoTextStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p {
    font-size: 1.2rem;
    margin: 10px 0;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitButtonStyled = styled.button`
  width: 100%;
  font-size: 1.2rem;
  padding: 15px 0px;
  border-radius: 30px;
  margin-top: 30px;
  background-color: var(--vermilion);
`;

const CardStyled = styled.div`
  width: 80%;
  height: 80%;
  padding: 0 40px;
  border: 1px solid black;

  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.8);
  /* background-color: rgba(0, 0, 0, 0.5); */
  /* box-shadow: 0 0 10px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
