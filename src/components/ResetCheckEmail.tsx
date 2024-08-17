import styled from "styled-components";
import InputTemplate from "./InputTemplate";
import { useState } from "react";
import { axiosResetCreate } from "@/api/axios.custom";

const ResetCheckEmail = () => {
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [signUpTextData, setSignUpTextData] = useState({
    email: "",
    password: "",
    checkPassword: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpTextData({ ...signUpTextData, [name]: value });
    setMessage(""); // 입력 시 메시지 초기화
  };

  const tryResetPasswordCreate = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const res = await axiosResetCreate(signUpTextData.email);
      console.log("reset pw create res", res);
      setIsSuccess(true);
      setMessage(
        "이메일함에 정상적으로 비밀번호 변경 링크가 전송되었습니다. 메일함을 확인해주세요"
      );
    } catch (error) {
      console.log("error", error);
      setIsSuccess(false);
      setMessage("가입된 이메일이 아닙니다");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (error || isLoading || isSuccess) {
      return;
    }
    tryResetPasswordCreate();
  };

  return (
    <Container>
      <InputContainer>
        <TitleStyled>
          MEET<span>CHA</span>
        </TitleStyled>
        <>
          <InfoTextContainer>
            <InfoTextStyled>비밀번호를 찾을 이메일을 알려주세요</InfoTextStyled>
          </InfoTextContainer>
          <InputTemplate
            type="email"
            label="이메일"
            value={signUpTextData.email}
            onChange={handleInputChange}
            setErrorr={setError}
          />
          <ButtonStyled
            onClick={handleSubmit}
            disabled={isLoading || isSuccess}
          >
            {isLoading ? "처리 중..." : isSuccess ? "전송 완료" : "변경하기"}
          </ButtonStyled>
          {isLoading && <LoadingSpinner />}
          {message && (
            <MessageStyled $isSuccess={isSuccess}>{message}</MessageStyled>
          )}
        </>
      </InputContainer>
    </Container>
  );
};

export default ResetCheckEmail;

const MessageStyled = styled.div<{ $isSuccess: boolean }>`
  color: ${(props) => (props.$isSuccess ? "green" : "red")};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  margin-top: 10px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--brand-main-1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 350px;
  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

const ButtonStyled = styled.button`
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  width: 350px;
  font-size: 1.1rem;
  background-color: var(--brand-main-1);
  padding: 12px 0px;

  box-shadow: 4px 4px 3px 0px var(--black);
  margin-top: 30px;
  margin-bottom: 50px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
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
    padding-top: 10vh;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
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
