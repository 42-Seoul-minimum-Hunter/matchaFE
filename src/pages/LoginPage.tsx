import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as HeartIcon } from "@/assets/icons/main-heart.svg";
import InputTemplate from "@/components/InputTemplate";
import { useState } from "react";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const isLoginPage: boolean = location.pathname === "/login";
  const saveUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const savePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClickLogin = () => {
    navigate("/search");
  };

  return (
    <Wrapper>
      {/* <BackgroundCircleStyled>
        <TestCircle></TestCircle>
      </BackgroundCircleStyled> */}
      <TitleStyled>Matcha</TitleStyled>
      <LoginFormStyled>
        <InputTemplate
          title="userName"
          placeholder="Add a your userName"
          value={userName}
          onChange={saveUserName}
        />
        <InputTemplate
          title="Password"
          placeholder="Add a your pw"
          value={password}
          onChange={savePassword}
        />
        <SubmitButtonStyled onClick={onClickLogin}>Submit</SubmitButtonStyled>
      </LoginFormStyled>
      <InfoTextStyled>간편 로그인</InfoTextStyled>
      <OauthButtonStyled>sign in with 42</OauthButtonStyled>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  width: 80%;
  height: 80%;
  max-width: 1000px;
  min-height: 600px;
  /* opacity: 0.5; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); */
  box-shadow: 0 0 10px;
  border-radius: 10px;
  margin: 100px auto;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    /* width: 100%;
    height: 100%; */
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
`;

const TitleStyled = styled.div`
  opacity: 1;
  font-size: 3rem;
  font-family: var(--main-font);
  margin-bottom: 20px;
`;

const LoginFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  gap: 35px;
`;

const SubmitButtonStyled = styled.button`
  width: 100%;
  font-size: 1.5rem;
  padding: 15px 0px;
  border-radius: 30px;
  background-color: var(--vermilion);
`;

const InfoTextStyled = styled.div`
  display: flex;
  /* flex-basis: 100%; */
  width: 80%;

  align-items: center;
  color: rgba(0, 0, 0);
  font-size: 1rem;
  font-weight: 600;
  margin: 20px 0px;

  &::before,
  &::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0);
    height: 1px;
    font-size: 10px;
    line-height: 0px;
    margin: 0px 16px;
  }
   {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0);
    height: 1px;
    font-size: 1px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;

const OauthButtonStyled = styled.button``;

const BackgroundCircleStyled = styled.div`
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    /* width: 100%;
    height: 100%; */
    background-color: rgba(22, 15, 15, 0.5);
    z-index: -1;
    width: 100%;
    height: 100%;
    /* position: absolute; */
  }
  /* z-index: -1; /// 배경으로 설정 */
`;

const TestCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #27f122;
  filter: blur(50px);
`;
