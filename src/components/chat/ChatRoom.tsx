import styled from "styled-components";
import Loading from "./Loading";
import { useState } from "react";

// TODO:
// 나에 대한 정보를 불러오는 곳이 없음
// 1. layout단에서 내 정보를 호충 -> recoil로 전역상태 관리 , 너무 비효율적
// 2. 내 이름이 필요한 경우가 이 페이지 밖에 없어서 내 정보에 대한 axios요청을 messagePage에서 보내는 것이 더 효율적일 수 있음
// 3. 제일 편한것 -> jwt를 쿠키에 저장할때 똑같이 username도 쿠키에 저장해서

// TODO
// 내가 받는 정보는 저 형식이고 BE에 넘기는 데이터는 message와 username을 넘김
export interface IChatContentDto {
  message: string;
  username: string;
  time: string;
}
// userId: number;

const ChatRoom = ({
  chatHistory,
  selectUserImg,
  username,
}: {
  chatHistory: IChatContentDto[];
  selectUserImg: string;
  username: string;
}) => {
  // TODO : 웹소켓 대기하는 곳에다가 두기
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Container>
      {chatHistory.length === 0 ? (
        <div>채팅방을 선택해 주세요</div>
      ) : (
        <>
          <MessageContainer>
            {chatHistory.map((message, index) =>
              message.username === username ? (
                <MyMessageWrapper key={index}>
                  <ContentStyled>{message.message}</ContentStyled>
                </MyMessageWrapper>
              ) : (
                <PartnerMessageWrapper key={index}>
                  <img src={selectUserImg} />
                  <ContentStyled>{message.message}</ContentStyled>
                </PartnerMessageWrapper>
              )
            )}
            {isLoading && <Loading />}
          </MessageContainer>
          <ChatInputWrapper>
            <ChatInput
              placeholder="write your message ..."
              disabled={isLoading}
            />
            <SendButton type="submit" disabled={isLoading}>
              Send
            </SendButton>
          </ChatInputWrapper>
        </>
      )}
    </Container>
  );
};

export default ChatRoom;

const Container = styled.div`
  /* max-width: px; */
  /* padding: 20px 20px; */
  padding-left: 35px;
  padding-right: 40px;
  padding-top: 40px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  height: 100%;
  /* overflow-y: auto; */
  position: relative;
  overflow-y: hidden;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: var(--brand-main-1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* flex-grow: 1; */
  height: 90%;

  overflow-y: auto; // 세로 스크롤 추가
  /* padding-bottom: 20px; // ChatInputWrapper 위 20px 여백 */

  &::-webkit-scrollbar {
    display: none;
  }
  /* IE, Edge, Firefox의 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const MyMessageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  & > div {
    border-radius: 10px 0 10px 10px;
    background-color: var(--brand-main-1);
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
    background-color: #eeeeee;
    color: var(--black);
    border-radius: 10px 10px 10px 0px;
  }
`;

const ContentStyled = styled.div`
  /* max-width: 50%; */
  max-width: 347px;
  /* width: 100%; */
  /* border-radius: 10px 0 10px 10px; */
  background-color: var(--vermilion);
  padding: 18px 22px;
  font-size: 0.8rem;
  font-weight: 300;
  line-height: 1.4;
  letter-spacing: -0.025em;

  white-space: normal;
  /* text-overflow: ellipsis;
  word-break: break-all; */
`;

const ChatInput = styled.textarea`
  background-color: var(--brand-sub-2);
  color: var(--black);
  padding: 10px;
  outline: none;
  width: 100%;
  height: 20px; // 원하는 고정 높이 설정
  /* min-height: 40px; // 최소 높이 설정 */
  max-height: 40px; // 최대 높이 설정 (스크롤 생성을 위해)
  border: 1px solid var(--brand-main-1);
  border-radius: 4px;
  resize: none; // 사용자가 크기를 조절하지 못하게 함
  overflow-y: auto; // 세로 스크롤 허용
  line-height: 20px; // 줄 간격 설정 (선택사항)
`;

const ChatInputWrapper = styled.form`
  width: 100%;
  border-radius: 4px;
  position: relative;
  bottom: 20px;
  display: flex;
  /* flex-direction: column; */
`;

const IconContainer = styled.div`
  position: absolute;
  top: 4px;
  right: 10px;
`;
