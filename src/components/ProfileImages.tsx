import { axiosUserBlock } from "@/api/axios.custom";
import { ReactComponent as BanIcon } from "@/assets/icons/ban-icon.svg";
import { ReactComponent as HeartIcon } from "@/assets/icons/heart-icon.svg";
import { ReactComponent as MessageIcon } from "@/assets/icons/sendMessage-icon.svg";
import { SocketContext } from "@/pages/LayoutPage";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProfileImages = ({
  images,
  userName,
}: {
  images: string[];
  userName: string;
}) => {
  // TODO 백한테서 like정보 받아서 색칠 ㄱㄱ
  // match boolean형식으로 들어옴 -> true면 색칠, false면 색칠x
  const socket = useContext(SocketContext);
  const [selectImg, setSelectImg] = useState<string>(images[0]);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isBan, setIsBan] = useState<boolean>(false);
  const navigate = useNavigate();
  const onClickImage = (index: number) => {
    setSelectImg(images[index]);
  };

  const onClickBanButton = async () => {
    try {
      const res = await axiosUserBlock(userName);
      console.log("block ", res);
      navigate("/search");
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  // socket.on("connect", () => {});
  // me 일때는 userName 으로 안감
  // console.log("userName", userName);
  const onClickHeartButton = () => {
    console.log("likeUser click", userName);
    setIsLike(!isLike);
    socket.emit("likeUser", {
      username: userName,
    });
  };

  // 여기서도 matched확인
  useEffect(() => {
    socket.on("likeUser", (data) => {
      console.log("matched", data);
    });
  }, []);

  return (
    <>
      <PohtoWrapper>
        <MainPohtoWrapper>
          <img src={selectImg} />
          <UserInteractionWrapper>
            <BanIconStyled onClick={() => onClickBanButton()}>
              <BanIcon />
            </BanIconStyled>
            <MessageIconStyled>
              <MessageIcon />
              <p>Message</p>
            </MessageIconStyled>
            <HeartIconStyled
              onClick={() => onClickHeartButton()}
              $isLike={isLike}
            >
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

const HeartIconStyled = styled.div<{ $isLike: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  /* background-color: var(--light-vermilion); */
  border-radius: 50%;
  border: 2px solid var(--light-vermilion);
  svg {
    fill: ${(props) =>
      props.$isLike ? "var(--light-vermilion)" : "var(--white)"};
  }
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
