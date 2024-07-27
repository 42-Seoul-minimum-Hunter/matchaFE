import { AlarmLableMap } from "@/types/maps";
import { AlarmType } from "@/types/tag.enum";
import styled from "styled-components";

export interface IAlarmProps {
  type: AlarmType;
  lastTime: string;
  isViewed: boolean;
  username: string;
}

const Alarm = ({ type, lastTime, isViewed, username }: IAlarmProps) => {
  const content = AlarmLableMap[type];
  return (
    <Wrapper $isViewed={isViewed}>
      <RowStyled>
        <AlarmContentStyled>
          {content} {username}
        </AlarmContentStyled>
        <AlarmWrapper>{lastTime}</AlarmWrapper>
      </RowStyled>
      {isViewed && <ViewAlarmStyled></ViewAlarmStyled>}
    </Wrapper>
  );
};

export default Alarm;

const RowStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
`;

const ViewAlarmStyled = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: #f24747;
  backdrop-filter: blur(4px);
`;

const Wrapper = styled.div<{ $isViewed: boolean }>`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  padding-left: 40px;
  border-radius: 10px;
  height: 100px;
  width: 100%;
  gap: 15px;
  box-shadow: 0 0 5px;
  /* background-color: ${(props) =>
    props.$isViewed ? "var(--msg-view)" : "var(--white)"}; */
`;

const AlarmContentStyled = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

const AlarmWrapper = styled.div`
  color: #696969;
`;
