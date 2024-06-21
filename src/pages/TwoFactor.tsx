import { axiosCreateTwoFactor, axiosVerifyTwoFactor } from "@/api/axios.custom";
import InputTemplate from "@/components/InputTemplate";
import UseCounter from "@/hooks/useCounter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const TwoFactor = () => {
  const [password, setPassword] = useState("");
  const [isTimer, setIsTimer] = useState(false);
  const navigator = useNavigate();

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const email = "";
  useEffect(() => {
    try {
      // 여기서 email을 보내줘야 하나?
      //   const res = axiosCreateTwoFactor(email);
      setIsTimer(true);
    } catch (error: any) {
      console.log("error", error);
      throw error;
    }
  }, []);

  const onClickSubmit = async () => {
    try {
      const res = await axiosVerifyTwoFactor(password);
      console.log("res", res);
    } catch (error: any) {
      console.log("error", error);
      alert("인증번호가 일치하지 않습니다.");
      throw error;
    }
    navigator("/search");
  };

  return (
    <Wrapper>
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
          {isTimer ? <UseCounter /> : null}
          <SubmitButtonStyled onClick={onClickSubmit}>
            submit
          </SubmitButtonStyled>
        </InputContainer>
      </CardStyled>
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
