import InputTemplate from "@/components/InputTemplate";
import styled from "styled-components";
import TagTemplate, { ITagTemplateProps } from "@/components/TagTemplate";
import { GenderType, InterestType, PreferenceType } from "@/types/tag.enum";
import { useEffect, useState, useCallback } from "react";
import {
  GenderLableMap,
  InterestLableMap,
  PreferenceLableMap,
} from "@/types/maps";
import { useNavigate } from "react-router-dom";
import LocationDropdown from "../components/LocationDropdown";

// const GenderTag: ITagProps[] = [{ title: "male" }];
//  나중에 꼭 수정 필요 -> useMemo, useCallback 렌더링 최적화 해야함
export interface tagItem {
  name: string;
  key: string;
}
const genderTagList: tagItem[] = Object.entries(GenderLableMap).map(
  ([key, name]) => ({ key, name })
);

const preferenceTagList: tagItem[] = Object.entries(PreferenceLableMap).map(
  ([key, name]) => ({ key, name })
);

const interestTagList: tagItem[] = Object.entries(InterestLableMap).map(
  ([key, name]) => ({ key, name })
);

const SignUpPage = () => {
  const [genderType, setGenderType] = useState<GenderType | null>(null);
  const [preferenceType, setPreferenceType] = useState<PreferenceType | null>(
    null
  );
  const [interestType, setInterestType] = useState<InterestType[] | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const navigate = useNavigate();

  const onClickLogin = () => {
    navigate("/search");
  };

  const saveFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const saveLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const saveEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const saveUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const saveBio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  useEffect(() => {
    console.log("genderType", genderType);
  }, [genderType]);

  useEffect(() => {
    console.log("preferenceType", preferenceType);
  }, [preferenceType]);

  useEffect(() => {
    console.log("interestType", interestType);
  }, [interestType]);

  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedSubArea, setSelectedSubArea] = useState<string>("");
  const handleAreaChange = (e: any) => {
    setSelectedArea(e.target.value);
  };
  const handleSubAreaChange = (e: any) => {
    setSelectedSubArea(e.target.value);
  };

  return (
    <>
      <WrapperStyled>
        <TitleStyled>Matcha</TitleStyled>
        <ContentStyled>
          <FirstInfoWrapper>
            <PhotoWrapper>
              <PhotoStyled></PhotoStyled>
              <PhotoTitleStyled>choose user profile</PhotoTitleStyled>
            </PhotoWrapper>

            <InputTextWrapper>
              <NameWrapper>
                <InputTemplate
                  title="First Name"
                  placeholder="Add a your fisrt"
                  value={firstName}
                  onChange={saveFirstName}
                />
                <InputTemplate
                  title="Last Name"
                  placeholder="Add a your last"
                  value={lastName}
                  onChange={saveLastName}
                />
              </NameWrapper>
              <InputTemplate
                title="Email"
                placeholder="Add a your email"
                value={userEmail}
                onChange={saveEmail}
              />
              <InputTemplate
                title="Username"
                placeholder="Add a your userName"
                value={userName}
                onChange={saveUserName}
              />
            </InputTextWrapper>
          </FirstInfoWrapper>
          <InputTemplate
            title="Bio"
            placeholder="Add a your bio"
            value={bio}
            onChange={saveBio}
          />
          <LocationWrapper>
            <h2>Location</h2>
            <LocationDropdown
              selectedArea={selectedArea}
              selectedSubArea={selectedSubArea}
              handleAreaChange={handleAreaChange}
              handleSubAreaChange={handleSubAreaChange}
            />
            {/* <Dropdown /> */}
          </LocationWrapper>
          <TagTemplate
            title="Gender"
            tagList={genderTagList}
            initialState={genderType}
            setState={setGenderType}
          />
          <TagTemplate
            title="Preference"
            tagList={preferenceTagList}
            initialState={preferenceType}
            setState={setPreferenceType}
          />
          <TagTemplate
            title="Interest"
            tagList={interestTagList}
            initialState={interestType}
            setState={setInterestType}
          />
        </ContentStyled>
        <SubmitButtonStyled onClick={onClickLogin}>Submit</SubmitButtonStyled>
      </WrapperStyled>
      {/* height가 auto일때는 margin-bottom이 적용이 안됨, 이유를 모르겠음 */}
      {/* <div style={{ width: "30px", height: "30px" }}></div> */}
    </>
  );
};

export default SignUpPage;

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > h2 {
    margin-bottom: 25px;
  }
`;

// 변수명 짓기 힘들다..
const FirstInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  /* width: 80%;
  max-width: 1000px; */
`;

const InputTextWrapper = styled.div`
  width: 80%;
  max-width: 1000px;

  & > :nth-child(2),
  & > :nth-child(3) {
    margin-top: 20px;
  }
`;

const PhotoWrapper = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

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
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const TitleStyled = styled.div`
  opacity: 1;
  font-size: 3rem;
  font-family: var(--main-font);
  margin-bottom: 40px;
`;

const WrapperStyled = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  padding: 40px 0;
  margin: 40px;
  overflow-y: hidden;
  flex-direction: column;
  align-items: center;
  /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); */
  border-radius: 10px;
  box-shadow: 0 0 10px;
  overflow: auto;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    /* height: 100%; */
    height: auto;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
    overflow: auto;
    height: auto;
    margin: 40px auto;
  }
`;

const ContentStyled = styled.div`
  width: 80%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* height: 200%; */
  gap: 30px;
`;

const SubmitButtonStyled = styled.button`
  width: 80%;
  font-size: 1.2rem;
  padding: 15px 0px;
  border-radius: 30px;
  margin-top: 30px;
  background-color: var(--vermilion);
`;

const Area = styled.div``;
