import React, { useState, useEffect } from "react";
import styled from "styled-components";

const UseCounter = () => {
  const [timeRemaining, setTimeRemaining] = useState(180); // 3분 = 180초
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          setIsExpired(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Wrapper>
      {isExpired ? (
        <p>유효시간이 만료되었습니다.</p>
      ) : (
        <p>유효시간: {formatTime(timeRemaining)}</p>
      )}
    </Wrapper>
  );
};

export default UseCounter;

const Wrapper = styled.div`
  margin-top: 20px;
`;
