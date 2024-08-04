import styled from "styled-components";
import TestImage1 from "@/assets/mock/test1.png";
import TestImage2 from "@/assets/mock/test2.png";
import { ProfileDto, RegisterDto } from "@/types/tag.dto";
import { tagItem } from "./SignUpPage";
import { InterestLableMap } from "@/types/maps";
import { useContext, useEffect, useState } from "react";

// import Stars from "@/components/Stars";
import { axiosProfile, axiosProfileMe } from "@/api/axios.custom";
import { useParams, useSearchParams } from "react-router-dom";
import { SocketContext } from "./LayoutPage";
import { convertToUpperCase } from "@/utils/inputCheckUtils";
import ImageUploader from "@/components/ImageUpload";
import TagList from "@/components/TagTemplate";
import Stars from "@/components/Stars";
import { mockProfileData } from "@/assets/mock/mock";
import StarsSubmit from "@/components/StarsSubmit";

const HashTagsList: tagItem[] = Object.entries(InterestLableMap).map(
  ([value, label]) => ({ value, label })
);

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<RegisterDto | null>();
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
  const [hashtagList, setHashtagList] = useState<tagItem[]>([]);

  // 실제 있는 값들이 모두 있어야 하니까

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

  const [images, setImages] = useState<string[]>([TestImage1, TestImage2]);

  const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setUserRating(newRating);
    // 여기에 서버로 새 평점을 보내는 로직을 추가할 수 있습니다.
  };

  return (
    <Container>
      <InputDataContainer>
        <LeftContainer>
          <UserCardContainer>
            <TitleImageContainer>
              {/* 나중에 선택해서 바꿀수 있게 만들기 */}
              <img src={mockProfileData.profileImages[0]} alt="Profile" />
            </TitleImageContainer>
            <UserInfoContainer>
              <UserNameStyled>
                <p>
                  {mockProfileData.username}, {mockProfileData.age}
                </p>
                <OnlineStatusStyled $userStatus={true}></OnlineStatusStyled>
              </UserNameStyled>
              <UserLocationStyled>
                {mockProfileData.si}, {mockProfileData.gu}
              </UserLocationStyled>
              <UserBioStyled>{mockProfileData.biography}</UserBioStyled>
              <UserHashtagsStyled>
                <TagList
                  tags={HashTagsList}
                  onTagSelect={() => {}}
                  selectable={false}
                  selectedTags={mockProfileData.hashtags || []}
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
                <Stars rating={mockProfileData.rate}></Stars>
                <StarsSubmit
                  initialRating={userRating}
                  onRatingChange={handleRatingChange}
                />
              </StarsContainer>

              <StarSubmitButtonStyled>평점주기</StarSubmitButtonStyled>
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

const UserInfoContainer = styled.div``;

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: column;
  align-items: center;
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

const UserCardContainer = styled.div`
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
  display: flex;
  /* flex-direction: column; */
  gap: 30px;
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
  width: 100%;
  /* display: flex;
  flex-direction: column;
  gap: 20px; */
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  width: 100%;
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

const StarSubmitButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: var(--brand-main-1);
  background-color: var(--white);
  border: 1px solid var(--brand-main-1);
  &:hover {
    background-color: var(--brand-main-1);
    color: var(--white);
  }
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 400;
`;

const OnlineStatusStyled = styled.div<{ $userStatus: boolean }>`
  background-color: var(--online);
  width: 20px;
  height: 20px;
  border-radius: 20px;
  box-shadow: 0 0 0.5rem #fff, inset 0 0 0.5rem #fff, 0 0 1rem var(--online),
    inset 0 0 1rem var(--online), 0 0 4rem var(--online),
    inset 0 0 2rem var(--online);
`;

const StarInputStyled = styled.input`
  padding-left: 12px;
  background-color: var(--white);
  color: var(--black);
  border-radius: 20px;
  width: 80px;
  height: 1.1rem;
`;
