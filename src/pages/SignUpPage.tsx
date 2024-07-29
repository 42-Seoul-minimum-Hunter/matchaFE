import InputTemplate from "@/components/InputTemplate";
import styled from "styled-components";
import { GenderType, InterestType, PreferenceType } from "@/types/tag.enum";
import { useEffect, useState, useCallback } from "react";
import {
  GenderLableMap,
  InterestLableMap,
  PreferenceLableMap,
} from "@/types/maps";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import {
  validateAge,
  validateBiography,
  validateEmail,
  validateGender,
  validateHashtags,
  validateName,
  validatePassword,
  validatePreference,
  validateUsername,
} from "@/utils/inputCheckUtils";
import { axiosUserCreate } from "@/api/axios.custom";
import { useNavigate } from "react-router-dom";
import PaginationDots from "@/components/PaginationDots";
import StepOne from "@/components/Signup/StepOne";
import StepTwo from "@/components/Signup/StepTwo";
import StepThree from "@/components/Signup/StepThree";

// const GenderTag: ITagProps[] = [{ title: "male" }];
//  나중에 꼭 수정 필요 -> useMemo, useCallback 렌더링 최적화 해야함
export interface tagItem {
  value: string;
  label: string;
}

const SignUpPage = () => {
  const [step, setStep] = useState(0);
  const [genderType, setGenderType] = useState<GenderType>();
  const [preferenceType, setPreferenceType] = useState<PreferenceType>();
  const [interestType, setInterestType] = useState<InterestType[]>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [isLocation, setIsLocation] = useState<boolean>(false);
  const [showImages, setShowImages] = useState<string[]>([]);
  const { location, error, asking, getLocation } = useGeoLocation();
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedSubArea, setSelectedSubArea] = useState<string>("");

  const navigator = useNavigate();
  const handleAreaChange = (e: any) => {
    setSelectedArea(e.target.value);
  };
  const handleSubAreaChange = (e: any) => {
    setSelectedSubArea(e.target.value);
  };

  const handleClick = () => {
    getLocation();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const trySignUp = async () => {
    const validations = [
      { check: validateUsername(userName), error: "username 4 ~ 15" },
      { check: validatePassword(password), error: "password 8 ~ 15" },
      {
        check: validateName(firstName) && validateName(lastName),
        error: "first last name 1 ~ 10",
      },
      { check: validateBiography(bio), error: "biography 1 ~ 100" },
      { check: validateEmail(userEmail), error: "Invalid email" },
      { check: validateAge(age?.toString()), error: "Choose age" },
      {
        check: validateGender(genderType),
        error: "Choose gender",
      },
      {
        check: validatePreference(preferenceType),
        error: "Choose preference",
      },
      { check: validateHashtags(interestType), error: "Invalid hashtags" },
      { check: validateHashtags(interestType), error: "Invalid hashtags" },
    ];

    for (const { check, error } of validations) {
      if (!check) {
        alert(error);
        return;
      }
    }
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

  const onClickStepOne = (email: string, password: string) => {
    console.log("Email:", email, "Password:", password);
    setStep(step + 1);
  };
  const onClickStepTwo = () => {
    // console.log("Email:", email, "Password:", password);
    setStep(step + 1);
  };

  return (
    <Wrapper>
      <InputContainer>
        <TitleStyled>
          MEET<span>CHA</span>
        </TitleStyled>
        <PaginationDots step={step}></PaginationDots>
        {step === 0 && <StepOne onClick={onClickStepOne} />}
        {step === 1 && <StepTwo onClick={onClickStepTwo} />}
        {step === 2 && <StepThree />}
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

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > h2 {
    margin-bottom: 25px;
  }
`;

const InputTextWrapper = styled.div`
  width: 80%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* & > :nth-child(2),
  & > :nth-child(3) {
    margin-top: 20px;
  } */
`;

const PhotoWrapper = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  align-items: flex-start;

  & > :first-child {
    margin-bottom: 20px;
  }
`;

const PhotoStyled = styled.div`
  width: 200px;
  height: 270px;
  border-radius: 8px;
  background-color: gray;
`;

const PhotoTitleStyled = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 25px;
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const TitleStyled = styled.div`
  font-size: 3rem;
  font-family: var(--main-font);
  /* margin-bottom: 20px; */
  & > span {
    color: var(--brand-main-1);
  }
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

const ContentStyled = styled.div`
  width: 80%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;

const SubmitButtonStyled = styled.button`
  width: 350px;
  font-size: 1.1rem;
  background-color: var(--brand-main-1);
  padding: 12px 0px;

  /* border-radius: 30px; */
  box-shadow: 4px 4px 3px 0px var(--black);
  margin-top: 30px;
  margin-bottom: 50px;
  /* background-color: var(--vermilion); */
`;

const Area = styled.div``;
