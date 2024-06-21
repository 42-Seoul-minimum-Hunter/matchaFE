import styled from "styled-components";

const CircleContainer = ({
  circleCount,
  circleColors,
}: {
  circleCount: number;
  circleColors: string[];
}) => {
  return (
    <BackgroundCircleStyled>
      {Array.from({ length: circleCount }, (_, index) => (
        <TestCircle
          key={index}
          color={circleColors[Math.floor(Math.random() * circleColors.length)]}
          style={{
            left: `${Math.floor(Math.random() * 100)}%`,
            top: `${Math.floor(Math.random() * 100)}%`,
          }}
          //   zIndex={index}
        />
      ))}
    </BackgroundCircleStyled>
  );
};

// const CircleContainer = ({
//   circleCount,
//   circleColors,
// }: {
//   circleCount: number;
//   circleColors: string[];
// }) => {
//   const gridSize = 5; // 격자 크기 설정
//   const circleSize = 100 / gridSize; // 각 TestCircle 요소의 크기 계산

//   return (
//     <BackgroundCircleStyled>
//       {Array.from({ length: circleCount }, (_, index) => (
//         <TestCircle
//           key={index}
//           color={circleColors[Math.floor(Math.random() * circleColors.length)]}
//           style={{
//             left: `${(index % gridSize) * circleSize}%`,
//             top: `${Math.floor(index / gridSize) * circleSize}%`,
//             // width: `${circleSize}px`,
//             // height: `${circleSize}px`,
//           }}
//         />
//       ))}
//     </BackgroundCircleStyled>
//   );
// };

export default CircleContainer;

const BackgroundCircleStyled = styled.div`
  /* position: absolute;
  width: 100%;
  height: 100%; */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(22, 15, 15, 0.5);
    z-index: -1;
  }
`;

const TestCircle = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;

  border-radius: 50%;
  background-color: ${(props) => props.color};
  filter: blur(50px);
`;
