// import styled from "styled-components";

// const CircleContainer = ({
//   circleCount,
//   circleColors,
// }: {
//   circleCount: number;
//   circleColors: string[];
// }) => {
//   // 화면을 격자로 나누기
//   const gridSize = Math.ceil(Math.sqrt(circleCount));

//   return (
//     <BackgroundCircleStyled>
//       {Array.from({ length: circleCount }, (_, index) => {
//         // 격자 내에서의 위치 계산
//         const row = Math.floor(index / gridSize);
//         const col = index % gridSize;

//         // 위치에 약간의 랜덤성 추가
//         const left = `${(col / gridSize) * 100 + (Math.random() - 0.5) * 20}%`;
//         const top = `${(row / gridSize) * 100 + (Math.random() - 0.5) * 20}%`;

//         // 랜덤 크기 (100px ~ 200px)
//         const size = Math.floor(Math.random() * 100 + 100);

//         return (
//           <TestCircle
//             key={index}
//             color={
//               circleColors[Math.floor(Math.random() * circleColors.length)]
//             }
//             style={{
//               left,
//               top,
//               width: `${size}px`,
//               height: `${size}px`,
//             }}
//           />
//         );
//       })}
//     </BackgroundCircleStyled>
//   );
// };

// export default CircleContainer;

// const BackgroundCircleStyled = styled.div`
//   /* position: absolute;
//   width: 100%;
//   height: 100%; */
//   &::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(22, 15, 15, 0.5);
//     z-index: -1;
//   }
// `;

// const TestCircle = styled.div`
//   position: absolute;
//   width: 150px;
//   height: 150px;

//   border-radius: 50%;
//   background-color: ${(props) => props.color};
//   filter: blur(90px);
// `;
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface Circle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
}

const CircleContainer = ({
  circleCount,
  circleColors,
}: {
  circleCount: number;
  circleColors: string[];
}) => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const newCircles: Circle[] = Array.from({ length: circleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 100 + 100,
      color: circleColors[Math.floor(Math.random() * circleColors.length)],
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setCircles(newCircles);
  }, [circleCount, circleColors]);

  const updateCircles = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setCircles((prevCircles) =>
      prevCircles.map((circle) => {
        let { x, y, vx, vy, size } = circle;
        x += vx;
        y += vy;

        if (x <= 0 || x + size >= width) vx = -vx;
        if (y <= 0 || y + size >= height) vy = -vy;

        return { ...circle, x, y, vx, vy };
      })
    );
    animationRef.current = requestAnimationFrame(updateCircles);
  };
  useEffect(() => {
    animationRef.current = requestAnimationFrame(updateCircles);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <BackgroundCircleStyled ref={containerRef}>
      {circles.map((circle, index) => (
        <TestCircle
          key={index}
          style={{
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            backgroundColor: circle.color,
          }}
        />
      ))}
    </BackgroundCircleStyled>
  );
};

export default CircleContainer;

const BackgroundCircleStyled = styled.div`
  /* position: relative; */
  /* width: 100%;
  height: 100%; */
  /* overflow: hidden; */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(22, 15, 15, 0.5); */
    z-index: -1;
  }
`;

const TestCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  /* mix-blend-mode: overlay; */
`;
