import InputTemplate from "@/components/InputTemplate";
import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import useRouter from "@/hooks/useRouter";
import {
  axiosCreateTwoFactor,
  axiosRegister,
  axiosUserLogin,
} from "@/api/axios.custom";
import ResetCheckEmail from "@/components/ResetCheckEmail";
import Loading from "@/components/chat/Loading";

// const GenderTag: ITagProps[] = [{ title: "male" }];
//  나중에 꼭 수정 필요 -> useMemo, useCallback 렌더링 최적화 해야함
export interface tagItem {
  value: string;
  label: string;
}

const LoginPage = () => {
  const { goToSignup, goToMain, goToTwofactor } = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const [signUpTextData, setSignUpTextData] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log("name, value", name, value);
    setSignUpTextData({ ...signUpTextData, [name]: value });
  };

  const tryGeneralLogin = async () => {
    setLoading(true);
    try {
      const res = await axiosUserLogin(
        signUpTextData.username,
        signUpTextData.password
      );
      console.log("res", res);
      console.log("res", res.data);
      if (res.data === false) goToMain();
      else {
        tryTwofactorCreate();
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const tryTwofactorCreate = async () => {
    try {
      const res = await axiosCreateTwoFactor();
      goToTwofactor();
      console.log("res", res);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const handleSubmit = () => {
    if (error === true) {
      return;
    }
    tryGeneralLogin();
  };

  const goToResetPasswordCreate = () => {
    setResetPassword(true);
  };

  const onClickOauthButton = () => {
    const url = `${import.meta.env.VITE_OAUTH_REDIRECT_URI}client_id=${
      import.meta.env.VITE_OAUTH_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_OAUTH_CALLBACK_URI
    }&response_type=code`;
    window.location.href = url;
  };

  return (
    <>
      {resetPassword ? (
        <>
          <ResetCheckEmail />
        </>
      ) : (
        <>
          <Container>
            <InputContainer>
              <TitleStyled>
                MEET<span>CHA</span>
              </TitleStyled>
              <InputTemplate
                type="username"
                label="유저네임"
                value={signUpTextData.username}
                onChange={handleInputChange}
                setErrorr={setError}
              />
              <InputTemplate
                type="password"
                label="비밀번호"
                value={signUpTextData.password}
                onChange={handleInputChange}
                setErrorr={setError}
              />
              <ButtonStyled onClick={handleSubmit} disabled={loading}>
                로그인
              </ButtonStyled>

              {loading && <Loading />}
              <OauthContainer>
                <OauthLabelStyled>간편 회원가입</OauthLabelStyled>
                <OauthButtonStyled onClick={onClickOauthButton}>
                  42 login
                </OauthButtonStyled>
              </OauthContainer>
              <InfoTextStyled onClick={goToResetPasswordCreate}>
                {`->`} 비밀번호를 잊으셨나요? <span>비밀번호 찾기</span>
              </InfoTextStyled>
              <InfoTextStyled onClick={goToSignup}>
                {`->`} 아직 회원이 아니신가요? <span>회원가입</span>
              </InfoTextStyled>
            </InputContainer>
          </Container>
        </>
      )}
    </>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  padding-top: 15vh;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    padding-top: 10vh;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
`;

const InfoTextStyled = styled.div`
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.4;
  text-align: start;
  width: 100%;
  & > span {
    color: var(--status-error-1);
    cursor: pointer;
    font-weight: 500;
    margin-left: 15px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  /* width: 100%; */
  max-width: 350px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

const OauthContainer = styled.div`
  display: flex;
  width: 350px;
  height: 50px;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.4;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const OauthLabelStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  border-top: 1px solid black;
  background-color: var(--white);
`;

const OauthButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--brand-sub-1);
  flex: 1;
  width: 100%;
  border: 1px solid black;
`;

const ButtonStyled = styled.button`
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--line-gray-1);
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
  width: 350px;
  font-size: 1.1rem;
  background-color: var(--brand-main-1);
  padding: 12px 0px;

  box-shadow: 4px 4px 3px 0px var(--black);
  margin-top: 30px;
  margin-bottom: 50px;
`;

const TitleStyled = styled.div`
  font-size: 3rem;
  font-family: var(--main-font);
  /* margin-bottom: 20px; */
  & > span {
    color: var(--brand-main-1);
  }
  margin-bottom: 40px;
`;
