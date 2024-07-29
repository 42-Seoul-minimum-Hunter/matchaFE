import InputTemplate from "@/components/InputTemplate";
import styled from "styled-components";
import { GenderType, InterestType, PreferenceType } from "@/types/tag.enum";
import { useEffect, useState, useCallback } from "react";
import { axiosUserCreate } from "@/api/axios.custom";
import { useNavigate } from "react-router-dom";

// const GenderTag: ITagProps[] = [{ title: "male" }];
//  나중에 꼭 수정 필요 -> useMemo, useCallback 렌더링 최적화 해야함
export interface tagItem {
  value: string;
  label: string;
}

const SignUpPage = () => {
  const navigator = useNavigate();

  //  TODO
  // email, password만 보내기
  const trySignUp = async () => {
    try {
      const res = await axiosUserCreate({
        email: userEmail,
        username: userName,
        password: password,
        lastName: lastName,
        firstName: firstName,
        gender: genderType as GenderType,
        preference: preferenceType as PreferenceType,
        age: age as number,
        biography: bio,
        isGpsAllowed: true,
        si: selectedArea,
        gu: selectedSubArea,
        hashtags: interestType as InterestType[],
        profileImages: showImages,
      });
      console.log("res", res);
      if (res.status === 200) navigator("/email");
      else {
        alert("회원가입 실패");
      }
    } catch (error: any) {
      console.log("error", error);
      throw error;
    }
  };

  const onClickLogin = async () => {
    try {
      const res = await trySignUp();
      // res데이터 확인후 중복 검사 -> 이메일, username이 중복되면 오류 던짐
      // 인풋값들 확인해버리기
      console.log("register res", res);
      // 이메일 페이지로 변환 -> 나중에 풀기 ##
      // setIsEmail(true);
      // console.log("res.data.status", res.status);
      // if (res.status === 200) console.log("res.;");

      alert("회원가입 성공");
    } catch (error) {
      // 회원가입 백엔드 실패시 login이동
      // navigate("/login");
      alert("회원가입 백엔드 실패");
      console.log("register error", error);
    }
  };

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
  };

  return (
    <Wrapper>
      <InputContainer>
        <TitleStyled>
          MEET<span>CHA</span>
        </TitleStyled>
        <InputTemplate
          type="email"
          label="이메일"
          value={signUpTextData.email}
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
        <InputTemplate
          type="checkPassword"
          label="비밀번호 확인"
          value={signUpTextData.checkPassword}
          checkPW={signUpTextData.password}
          onChange={handleInputChange}
          setErrorr={setError}
        />
        <ButtonStyled onClick={handleSubmit}>가입하기</ButtonStyled>
        <OauthContainer>
          <OauthLabelStyled>간편 회원가입</OauthLabelStyled>
          <OauthButtonStyled>42 login</OauthButtonStyled>
        </OauthContainer>
      </InputContainer>
    </Wrapper>
  );
};

export default SignUpPage;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

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

const TitleStyled = styled.div`
  font-size: 3rem;
  font-family: var(--main-font);
  /* margin-bottom: 20px; */
  & > span {
    color: var(--brand-main-1);
  }
  margin-bottom: 40px;
`;

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
