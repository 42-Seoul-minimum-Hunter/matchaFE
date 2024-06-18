import { AlarmLableMap } from "@/types/maps";
import { AlarmType } from "@/types/tag.enum";
import styled from "styled-components";

export interface IAlarmProps {
  type: AlarmType;
  lastTime: string;
  isViewed: boolean;
  nickName: string;
}

const Alarm = ({ type, lastTime, isViewed, nickName }: IAlarmProps) => {
  const content = AlarmLableMap[type];
  return (
    <Wrapper isViewed={isViewed}>
      <AlarmContentStyled>
        {content} {nickName}
      </AlarmContentStyled>
      <AlarmWrapper>{lastTime}</AlarmWrapper>
    </Wrapper>
  );
};

export default Alarm;

const Wrapper = styled.div<{ isViewed: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding-left: 40px;
  border-radius: 10px;
  height: 100px;
  width: 100%;
  gap: 15px;
  box-shadow: 0 0 5px;
  background-color: ${(props) =>
    props.isViewed ? "var(--msg-view)" : "var(--white)"};
`;

const AlarmContentStyled = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

const AlarmWrapper = styled.div`
  color: #696969;
`;
