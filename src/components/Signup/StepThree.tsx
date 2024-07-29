import styled from "styled-components";
import InputTemplate from "../InputTemplate";
import { useState } from "react";
import ImageUpload from "../ImageUpload";
import DropboxTemplate from "../DropboxTemplate";
import { GenderLableMap, PreferenceLableMap } from "@/types/maps";
import { tagItem } from "@/pages/SignUpPage";
import { LocationData } from "@/assets/mock/mock";

const StepThree = () => {
  const [showImages, setShowImages] = useState<string[]>([]);
  const [locationGuTagList, setLocationGuTagList] = useState<tagItem[]>([]);
  const [signUpTextData, setSignUpTextData] = useState({
    firstname: "",
    lastname: "",
    checkPassword: "",
  });

  const [signUpDropboxData, setSignUpDropboxData] = useState({
    location_si: "",
    location_gu: "",
    gender: "",
    preference: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log("name, value", name, value);
    setSignUpTextData({ ...signUpTextData, [name]: value });
    // setError(false);
  };

  // const handleDropboxChange = (option: tagItem) => {
  //   // const { name, value } = e.target;
  //   console.log("option", option);
  //   // setSignUpDropboxData({ ...signUpDropboxData, [name]: value });
  //   setSignUpDropboxData((prev) => ({ ...prev, gender: option.value }));
  //   // setError(false);
  // };

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

  console.log("LocationData", LocationData);
  console.log("genderTagList", genderTagList);
  const locationSiTagList: tagItem[] = LocationData.map((area) => ({
    value: area.name,
    label: area.name,
  }));
  // const subAreas =
  //   LocationData.find((area) => area.name === selectedArea)?.subArea || [];
  console.log("locationSiTagList", locationSiTagList);
  return (
    <>
      <RowContainer>
        <TitleStyled>User Profile</TitleStyled>
        <InputContainer>
          <InputTemplate
            type="name"
            label="First Name"
            value={signUpTextData.firstname}
            // onChange={savePassword}
            onChange={handleInputChange}
            // setErrorr={setError}
          />
          <InputTemplate
            type="name"
            label="last Name"
            value={signUpTextData.lastname}
            // onChange={savePassword}
            onChange={handleInputChange}
            // setErrorr={setError}
          />
          <InputTemplate
            type="email"
            label="이메일"
            value={signUpTextData.firstname}
            // onChange={savePassword}
            onChange={handleInputChange}
            // setErrorr={setError}
          />
          <InputTemplate
            type="password"
            label="password"
            value={signUpTextData.lastname}
            // onChange={savePassword}
            onChange={handleInputChange}
            // setErrorr={setError}
          />
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
            options={locationSiTagList}
            type="location_si"
            onSelect={(option) => handleDropboxChange("location_si", option)}
          />
          <DropboxTemplate
            options={locationGuTagList}
            type="location_gu"
            onSelect={(option) => handleDropboxChange("location_gu", option)}
          />
        </InputContainer>
      </RowContainer>
    </>
  );
};

export default StepThree;

const StepThreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 740px;
`;

const RowContainer = styled.div`
  /* width: 100%; */
  margin-bottom: 20px;
`;

const TitleStyled = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.025em;

  margin-bottom: 20px;
`;
