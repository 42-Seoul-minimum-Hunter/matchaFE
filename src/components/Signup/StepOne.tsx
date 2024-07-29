import styled from "styled-components";
import InputTemplate from "../InputTemplate";
import { useState } from "react";

interface SignUpTextData {
  onClick: (email: string, password: string) => void;
}

// 여기서 다음 버튼을 누르면 값을 부모에 전달
const StepOne = ({ onClick }: SignUpTextData) => {
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

    if (error === true) {
      return;
    }
    onClick(signUpTextData.email, signUpTextData.password);
  };

  return (
    <>
      <InputTemplate
        type="email"
        label="이메일"
        value={signUpTextData.email}
        // onChange={saveEmail}
        onChange={handleInputChange}
        // TODO : 에러 발생시 true로 변경 -> 나중에..
        setErrorr={setError}
      />
      <InputTemplate
        type="password"
        label="비밀번호"
        value={signUpTextData.password}
        // onChange={savePassword}
        onChange={handleInputChange}
        setErrorr={setError}
      />
      <InputTemplate
        type="checkPassword"
        label="비밀번호 확인"
        value={signUpTextData.checkPassword}
        checkPW={signUpTextData.password}
        // onChange={saveShcekPassword}
        onChange={handleInputChange}
        setErrorr={setError}
      />
      <ButtonStyled onClick={handleSubmit}>가입하기</ButtonStyled>
      <OauthContainer>
        <OauthLabelStyled>간편 회원가입</OauthLabelStyled>
        <OauthButtonStyled>42 login</OauthButtonStyled>
      </OauthContainer>
    </>
  );
};

export default StepOne;

const OauthContainer = styled.div`
  display: flex;
  width: 350px;
  height: 50px;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.4;
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
  width: 350px;
  font-size: 1.1rem;
  background-color: var(--brand-main-1);
  padding: 12px 0px;

  box-shadow: 4px 4px 3px 0px var(--black);
  margin-top: 30px;
  margin-bottom: 50px;
`;
