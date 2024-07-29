import React, { useState, useRef, KeyboardEvent, ChangeEvent } from "react";
import styled from "styled-components";

const TwoFactorPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<boolean>(true);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  //   TODO : 1단계 이메일 인증을 통과하면 2단계때 2fa받을수 있게 BE고치기
  const tryVerifyTwoFactor = () => {};

  const handleSubmit = () => {
    console.log("인증하기~!");
    // 이메일 보내서 return 값으로 에러가 있으면 에러메세지 띄우기
  };

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return; // 숫자만 허용
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value !== "" && index < 6) {
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
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newCode = [...code];
    pastedData.forEach((digit, index) => {
      if (index < 6 && /^[0-9]$/.test(digit)) {
        newCode[index] = digit;
      }
    });
    setCode(newCode);
    inputs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  return (
    <Container>
      <>
        <TitleStyled>
          MEET<span>CHA</span>
        </TitleStyled>
        <InfoTextStyled>
          가입해주신 이메일의 메일함을 확인해주세요!
        </InfoTextStyled>
        <CodeContainer>
          {[0, 1].map((groupIndex) => (
            <CodeGroupStyled key={groupIndex}>
              {code
                .slice(groupIndex * 3, (groupIndex + 1) * 3)
                .map((digit, index) => {
                  const actualIndex = groupIndex * 3 + index;
                  return (
                    <CodeStyled
                      key={actualIndex}
                      ref={(el) => (inputs.current[actualIndex] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(actualIndex, e.target.value)
                      }
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                        handleKeyDown(actualIndex, e)
                      }
                      onPaste={handlePaste}
                    />
                  );
                })}
            </CodeGroupStyled>
          ))}
        </CodeContainer>
        <ErrorContainer>
          {error && <ErrorStyled>인증번호가 일치하지 않습니다.</ErrorStyled>}
        </ErrorContainer>
        <ButtonStyled onClick={handleSubmit}>인증하기</ButtonStyled>
      </>
    </Container>
  );
};

const ErrorContainer = styled.div`
  height: 80px; // ButtonStyled와의 간격
  display: flex;
  align-items: flex-start;
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

const InfoTextStyled = styled.div`
  font-size: 0.9rem;
  line-height: 1.4;
  font-weight: 400;
  margin-bottom: 65px;
`;

const TitleStyled = styled.div`
  font-size: 3rem;
  font-family: var(--main-font);
  margin-bottom: 25px;
  /* margin-bottom: 20px; */
  & > span {
    color: var(--brand-main-1);
  }
`;

const ErrorStyled = styled.div`
  margin-left: 20px;
  font-weight: 400;
  line-height: 1.4;
  font-size: 0.9rem;
  letter-spacing: -0.025em;
  color: var(--status-error-2);
`;

const CodeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 10px;
`;

const CodeStyled = styled.input`
  outline: none;
  text-align: center;
  color: var(--black);
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.4;
  background-color: var(--white);
  border: 2px solid var(--line-gray-2);
  border-radius: 10px;
  /* width: 96px;
  height: 100px; */
  width: 80px;
  height: 96px;

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
  margin-bottom: 50px;
`;

const CodeGroupStyled = styled.div`
  display: flex;
  gap: 10px; // 각 입력 필드 사이의 간격
`;

export default TwoFactorPage;

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
