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

const ResetPasswordPage = () => {
  const [verifiedEmail, setVerifiedEmail] = useState<boolean>(false);
  const { goToSignup } = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [signUpTextData, setSignUpTextData] = useState({
    email: "",
    password: "",
    checkPassword: "",
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
    // TODO : 비밀번호가 틀리면 버튼 자체가 안눌리게 만들기
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
        {verifiedEmail ? (
          <>
            <InfoTextContainer>
              <InfoTextStyled>
                아래에 가입한 이메일을 입력해주세요.
              </InfoTextStyled>
              <InfoTextStyled>
                이메일을 통해 비밀번호 변경 링크가 전송됩니다.
              </InfoTextStyled>
            </InfoTextContainer>
            <InputTemplate
              type="password"
              label="비밀번호"
              value={signUpTextData.password}
              onChange={handleInputChange}
              setErrorr={setError}
            />
            <InputTemplate
              type="checkPassword"
              label="비밀번호 확인"
              value={signUpTextData.checkPassword}
              checkPW={signUpTextData.password}
              onChange={handleInputChange}
              setErrorr={setError}
            />
            <ButtonStyled onClick={handleSubmit}>인증하기</ButtonStyled>
          </>
        ) : (
          <>
            <InfoTextContainer>
              <InfoTextStyled>
                비밀번호를 찾을 이메일을 알려주세요
              </InfoTextStyled>
            </InfoTextContainer>
            <InputTemplate
              type="email"
              label="이메일"
              value={signUpTextData.email}
              onChange={handleInputChange}
              // TODO : 에러 발생시 true로 변경 -> 나중에..
              setErrorr={setError}
            />
            <ButtonStyled onClick={handleSubmit}>변경하기</ButtonStyled>
          </>
        )}
      </InputContainer>
    </Container>
  );
};

export default ResetPasswordPage;

const InfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const InfoTextStyled = styled.div`
  font-size: 0.9rem;
  line-height: 1.4;
  font-weight: 400;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ButtonStyled = styled.button`
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
  /* margin-bottom: 25px; */
`;

const Container = styled.div`
  display: flex;
  padding-top: 15vh;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    padding: 10vh;
  }
`;

// import { axiosChangePassword, axiosFindPW } from "@/api/axios.custom";
// import InputTemplate from "@/components/InputTemplate";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// const FindPwPage = () => {
//   const navigator = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [checkPassword, setCheckPassword] = useState("");
//   const [checkedEmail, setCheckedEmail] = useState<boolean>(false);
//   // const isEmail = useState<boolean>(true);

//   const checkEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };
//   const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };
//   const changeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCheckPassword(e.target.value);
//   };

//   const onClickSavePassword = () => {
//     // 비밀번호 변경 api
//     if (password === checkPassword) {
//       try {
//         // 데이터 에러 나면 서버오류 띄우고 로그인 페이지 ?
//         const res = axiosChangePassword(password);
//         console.log("res", res);
//       } catch (error: any) {
//         console.log("error", error);
//         throw error;
//       }
//       navigator("/login");
//     } else {
//       alert("비밀번호가 일치하지 않습니다.");
//     }
//   };

//   const findEmail = async () => {
//     try {
//       const res = await axiosFindPW(email);
//       setCheckedEmail(true);
//       console.log("res", res);
//     } catch (error: any) {
//       console.log("error", error);
//       setCheckedEmail(false);
//       throw error;
//     }
//   };

//   return (
//     <WrapperStyled>
//       <CardStyled>
//         <InputContainer>
//           <HeaderStyled>
//             <h1>Find My Password</h1>
//             <InfoTextStyled>
//               {checkedEmail ? (
//                 <p>변경할 패스워드를 입력하세요</p>
//               ) : (
//                 <>
//                   <p>아래에 가입한 이메일을 입력해주세요</p>
//                   <p>이메일이 맞으면 비밀번호 변경화면으로 넘어갑니다.</p>
//                 </>
//               )}
//             </InfoTextStyled>
//           </HeaderStyled>
//           {checkedEmail ? (
//             <>
//               <InputTemplate
//                 title="password"
//                 placeholder="Add a your password"
//                 value={password}
//                 onChange={changePassword}
//                 type="password"
//               />
//               <InputTemplate
//                 title="check Password"
//                 placeholder="Add a your check password"
//                 value={checkPassword}
//                 onChange={changeCheckPassword}
//                 type="password"
//               />
//             </>
//           ) : (
//             <>
//               <InputTemplate
//                 title="Email"
//                 placeholder="Add a your Email"
//                 value={email}
//                 onChange={checkEmail}
//               />
//             </>
//           )}

//           {checkedEmail ? null : <p>등록된 이메일이 아닙니다.</p>}
//           {checkedEmail ? (
//             <SubmitButtonStyled onClick={onClickSavePassword}>
//               find pw
//             </SubmitButtonStyled>
//           ) : (
//             <SubmitButtonStyled onClick={findEmail}>submit</SubmitButtonStyled>
//           )}
//         </InputContainer>
//       </CardStyled>
//     </WrapperStyled>
//   );
// };

// export default FindPwPage;

// const InputContainer = styled.div`
//   width: 100%;
//   max-width: 600px;
// `;

// const HeaderStyled = styled.div`
//   & > h1 {
//     font-size: 2.5rem;
//     font-weight: 500;
//   }
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 30px;
// `;

// const InfoTextStyled = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   & > p {
//     font-size: 1.2rem;
//     margin: 10px 0;
//   }
// `;

// const SubmitButtonStyled = styled.button`
//   width: 100%;
//   font-size: 1.2rem;
//   padding: 15px 0px;
//   border-radius: 30px;
//   margin-top: 30px;
//   background-color: var(--vermilion);
// `;

// const CardStyled = styled.div`
//   width: 80%;
//   height: 80%;
//   padding: 0 40px;
//   border: 1px solid black;

//   border-radius: 20px;
//   box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.8);
//   /* background-color: rgba(0, 0, 0, 0.5); */
//   /* box-shadow: 0 0 10px; */

//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const WrapperStyled = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
