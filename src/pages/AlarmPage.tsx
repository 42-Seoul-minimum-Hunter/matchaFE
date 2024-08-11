import Alarm, { IAlarmProps } from "@/components/Alarm";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SocketContext } from "./LayoutPage";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userAlarm, userAlarmContent } from "@/recoil/atoms";
import { axiosCheckJWT } from "@/api/axios.custom";
import useRouter from "@/hooks/useRouter";

const AlarmPage = () => {
  const { goToMain } = useRouter();
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

  const tryCheckJwt = () => {
    try {
      const res = axiosCheckJWT();
      console.log("res", res);
    } catch (error: any) {
      // 깨달은 것 -> 404오류는 catch로 안 잡힘
      console.log("jwt is not valid", error);
      alert("jwt is not valid");
    }
  };

  useEffect(() => {
    tryCheckJwt();
  }, []);

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
