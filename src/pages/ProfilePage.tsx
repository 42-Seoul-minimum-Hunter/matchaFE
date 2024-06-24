import styled from "styled-components";
import TestImage1 from "@/assets/mock/test1.png";
import TestImage2 from "@/assets/mock/test2.png";
import TestImage3 from "@/assets/mock/test3.png";
import TestImage4 from "@/assets/mock/test4.png";
import TestImage5 from "@/assets/mock/test5.png";
import { RegisterDto } from "@/types/tag.dto";
import TagTemplate from "@/components/TagTemplate";
import { tagItem } from "./SignUpPage";
import {
  GenderLableMap,
  InterestLableMap,
  PreferenceLableMap,
} from "@/types/maps";
import { useContext, useEffect, useState } from "react";
import { GenderType, InterestType, PreferenceType } from "@/types/tag.enum";
import { ReactComponent as BanIcon } from "@/assets/icons/ban-icon.svg";
import { ReactComponent as HeartIcon } from "@/assets/icons/heart-icon.svg";
import { ReactComponent as MessageIcon } from "@/assets/icons/sendMessage-icon.svg";
import LocationDropdown from "@/components/LocationDropdown";
import { axiosProfile } from "@/api/axios.custom";
import { useParams, useSearchParams } from "react-router-dom";
import { SocketContext } from "./LayoutPage";

const mockData: RegisterDto = {
  FirstName: "John",
  LastName: "Doe",
  Email: "john.doe@example.com",
  bio: "I am a passionate software developer with over 5 years of experience in full-stack development. I love working on open-source projects and contributing to the developer community. When I'm not coding, I enjoy hiking, playing the guitar, and exploring new technologies.",
  location: "New York, USA",
  age: 25,
  Gender: "FEMALE",
  Preference: "BISEXUAL",
  tag: "BOOKS MUSIC MOVIES SPORTS TRAVEL",
  isGps: true,
};

export const images = [
  TestImage1,
  TestImage2,
  TestImage3,
  TestImage4,
  TestImage5,
];

const genderTagList: tagItem[] = Object.entries(GenderLableMap).map(
  ([key, name]) => ({ key, name })
);

const preferenceTagList: tagItem[] = Object.entries(PreferenceLableMap).map(
  ([key, name]) => ({ key, name })
);

const ProfilePage = () => {
  const [genderType, setGenderType] = useState<GenderType | null>(null);
  const [preferenceType, setPreferenceType] = useState<PreferenceType | null>(
    null
  );
  const [interestType, setInterestType] = useState<InterestType[] | null>(null);
  const [selectImg, setSelectImg] = useState<string>(images[0]);
  let mockDataTag = mockData.tag.split(" ");
  console.log("mockDataTag", mockDataTag);

  const interestTagList: tagItem[] = Object.entries(InterestLableMap)
    .filter(([key, _]) => mockDataTag.includes(key))
    .map(([key, name]) => ({ key, name }));

  console.log("interestTagList", interestTagList);

  const onClickImage = (index: number) => {
    setSelectImg(images[index]);
  };

  const params = useParams();
  // const productId = params.username;

  // userID는 나중에 jwt로 대체
  // me에 해당하는 axios 하나 더 만들기 -> 요청
  const tryToGetProfile = async (username: any, userID: number) => {
    try {
      const res = await axiosProfile(username, userID);
      console.log("profile", res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    tryToGetProfile(username, 2);
  }, []);

  const socket = useContext(SocketContext);
  const [searchParams, setSeratchParams] = useSearchParams();
  const username = searchParams.get("username");
  // 유저네임이 없으면 me로 정보 전달
  if (!username) {
    console.log("test");
  }
  console.log("username", username);

  // socket.on("connect", () => {});
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("message");
  //   });
  // }, []);

  // 백에서 받아온 정보 넘기기
  const [selectedArea, setSelectedArea] = useState<string>("서울");
  const [selectedSubArea, setSelectedSubArea] = useState<string>("강남구");
  const [userStatus, setUserStatus] = useState<boolean>(false);

  // const socket = useContext(SocketContext);

  // const handleAreaChange = (e: any) => {
  //   setSelectedArea(e.target.value);
  // };
  // const handleSubAreaChange = (e: any) => {
  //   setSelectedSubArea(e.target.value);
  // };

  return (
    <Wrapper>
      <LeftWrapper>
        <PohtoWrapper>
          <MainPohtoWrapper>
            <img src={selectImg} />
            <UserInteractionWrapper>
              <BanIconStyled>
                <BanIcon />
              </BanIconStyled>
              <MessageIconStyled>
                <MessageIcon />
                <p>Message</p>
              </MessageIconStyled>
              <HeartIconStyled>
                <HeartIcon />
              </HeartIconStyled>
            </UserInteractionWrapper>
          </MainPohtoWrapper>
          <SubPohtoWrapper>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                onClick={() => onClickImage(index)}
              />
            ))}
          </SubPohtoWrapper>
        </PohtoWrapper>
      </LeftWrapper>
      <RightWrapper>
        <UserInfoWrapper>
          <h1>{mockData.FirstName}</h1>
          <OnlineStatusWrapper>
            <OnlineStatusStyled $userStatus={userStatus}></OnlineStatusStyled>
          </OnlineStatusWrapper>
        </UserInfoWrapper>
        <TagTemplate
          title="Interest"
          tagList={interestTagList}
          initialState={interestType}
          setState={setInterestType}
          isModify={true}
          selectedTag={mockData.tag.split(" ")}
        />
        <TagTemplate
          title="Gender"
          tagList={genderTagList}
          initialState={genderType}
          setState={setGenderType}
          isModify={true}
          selectedTag={[mockData.Gender]}
        />
        <TagTemplate
          title="Preference"
          tagList={preferenceTagList}
          initialState={preferenceType}
          setState={setPreferenceType}
          isModify={true}
          selectedTag={[mockData.Preference]}
        />
        <LocationWrapper>
          <h2>Location</h2>
          <LocationDropdown
            selectedArea={selectedArea}
            selectedSubArea={selectedSubArea}
            isFixed={true}
            // handleAreaChange={handleAreaChange}
            // handleSubAreaChange={handleSubAreaChange}
          />
          {/* <Dropdown /> */}
        </LocationWrapper>
        <BioWrapper>
          <h2>Bio</h2>
          <p>{mockData.bio}</p>
        </BioWrapper>
      </RightWrapper>
    </Wrapper>
  );
};

export default ProfilePage;

const OnlineStatusWrapper = styled.div``;

const OnlineStatusStyled = styled.div<{ $userStatus: boolean }>`
  background-color: var(--online);
  width: 28px;
  height: 28px;
  border-radius: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  padding-top: 40px;
  height: 100%;
  gap: 80px;
  padding-bottom: 40px;
`;

const LeftWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const PohtoWrapper = styled.div``;

const MainPohtoWrapper = styled.div`
  position: relative;

  & > img {
    max-width: 440px;
    /* min-width: 300px; */
    /* width: 100%; */
    height: 570px;
    border-radius: 20px;
    /* width: 100%;
    height: 100%; */
    object-fit: cover;
  }
`;

const SubPohtoWrapper = styled.div`
  display: flex;
  gap: 10px;
  & > img {
    border-radius: 8px;
    width: 80px;
    height: 80px;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 40px;
  flex-direction: column;
`;

const UserInfoStyled = styled.div`
  & > h1 {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const BioWrapper = styled.div`
  & > h2 {
    margin-bottom: 25px;
  }
`;

const UserInteractionWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  padding: 10px 20px;
  gap: 30px;
  bottom: 20px;
  right: 45px;
  /* background-color: var(--white); */
  /* opacity: 0.2; */
  /* 이렇게 해야지 배경의 투명도만 낮아짐, opacity속성을 건들이면 해당 컴포넌트
    의 모든 요소들이 투명해짐
  */
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
`;

const BanIconStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid var(--light-vermilion);
`;

const HeartIconStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid var(--light-vermilion);
`;

const MessageIconStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 10px;
  background-color: var(--white);
  border-radius: 10px;
`;

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > h2 {
    margin-bottom: 25px;
  }
`;

const UserInfoWrapper = styled.div`
  dispaly: flex;
  & > h1 {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;
