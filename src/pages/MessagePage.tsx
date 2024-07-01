import styled from "styled-components";
import ChatList, { IChatRoomProps } from "@/components/ChatList";
import ChatRoom, { CharMessageDto } from "@/components/ChatRoom";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "./LayoutPage";
import { axiosChatroom } from "@/api/axios.custom";

// 이미지 경로 어떻게 받을지 생각해두기

const MessagePage = () => {
  const [selectUser, setSelectUser] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [chatRoom, setChatRoom] = useState<IChatRoomProps[]>([]);
  const [chatHistory, setChatHistory] = useState<CharMessageDto[]>([]);
  // const socket = useContext(SocketContext);
  const socket = useContext(SocketContext);

  const CheckChatList = async () => {
    try {
      // jwt있으면 userID 없어도 됨
      const res = await axiosChatroom(1);
      // console.log("chat list :", res);
      setChatRoom(res.data);
      console.log("chat list data:", res.data);
    } catch (error) {
      // TODO
      // 데이터 불러오는데 실패하거나 서버가 불안정한 경우
      // 걍 터지면 404 페이지로 보내버리기
      console.log(error);
    }
  };

  useEffect(() => {
    CheckChatList();
  }, []);

  useEffect(() => {
    clickChatRoom();
  }, [selectUser]);

  const clickChatRoom = () => {
    socket.emit("joinChatRoom", {
      username: selectUser,
    });
  };

  useEffect(() => {
    socket.on("sendHistories", (data) => {
      console.log("onlineStatus On", data);
      setChatHistory(data);
    });

    // return () => {
    //   socket.off("sendHistories");
    // };

    // clickChatRoom();
    // socket.emit("joinChatRoom", {
    //   username: selectUser,
    // });
  }, []);

  const onClickChatRoom = (index: number) => {
    setSelectedIndex(index);
    setSelectUser(chatRoom[index].username);
    clickChatRoom();
  };

  // const selectUserImg = mockChatListData[selectedIndex]?.profileImage;
  const selectUserImg =
    selectedIndex !== null ? chatRoom[selectedIndex]?.profileImage : null;

  return (
    <Wrapper>
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
        <ChatRoom chatHistory={chatHistory} selectUserImg={selectUserImg} />
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
