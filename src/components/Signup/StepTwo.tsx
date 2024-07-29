import React, { useState, useRef, KeyboardEvent, ChangeEvent } from "react";
import styled from "styled-components";

interface StepTwoProps {
  onClick: () => void;
}

const StepTwo = ({ onClick }: StepTwoProps) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState<boolean>(true);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  //   TODO : 1단계 이메일 인증을 통과하면 2단계때 2fa받을수 있게 BE고치기
  const tryVerifyTwoFactor = () => {};

  const handleSubmit = () => {
    onClick();
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
    <>
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
      <ButtonStyled onClick={handleSubmit}>가입하기</ButtonStyled>
    </>
  );
};

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

export default StepTwo;
