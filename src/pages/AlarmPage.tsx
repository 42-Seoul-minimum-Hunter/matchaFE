import Alarm, { IAlarmProps } from "@/components/Alarm";
import { AlarmType } from "@/types/tag.enum";
import styled from "styled-components";

const mockAlarmData: IAlarmProps[] = [
  {
    type: AlarmType.LIKED,
    lastTime: "2024-06-15T12:00:00",
    isViewed: false,
    username: "John",
  },
  {
    type: AlarmType.VISITED,
    lastTime: "2024-06-14T15:30:00",
    isViewed: true,
    username: "Emily",
  },
  {
    type: AlarmType.MESSAGED,
    lastTime: "2024-06-13T09:45:00",
    isViewed: false,
    username: "Michael",
  },
  {
    type: AlarmType.MATCHED,
    lastTime: "2024-06-13T09:45:00",
    isViewed: false,
    username: "Test",
  },
  {
    type: AlarmType.UNLIKED,
    lastTime: "2024-06-13T09:45:00",
    isViewed: true,
    username: "Code",
  },
  // Add more mock data as needed
];

const AlarmPage = () => {
  return (
    <Wrapper>
      {mockAlarmData.map((alarm, index) => (
        <Alarm key={index} {...alarm} />
      ))}
    </Wrapper>
  );
};

export default AlarmPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 50px;
`;
