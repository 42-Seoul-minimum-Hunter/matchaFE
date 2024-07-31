import InputTemplate from "@/components/InputTemplate";
import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import useRouter from "@/hooks/useRouter";

// const GenderTag: ITagProps[] = [{ title: "male" }];
//  나중에 꼭 수정 필요 -> useMemo, useCallback 렌더링 최적화 해야함
export interface tagItem {
  value: string;
  label: string;
}

const LoginPage = () => {
  const { goToSignup, goToResetPW } = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [signUpTextData, setSignUpTextData] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log("name, value", name, value);
    setSignUpTextData({ ...signUpTextData, [name]: value });
    // setError(false);
  };

  const handleSubmit = () => {
    // if (signUpTextData.password !== signUpTextData.checkPassword) {
    //   alert("비밀번호가 일치하지 않습니다.");
    //   return;
    // }
    if (error === true) {
      return;
    }
  };

  return (
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
          // TODO : 에러 발생시 true로 변경 -> 나중에..
          setErrorr={setError}
        />
        <InputTemplate
          type="password"
          label="비밀번호"
          value={signUpTextData.password}
          onChange={handleInputChange}
          setErrorr={setError}
        />
        <ButtonStyled onClick={handleSubmit}>로그인</ButtonStyled>
        <OauthContainer>
          <OauthLabelStyled>간편 회원가입</OauthLabelStyled>
          <OauthButtonStyled>42 login</OauthButtonStyled>
        </OauthContainer>
        <InfoTextStyled onClick={goToResetPW}>
          {`->`} 비밀번호를 잊으셨나요? <span>비밀번호 찾기</span>
        </InfoTextStyled>
        <InfoTextStyled onClick={goToSignup}>
          {`->`} 아직 회원이 아니신가요? <span>회원가입</span>
        </InfoTextStyled>
      </InputContainer>
    </Container>
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

const OauthButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--brand-sub-1);
  flex: 1;
  width: 100%;
  border: 1px solid black;
`;

const ButtonStyled = styled.button`
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

// import styled from "styled-components";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ReactComponent as HeartIcon } from "@/assets/icons/main-heart.svg";
// import InputTemplate from "@/components/InputTemplate";
// import { useState } from "react";
// import { useMediaQuery } from "usehooks-ts";
// import { axiosAuthLogin, axiosEmailVerify } from "@/api/axios.custom";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [isEmail, setIsEmail] = useState(false);
//   // const isLoginPage: boolean = location.pathname === "/login";
//   const saveUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUsername(e.target.value);
//   };
//   const savePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const onClickLogin = async () => {
//     try {
//       const res = await axiosAuthLogin(username, password);
//       console.log("res", res.status);
//       if (res.status == 200) {
//         navigate("/twoFactor");
//       }
//     } catch (error: any) {
//       // console.log("error", error);
//       // console.log("error", error.response.data.error);
//       alert(error.response.data);
//       throw error;
//     }
//   };

//   // const onCLickEmailVerify = async () => {
//   //   try {
//   //     // 이메일 인증 절차 -> 통과하면 바로 search로 이동
//   //     const res = await axiosEmailVerify();
//   //     console.log("email res", res);
//   //     // navigate("/search");
//   //   } catch (error) {
//   //     setIsEmail(false);
//   //     // 이메일 인증 실패해도 login이동
//   //     // navigate("/login");
//   //     console.log("email error", error);
//   //   }
//   // };

//   const onClickSignInButton = () => {
//     navigate("/login");
//   };
//   const onClickSignUpButton = () => {
//     navigate("/signup");
//   };
//   const onClickFindPasswordButton = () => {
//     navigate("/findPW");
//   };

//   const OAUTH_CALLBACK_URI = "http://localhost:3000/auth/callback";
//   const OAUTH_CLIENT_ID =
//     "u-s4t2ud-4c71b29a46d703713b962ab0e0a2161547a772c450716accbb61c07546814f38";

//   const Redirect = "https://api.intra.42.fr/oauth/authorize?";

//   const onClickOauthButton = () => {
//     const url = `${Redirect}client_id=${OAUTH_CLIENT_ID}&redirect_uri=${OAUTH_CALLBACK_URI}&response_type=code`;
//     // navigate(url);
//     window.location.href = url;
//   };

//   console.log("isMobile", isMobile);

//   return (
//     <Wrapper>
//       <>
//         <SectionStyled>
//           <CardStyled>
//             <TitleStyled>MATCHA</TitleStyled>
//             <HeartIcon />
//             <SignWrapper>
//               <p>새로운 인연을 만나세요</p>
//             </SignWrapper>
//           </CardStyled>
//         </SectionStyled>
//         <SectionStyled>
//           <CardStyled>
//             <TitleStyled>{isMobile ? "MATCHA" : "LOGIN"}</TitleStyled>
//             <LoginFormStyled>
//               <InputTemplate
//                 title="username"
//                 placeholder="Add a your username"
//                 value={username}
//                 onChange={saveUsername}
//               />
//               <InputTemplate
//                 title="Password"
//                 placeholder="Add a your pw"
//                 value={password}
//                 onChange={savePassword}
//                 type="password"
//               />
//               <SubmitButtonStyled onClick={onClickLogin}>
//                 Submit
//               </SubmitButtonStyled>
//             </LoginFormStyled>
//             <InfoTextStyled>간편 로그인</InfoTextStyled>
//             <OauthButtonStyled onClick={onClickOauthButton}>
//               sign in with 42
//             </OauthButtonStyled>
//             <UtilsContainer>
//               <p onClick={onClickSignUpButton}>회원이 아니신가요?</p>
//               <p onClick={onClickFindPasswordButton}>비밀번호를 잊으셨나요?</p>
//             </UtilsContainer>
//           </CardStyled>
//         </SectionStyled>
//       </>
//     </Wrapper>
//   );
// };

// export default LoginPage;

// const UtilsContainer = styled.div`
//   width: 80%;
//   display: flex;
//   justify-content: space-between;
//   margin-top: 20px;
// `;

// const SignWrapper = styled.div`
//   display: flex;
//   & > :first-child {
//     margin-right: 20px;
//   }
// `;

// const SignStyled = styled.div`
//   font-size: 1.5rem;
//   font-family: var(--main-font);
// `;

// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   & > :first-child {
//     @media (max-width: 768px) {
//       display: none;
//     }
//   }
// `;

// const CardStyled = styled.div`
//   width: 80%;
//   min-width: 450px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); */
//   border-radius: 10px;
//   height: 80%;
//   box-shadow: 0 0 10px;
//   position: relative;
//   &::before {
//     content: "";
//     position: absolute;
//     height: auto;
//     background-color: rgba(0, 0, 0, 0.5);
//     z-index: -1;
//     overflow: auto;
//     height: auto;
//     margin: 40px auto;
//   }
// `;

// const SectionStyled = styled.div`
//   background-color: #fff;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex: 1;
//   /* overflow: auto; */
// `;

// const TitleStyled = styled.div`
//   font-size: 2.5rem;
//   font-weight: 700;
//   font-family: var(--main-font);
// `;

// const LoginTitleStyled = styled.div`
//   opacity: 1;
//   font-size: 3rem;
//   font-family: var(--main-font);
//   margin-bottom: 20px;
// `;

// const LoginFormStyled = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 80%;
//   gap: 35px;
// `;

// const SubmitButtonStyled = styled.button`
//   width: 100%;
//   font-size: 1.5rem;
//   padding: 15px 0px;
//   border-radius: 30px;
//   background-color: var(--vermilion);
// `;

// const InfoTextStyled = styled.div`
//   display: flex;
//   width: 80%;
//   align-items: center;
//   color: rgba(0, 0, 0);
//   font-size: 1rem;
//   font-weight: 600;
//   margin: 20px 0px;

//   &::before,
//   &::after {
//     content: "";
//     flex-grow: 1;
//     background: rgba(0, 0, 0);
//     height: 1px;
//     font-size: 10px;
//     line-height: 0px;
//     margin: 0px 16px;
//   }
//    {
//     content: "";
//     flex-grow: 1;
//     background: rgba(0, 0, 0);
//     height: 1px;
//     font-size: 1px;
//     line-height: 0px;
//     margin: 0px 16px;
//   }
// `;

// const OauthButtonStyled = styled.button`
//   width: 80%;
//   padding: 10px;
//   border-radius: 10px;
// `;

// const BackgroundCircleStyled = styled.div`
//   &::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     /* width: 100%;
//     height: 100%; */
//     background-color: rgba(22, 15, 15, 0.5);
//     z-index: -1;
//     width: 100%;
//     height: 100%;
//     /* position: absolute; */
//   }
//   /* z-index: -1; /// 배경으로 설정 */
// `;

// const TestCircle = styled.div`
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   background-color: #27f122;
//   filter: blur(50px);
// `;
