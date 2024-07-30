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

// TODO : 다른 곳으로 정리
interface AgeTagItem {
  value: string;
  label: string;
}

const ageTagList: AgeTagItem[] = Array.from({ length: 81 }, (_, index) => {
  const age = index + 20;
  return {
    value: age.toString(),
    label: `${age}세`,
  };
});

const SignupDetailPage = () => {
  const [showImages, setShowImages] = useState<string[]>([]);
  const [locationGuTagList, setLocationGuTagList] = useState<tagItem[]>([]);
  const [signUpTextData, setSignUpTextData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const [signUpDropboxData, setSignUpDropboxData] = useState({
    location_si: "",
    location_gu: "",
    gender: "",
    preference: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log("e.target.name", e.target.name);
    setSignUpTextData({ ...signUpTextData, [name]: value });
    // setError(false);
  };

  const handleDropboxChange = (name: string, option: tagItem) => {
    // console.log("option", option);
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

  const tags = [
    { id: "1", label: "React" },
    { id: "2", label: "JavaScript" },
    { id: "3", label: "TypeScript" },
  ];

  const HashTagsList: tagItem[] = Object.entries(InterestLableMap).map(
    ([value, label]) => ({ value, label })
  );
  // console.log("HashTagsList", HashTagsList);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  //
  const onClickTags = (tag: TagProps) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag.value)) {
        return prev.filter((value) => value !== tag.value);
      } else {
        return [...prev, tag.value];
      }
    });
  };

  useEffect(() => {
    console.log("selectedTags", selectedTags);
  }, [selectedTags]);

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
          {/* <InputTemplate
            type="email"
            label="이메일"
            value={signUpTextData.firstname}
            // onChange={savePassword}
            onChange={handleInputChange}
            // setErrorr={setError}
          /> */}
        </InputContainer>
      </RowContainer>

      <RowContainer>
        <TitleStyled>User Photo</TitleStyled>
        {/* <ImageUpload /> */}
        <ImageUpload showImages={showImages} setShowImages={setShowImages} />
      </RowContainer>

      <RowContainer>
        <TitleStyled>User Detail</TitleStyled>
        <InputContainer>
          <DropboxTemplate
            options={locationSiTagList}
            type="location_si"
            onSelect={(option) => handleDropboxChange("location_si", option)}
          />
          <DropboxTemplate
            options={locationGuTagList}
            type="location_gu"
            onSelect={(option) => handleDropboxChange("location_gu", option)}
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
      <ButtonStyled>가입하기</ButtonStyled>
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
