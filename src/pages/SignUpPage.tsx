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
import LocationDropdown from "../components/LocationDropdown";
import ImageUpload from "@/components/ImageUpload";
import CheckBox from "@/components/CheckBox";
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
  const [genderType, setGenderType] = useState<GenderType>();
  const [preferenceType, setPreferenceType] = useState<PreferenceType>();
  const [interestType, setInterestType] = useState<InterestType[]>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
  const savePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const saveLocation = () => {
    setIsLocation(!location);
  };
  const saveAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value));
  };

  return (
    <WrapperStyled>
      <TitleStyled>Matcha</TitleStyled>
      <ContentStyled>
        <PhotoWrapper>
          <PhotoTitleStyled>Choose user profile</PhotoTitleStyled>
          <ImageUpload showImages={showImages} setShowImages={setShowImages} />
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
            title="Password"
            placeholder="Add a your Password"
            value={password}
            onChange={savePassword}
            type="password"
          />
          <InputTemplate
            title="Email"
            // input type="email",
            placeholder="Add a your email"
            value={userEmail}
            onChange={saveEmail}
            type="email"
            // required
          />
          <InputTemplate
            title="Username"
            placeholder="Add a your userName"
            value={userName}
            onChange={saveUserName}
          />
          <InputTemplate
            title="Bio"
            placeholder="Add a your bio"
            value={bio}
            onChange={saveBio}
          />
        </InputTextWrapper>
        <NameWrapper>
          <LocationWrapper>
            <h2>Location</h2>
            <LocationDropdown
              selectedArea={selectedArea}
              selectedSubArea={selectedSubArea}
              handleAreaChange={handleAreaChange}
              handleSubAreaChange={handleSubAreaChange}
            />
          </LocationWrapper>
          <InputTemplate
            title="Age"
            placeholder="Add a your age"
            type="number"
            onChange={saveAge}
          />
        </NameWrapper>
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
        <div>
          <button onClick={handleClick} disabled={asking}>
            {asking ? "위치 정보 요청 중..." : "위치 정보 가져오기"}
          </button>
          {location && (
            <p>
              위치: 위도 {location.latitude}, 경도 {location.longitude}
            </p>
          )}
          {error && <p>에러: {error}</p>}
          {error && error.includes("권한이 거부되었습니다") && (
            <>
              <p>위치 정보 접근 권한을 허용해주세요.</p>
              <button onClick={() => setShowInstructions(!showInstructions)}>
                {showInstructions ? "안내 숨기기" : "권한 허용 방법 보기"}
              </button>
              {showInstructions && (
                <ol>
                  <li>브라우저 설정을 엽니다.</li>
                  <li>사이트 설정 또는 개인정보 설정을 찾습니다.</li>
                  <li>위치 정보 설정을 찾습니다.</li>
                  <li>이 사이트의 위치 정보 접근을 허용으로 변경합니다.</li>
                  <li>페이지를 새로고침합니다.</li>
                </ol>
              )}
              <button onClick={handleRefresh}>페이지 새로고침</button>
            </>
          )}
        </div>
        <CheckBox
          title="GPS 위치 정보를 제공하시겠습니까?"
          checked={isLocation}
          onChange={saveLocation}
        />
      </ContentStyled>
      <SubmitButtonStyled onClick={trySignUp}>Submit</SubmitButtonStyled>
    </WrapperStyled>
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
  margin: 40px auto;
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
