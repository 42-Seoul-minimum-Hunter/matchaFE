import InputTemplate from "@/components/InputTemplate";
import { useCallback, useEffect, useState } from "react";
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
import { axiosSettingCreate, axiosSettingModify } from "@/api/axios.custom";
import { SettingDto } from "@/types/tag.dto";

const ageTagList: AgeTagItem[] = Array.from({ length: 81 }, (_, index) => {
  const age = index + 20;
  return {
    value: age.toString(),
    label: `${age}세`,
  };
});
const genderTagList: tagItem[] = Object.entries(GenderLableMap).map(
  ([value, label]) => ({ value, label })
);
const preferenceTagList: tagItem[] = Object.entries(PreferenceLableMap).map(
  ([value, label]) => ({ value, label })
);

const SettingPage = () => {
  const [settingData, setSettingData] = useState<SettingDto | undefined>(
    undefined
  );
  const [isModified, setIsModified] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [locationGuTagList, setLocationGuTagList] = useState<tagItem[]>([]);
  const [signUpTextData, setSignUpTextData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    bio: "",
    username: "",
  });
  const [signUpDropboxData, setSignUpDropboxData] = useState({
    location_si: "",
    location_gu: "",
    gender: "",
    preference: "",
    age: "",
  });
  const [toggleData, setToggleData] = useState({
    twoFactor: false,
    location: false,
  });

  useEffect(() => {
    trySettingProfile();
  }, []);

  useEffect(() => {
    if (settingData) {
      setImages(settingData.profileImages || []);
      setSelectedTags(settingData.hashtags || []);
      setSignUpTextData({
        firstname: settingData.firstName || "",
        lastname: settingData.lastName || "",
        email: settingData.email || "",
        bio: settingData.biography || "",
        username: settingData.username || "",
      });
      setSignUpDropboxData({
        location_si: settingData.si || "",
        location_gu: settingData.gu || "",
        gender: settingData.gender || "",
        preference: settingData.preference || "",
        age: settingData.age?.toString() || "",
      });
      setToggleData({
        twoFactor: settingData.isTwofa || false,
        location: settingData.isGpsAllowed || false,
      });
    }
  }, [settingData]);

  const checkModification = useCallback(() => {
    if (!settingData) return false;

    const isProfileModified =
      signUpTextData.firstname !== settingData.firstName ||
      signUpTextData.lastname !== settingData.lastName ||
      signUpTextData.email !== settingData.email ||
      signUpTextData.bio !== settingData.biography ||
      signUpTextData.username !== settingData.username;

    const isDropboxModified =
      signUpDropboxData.location_si !== settingData.si ||
      signUpDropboxData.location_gu !== settingData.gu ||
      signUpDropboxData.gender !== settingData.gender ||
      signUpDropboxData.preference !== settingData.preference ||
      signUpDropboxData.age !== settingData.age?.toString();

    const isToggleModified =
      toggleData.twoFactor !== settingData.isTwofa ||
      toggleData.location !== settingData.isGpsAllowed;

    const isTagsModified =
      JSON.stringify(selectedTags) !== JSON.stringify(settingData.hashtags);
    const isImagesModified =
      JSON.stringify(images) !== JSON.stringify(settingData.profileImages);

    return (
      isProfileModified ||
      isDropboxModified ||
      isToggleModified ||
      isTagsModified ||
      isImagesModified
    );
  }, [
    signUpTextData,
    signUpDropboxData,
    toggleData,
    selectedTags,
    images,
    settingData,
  ]);

  useEffect(() => {
    setIsModified(checkModification());
  }, [
    signUpTextData,
    signUpDropboxData,
    toggleData,
    selectedTags,
    images,
    checkModification,
  ]);

  const handleToggle = (field: "twoFactor" | "location", value: boolean) => {
    setToggleData((prev) => ({
      ...prev,
      [field]: value,
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
        // 'si'가 변경되면 'gu' 초기화
        setSignUpDropboxData((prev) => ({ ...prev, location_gu: "" }));
      } else {
        setLocationGuTagList([]);
      }
    }
  };

  const locationSiTagList: tagItem[] = LocationData.map((area) => ({
    value: area.name,
    label: area.name,
  }));

  // hashtags

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

  const trySettingProfile = async () => {
    try {
      const res = await axiosSettingCreate();
      setSettingData(res.data);
      console.log("res", res);
    } catch (error) {
      // alert("error" + error);
      console.log("error", error);
    }
  };

  useEffect(() => {
    trySettingProfile();
  }, []);

  const updateProfile = async () => {
    if (!isModified) {
      console.log("변경사항이 없습니다.");
      return;
    }

    try {
      const updatedData: SettingDto = {
        firstName: signUpTextData.firstname,
        lastName: signUpTextData.lastname,
        email: signUpTextData.email,
        username: signUpTextData.username,
        biography: signUpTextData.bio,
        si: signUpDropboxData.location_si,
        gu: signUpDropboxData.location_gu,
        gender: signUpDropboxData.gender,
        preference: signUpDropboxData.preference,
        age: parseInt(signUpDropboxData.age),
        isTwofa: toggleData.twoFactor,
        isGpsAllowed: toggleData.location,
        hashtags: selectedTags,
        profileImages: images,
      };

      const response = await axiosSettingModify(updatedData);
      console.log("프로필 업데이트 성공:", response);
      setIsModified(false);
      // 성공 메시지 표시
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      // 에러 메시지 표시
    }
  };

  return (
    <Container>
      <InputDataContainer>
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
                type="username"
                label="유저네임"
                value={signUpTextData.username}
                // onChange={savePassword}
                onChange={handleInputChange}
                // setErrorr={setError}
              />
            </InputContainer>
          </RowContainer>
          <RowContainer>
            <TitleStyled>User Photo</TitleStyled>
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
                selectedValue={signUpDropboxData.location_si}
              />
              <DropboxTemplate
                options={locationGuTagList}
                type="location_gu"
                onSelect={(option) =>
                  handleDropboxChange("location_gu", option)
                }
                selectedValue={signUpDropboxData.location_gu}
                disabled={!signUpDropboxData.location_si}
              />
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
              <InputTemplate
                type="bio"
                label="약력"
                value={signUpTextData.bio}
                onChange={handleInputChange}
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
                  onClick={() => handleToggle("twoFactor", true)}
                >
                  허용
                </TagStyled>
                <TagStyled
                  $selected={!toggleData.twoFactor}
                  onClick={() => handleToggle("twoFactor", false)}
                >
                  거부
                </TagStyled>
              </TagContainer>

              <TitleStyled>위치 정보 허용</TitleStyled>
              <TagContainer>
                <TagStyled
                  $selected={toggleData.location}
                  onClick={() => handleToggle("location", true)}
                >
                  허용
                </TagStyled>
                <TagStyled
                  $selected={!toggleData.location}
                  onClick={() => handleToggle("location", false)}
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
              selectedTags={selectedTags}
              // onTagSelect={(tag) => onClickTags(tag)}
            />
          </RowContainer>
        </RightContainer>
      </InputDataContainer>
      <ButtonStyled onClick={updateProfile} disabled={!isModified}>
        {isModified ? "수정하기" : "변경사항 없음"}
      </ButtonStyled>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ButtonStyled = styled.button`
  @media screen and (max-width: 768px) {
    width: 90%;
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
    width: 100%;
    padding-top: 4vh;
    padding-left: 1rem;
    padding-right: 1rem;
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

  @media screen and (max-width: 1360px) {
    width: 100%;
    & > div {
      max-width: none;
    }
  }
`;

export default SettingPage;
