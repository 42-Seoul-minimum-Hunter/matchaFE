import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as HeartIcon } from "@/assets/icons/main-heart.svg";
import { ReactComponent as WeddingIcon } from "@/assets/icons/main-wedding.svg";
import InputTemplate from "@/components/InputTemplate";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
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
    navigate("/twoFactor");
    // navigate("/search");
  };

  const onClickSignInButton = () => {
    navigate("/login");
  };
  const onClickSignUpButton = () => {
    navigate("/signup");
  };
  const onClickFindPasswordButton = () => {
    navigate("/findPW");
  };

  const OAUTH_CALLBACK_URI = "http://localhost:3000/auth/callback";
  const OAUTH_CLIENT_ID =
    "u-s4t2ud-4c71b29a46d703713b962ab0e0a2161547a772c450716accbb61c07546814f38";

  const Redirect = "https://api.intra.42.fr/oauth/authorize?";

  const onClickOauthButton = () => {
    const url = `${Redirect}client_id=${OAUTH_CLIENT_ID}&redirect_uri=${OAUTH_CALLBACK_URI}&response_type=code`;
    // navigate(url);
    window.location.href = url;
  };

  console.log("isMobile", isMobile);

  return (
    <Wrapper>
      <SectionStyled>
        <CardStyled>
          <TitleStyled>MATCHA</TitleStyled>
          <HeartIcon />
          <SignWrapper>
            <p>새로운 인연을 만나세요</p>
          </SignWrapper>
        </CardStyled>
      </SectionStyled>
      <SectionStyled>
        <CardStyled>
          <TitleStyled>{isMobile ? "MATCHA" : "LOGIN"}</TitleStyled>
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
              type="password"
            />
            <SubmitButtonStyled onClick={onClickLogin}>
              Submit
            </SubmitButtonStyled>
          </LoginFormStyled>
          <InfoTextStyled>간편 로그인</InfoTextStyled>
          <OauthButtonStyled onClick={onClickOauthButton}>
            sign in with 42
          </OauthButtonStyled>
          <UtilsContainer>
            <p onClick={onClickSignUpButton}>회원이 아니신가요?</p>
            <p onClick={onClickFindPasswordButton}>비밀번호를 잊으셨나요?</p>
          </UtilsContainer>
        </CardStyled>
      </SectionStyled>
    </Wrapper>
  );
};

export default LoginPage;

const UtilsContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const SignWrapper = styled.div`
  display: flex;
  & > :first-child {
    margin-right: 20px;
  }
`;

const SignStyled = styled.div`
  font-size: 1.5rem;
  font-family: var(--main-font);
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  & > :first-child {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const CardStyled = styled.div`
  width: 80%;
  min-width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); */
  border-radius: 10px;
  height: 80%;
  box-shadow: 0 0 10px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    height: auto;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
    overflow: auto;
    height: auto;
    margin: 40px auto;
  }
`;

const SectionStyled = styled.div`
  background-color: #fff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  /* overflow: auto; */
`;

const TitleStyled = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  font-family: var(--main-font);
`;

const LoginTitleStyled = styled.div`
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

const OauthButtonStyled = styled.button`
  width: 80%;
  padding: 10px;
  border-radius: 10px;
`;

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
