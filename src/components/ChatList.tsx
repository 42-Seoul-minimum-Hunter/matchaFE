import { formatTimeRemaining } from "@/utils/dataUtils";
import styled from "styled-components";

interface Props {
  imageSource: string;
}

const Image: React.FC<Props> = ({ imageSource }) => {
  return <img src={imageSource} />;
};

export interface IChatRoomProps {
  username: string;
  profileImage: string;
  createdAt: string; // date형식
  content: string;
}

interface ChatListProps extends IChatRoomProps {
  isSelected: boolean;
  index: number;
  handler: (index: number) => void;
}

const ChatList = ({
  username,
  profileImage,
  createdAt,
  content,
  isSelected,
  index,
  handler,
}: ChatListProps) => {
  // console.log("created at", formatTimeRemaining(createdAt));
  return (
    <Wrapper $isSelected={isSelected} onClick={() => handler(index)}>
      <ImageWrapper>
        {/* <Image imageSource={img} /> */}
        <img src={profileImage} />
      </ImageWrapper>
      <ColumnWrapper>
        <RowWrapper>
          <NicknameStyled>{username}</NicknameStyled>
          <LastTimeStyled>{formatTimeRemaining(createdAt)}</LastTimeStyled>
        </RowWrapper>
        <RowWrapper>
          <LastChatStyled>{content}</LastChatStyled>
        </RowWrapper>
      </ColumnWrapper>
    </Wrapper>
  );
};

export default ChatList;

const Wrapper = styled.div<{ $isSelected: boolean }>`
  padding: 10px 10px;
  display: flex;
  align-items: center;
  width: 400px;

  /* background-color: ${(props) =>
    props.$isSelected ? "var(--light-gray)" : "white"}; */
  box-shadow: ${(props) =>
    props.$isSelected ? "0 0 10px var(--light-gray)" : "none"};
  /* cursor: pointer; */
`;

const ImageWrapper = styled.div`
  & > img {
    width: 50px;
    height: 50px;
    border-radius: 100px;
  }
  margin-right: 10px;
`;

const NicknameStyled = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
`;

const LastChatStyled = styled.div`
  /* width: 80%; */
  width: 250px;
  color: var(--light-gray);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const UnreadStyled = styled.div``;

const LastTimeStyled = styled.div`
  color: var(--light-gray);
`;

const RowWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
