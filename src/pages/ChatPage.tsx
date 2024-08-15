import styled from "styled-components";
import TestImage1 from "@/assets/mock/test1.png";
import TestImage2 from "@/assets/icons/gpt-icon.svg";
import ChatList, { IChatRoomDto } from "@/components/chat/ChatList";
import ChatRoom, { IChatContentDto } from "@/components/chat/ChatRoom";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "./LayoutPage";
import GptChat from "@/components/chat/GptChat";

// 이미지 경로 어떻게 받을지 생각해두기

const gptChatList: IChatRoomDto = {
  username: "Chatgpt",
  profileImage: TestImage2,
  lastContent: "Hello, I'm Chatgpt",
};

// const ChatPage: FC = () => { ... }

const ChatPage = () => {
  const [selectUser, setSelectUser] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [chatRoom, setChatRoom] = useState<IChatRoomDto[]>([gptChatList]);
  const [chatHistory, setChatHistory] = useState<IChatContentDto[]>([]);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (selectUser === "Chatgpt") {
      console.log("selectUser ", selectUser);
      // setSelectedIndex(0);
      // setSelectUser("Chatgpt");
      // setShowChatRoom(true);
      // setSelectedIndex(0);
      return;
    }

    if (socket) {
      const fetchChatList = () => {
        return new Promise<void>((resolve) => {
          // socket.emit("leaveRoom", { username: selectUser });
          socket.emit("getChatList");
          socket.on("getChatList", (newChatRooms: IChatRoomDto[]) => {
            console.log("newchatrooms", newChatRooms);
            updateChatRoom(newChatRooms);
            resolve();
          });
        });
      };

      (async () => {
        setIsLoading(true);
        await fetchChatList();
        setIsLoading(false);
      })();

      // 내가 메세지 보내는 경우 -> sendMessage , username, message
      socket.on("sendMessage", (newMessage: IChatContentDto) => {
        console.log("BE Message on", newMessage);
        setChatHistory((prev) => [...prev, newMessage]);
      });

      return () => {
        socket.off("getChatList");
        socket.off("sendMessage");
      };
    }
  }, [socket]);

  const onClickChatRoom = async (index: number) => {
    setSelectedIndex(index);
    console.log("chatroom index", index);
    const selectedUser = chatRoom[index].username;
    setSelectUser(selectedUser);
    setShowChatRoom(true);
    if (selectedUser === "Chatgpt") {
      console.log("selectUser ", selectedUser);
      console.log("Chatgpt index", index);
      return;
    }
    console.log("selectUser ", selectedUser);

    if (socket) {
      setIsLoading(true);
      socket.emit("joinChatRoom", selectedUser);
      // socket.emit("getMessages", { username: selectedUser });

      await new Promise<void>((resolve) => {
        socket.once("getMessages", (messages: IChatContentDto[]) => {
          console.log("getMessages", messages);
          setChatHistory(messages);
          setIsLoading(false);
          resolve();
        });
      });
    }
  };

  const sendMessage = (message: string) => {
    if (socket && selectUser) {
      const newMessage: IChatContentDto = {
        message,
        username: selectUser,
        time: new Date(),
      };
      socket.emit("sendMessage", newMessage);
    }
  };

  const updateChatRoom = (newChatRooms: IChatRoomDto[]) => {
    setChatRoom((prevChatRoom) => {
      const filteredNewChatRooms = newChatRooms.filter(
        (room) => room.username !== gptChatList.username
      );
      return [gptChatList, ...filteredNewChatRooms];
    });
  };

  const handleBackButton = () => {
    setShowChatRoom(false);
    if (socket) {
      socket.emit("leaveRoom", { username: selectUser });
    }
  };

  if (isLoading) {
    return <Container>Loading chat rooms...</Container>;
  }

  return (
    <Container>
      <ChatLobbyWrapper $show={!showChatRoom}>
        {chatRoom.map((chatList, index) => (
          <ChatList
            key={index}
            {...chatList}
            isSelected={selectedIndex === index}
            index={index}
            handler={onClickChatRoom}
          />
        ))}
      </ChatLobbyWrapper>
      <ChatRoomWrapper $show={showChatRoom}>
        <BackButton onClick={handleBackButton}>Back</BackButton>
        {selectUser === "Chatgpt" ? (
          <GptChat />
        ) : (
          <ChatRoom
            chatHistory={chatHistory}
            selectUserImg={chatRoom[selectedIndex]?.profileImage}
            username={selectUser}
            sendMessage={sendMessage}
          />
        )}
      </ChatRoomWrapper>
    </Container>
  );
};

export default ChatPage;

const Container = styled.div`
  display: flex;
  padding: 20px 30px;
  gap: 24px;
  height: calc(100% - 120px);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const ChatLobbyWrapper = styled.div<{ $show: boolean }>`
  max-width: 384px;
  width: 100%;
  /* height: 100%; */
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  padding: 10px 10px;
  border: 1px solid var(--black);

  @media (max-width: 768px) {
    max-width: 100%;
    display: ${(props) => (props.$show ? "flex" : "none")};
  }
`;

const ChatRoomWrapper = styled.div<{ $show: boolean }>`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  border: 1px solid var(--black);
  max-width: 792px;
  width: 100%;
  height: 100%;

  /* overflow-y: scroll; */
  /* 오버레이 스크롤바 사용 */
  overflow-y: overlay;
  scrollbar-width: thin;
  scrollbar-color: var(--brand-main-1) var(--brand-sub-2);

  @media (max-width: 768px) {
    max-width: 100%;
    display: ${(props) => (props.$show ? "block" : "none")};
  }
`;

const BackButton = styled.button`
  display: none;
  padding: 10px;
  margin: 10px;
  /* background-color: #f0f0f0; */
  background-color: var(--brand-main-1);
  color: var(--white);
  font-size: 1rem;
  letter-spacing: -0.025em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 2;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
  }
`;
