import { axiosCreateTwoFactor } from "@/api/axios.custom";
import React, {
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  useEffect,
} from "react";
import styled from "styled-components";

const TwoFactor = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState<boolean>(true);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  //   const onCLickTwoFactorVerify = async (password: string) => {
  //     try {
  //       // 이메일 인증 절차 -> 통과하면 바로 search로 이동
  //       console.log("ps", password);
  //       const res = await axiosVerifyTwoFactor(password);
  //       console.log("twofactor res", res);
  //       if (res.status === 200) {
  //         navigator("/search");
  //       }
  //       // navigate("/search");
  //     } catch (error: any) {
  //       setIsEmail(false);
  //       alert(error.response.data);
  //       navigator("/login");
  //       // Resend 버튼 만들기 -> create로 url 재전송
  //       // removeCookie("jwt");
  //       // 이메일 인증 실패해도 login이동
  //       console.log("verify error", error);
  //     }
  //   };

  //   // const onClickSubmit = async () => {
  //   //   try {
  //   //     console.log("password", password);
  //   //     const res = await axiosVerifyTwoFactor(password);
  //   //     console.log("res", res);
  //   //   } catch (error: any) {
  //   //     console.log("error", error);
  //   //     alert("인증번호가 일치하지 않습니다.");
  //   //     throw error;
  //   //   }
  //   //   // navigator("/search");
  //   // };

  //   TODO : 1단계 이메일 인증을 통과하면 2단계때 2fa받을수 있게 BE고치기
  const tryVerifyTwoFactor = () => {};

  // 페이지 들어와서 시작
  // useEffect(() => {
  //   try {
  //     // 여기서 email을 보내줘야 하나? -> 지금은 jwt가 적용 안되어있으니까 지금만 이메일 보내기
  //     const res = axiosCreateTwoFactor();
  //     console.log("res", res);
  //     // setIsEmail(true);
  //   } catch (error: any) {
  //     // setIsEmail(false);
  //     console.log("error", error);
  //     throw error;
  //   }
  // }, []);

  const handleSubmit = () => {
    console.log("인증하기~!");
    // 이메일 보내서 return 값으로 에러가 있으면 에러메세지 띄우기
  };

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return; // 숫자만 허용

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== "" && index < 3) {
      inputs.current[index + 1]?.focus();
    }

    // 여기서 바로 값이 들어오자마자 onClick을 해버릴수 있음
    if (newCode.every((digit) => digit !== "")) {
      //   onComplete(newCode.join(""));
      //   alert("로그인");
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4).split("");
    const newCode = [...code];
    pastedData.forEach((digit, index) => {
      if (index < 4 && /^[0-9]$/.test(digit)) {
        newCode[index] = digit;
      }
    });
    setCode(newCode);
    inputs.current[Math.min(pastedData.length, 3)]?.focus();
  };

  return (
    <Wrapper>
      <Test>
        <TitleStyled>
          MEET<span>CHA</span>
        </TitleStyled>
        <InputContainer>
          {code.map((digit, index) => (
            <InputStyled
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(index, e.target.value)
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(index, e)
              }
              // NOTE : 클립보드에 있는 값을 복사해서 붙여넣기
              onPaste={handlePaste}
            />
          ))}
        </InputContainer>
        {error && <ErrorStyled>인증번호가 일치하지 않습니다.</ErrorStyled>}
        <ButtonStyled onClick={handleSubmit}>인증하기</ButtonStyled>
      </Test>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

const Test = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const TitleStyled = styled.div`
  font-size: 3rem;
  font-family: var(--main-font);
  /* margin-bottom: 20px; */
  & > span {
    color: var(--brand-main-1);
  }
`;

const ErrorStyled = styled.div`
  margin-left: 20px;
  font-weight: 400;
  line-height: 1.4;
  font-size: 0.8rem;
  letter-spacing: -0.025em;
  color: var(--status-error-1);
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const InputStyled = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 20px;
  /* border: 1px solid #ccc; */
  color: var(--black);
  border-radius: 10px;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.4;

  outline: none;
  background-color: var(--white);
  /* border-color: var(--line-gray-2); */
  border: 2px solid var(--line-gray-2);
  width: 96px;
  height: 100px;

  &:focus {
    border-color: var(--brand-main-1);
    background-color: var(--brand-sub-2);
  }
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

export default TwoFactor;

// import {
//   axiosCreateTwoFactor,
//   axiosEmailVerify,
//   axiosVerifyTwoFactor,
// } from "@/api/axios.custom";
// import { removeCookie } from "@/api/cookie";
// import InputTemplate from "@/components/InputTemplate";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// const TwoFactor = () => {
//   const [password, setPassword] = useState("");
//   const [isEmail, setIsEmail] = useState(false);
//   // const [isTimer, setIsTimer] = useState(false);
//   const navigator = useNavigate();

//   const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   // const email = "miyu@student.42seoul.kr";
//   useEffect(() => {
//     try {
//       // 여기서 email을 보내줘야 하나? -> 지금은 jwt가 적용 안되어있으니까 지금만 이메일 보내기
//       const res = axiosCreateTwoFactor();
//       console.log("res", res);
//       setIsEmail(true);
//       // setIsTimer(true);
//       // navigator("/search");
//     } catch (error: any) {
//       setIsEmail(false);
//       console.log("error", error);
//       throw error;
//     }
//   }, []);

//   const onCLickTwoFactorVerify = async (password: string) => {
//     try {
//       // 이메일 인증 절차 -> 통과하면 바로 search로 이동
//       console.log("ps", password);
//       const res = await axiosVerifyTwoFactor(password);
//       console.log("twofactor res", res);
//       if (res.status === 200) {
//         navigator("/search");
//       }
//       // navigate("/search");
//     } catch (error: any) {
//       setIsEmail(false);
//       alert(error.response.data);
//       navigator("/login");
//       // Resend 버튼 만들기 -> create로 url 재전송
//       // removeCookie("jwt");
//       // 이메일 인증 실패해도 login이동
//       console.log("verify error", error);
//     }
//   };

//   // const onClickSubmit = async () => {
//   //   try {
//   //     console.log("password", password);
//   //     const res = await axiosVerifyTwoFactor(password);
//   //     console.log("res", res);
//   //   } catch (error: any) {
//   //     console.log("error", error);
//   //     alert("인증번호가 일치하지 않습니다.");
//   //     throw error;
//   //   }
//   //   // navigator("/search");
//   // };

//   return (
//     <Wrapper>
//       <>
//         <CardStyled>
//           <InputContainer>
//             <HeaderStyled>
//               <h1>Check 2fa</h1>
//               <InfoTextStyled>
//                 <p>본인 계정의 이메일로 코드가 전송되었습니다.</p>
//                 <p>코드를 입력해주세요</p>
//               </InfoTextStyled>
//             </HeaderStyled>
//             <InputTemplate
//               title="password"
//               placeholder="Add a your password"
//               value={password}
//               onChange={changePassword}
//               type="password"
//             />
//             <button onClick={() => onCLickTwoFactorVerify(password)}>
//               제출하기
//             </button>
//             {/* {isTimer ? <UseCounter /> : null} */}
//             {/* <SubmitButtonStyled onClick={onClickSubmit}>
//             submit
//           </SubmitButtonStyled> */}
//           </InputContainer>
//         </CardStyled>
//       </>
//     </Wrapper>
//   );
// };
