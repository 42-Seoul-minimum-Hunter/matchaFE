import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  GenderLableMap,
  InterestLableMap,
  PreferenceLableMap,
} from "@/types/maps";
import { tagItem } from "@/pages/SignUpPage";
import { LocationData } from "@/assets/mock/mock";
import TagList, { TagProps } from "@/components/TagTemplate";
import InputTemplate from "@/components/InputTemplate";
import ImageUpload from "@/components/ImageUpload";
import DropboxTemplate from "@/components/DropboxTemplate";

import Loading from "@/components/chat/Loading";
import LocationFromCoords from "@/components/location/LocationFromCoords";
import GeoLocationHandler from "@/components/location/GeoLocationHandler";
import { axiosUserCreate } from "@/api/axios.custom";
import { SignupDto } from "@/types/tag.dto";
import useRouter from "@/hooks/useRouter";

// TODO : 다른 곳으로 정리
export interface AgeTagItem {
  value: string;
  label: string;
}

interface GpsState {
  isAllowed: boolean;
  error: string | null;
  hasAttempted: boolean;
}

const ageTagList: AgeTagItem[] = Array.from({ length: 81 }, (_, index) => {
  const age = index + 20;
  return {
    value: age.toString(),
    label: `${age}세`,
  };
});

const SignupDetailPage = () => {
  const { goToMain } = useRouter();
  const [refreshLocation, setRefreshLocation] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [locationGuTagList, setLocationGuTagList] = useState<tagItem[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [signUpTextData, setSignUpTextData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    bio: "",
  });
  const [signUpDropboxData, setSignUpDropboxData] = useState({
    location_si: "",
    location_gu: "",
    gender: "",
    preference: "",
    age: "",
  });

  const [gpsState, setGpsState] = useState<GpsState>({
    isAllowed: false,
    error: null,
    hasAttempted: false,
  });

  const handleGpsAllow = () => {
    if (!gpsState.isAllowed) {
      setGpsState((prev) => ({
        ...prev,
        isAllowed: true,
        hasAttempted: true,
        error: null,
      }));
      setRefreshLocation(true);
    }
  };

  const handleGpsDeny = () => {
    if (gpsState.isAllowed) {
      setGpsState((prev) => ({
        ...prev,
        isAllowed: false,
        hasAttempted: true,
        error: null,
      }));
    }
  };

  const handleRefreshComplete = () => {
    setRefreshLocation(false);
  };

  const handleGeoLocationSuccess = (latitude: number, longitude: number) => {
    console.log(`위치: ${latitude}, ${longitude}`);
  };

  const handleGeoLocationError = (error: string) => {
    setGpsState((prev) => ({ ...prev, error }));
  };

  const handleAddressFound = (si: string, gu: string) => {
    console.log("si, gu", si, gu);
    setSignUpDropboxData((prev) => ({
      ...prev,
      location_si: si,
      location_gu: gu,
    }));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log("e.target.name", e.target.name);
    setSignUpTextData({ ...signUpTextData, [name]: value });
    // setError(false);
  };
  const handleDropboxChange = (name: string, option: tagItem) => {
    setSignUpDropboxData((prev) => ({ ...prev, [name]: option.value }));

    if (name === "location_si") {
      const selectedArea = LocationData.find(
        (area) => area.name === option.value
      );
      if (selectedArea) {
        const guList: tagItem[] = selectedArea.subArea.map((gu) => ({
          value: gu,
          label: gu,
        }));
        setLocationGuTagList(guList);
        // 'si'가 변경되면 'gu' 초기화
        setSignUpDropboxData((prev) => ({ ...prev, location_gu: "" }));
      } else {
        setLocationGuTagList([]);
      }
    }
  };

  const genderTagList: tagItem[] = Object.entries(GenderLableMap).map(
    ([value, label]) => ({ value, label })
  );
  const preferenceTagList: tagItem[] = Object.entries(PreferenceLableMap).map(
    ([value, label]) => ({ value, label })
  );

  const locationSiTagList: tagItem[] = LocationData.map((area) => ({
    value: area.name,
    label: area.name,
  }));

  const HashTagsList: tagItem[] = Object.entries(InterestLableMap).map(
    ([value, label]) => ({ value, label })
  );

  const onClickTags = (tag: TagProps) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag.value)) {
        return prev.filter((value) => value !== tag.value);
      } else {
        return [...prev, tag.value];
      }
    });
  };

  const trySignup = async () => {
    try {
      const signupData: SignupDto = {
        username: signUpTextData.username,
        lastName: signUpTextData.lastname,
        firstName: signUpTextData.firstname,
        gender: signUpDropboxData.gender,
        preference: signUpDropboxData.preference,
        biography: signUpTextData.bio, // 필요한 경우 추가
        age: parseInt(signUpDropboxData.age), // 문자열을 숫자로 변환
        isGpsAllowed: gpsState.isAllowed,
        hashtags: selectedTags, // 선택된 태그들
        si: signUpDropboxData.location_si,
        gu: signUpDropboxData.location_gu,
        profileImages: images, // 업로드된 이미지 URL 배열
      };

      const response = await axiosUserCreate(signupData);
      console.log("회원가입 성공", response);
      goToMain();
      // 성공 후 처리 (예: 로그인 페이지로 리다이렉트)
    } catch (err) {
      console.error("회원가입 실패", err);
      // 에러 처리 (예: 사용자에게 에러 메시지 표시)
    }
  };

  return (
    <Container>
      <MainTitleStyled>
        MEET<span>CHA</span>
      </MainTitleStyled>
      <RowContainer>
        <TitleStyled>User Profile</TitleStyled>
        <InputContainer>
          <InputTemplate
            type="firstname"
            label="First Name"
            value={signUpTextData.firstname}
            // onChange={savePassword}
            onChange={handleInputChange}
            // setErrorr={setError}
          />
          <InputTemplate
            type="lastname"
            label="last Name"
            value={signUpTextData.lastname}
            // onChange={savePassword}
            onChange={handleInputChange}
            // setErrorr={setError}
          />
          <InputTemplate
            type="username"
            label="유저네임"
            value={signUpTextData.username}
            // onChange={savePassword}
            onChange={handleInputChange}
            // setErrorr={setError}
          />
          <InputTemplate
            type="bio"
            label="약력"
            value={signUpTextData.bio}
            // onChange={savePassword}
            onChange={handleInputChange}
            // setErrorr={setError}
          />
          {/* <InputTemplate
            type="email"
            label="email"
            value={signUpTextData.email}
            // onChange={savePassword}
            onChange={handleInputChange}
            // setErrorr={setError}
          /> */}
        </InputContainer>
      </RowContainer>

      <RowContainer>
        <TitleStyled>User Photo</TitleStyled>
        {/* <ImageUpload /> */}
        <ImageUpload images={images} setImages={setImages} />
      </RowContainer>

      <GeoLocationHandler
        isGpsAllowed={gpsState.isAllowed}
        refreshLocation={refreshLocation}
        onGeoLocationSuccess={handleGeoLocationSuccess}
        onGeoLocationError={handleGeoLocationError}
        onAddressFound={handleAddressFound}
        onRefreshComplete={handleRefreshComplete}
      />

      <RowContainer>
        <TitleStyled>위치 정보 허용</TitleStyled>
        <TagContainer>
          <TagStyled $selected={gpsState.isAllowed} onClick={handleGpsAllow}>
            허용
          </TagStyled>
          <TagStyled $selected={!gpsState.isAllowed} onClick={handleGpsDeny}>
            거부
          </TagStyled>
        </TagContainer>
        {gpsState.error && (
          <ErrorStyled>
            {gpsState.error}
            <br />
            {gpsState.isAllowed
              ? "브라우저 설정에서 위치 정보 접근을 허용해주세요."
              : "IP 기반 위치 정보를 사용합니다."}
          </ErrorStyled>
        )}
      </RowContainer>

      <RowContainer>
        <TitleStyled>User Detail</TitleStyled>
        <InputContainer>
          <DropboxTemplate
            options={locationSiTagList}
            type="location_si"
            onSelect={(option) => handleDropboxChange("location_si", option)}
            selectedValue={signUpDropboxData.location_si}
          />
          <DropboxTemplate
            options={locationGuTagList}
            type="location_gu"
            onSelect={(option) => handleDropboxChange("location_gu", option)}
            selectedValue={signUpDropboxData.location_gu}
            disabled={!signUpDropboxData.location_si}
          />
          {/* <DropboxTemplate
            options={locationSiTagList}
            type="location_si"
            onSelect={(option) => handleDropboxChange("location_si", option)}
            selectedValue={signUpDropboxData.location_si}
          />
          <DropboxTemplate
            options={locationGuTagList}
            type="location_gu"
            onSelect={(option) => handleDropboxChange("location_gu", option)}
            selectedValue={signUpDropboxData.location_gu}
            disabled={!signUpDropboxData.location_si}
          /> */}
          <DropboxTemplate
            options={genderTagList}
            type="gender"
            onSelect={(option) => handleDropboxChange("gender", option)}
            selectedValue={signUpDropboxData.gender}
          />
          <DropboxTemplate
            options={preferenceTagList}
            type="preference"
            onSelect={(option) => handleDropboxChange("preference", option)}
            selectedValue={signUpDropboxData.preference}
          />
          <DropboxTemplate
            options={ageTagList}
            type="age"
            onSelect={(option) => handleDropboxChange("age", option)}
            selectedValue={signUpDropboxData.age}
          />
        </InputContainer>
      </RowContainer>

      <HashTagContainer>
        <TitleStyled>HashTags</TitleStyled>
        <TagList
          tags={HashTagsList}
          onTagSelect={onClickTags}
          selectedTags={selectedTags}
          // onTagSelect={(tag) => onClickTags(tag)}
        />
      </HashTagContainer>
      <ButtonStyled onClick={trySignup}>가입하기</ButtonStyled>
    </Container>
  );
};

export default SignupDetailPage;

const ButtonStyled = styled.button`
  width: 350px;
  font-size: 1.1rem;
  background-color: var(--brand-main-1);
  padding: 12px 0px;

  box-shadow: 4px 4px 3px 0px var(--black);
  margin-top: 30px;
  margin-bottom: 50px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 740px;

  & > div {
    max-width: 350px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    & > div {
      max-width: none;
    }
  }
`;

const HashTagContainer = styled.div`
  width: 740px;
  margin-bottom: 60px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const RowContainer = styled.div`
  margin-bottom: 40px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const TitleStyled = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.025em;

  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  padding-top: 6vh;

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

const MainTitleStyled = styled.div`
  font-size: 3rem;
  font-family: var(--main-font);
  /* margin-bottom: 20px; */
  & > span {
    color: var(--brand-main-1);
  }
  margin-bottom: 30px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 740px;
  @media screen and (max-width: 768px) {
    width: 100%;
    /* justify-content: center; */
  }
`;

const TagStyled = styled.div<{
  $selected: boolean;
}>`
  padding: 6px 24px;
  border-radius: 2px;
  background-color: ${(props) =>
    props.$selected ? "var(--brand-main-1)" : "#f0f0f0"};
  color: ${(props) => (props.$selected ? "var(--white)" : "var(--black)")};

  display: flex;
  align-items: center;
  transition: all 0.1s ease;
  font-size: 0.9rem;
  line-height: 1.4;
  height: 36px;

  &:hover {
    background-color: var(--brand-sub-1);
    color: #f0f0f0;
  }
`;

const ErrorStyled = styled.div`
  /* margin-left: 20px; */
  margin-top: 4px;
  font-weight: 400;
  line-height: 1.4;
  font-size: 0.8rem;
  letter-spacing: -0.025em;
  color: var(--status-error-1);
  width: 250px;
`;
