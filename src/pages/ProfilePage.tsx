import styled from "styled-components";
import TestImage1 from "@/assets/mock/test1.png";
import { ProfileDto, RegisterDto } from "@/types/tag.dto";
import { tagItem } from "./SignUpPage";
import { InterestLableMap } from "@/types/maps";
import { useContext, useEffect, useState } from "react";
import {
  axiosProfile,
  axiosProfileMe,
  axiosUserRate,
} from "@/api/axios.custom";
import { useSearchParams } from "react-router-dom";
import { SocketContext } from "./LayoutPage";
import ImageUploader from "@/components/ImageUpload";
import TagList from "@/components/TagTemplate";
import Stars from "@/components/Stars";
import StarsSubmit from "@/components/StarsSubmit";

const HashTagsList: tagItem[] = Object.entries(InterestLableMap).map(
  ([value, label]) => ({ value, label })
);

// 웹소켓으로 차단하기, 좋아요 세팅
const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileDto>();
  const [images, setImages] = useState<string[]>(
    profileData?.profileImages || []
  );
  const [userRating, setUserRating] = useState(0);
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const socket = useContext(SocketContext);

  const tryToGetProfile = async (username: any) => {
    try {
      const res = await (!username ? axiosProfileMe() : axiosProfile(username));
      console.log("profile page", res);
      setProfileData(res.data);
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

  // const onClickBanButton = async () => {
  //   try {
  //     const res = await axiosUserBlock(userName);
  //     console.log("block ", res);
  //     navigate("/search");
  //   } catch (error) {
  //     console.log("error", error);
  //     throw error;
  //   }
  // };

  // // socket.on("connect", () => {});
  // // me 일때는 userName 으로 안감
  // // console.log("userName", userName);
  // const onClickHeartButton = () => {
  //   console.log("likeUser click", userName);
  //   setIsLike(!isLike);
  //   socket.emit("likeUser", {
  //     username: userName,
  //   });
  // };

  // // 여기서도 matched확인
  // useEffect(() => {
  //   socket.on("likeUser", (data) => {
  //     console.log("matched", data);
  //   });
  // }, []);

  const handleRatingChange = (newRating: number) => {
    setUserRating(newRating);
  };

  const tryToRateUser = async () => {
    try {
      const res = await axiosUserRate(userRating);
      console.log("rate user", res);
    } catch (error) {
      alert("평점 주기에 실패했습니다.");
      console.log("rate user error", error);
    }
  };

  return (
    <Container>
      <InputDataContainer>
        <LeftContainer>
          <UserCardContainer>
            <TitleImageContainer>
              {/* 나중에 선택해서 바꿀수 있게 만들기 */}
              <img src={profileData?.profileImages[0]} alt="Profile" />
            </TitleImageContainer>
            <UserInfoContainer>
              <UserNameStyled>
                <p>
                  {profileData?.username}, {profileData?.age}
                </p>
                <OnlineStatusStyled $userStatus={true}></OnlineStatusStyled>
              </UserNameStyled>
              <UserLocationStyled>
                {profileData?.si}, {profileData?.gu}
              </UserLocationStyled>
              <UserBioStyled>{profileData?.biography}</UserBioStyled>
              <UserHashtagsStyled>
                <TagList
                  tags={HashTagsList}
                  onTagSelect={() => {}}
                  selectable={false}
                  selectedTags={profileData?.hashtags || []}
                  showSelectedOnly={true}
                />
              </UserHashtagsStyled>
            </UserInfoContainer>
          </UserCardContainer>

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
              <StarsContainer>
                <Stars rating={profileData?.rate}></Stars>
                <StarsSubmit
                  initialRating={userRating}
                  onRatingChange={handleRatingChange}
                />
              </StarsContainer>

              <StarSubmitButtonStyled
                onClick={tryToRateUser}
                disabled={!username}
              >
                평점주기
              </StarSubmitButtonStyled>
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
                    {type === "age" && `${profileData?.age}`}
                    {type === "rate" && `${profileData?.gender}`}
                    {type === "preference" && `${profileData?.preference}`}
                    {type === "location" &&
                      (profileData?.si
                        ? `${profileData?.si}${
                            profileData?.gu ? `, ${profileData?.gu}` : ""
                          }`
                        : "Not set")}
                  </FilterValueStyled>
                </FilterValueContainer>
              </FilterItemStyled>
            ))}
          </FilterContainer>
          <ButtonContainer>
            <ButtonStyled>차단하기</ButtonStyled>
            <ButtonStyled>좋아요</ButtonStyled>
          </ButtonContainer>
        </RightContainer>
      </InputDataContainer>
    </Container>
  );
};

export default ProfilePage;

const UserNameStyled = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 4px;
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
  max-width: 380px;
  max-height: 80px;
  height: 80px;
  margin-top: 30px;
  margin-bottom: 40px;
`;

const UserHashtagsStyled = styled.div`
  width: 100%;
`;

const UserInfoContainer = styled.div`
  width: 100%;
`;

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

  /* @media screen and (max-width: 768px) {
    width: 140px;
    height: 165px;
  } */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

const ButtonStyled = styled.button`
  width: 100%;
  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: none;
  }

  font-size: 1.1rem;
  color: var(--brand-main-1);
  background-color: var(--white);
  border: 1px solid var(--brand-main-1);
  &:hover {
    background-color: var(--brand-main-1);
    color: var(--white);
  }
  padding: 12px 0px;
  border-radius: 4px;
`;

const InputDataContainer = styled.div`
  display: flex;
  padding-top: 6vh;
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
    padding: 4vh 0;
    /* padding-top: 4vh; */
    /* padding-left: 1.5vh;
    padding-right: 1.5vh; */
  }
`;

const RightContainer = styled.div`
  flex: 1;

  @media screen and (max-width: 1360px) {
    flex: 2;
    max-width: 792px;
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

const UserCardContainer = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    /* ## */
    align-items: center;
  }

  border: 1px solid var(--black);
  margin-bottom: 40px;
  padding-right: 38px;
  padding-left: 38px;
  padding-bottom: 38px;
  padding-top: 20px;
  width: 100%;
  display: flex;
  gap: 30px;
`;

const RowContainer = styled.div`
  margin-bottom: 40px;
  border: 1px solid var(--black);
  padding-right: 38px;
  padding-left: 38px;
  padding-bottom: 38px;
  padding-top: 20px;
  width: 100%;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 20px;
  }
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
  width: 100%;
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  width: 100%;
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
  @media screen and (max-width: 1360px) {
    width: calc(50% - 8px); // 2개씩 나열되도록 설정
  }
  /* @media screen and (max-width: 480px) {
    width: 100%; // 모바일에서는 full width
  } */
  border: 1px solid var(--black);
  padding: 10px 20px;
  align-items: flex-end;
`;

const FilterTitleStyled = styled.div`
  display: flex;
  justify-content: space-between;
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

const StarSubmitButtonStyled = styled.button<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${(props) =>
    props.disabled ? "var(--line-gray-3)" : "var(--brand-main-1)"};
  background-color: var(--white);
  border: 1px solid
    ${(props) =>
      props.disabled ? "var(--line-gray-3)" : "var(--brand-main-1)"};
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 400;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "var(--white)" : "var(--brand-main-1)"};
    color: ${(props) =>
      props.disabled ? "var(--line-gray-3)" : "var(--white)"};
  }
`;

// const StarSubmitButtonStyled = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   color: var(--brand-main-1);
//   background-color: var(--white);
//   border: 1px solid var(--brand-main-1);
//   &:hover {
//     background-color: var(--brand-main-1);
//     color: var(--white);
//   }
//   padding: 10px 20px;
//   border-radius: 4px;
//   font-weight: 400;
// `;

const OnlineStatusStyled = styled.div<{ $userStatus: boolean }>`
  background-color: var(--online);
  width: 20px;
  height: 20px;
  border-radius: 20px;
  box-shadow: 0 0 0.5rem #fff, inset 0 0 0.5rem #fff, 0 0 1rem var(--online),
    inset 0 0 1rem var(--online), 0 0 4rem var(--online),
    inset 0 0 2rem var(--online);
`;
