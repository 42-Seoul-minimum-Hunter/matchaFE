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
import { ReactComponent as BanIcon } from "@/assets/icons/ban-icon.svg";
import { ReactComponent as HeartIcon } from "@/assets/icons/heart-icon.svg";
import { ReactComponent as MessageIcon } from "@/assets/icons/sendMessage-icon.svg";
import LocationDropdown from "@/components/LocationDropdown";
import Stars from "@/components/Stars";
// import Stars from "@/components/Stars";
import { axiosProfile, axiosProfileMe } from "@/api/axios.custom";
import { useParams, useSearchParams } from "react-router-dom";
import { SocketContext } from "./LayoutPage";

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
  hashtags: ["BOOKS", "MUSIC", "MOVIES", "SPORTS", "TRAVEL"],
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
  const [profileData, setProfileData] = useState<RegisterDto | null>(null);
  const [genderType, setGenderType] = useState<GenderType | null>(null);
  const [preferenceType, setPreferenceType] = useState<PreferenceType | null>(
    null
  );
  const [interestType, setInterestType] = useState<InterestType[] | null>(null);
  const [selectImg, setSelectImg] = useState<string>(images[0]);
  const [userStatus, setUserStatus] = useState<boolean>(false);
  const socket = useContext(SocketContext);
  const [searchParams, setSeratchParams] = useSearchParams();
  const username = searchParams.get("username");

  // const interestTagList: tagItem[] = Object.entries(InterestLableMap)
  //   .filter(([key, _]) => mockData.hashtags.includes(key))
  //   .map(([key, name]) => ({ key, name }));
  const interestTagList: tagItem[] = Object.entries(InterestLableMap)
    .filter(([key, _]) => mockData.hashtags.includes(key))
    .map(([key, name]) => ({ key, name }));

  console.log("interestTagList", interestTagList);

  const onClickImage = (index: number) => {
    setSelectImg(images[index]);
  };

  // userID는 나중에 jwt로 대체
  const tryToGetProfile = async (username: any, userID: number) => {
    try {
      const res = await (!username
        ? axiosProfileMe()
        : axiosProfile(username, userID));
      console.log("profile", res.data);
      setProfileData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    tryToGetProfile(username, 2);
  }, []);

  // 현재 유저의 on,offline 상태 불러오기

  // socket.on("connect", () => {});
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("message");
  //   });
  // }, []);

  // 백에서 받아온 정보 넘기기

  const [rate, setRate] = useState<number>(0);
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRate = parseFloat(e.target.value);
    if (newRate >= 0 && newRate <= 5) {
      setRate(newRate);
    }
  };
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
        {/* <UserInfoStyled>
          <h1>{mockData.firstName}</h1>
        </UserInfoStyled> */}

        <UserInfoWrapper>
          <h1>{profileData?.firstName}</h1>
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
          selectedTag={profileData?.hashtags}
        />
        <TagTemplate
          title="Gender"
          tagList={genderTagList}
          initialState={genderType}
          setState={setGenderType}
          isModify={true}
          selectedTag={[profileData?.gender]}
        />
        <StarWrapper>
          <StarsSubmitWrapper>
            <h2>Rating</h2>
            <Stars rating={profileData?.rate} />
          </StarsSubmitWrapper>
          <StarsSubmitWrapper>
            <h2>평점 주기</h2>
            <StarSubmitStyled>
              <Stars rating={rate} />
              <input
                type="number"
                value={rate}
                onChange={handleRateChange}
                step="0.1"
                min="0"
                max="5"
              />
              <StarSubmitButtonStyled>평점 주기 ~!</StarSubmitButtonStyled>
            </StarSubmitStyled>
            <button value="평점 주기"></button>
          </StarsSubmitWrapper>
        </StarWrapper>
        <TagTemplate
          title="Preference"
          tagList={preferenceTagList}
          initialState={preferenceType}
          setState={setPreferenceType}
          isModify={true}
          selectedTag={[profileData?.preference]}
        />
        <LocationWrapper>
          <h2>Location</h2>
          <LocationDropdown
            selectedArea={profileData?.si}
            selectedSubArea={profileData?.gu}
            isFixed={true}
            // handleAreaChange={handleAreaChange}
            // handleSubAreaChange={handleSubAreaChange}
          />
          {/* <Dropdown /> */}
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
  display: flex;
`;

const StarSubmitButtonStyled = styled.div`
  display: flex;
`;

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
  dispaly: flex;
  & > h1 {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;
