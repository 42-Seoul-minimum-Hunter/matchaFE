import styled from "styled-components";
import TestImage1 from "@/assets/mock/test1.png";
import TestImage2 from "@/assets/icons/gpt-icon.svg";
import TestImage3 from "@/assets/mock/test3.png";
import ChatList, { IChatRoomDto } from "@/components/chat/ChatList";
import ChatRoom, { IChatContentDto } from "@/components/chat/ChatRoom";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "./LayoutPage";
import { axiosChatroom } from "@/api/axios.custom";
// import Chatgpt from "@/components/Chatgpt";
import { mockChatContentDto, mockIChatProps } from "@/assets/mock/mock";

import { ReactComponent as ChatGptIcon } from "@/assets/icons/gpt-icon.svg";
import GptChat from "@/components/chat/GptChat";

// 이미지 경로 어떻게 받을지 생각해두기

const gptChatList: IChatRoomDto = {
  username: "Chatgpt",
  profileImage: TestImage2,
  lastContent: "Hello, I'm Chatgpt",
};

const ChatPage = () => {
  const [selectUser, setSelectUser] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [chatRoom, setChatRoom] = useState<IChatRoomDto[]>([gptChatList]);
  const [chatHistory, setChatHistory] = useState<IChatContentDto[]>([]);
  // const socket = useContext(SocketContext);
  const socket = useContext(SocketContext);

  // const CheckChatList = async () => {
  //   try {
  //     // jwt있으면 userID 없어도 됨
  //     const res = await axiosChatroom(1);
  //     console.log("chat list :", res);
  //     setChatRoom(res.data);
  //     console.log("chat list data:", res.data);
  //   } catch (error) {
  //     // TODO
  //     // 데이터 불러오는데 실패하거나 서버가 불안정한 경우
  //     // 걍 터지면 404 페이지로 보내버리기
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   CheckChatList();
  // }, []);

  // useEffect(() => {
  //   clickChatRoom();
  // }, [selectUser]);

  // const clickChatRoom = () => {
  //   socket.emit("joinChatRoom", {
  //     username: selectUser,
  //   });
  // };

  // useEffect(() => {
  //   socket.on("sendHistories", (data) => {
  //     console.log("onlineStatus On", data);
  //     setChatHistory(data);
  //   });

  // return () => {
  //   socket.off("sendHistories");
  // };

  // clickChatRoom();
  // socket.emit("joinChatRoom", {
  //   username: selectUser,
  // });
  // }, []);

  const onClickChatRoom = (index: number) => {
    setSelectedIndex(index);
    // TODO : 선택한 채팅방의 정보를 서버에 보내서 채팅방의 메시지를 받아옴
    // 이게 맞나
    setSelectUser(chatRoom[index].username);
    setChatHistory(mockChatContentDto);
    console.log(chatRoom[index]);

    // clickChatRoom();
  };

  const updateChatRoom = (newChatRooms: IChatRoomDto[]) => {
    setChatRoom((prevChatRoom) => {
      // 기존의 gptChatList를 제외한 새로운 채팅방 목록 생성
      const filteredNewChatRooms = newChatRooms.filter(
        (room) => room.username !== gptChatList.username
      );

      // gptChatList를 첫 번째로, 그 뒤에 새로운 채팅방 목록 추가
      return [gptChatList, ...filteredNewChatRooms];
    });
  };

  useEffect(() => {
    // TODO : 처음 message페이지 들어왔을때 chatroom 정보 받아오기
    // setChatRoom(mockIChatProps);
    updateChatRoom(mockIChatProps);
  }, []);
  const selectUserImg = mockIChatProps[selectedIndex]?.profileImage;
  // const selectUserImg =
  //   selectedIndex !== null ? chatRoom[selectedIndex]?.profileImage : null;

  // // const selectUserImg = mockChatListData[selectedIndex]?.profileImage;
  // const selectUserImg =
  //   selectedIndex !== null ? chatRoom[selectedIndex]?.profileImage : null;

  return (
    <Container>
      <ChatLobbyWrapper>
        {chatRoom &&
          chatRoom.map((chatList, index) => (
            <ChatList
              key={index}
              {...chatList}
              isSelected={selectedIndex === index}
              index={index}
              handler={onClickChatRoom}
            />
          ))}
      </ChatLobbyWrapper>
      <ChatRoomWrapper>
        {selectUser === "Chatgpt" ? (
          <>
            <GptChat />
          </>
        ) : (
          <ChatRoom
            chatHistory={chatHistory}
            selectUserImg={selectUserImg}
            username={selectUser}
          />
        )}

        {/* <Chatgpt /> */}
      </ChatRoomWrapper>
    </Container>
  );
};

export default ChatPage;

const Container = styled.div`
  display: flex;
  padding: 20px 30px;
  gap: 24px;
  height: 100%;
  width: 1200px;
`;

const ChatRoomWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;

  border: 1px solid var(--black);
  max-width: 792px;
  width: 100%;

  height: 100%;
`;

const ChatLobbyWrapper = styled.div`
  max-width: 384px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
  align-items: center;
  border-radius: 4px;
  /* padding: 20px 0; */
  padding: 10px 10px;
  border: 1px solid var(--black);
`;
