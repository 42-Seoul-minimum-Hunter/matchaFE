import InputTemplate from "@/components/InputTemplate";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { tagItem } from "./LoginPage";
import ImageUploader from "@/components/ImageUpload";
import DropboxTemplate from "@/components/DropboxTemplate";
import {
  GenderLableMap,
  InterestLableMap,
  PreferenceLableMap,
} from "@/types/maps";
import { LocationData } from "@/assets/mock/mock";
import { AgeTagItem } from "./SignupDetailPage";
import TagList, { TagProps } from "@/components/TagTemplate";

const ageTagList: AgeTagItem[] = Array.from({ length: 81 }, (_, index) => {
  const age = index + 20;
  return {
    value: age.toString(),
    label: `${age}세`,
  };
});

const SettingPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [locationGuTagList, setLocationGuTagList] = useState<tagItem[]>([]);
  const [signUpTextData, setSignUpTextData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });

  const [signUpDropboxData, setSignUpDropboxData] = useState({
    location_si: "",
    location_gu: "",
    gender: "",
    preference: "",
  });

  const [toggleData, setToggleData] = useState({
    twoFactor: false,
    location: false,
  });

  const handleToggle = (field: "twoFactor" | "location") => {
    setToggleData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log("e.target.name", e.target.name);
    setSignUpTextData({ ...signUpTextData, [name]: value });
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

  // hashtags
  const dummySelectHastags = ["HEALTH", "PHOTOGRAPHY"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const onClickTags = (tag: TagProps) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag.value)) {
        return prev.filter((value) => value !== tag.value);
      } else {
        return [...prev, tag.value];
      }
    });
  };
  const HashTagsList: tagItem[] = Object.entries(InterestLableMap).map(
    ([value, label]) => ({ value, label })
  );

  return (
    <Container>
      <InputDataContainer>
        {/* <LocationFromIP />
      <LocationFromCoords latitude={37.4882059} longitude={127.0647553} /> */}
        <LeftContainer>
          <RowContainer>
            <TitleStyled>User Profile</TitleStyled>
            <InputContainer>
              <InputTemplate
                type="firstname"
                label="First Name"
                value={signUpTextData.firstname}
                onChange={handleInputChange}
              />
              <InputTemplate
                type="lastname"
                label="last Name"
                value={signUpTextData.lastname}
                onChange={handleInputChange}
              />
              <InputTemplate
                type="email"
                label="이메일"
                value={signUpTextData.email}
                onChange={handleInputChange}
              />
              <InputTemplate
                type="password"
                label="비밀번호"
                value={signUpTextData.password}
                onChange={handleInputChange}
              />
            </InputContainer>
          </RowContainer>
          <RowContainer>
            <TitleStyled>User Photo</TitleStyled>
            {/* <ImageUpload /> */}
            <ImageUploader images={images} setImages={setImages} />
          </RowContainer>

          <RowContainer>
            <TitleStyled>User Detail</TitleStyled>
            <InputContainer>
              <DropboxTemplate
                options={locationSiTagList}
                type="location_si"
                onSelect={(option) =>
                  handleDropboxChange("location_si", option)
                }
              />
              <DropboxTemplate
                options={locationGuTagList}
                type="location_gu"
                onSelect={(option) =>
                  handleDropboxChange("location_gu", option)
                }
              />
              <DropboxTemplate
                options={genderTagList}
                type="gender"
                onSelect={(option) => handleDropboxChange("gender", option)}
              />
              <DropboxTemplate
                options={preferenceTagList}
                type="preference"
                onSelect={(option) => handleDropboxChange("preference", option)}
              />
              <DropboxTemplate
                options={ageTagList}
                type="age"
                onSelect={(option) => handleDropboxChange("age", option)}
              />
              <InputTemplate
                type="username"
                label="유저네임"
                value={signUpTextData.username}
                // onChange={savePassword}
                onChange={handleInputChange}
                // setErrorr={setError}
              />
            </InputContainer>
          </RowContainer>
        </LeftContainer>

        <RightContainer>
          <RowContainer>
            <ToggleContainer>
              <TitleStyled>2fa 인증 설정</TitleStyled>
              <TagContainer>
                <TagStyled
                  $selected={toggleData.twoFactor}
                  onClick={() => handleToggle("twoFactor")}
                >
                  허용
                </TagStyled>
                <TagStyled
                  $selected={!toggleData.twoFactor}
                  onClick={() => handleToggle("twoFactor")}
                >
                  거부
                </TagStyled>
              </TagContainer>

              <TitleStyled>위치 정보 허용</TitleStyled>
              <TagContainer>
                <TagStyled
                  $selected={toggleData.location}
                  onClick={() => handleToggle("location")}
                >
                  허용
                </TagStyled>
                <TagStyled
                  $selected={!toggleData.location}
                  onClick={() => handleToggle("location")}
                >
                  거부
                </TagStyled>
              </TagContainer>
            </ToggleContainer>
          </RowContainer>

          <RowContainer>
            <TitleStyled>HashTags</TitleStyled>
            <TagList
              tags={HashTagsList}
              onTagSelect={onClickTags}
              selectedTags={dummySelectHastags}
              // onTagSelect={(tag) => onClickTags(tag)}
            />
          </RowContainer>
        </RightContainer>
      </InputDataContainer>
      {/* 수정하기 버튼 생성할까..? */}
      {/* <ButtonStyled>edit</ButtonStyled> */}
      <ButtonStyled>수정하기</ButtonStyled>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: column;
  align-items: center;
`;

const ButtonStyled = styled.button`
  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
  width: 350px;
  font-size: 1.1rem;
  background-color: var(--brand-main-1);
  padding: 12px 0px;

  box-shadow: 4px 4px 3px 0px var(--black);
  margin-top: 30px;
  margin-bottom: 50px;
`;

const InputDataContainer = styled.div`
  display: flex;
  padding-top: 6vh;

  /* flex-direction: column; */
  /* align-items: center; */
  gap: 24px;
  justify-content: center;
  border-radius: 10px;

  max-width: 1200px;

  @media screen and (max-width: 1360px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: none;
  }

  @media screen and (max-width: 768px) {
    padding-top: 4vh;
    /* padding-left: 2.5rem;
    padding-right: 2.5rem; */
  }
`;

const RightContainer = styled.div`
  flex: 1;
  @media screen and (max-width: 1360px) {
    flex: 2;
    max-width: 792px;
    /* flex-direction: column;
    align-items: center; */
    width: 90%;
  }
`;

const LeftContainer = styled.div`
  flex: 2;
  max-width: 792px;
  width: 90%;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  @media screen and (max-width: 768px) {
    justify-content: center;
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

const RowContainer = styled.div`
  margin-bottom: 40px;
  border: 1px solid var(--black);
  @media screen and (max-width: 768px) {
    width: 100%;
  }

  padding-right: 38px;
  padding-left: 38px;
  padding-bottom: 38px;
  padding-top: 20px;
  width: 100%;
  /* width: 792px; */
`;

const TitleStyled = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.025em;

  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ToggleContainer = styled.div`
  & > ${TitleStyled}:nth-of-type(3) {
    margin-top: 30px;
  }

  /* display: flex;
  flex-direction: column;
  gap: 20px; */
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  & > div {
    max-width: 350px;
  }

  @media screen and (max-width: 876px) {
    width: 100%;
    & > div {
      max-width: none;
    }
  }
`;

export default SettingPage;
