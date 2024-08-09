import Alarm, { IAlarmProps } from "@/components/Alarm";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SocketContext } from "./LayoutPage";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userAlarm, userAlarmContent } from "@/recoil/atoms";

// TODO -> 알람 오류 잇음

// interface IAlarmProps {
//   username: string;
//   alarmType: string;
//   createdAt: string;
// }

// const AlarmPage = () => {
//   const setHeaderAlarm = useSetRecoilState(userAlarm);
//   const [alarms, setAlarms] = useRecoilState(userAlarmContent);
//   const socket = useContext(SocketContext);

//   // useEffect(() => {
//   //   setHeaderAlarm(false);

//   //   if (socket) {
//   //     // 알람 요청 보내기
//   //     socket.emit("getAlarms");
//   //     setIsEmitted(true);

//   //     // 클린업 함수
//   //     return () => {
//   //       socket.off("getAlarms");
//   //     };
//   //   }
//   // }, [socket, setHeaderAlarm]);

//   useEffect(() => {
//     if (socket) {
//       // 서버로부터 알람 데이터 받기
//       socket.on("getAlarms", (data) => {
//         console.log("getAlarms test");
//         setAlarms(data);
//         console.log("getAlarms", data);
//       });

//       return () => {
//         socket.off("getAlarms");
//       };
//     }
//   }, [socket]);

//   return (
//     <Wrapper>
//       {alarms.length !== 0 ? (
//         alarms.map((alarm, index) => <Alarm key={index} {...alarm} />)
//       ) : (
//         <div>알람이 없습니다.</div>
//       )}
//     </Wrapper>
//   );
// };

const AlarmPage = () => {
  const setHeaderAlarm = useSetRecoilState(userAlarm);
  const [alarms, setAlarms] = useRecoilState<IAlarmProps[]>(userAlarmContent);
  const socket = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHeaderAlarm(false);

    const fetchAlarms = async () => {
      if (socket) {
        setIsLoading(true);

        return new Promise<void>((resolve) => {
          socket.emit("getAlarms");

          socket.on("getAlarms", (data: IAlarmProps[]) => {
            setAlarms(data);
            console.log("getAlarms", data);
            resolve();
          });
        });
      }
    };

    (async () => {
      await fetchAlarms();
      setIsLoading(false);
    })();

    return () => {
      if (socket) {
        socket.off("getAlarms");
      }
    };
  }, [socket, setAlarms, setHeaderAlarm]);

  if (isLoading) {
    return <Wrapper>알람을 불러오는 중...</Wrapper>;
  }

  return (
    <Wrapper>
      {alarms.length !== 0 ? (
        alarms.map((alarm, index) => <Alarm key={index} {...alarm} />)
      ) : (
        <div>알람이 없습니다.</div>
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
