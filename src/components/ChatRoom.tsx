import styled from "styled-components";
import { ReactComponent as SendIcon } from "@/assets/icons/send-icon.svg";
import { useContext, useEffect } from "react";
import { SocketContext } from "@/pages/LayoutPage";

// TODO:
// 나에 대한 정보를 불러오는 곳이 없음
// 1. layout단에서 내 정보를 호충 -> recoil로 전역상태 관리 , 너무 비효율적
// 2. 내 이름이 필요한 경우가 이 페이지 밖에 없어서 내 정보에 대한 axios요청을 messagePage에서 보내는 것이 더 효율적일 수 있음
// 3. 제일 편한것 -> jwt를 쿠키에 저장할때 똑같이 username도 쿠키에 저장해서

export interface CharMessageDto {
  message: string;
  username: string;
  userId: number;
  time: string;
}

const ChatRoom = ({
  chatHistory,
  selectUserImg,
}: {
  chatHistory: CharMessageDto[];
  selectUserImg: string | null;
}) => {
  // console.log("selectUserImg", selectUserImg);
  // console.log("chatHistory", chatHistory);
  return (
    <Wrapper>
      {chatHistory.length === 0 ? (
        <div>채팅방을 선택해 주세요</div>
      ) : (
        <>
          {chatHistory.map((message, index) => (
            <MessageWrapper key={index}>
              {message.userId === 1 ? (
                <MyMessageWrapper>
                  <ContentWrapper>{message.message}</ContentWrapper>
                </MyMessageWrapper>
              ) : (
                <PartnerMessageWrapper>
                  <img src={selectUserImg} />
                  <ContentWrapper>{message.message}</ContentWrapper>
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
        </>
      )}
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
