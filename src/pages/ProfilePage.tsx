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

// import Stars from "@/components/Stars";
import { axiosProfile, axiosProfileMe } from "@/api/axios.custom";
import { useParams, useSearchParams } from "react-router-dom";
import { SocketContext } from "./LayoutPage";
import { convertToUpperCase } from "@/utils/inputCheckUtils";
import ImageUploader from "@/components/ImageUpload";
import TagList from "@/components/TagTemplate";
import Stars from "@/components/Stars";

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

const HashTagsList: tagItem[] = Object.entries(InterestLableMap).map(
  ([value, label]) => ({ value, label })
);

const mockProfileData: ProfileDto = {
  username: "johndoe123",
  firstName: "John",
  lastName: "Doe",
  gender: "MALE", // GenderType에 따라 적절한 값을 사용해야 합니다.
  preference: "BOTH", // PreferenceType에 따라 적절한 값을 사용해야 합니다.
  age: 28,
  biography:
    "안녕하세요! 저는 음악과 여행을 좋아하는 John입니다. 새로운 사람들과 만나 다양한 경험을 공유하고 싶어요.",
  hashtags: ["MUSIC", "TRAVEL", "FOOD"], // InterestType 배열에 맞는 값들을 사용해야 합니다.
  si: "서울특별시",
  gu: "강남구",
  rate: 4.5,
  profileImages: [TestImage1, TestImage2, TestImage3],
  // profileImages: [
  //   "https://example.com/profile1.jpg",
  //   "https://example.com/profile2.jpg",
  //   "https://example.com/profile3.jpg",
  // ],
};

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

  // likeUser -> username을 보내기
  // alarm으로 알람
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

  const [images, setImages] = useState<string[]>([TestImage1, TestImage2]);

  return (
    <Container>
      <InputDataContainer>
        <LeftContainer>
          <RowContainer>
            <TitleImageContainer>
              {/* 나중에 선택해서 바꿀수 있게 만들기 */}
              <img src={mockProfileData.profileImages[0]} alt="Profile" />
            </TitleImageContainer>
            <UserInfoContainer>
              <UserNameStyled>
                {mockProfileData.username}, {mockProfileData.age}
              </UserNameStyled>
              <UserLocationStyled>
                {mockProfileData.si}, {mockProfileData.gu}
              </UserLocationStyled>
              <UserBioStyled>{mockProfileData.biography}</UserBioStyled>
            </UserInfoContainer>
            <UserHashtagsStyled>
              <TagList
                tags={HashTagsList}
                onTagSelect={() => {}}
                selectable={false}
                selectedTags={mockProfileData.hashtags || []}
                showSelectedOnly={true}
              />
            </UserHashtagsStyled>
          </RowContainer>

          <RowContainer>
            <TitleStyled>User Photo</TitleStyled>
            <ImageUploader
              images={images}
              setImages={setImages}
              isReadOnly={true}
            />
          </RowContainer>
        </LeftContainer>

        <RightContainer>
          <RowContainer>
            <ToggleContainer>
              <TitleStyled>유저 평점 주기</TitleStyled>
              <Stars rating={mockProfileData.rate}></Stars>

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
              <TagContainer></TagContainer>
            </ToggleContainer>
          </RowContainer>

          {/* <RowContainer> */}
          <FilterContainer>
            {["age", "rate", "location", "preference"].map((type) => (
              <FilterItemStyled key={type}>
                <FilterTitleStyled>
                  {/* charAt -> 문자열 쿼리 함수 */}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </FilterTitleStyled>

                <FilterValueContainer>
                  <FilterValueStyled>
                    {type === "age" && `${mockProfileData.age}`}
                    {type === "rate" && `${mockProfileData.gender}`}
                    {type === "preference" && `${mockProfileData.preference}`}
                    {type === "location" &&
                      (mockProfileData.si
                        ? `${mockProfileData.si}${
                            mockProfileData.gu ? `, ${mockProfileData.gu}` : ""
                          }`
                        : "Not set")}
                  </FilterValueStyled>
                </FilterValueContainer>
              </FilterItemStyled>
            ))}
          </FilterContainer>
          {/* </RowContainer> */}
        </RightContainer>
      </InputDataContainer>
      {/* 수정하기 버튼 생성할까..? */}
      {/* <ButtonStyled>edit</ButtonStyled> */}
      <ButtonStyled>수정하기</ButtonStyled>
    </Container>
  );
};

export default ProfilePage;

const UserInfoContainer = styled.div``;

const UserNameStyled = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
`;

const UserLocationStyled = styled.div`
  color: var(--line-gray-1);
  font-size: 0.8rem;
  font-weight: 400;
`;

const UserBioStyled = styled.div`
  line-height: 1.4;
  letter-spacing: -0.025em;
  font-size: 0.9rem;
  font-weight: 400;
`;

const UserHashtagsStyled = styled.div``;

const TitleImageContainer = styled.div`
  width: 280px;
  height: 330px;
  flex-shrink: 0;
  border-radius: 10px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;
const TitleImageStyled = styled.img``;

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

// const Filt;

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

const FilterContainer = styled.div`
  display: flex;

  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
`;

const FilterItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 188px;
  border: 1px solid var(--black);
  /* box-shadow: 5px 5px 5px 0 var(--black); */
  padding: 10px 20px;
  align-items: flex-end;
`;

const FilterTitleStyled = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.4;

  width: 100%;
  border-bottom: 1px solid var(--black);
`;

const FilterValueContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--black);
  width: 92px;
  height: 43px;
`;

const FilterValueStyled = styled.div`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
`;

// const StarsSubmitWrapper = styled.div`
//   & > h2 {
//     margin-bottom: 25px;
//   }
// `;

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

// const Wrapper = styled.div`
//   display: flex;
//   padding-top: 40px;
//   height: 100%;
//   gap: 80px;
//   padding-bottom: 40px;
// `;

// const LeftWrapper = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   flex: 1;
// `;

// const PohtoWrapper = styled.div``;

// const MainPohtoWrapper = styled.div`
//   position: relative;

//   & > img {
//     max-width: 440px;
//     /* min-width: 300px; */
//     /* width: 100%; */
//     height: 570px;
//     border-radius: 20px;
//     /* width: 100%;
//     height: 100%; */
//     object-fit: cover;
//   }
// `;

// const StarWrapper = styled.div`
//   display: flex;
//   gap: 20px;

//   & > h2 {
//     margin-bottom: 25px;
//   }
// `;

// const SubPohtoWrapper = styled.div`
//   display: flex;
//   gap: 10px;
//   & > img {
//     border-radius: 8px;
//     width: 80px;
//     height: 80px;
//   }
// `;

// const RightWrapper = styled.div`
//   display: flex;
//   flex: 1;
//   gap: 40px;
//   flex-direction: column;
// `;

// const UserInfoStyled = styled.div`
//   & > h1 {
//     font-size: 1.5rem;
//     font-weight: 700;
//   }
// `;

// const BioWrapper = styled.div`
//   & > h2 {
//     margin-bottom: 25px;
//   }
// `;

// const UserInteractionWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   position: absolute;
//   padding: 10px 20px;
//   gap: 30px;
//   bottom: 20px;
//   right: 45px;
//   /* background-color: var(--white); */
//   /* opacity: 0.2; */
//   /* 이렇게 해야지 배경의 투명도만 낮아짐, opacity속성을 건들이면 해당 컴포넌트
//     의 모든 요소들이 투명해짐
//   */
//   background-color: rgba(255, 255, 255, 0.8);
//   border-radius: 20px;
// `;

// const BanIconStyled = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 45px;
//   height: 45px;
//   border-radius: 50%;
//   border: 2px solid var(--light-vermilion);
// `;

// const HeartIconStyled = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 45px;
//   height: 45px;
//   border-radius: 50%;
//   border: 2px solid var(--light-vermilion);
// `;

// const MessageIconStyled = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 10px 24px;
//   gap: 10px;
//   background-color: var(--white);
//   border-radius: 10px;
// `;

// const LocationWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   & > h2 {
//     margin-bottom: 25px;
//   }
// `;

// const UserInfoWrapper = styled.div`
//   width: 80%;
//   display: flex;
//   justify-content: space-between;
//   & > h1 {
//     font-size: 1.5rem;
//     font-weight: 700;
//   }
// `;

// const OnlineStatusStyled = styled.div<{ $userStatus: boolean }>`
//   background-color: var(--online);
//   width: 24px;
//   height: 24px;
//   border-radius: 20px;
//   box-shadow: 0 0 0.5rem #fff, inset 0 0 0.5rem #fff, 0 0 2rem var(--online),
//     inset 0 0 2rem var(--online), 0 0 4rem var(--online),
//     inset 0 0 4rem var(--online);
// `;

const StarInputStyled = styled.input`
  padding-left: 12px;
  background-color: var(--white);
  color: var(--black);
  border-radius: 20px;
  width: 80px;
  height: 1.1rem;
`;

// return (
//   <Wrapper>
//     <LeftWrapper>
//       {/* <ProfileImages images={mockData.profileImages} /> */}
//       {profileData && (
//         <ProfileImages
//           images={profileData?.profileImages}
//           userName={profileData?.username}
//         />
//       )}
//     </LeftWrapper>
//     <RightWrapper>
//       <UserInfoWrapper>
//         <h1>{profileData?.firstName}</h1>
//         {/* <OnlineStatusWrapper> */}
//         <OnlineStatusStyled $userStatus={userStatus}></OnlineStatusStyled>
//         {/* </OnlineStatusWrapper> */}
//       </UserInfoWrapper>
//       {profileData && (
//         <TagTemplate
//           title="hashtag"
//           tagList={hashtagList}
//           initialState={interestType}
//           setState={setInterestType}
//           isModify={true}
//           selectedTag={profileData?.hashtags}
//         />
//       )}
//       {profileData && (
//         <TagTemplate
//           title="Gender"
//           tagList={genderTagList}
//           initialState={genderType}
//           setState={setGenderType}
//           isModify={true}
//           selectedTag={[profileData.gender]}
//         />
//       )}

//       <StarWrapper>
//         <StarsSubmitWrapper>
//           <h2>Rating</h2>
//           {profileData && <Stars ratiStarInputStyledng={profileData.rate} />}
//         </StarsSubmitWrapper>
//         <StarsSubmitWrapper>
//           {/* <h2>평점 주기</h2> */}
//           <StarSubmitStyled>
//             <StarInputStyled
//               type="number"
//               value={rate}
//               onChange={handleRateChange}
//               step="0.1"
//               min="0"
//               max="5"
//             />
//             <StarSubmitButtonStyled>submit</StarSubmitButtonStyled>
//           </StarSubmitStyled>
//           <Stars rating={rate} />
//         </StarsSubmitWrapper>
//       </StarWrapper>
//       {profileData && (
//         <TagTemplate
//           title="Preference"
//           tagList={preferenceTagList}
//           initialState={preferenceType}
//           setState={setPreferenceType}
//           isModify={true}
//           selectedTag={[profileData.preference]}
//         />
//       )}

//       <LocationWrapper>
//         <h2>Location</h2>
//         {profileData && (
//           <LocationDropdown
//             selectedArea={profileData.si}
//             selectedSubArea={profileData.gu}
//             isFixed={true}
//             // handleAreaChange={handleAreaChange}
//             // handleSubAreaChange={handleSubAreaChange}
//           />
//         )}
//       </LocationWrapper>
//       <BioWrapper>
//         <h2>Bio</h2>
//         <p>{profileData?.biography}</p>
//       </BioWrapper>
//     </RightWrapper>
//   </Wrapper>
// );
