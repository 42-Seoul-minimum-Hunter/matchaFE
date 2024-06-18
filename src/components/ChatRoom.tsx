import styled from "styled-components";
import { ReactComponent as SendIcon } from "@/assets/icons/send-icon.svg";

export interface CharMessageDto {
  content: string;
  userId: number;
}

// export interface ChatRoomDto {
//   contetn: string[];
//   friendChat: string[];
// }

const ChatRoom = ({
  mockMessageData,
  selectUser,
}: {
  mockMessageData: CharMessageDto[];
  selectUser: string;
}) => {
  // console.log("selectChat", selectChat);
  return (
    <Wrapper>
      {mockMessageData.map((message, index) => (
        <MessageWrapper key={index}>
          {message.userId === 1 ? (
            <MyMessageWrapper>
              <ContentWrapper>{message.content}</ContentWrapper>
            </MyMessageWrapper>
          ) : (
            <PartnerMessageWrapper>
              <img src={selectUser} />
              <ContentWrapper>{message.content}</ContentWrapper>
            </PartnerMessageWrapper>
          )}
          {/* <Message isUser={message.userId === 1}>{message.content}</Message> */}
        </MessageWrapper>
      ))}
      <ChatInputWrapper>
        <ChatInput placeholder="write your message" />
        <IconContainer>
          <SendIcon />
        </IconContainer>
      </ChatInputWrapper>
    </Wrapper>
  );
};

export default ChatRoom;

const Wrapper = styled.div`
  /* max-width: px; */
  padding: 20px 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow-y: auto;
  position: relative;
`;

const MessageWrapper = styled.div`
  width: 100%;

  /* & > div {
    max-width: 50%;
  } */
`;

const MyMessageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  & > div {
    border-radius: 10px 0 10px 10px;
    background-color: var(--blue);
    color: var(--white);
  }
`;

const PartnerMessageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  & > img {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 100px;
  }

  & > div {
    background-color: var(--light-gray);
    color: var(--black);
    border-radius: 10px 10px 10px 0px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 50%;
  /* border-radius: 10px 0 10px 10px; */
  background-color: var(--vermilion);
  padding: 20px 10px;
  font-size: 1em;
  white-space: normal;
  /* text-overflow: ellipsis;
  word-break: break-all; */
`;

const ChatInput = styled.input`
  background-color: var(--light-blue);
  color: var(--black);
  padding: 10px;
  width: 90%;
`;

const ChatInputWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 20px;
  display: flex;
  /* flex-direction: column; */
`;

const IconContainer = styled.div`
  position: absolute;
`;
