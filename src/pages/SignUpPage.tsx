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
import ImageUpload from "@/components/ImageUpload";
import CheckBox from "@/components/CheckBox";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { axiosUserCreate } from "@/api/axios.custom";
import { RegisterDto } from "@/types/tag.dto";

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
  const [age, setAge] = useState<number>();
  const [isLocation, setIsLocation] = useState<boolean>(false);
  const [showImages, setShowImages] = useState<string[]>([]);
  const navigate = useNavigate();

  // const geolocationOptions = {
  //   enableHighAccuracy: true,
  //   timeout: 1000 * 10,
  //   maximumAge: 1000 * 3600 * 24,
  // };
  // const { location, error } = useGeoLocation(geolocationOptions);

  // useEffect(() => {
  //   if (location) {
  //   }
  //   setIsLocation(!isLocation);
  // }, [isLocation]);
  // console.log("location", location);
  // console.log("error", error);
  const { location, error, asking, getLocation } = useGeoLocation();
  const [showInstructions, setShowInstructions] = useState(false);

  const handleClick = () => {
    getLocation();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

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
        gpsAllowedAt: true,
        region: "none",
        hashtags: interestType as InterestType[],
        profileImages: showImages,
      });
    } catch (error: any) {
      console.log("error", error);
      throw error;
    }
  };

  const onClickLogin = () => {
    try {
      trySignUp();
    } catch (error) {
      console.log("error", error);
      navigate("/search");
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

  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedSubArea, setSelectedSubArea] = useState<string>("");
  const handleAreaChange = (e: any) => {
    setSelectedArea(e.target.value);
  };
  const handleSubAreaChange = (e: any) => {
    setSelectedSubArea(e.target.value);
  };

  useEffect(() => {
    console.log("age", age);
  }, [age]);

  return (
    <>
      <WrapperStyled>
        <TitleStyled>Matcha</TitleStyled>
        <ContentStyled>
          <PhotoWrapper>
            <PhotoTitleStyled>Choose user profile</PhotoTitleStyled>
            <ImageUpload
              showImages={showImages}
              setShowImages={setShowImages}
            />
          </PhotoWrapper>
          {/* <FirstInfoWrapper> */}
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
          </InputTextWrapper>
          {/* </FirstInfoWrapper> */}
          <InputTemplate
            title="Bio"
            placeholder="Add a your bio"
            value={bio}
            onChange={saveBio}
          />
          <NameWrapper>
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
