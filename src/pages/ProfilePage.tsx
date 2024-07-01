import styled from "styled-components";
import TestImage1 from "@/assets/mock/test1.png";
import TestImage2 from "@/assets/mock/test2.png";
import TestImage3 from "@/assets/mock/test3.png";
import TestImage4 from "@/assets/mock/test4.png";
import TestImage5 from "@/assets/mock/test5.png";
import { ProfileDto, RegisterDto } from "@/types/tag.dto";
import TagTemplate from "@/components/TagTemplate";
import { tagItem } from "./SignUpPage";
import {
  GenderLableMap,
  InterestLableMap,
  PreferenceLableMap,
} from "@/types/maps";
import { useContext, useEffect, useState } from "react";
import { GenderType, InterestType, PreferenceType } from "@/types/tag.enum";
// import { ReactComponent as BanIcon } from "@/assets/icons/ban-icon.svg";
// import { ReactComponent as HeartIcon } from "@/assets/icons/heart-icon.svg";
// import { ReactComponent as MessageIcon } from "@/assets/icons/sendMessage-icon.svg";
import LocationDropdown from "@/components/LocationDropdown";
import Stars from "@/components/Stars";
// import Stars from "@/components/Stars";
import { axiosProfile, axiosProfileMe } from "@/api/axios.custom";
import { useParams, useSearchParams } from "react-router-dom";
import { SocketContext } from "./LayoutPage";
import ProfileImages from "@/components/ProfileImages";
import { convertToUpperCase } from "@/utils/inputCheckUtils";

const mockData: ProfileDto = {
  username: "miyu",
  firstName: "John",
  lastName: "Doe",
  biography:
    "I am a passionate software developer with over 5 years of experience in full-stack development. I love working on open-source projects and contributing to the developer community. When I'm not coding, I enjoy hiking, playing the guitar, and exploring new technologies.",
  age: 25,
  gender: "FEMALE",
  preference: "BISEXUAL",
  rate: 4.5,
  // hashtags: ["BOOKS", "MUSIC", "MOVIES", "SPORTS", "TRAVEL"],
  hashtags: ["books", "music"],
  isBlocked: true,
  // hashtags: "BOOKS MUSIC MOVIES SPORTS TRAVEL",
  si: "서울",
  gu: "관악구",
  profileImages: ["https://naver.com", "https://naver.com"],
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
  const [profileData, setProfileData] = useState<RegisterDto | null>();
  const [genderType, setGenderType] = useState<GenderType | null>(null);
  const [preferenceType, setPreferenceType] = useState<PreferenceType | null>(
    null
  );
  const [interestType, setInterestType] = useState<InterestType[] | null>(null);
  const [userStatus, setUserStatus] = useState<boolean>(false);
  const socket = useContext(SocketContext);
  const [searchParams, setSeratchParams] = useSearchParams();
  const username = searchParams.get("username");
  const [rate, setRate] = useState<number>(0);
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRate = parseFloat(e.target.value);
    if (newRate >= 0 && newRate <= 5) {
      setRate(newRate);
    }
  };

  // 실제 있는 값들이 모두 있어야 하니까
  const [hashtagList, setHashtagList] = useState<tagItem[]>([]);

  // userID는 나중에 jwt로 대체
  const tryToGetProfile = async (username: any) => {
    try {
      const res = await (!username ? axiosProfileMe() : axiosProfile(username));
      console.log("profile", res.data);
      setProfileData(res.data);
      const convertUpperCaseHashtags = convertToUpperCase(res.data.hashtags);
      const newHashtagList: tagItem[] = Object.entries(InterestLableMap)
        .filter(([key, _]) => convertUpperCaseHashtags.includes(key))
        .map(([key, name]) => ({ key, name }));

      console.log("newHashtagList", newHashtagList);
      setHashtagList(newHashtagList);
    } catch (error) {
      console.log("profile page error", error);
    }
  };

  useEffect(() => {
    tryToGetProfile(username);
  }, []);

  // 현재 유저의 on,offline 상태 불러오기

  // socket.on("connect", () => {});
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("message");
  //   });
  // }, []);

  // 백에서 받아온 정보 넘기기
  return (
    <Wrapper>
      <LeftWrapper>
        {/* <ProfileImages images={mockData.profileImages} /> */}
        {profileData && <ProfileImages images={profileData?.profileImages} />}
      </LeftWrapper>
      <RightWrapper>
        <UserInfoWrapper>
          <h1>{profileData?.firstName}</h1>
          {/* <OnlineStatusWrapper> */}
          <OnlineStatusStyled $userStatus={userStatus}></OnlineStatusStyled>
          {/* </OnlineStatusWrapper> */}
        </UserInfoWrapper>
        {profileData && (
          <TagTemplate
            title="hashtag"
            tagList={hashtagList}
            initialState={interestType}
            setState={setInterestType}
            isModify={true}
            selectedTag={profileData?.hashtags}
          />
        )}
        {profileData && (
          <TagTemplate
            title="Gender"
            tagList={genderTagList}
            initialState={genderType}
            setState={setGenderType}
            isModify={true}
            selectedTag={[profileData.gender]}
          />
        )}

        <StarWrapper>
          <StarsSubmitWrapper>
            <h2>Rating</h2>
            {profileData && <Stars rating={profileData.rate} />}
          </StarsSubmitWrapper>
          <StarsSubmitWrapper>
            {/* <h2>평점 주기</h2> */}
            <StarSubmitStyled>
              <StarInputStyled
                type="number"
                value={rate}
                onChange={handleRateChange}
                step="0.1"
                min="0"
                max="5"
              />
              <StarSubmitButtonStyled>submit</StarSubmitButtonStyled>
            </StarSubmitStyled>
            <Stars rating={rate} />
          </StarsSubmitWrapper>
        </StarWrapper>
        {profileData && (
          <TagTemplate
            title="Preference"
            tagList={preferenceTagList}
            initialState={preferenceType}
            setState={setPreferenceType}
            isModify={true}
            selectedTag={[profileData.preference]}
          />
        )}

        <LocationWrapper>
          <h2>Location</h2>
          {profileData && (
            <LocationDropdown
              selectedArea={profileData.si}
              selectedSubArea={profileData.gu}
              isFixed={true}
              // handleAreaChange={handleAreaChange}
              // handleSubAreaChange={handleSubAreaChange}
            />
          )}
        </LocationWrapper>
        <BioWrapper>
          <h2>Bio</h2>
          <p>{profileData?.biography}</p>
        </BioWrapper>
      </RightWrapper>
    </Wrapper>
  );
};

export default ProfilePage;

const StarsSubmitWrapper = styled.div`
  & > h2 {
    margin-bottom: 25px;
  }
`;

const StarSubmitStyled = styled.div`
  margin-bottom: 21px;
  gap: 10px;
  display: flex;
`;

const StarSubmitButtonStyled = styled.div`
  display: flex;
  color: var(--white);
  justify-content: center;
  align-items: center;
  width: 80px;
  background-color: var(--light-vermilion);
  border-radius: 20px;
  font-weight: 400;
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

const StarWrapper = styled.div`
  display: flex;
  gap: 20px;

  & > h2 {
    margin-bottom: 25px;
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
  width: 80%;
  display: flex;
  justify-content: space-between;
  & > h1 {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const OnlineStatusStyled = styled.div<{ $userStatus: boolean }>`
  background-color: var(--online);
  width: 24px;
  height: 24px;
  border-radius: 20px;
  box-shadow: 0 0 0.5rem #fff, inset 0 0 0.5rem #fff, 0 0 2rem var(--online),
    inset 0 0 2rem var(--online), 0 0 4rem var(--online),
    inset 0 0 4rem var(--online);
`;

const StarInputStyled = styled.input`
  padding-left: 12px;
  background-color: var(--white);
  color: var(--black);
  border-radius: 20px;
  width: 80px;
  height: 1.1rem;
`;
