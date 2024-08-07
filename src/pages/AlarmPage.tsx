import Alarm, { IAlarmProps } from "@/components/Alarm";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SocketContext } from "./LayoutPage";
import { useSetRecoilState } from "recoil";
import { userAlarm } from "@/recoil/atoms";

// TODO -> 알람 오류 잇음
const AlarmPage = () => {
  const [alarms, setAlarms] = useState<IAlarmProps[]>([]);
  const socket = useContext(SocketContext);
  const setHeaderAlarm = useSetRecoilState(userAlarm);

  useEffect(() => {
    setHeaderAlarm(false);
    if (socket) {
      // 알람 요청 보내기 ->
      socket.emit("getAlarms");

      // 알람 수신 이벤트 리스너
      const handleAlarms = (data: {
        username: string;
        alarmType: string;
        createdAt: string;
      }) => {
        console.log("Received alarm:", data);
      };

      socket.on(
        "getAlarms",
        (data: { username: string; alarmType: string; createdAt: string }) => {
          setAlarms(data);
          console.log("getAlarms", data);
        }
      );

      // 클린업 함수
      return () => {
        socket.off("getAlarms", handleAlarms);
      };
    }
  }, [socket]);

  return (
    <Wrapper>
      {alarms ? (
        <>
          {alarms.map((alarm, index) => (
            <Alarm key={index} {...alarm} />
          ))}
        </>
      ) : (
        <>
          <div>알람이 없습니다.</div>
        </>
      )}
    </Wrapper>
  );
};

export default AlarmPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 50px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
