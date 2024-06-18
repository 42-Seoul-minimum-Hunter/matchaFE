import styled from "styled-components";
import TestImage1 from "@/assets/mock/test1.png";
import TestImage2 from "@/assets/mock/test2.png";
import TestImage3 from "@/assets/mock/test3.png";
import ChatList, { IChatListProps } from "@/components/ChatList";
import ChatRoom, { CharMessageDto } from "@/components/ChatRoom";
import { useState } from "react";

// 이미지 경로 어떻게 받을지 생각해두기

const MessagePage = () => {
  const [selectUser, setSelectUser] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const onClickChatRoom = (index: number) => {
    setSelectedIndex(index);
    setSelectUser(mockChatListData[index].nickname);
  };
  const mockChatListData: IChatListProps[] = [
    {
      nickname: "JohnDoe",
      // img: "@/assets/mock/test1.png",
      img: TestImage1,
      lastTime: "3day",
      lastChat: "Hey, are we still on for tonight?",
      Unread: 2,
      handler: onClickChatRoom,
    },
    {
      nickname: "JaneSmith",
      // img: "../assets/mock/test2.png",
      img: TestImage2,
      lastTime: "1day",
      lastChat: " Sure, I can send you the documents by tomorrow.",
      Unread: 0,
      handler: onClickChatRoom,
    },
    {
      nickname: "MichaelBrown",
      // img: "@/assets/mock/test3.png",
      img: TestImage3,
      lastTime: "30 min",
      lastChat: "Don't forget the meeting at 3 PM.",
      Unread: 1,
      handler: onClickChatRoom,
    },
  ];
  const mockMessageData: CharMessageDto[] = [
    {
      content: "Hello, how are you?",
      userId: 1,
    },
    {
      content: "I'm doing great, thank you!",
      userId: 2,
    },
    {
      content: "What are your plans for today?",
      userId: 1,
    },
    {
      content:
        "I have a meeting in the morning and then I'm free in the afternoon.",
      userId: 2,
    },
    {
      content: "Sounds good. Let's catch up later.",
      userId: 1,
    },
    {
      content: "Sure, talk to you later!",
      userId: 2,
    },
  ];

  return (
    <Wrapper>
      <ChatLobbyWrapper>
        {mockChatListData.map((chatList, index) => (
          <ChatList
            key={index}
            {...chatList}
            isSelected={selectedIndex === index}
            index={index}
          />
        ))}
      </ChatLobbyWrapper>
      <ChatRoomWrapper>
        <ChatRoom mockMessageData={mockMessageData} selectUser={TestImage1} />
      </ChatRoomWrapper>
    </Wrapper>
  );
};

export default MessagePage;

const Wrapper = styled.div`
  display: flex;
  padding: 20px 30px;
  gap: 30px;
  height: 100%;
`;

const ChatRoomWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  box-shadow: 0 0 10px;
  width: 700px;
  height: 100%;
`;

const ChatLobbyWrapper = styled.div`
  width: 420px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  border-radius: 8px;
  padding: 20px 0;
  box-shadow: 0 0 10px;
  background-color: rgba(255, 255, 255, 0.5);
`;
