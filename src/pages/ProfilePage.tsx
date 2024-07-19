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
import LocationDropdown from "@/components/LocationDropdown";
import Stars from "@/components/Stars";
import { axiosProfile, axiosProfileMe } from "@/api/axios.custom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SocketContext } from "./LayoutPage";
import ProfileImages from "@/components/ProfileImages";
import { convertToUpperCase } from "@/utils/inputCheckUtils";

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
  const [searchParams, setSeratchParams] = useSearchParams();
  const [userRating, setUserRating] = useState<number>(0);
  const navigateTo = useNavigate();
  const socket = useContext(SocketContext);
  const username = searchParams.get("username");
  console.log("username", username);

  const handleRatingChange = (newRating: number) => {
    setUserRating(newRating);
  };
  const [hashtagList, setHashtagList] = useState<tagItem[]>([]);

  const tryToGetProfile = async (username: any) => {
    try {
      // TODO BE : 내가 해당 유저에게 평점을 얼마를 줬는지 알아야함
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
      // TODO : 나중에 오류처리, 404 페이지 따로 만들던가
      // navigateTo("/login");
      console.log("profile page error", error);
    }
  };

  // likeUser -> username을 보내기, alarm으로 알람
  useEffect(() => {
    tryToGetProfile(username);

    // TODO : websocket으로 온라인,오프라인 상태 받아오기
    setUserStatus(true);
  }, []);

  // 현재 유저의 on,offline 상태 불러오기
  // socket.on("connect", () => {});
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("message");
  //   });
  // }, []);

  return (
    <Wrapper>
      <LeftWrapper>
        {profileData && (
          <ProfileImages
            images={profileData?.profileImages}
            userName={profileData?.username}
          />
        )}
      </LeftWrapper>
      <RightWrapper>
        <UserInfoWrapper>
          <h1>{profileData?.username}</h1>
          <OnlineStatusStyled $userStatus={userStatus}></OnlineStatusStyled>
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

        {/* TODO BE :  별점 주기 url */}
        <StarWrapper>
          <StarsSubmitWrapper>
            <h2>Rating</h2>
            {profileData && <Stars rating={profileData.rate} />}
          </StarsSubmitWrapper>
          <StarsSubmitWrapper>
            <h2>Give Rating</h2>
            <StarRowStyled>
              <Stars
                rating={userRating}
                editable={true}
                onRatingChange={handleRatingChange}
              />
              <SendButton>give</SendButton>
            </StarRowStyled>
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

const Wrapper = styled.div`
  display: flex;
  backdrop-filter: blur(6px);
  padding: 100px 0;
  height: 100%;
  gap: 80px;
  /* padding-bottom: 40px; */
`;

const LeftWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const StarWrapper = styled.div`
  display: flex;
  gap: 20px;

  & > h2 {
    margin-bottom: 25px;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 40px;
  flex-direction: column;
`;

const BioWrapper = styled.div`
  & > h2 {
    margin-bottom: 25px;
  }
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
  background-color: ${(props) =>
    props.$userStatus ? "var(--online)" : "var(--offline)"};
  width: 24px;
  height: 24px;
  border-radius: 20px;
  box-shadow: ${(props) => `
    0 0 0.5rem #fff, 
    inset 0 0 0.5rem #fff, 
    0 0 2rem ${props.$userStatus ? "var(--online)" : "var(--offline)"},
    inset 0 0 2rem ${props.$userStatus ? "var(--online)" : "var(--offline)"},
    0 0 4rem ${props.$userStatus ? "var(--online)" : "var(--offline)"},
    inset 0 0 4rem ${props.$userStatus ? "var(--online)" : "var(--offline)"}
  `};
`;

const StarRowStyled = styled.div`
  display: flex;
  /* flex-direction: column; */
`;

const SendButton = styled.div`
  background-color: var(--button-bg-color);
  color: var(--white);
  padding: 10px 5px;
  border-radius: 10px;
  margin-left: 10px;
`;
