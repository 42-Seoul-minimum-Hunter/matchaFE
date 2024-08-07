import { SocketContext } from "@/pages/LayoutPage";
import { userAlarm } from "@/recoil/atoms";
import { AlarmLableMap } from "@/types/maps";
import { AlarmType } from "@/types/tag.enum";
import { useContext, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

export interface IAlarmProps {
  alarmType: AlarmType;
  createdAt: string;
  isViewed: boolean;
  username: string;
}

const Alarm = ({ alarmType, createdAt, isViewed, username }: IAlarmProps) => {
  const content = AlarmLableMap[alarmType];

  console.log("test");
  return (
    <Container $isViewed={isViewed}>
      <AlarmContentStyled>
        {content} {username}
      </AlarmContentStyled>
      <AlarmWrapper>{createdAt}</AlarmWrapper>
    </Container>
  );
};

export default Alarm;

const Container = styled.div<{ $isViewed: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding: 15px 40px;
  border-radius: 10px;
  /* height: 100px; */
  width: 100%;
  max-width: 792px;
  gap: 14px;
  border: 1px solid var(--black);

  background-color: ${(props) =>
    props.$isViewed ? "var(--msg-view)" : "var(--white)"};
`;

const AlarmContentStyled = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.4;
`;

const AlarmWrapper = styled.div`
  font-size: 0.8rem;
  font-weight: 400;

  color: #696969;
`;
