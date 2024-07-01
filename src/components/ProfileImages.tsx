import { ReactComponent as BanIcon } from "@/assets/icons/ban-icon.svg";
import { ReactComponent as HeartIcon } from "@/assets/icons/heart-icon.svg";
import { ReactComponent as MessageIcon } from "@/assets/icons/sendMessage-icon.svg";
import { useState } from "react";
import styled from "styled-components";

const ProfileImages = ({ images }: { images: string[] }) => {
  const [selectImg, setSelectImg] = useState<string>(images[0]);
  const onClickImage = (index: number) => {
    setSelectImg(images[index]);
  };

  return (
    <>
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
    </>
  );
};
export default ProfileImages;

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
