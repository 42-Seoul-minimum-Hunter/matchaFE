import React, { useMemo } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import BackgroundImage2 from "@/assets/images/back_2.png";
import BackgroundImage3 from "@/assets/images/back_3.png";
import BackgroundImage4 from "@/assets/images/back_4.png";
import BackgroundImage5 from "@/assets/images/back_5.png";
import BackgroundImage6 from "@/assets/images/back_6.png";
import BackgroundImage7 from "@/assets/images/back_7.png";
import { PathnameType } from "@/types/tag.enum";

const CinemaEffect = () => {
  let getUrl = window.location.pathname;

  const backgroundImageMap = useMemo(
    () => ({
      [PathnameType.LOGIN]: BackgroundImage2,
      [PathnameType.PROFILE]: BackgroundImage3,
      [PathnameType.SEARCH]: BackgroundImage4,
      [PathnameType.MESSAGE]: BackgroundImage5,
      [PathnameType.ALARM]: BackgroundImage6,
      [PathnameType.REGISTER]: BackgroundImage7,
    }),
    []
  );

  const getBackgroundImage = () => {
    // const pathname = getUrl.split("/")[1]; // URL의 첫 번째 세그먼트만 사용
    return (
      backgroundImageMap[getUrl as keyof typeof backgroundImageMap] ||
      BackgroundImage2
    );
  };
  return (
    <TestWrapper>
      <GlobalStyle />
      <CinemaWrapper>
        <Background $backgroundImage={getBackgroundImage()} />
        <OuterScratch />
        <InnerScratch />
        <Grain />
      </CinemaWrapper>
    </TestWrapper>
  );
};

const GlobalStyle = createGlobalStyle`
  @import url(https://fonts.googleapis.com/css?family=Roboto:100);

  /* html, body {
    height: 100%;
    margin: 0;
    overflow: hidden;
  } */
`;

const grain = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-1%, -1%); }
  20% { transform: translate(1%, 1%); }
  30% { transform: translate(-2%, -2%); }
  40% { transform: translate(3%, 3%); }
  50% { transform: translate(-3%, -3%); }
  60% { transform: translate(4%, 4%); }
  70% { transform: translate(-4%, -4%); }
  80% { transform: translate(2%, 2%); }
  90% { transform: translate(-3%, -3%); }
`;

const scratch = keyframes`
  0%, 100% { transform: translateX(0); opacity: 0.075; }
  10% { transform: translateX(-1%); }
  20% { transform: translateX(1%); }
  30% { transform: translateX(-2%); opacity: 0.09; }
  40% { transform: translateX(3%); }
  50% { transform: translateX(-3%); opacity: 0.05; }
  60% { transform: translateX(8%); }
  70% { transform: translateX(-3%); }
  80% { transform: translateX(10%); opacity: 0.02; }
  90% { transform: translateX(-2%); }
`;

const innerScratch = keyframes`
  0% { transform: translateX(0); opacity: 0.08; }
  10% { transform: translateX(-1%); }
  20% { transform: translateX(1%); }
  30% { transform: translateX(-2%); }
  40% { transform: translateX(3%); }
  50% { transform: translateX(-3%); opacity: 0.06; }
  60% { transform: translateX(8%); }
  70% { transform: translateX(-3%); }
  80% { transform: translateX(10%); opacity: 0.03; }
  90% { transform: translateX(20%); }
  100% { transform: translateX(30%); }
`;

const draw = keyframes`
  0% { width: 0%; }
  100% { width: 110%; }
`;

const drawBottom = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const fade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Background = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  height: 100vh;
  /* background-image: url("https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcSsKj9_p9v7sgNxntllex9TJd8RAmRV5ZWlMGM1IWxDM8bBrfQ8xgYy_N6_eACDwTKL"); */
  /* background-image: url(${BackgroundImage5}); */
  background-image: url(${(props) => props.$backgroundImage});
  background-position: center center;
  /* overflow-y: auto; */
  background-size: cover;
`;

const PosterImage = styled.div`
  width: auto;
  height: 100vh;
  background-image: url(${BackgroundImage7});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  /* box-shadow: 0 0 200px 100px rgba(0, 0, 0, 0.7); // 포스터 주변에 그라데이션 효과 */
  background-color: rgba(0, 0, 0, 0.7); //
`;

const ScratchBase = styled.div`
  height: inherit;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:after {
    content: "";
    width: 120%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 100px;
    opacity: 0.08;
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/662025/scratch.png")
      repeat center center;
    animation: ${scratch} 0.9s steps(1) infinite;
  }
`;

const OuterScratch = styled(ScratchBase)``;

const InnerScratch = styled(ScratchBase)`
  &:after {
    left: 30%;
    animation: ${innerScratch} 4s infinite;
  }
`;

const Grain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:after {
    content: "";
    width: 110%;
    height: 110%;
    position: absolute;
    top: -5%;
    left: -5%;
    opacity: 0.11;
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/662025/grain.jpg")
      repeat center center;
    animation: ${grain} 1s steps(1) infinite;
  }
`;

const Title = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-size: 3em;
  text-align: center;
  color: #fff;
  animation: ${fade} 3s;

  span {
    display: inline-block;
    position: relative;
    padding: 0.5em 1em;

    &:before {
      display: block;
      content: "";
      width: 110%;
      margin-left: -5%;
      margin-bottom: 5%;
      border-top: 1px solid #fff;
      animation: ${draw} 2.5s;
    }

    &:after {
      display: block;
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      border-bottom: 1px solid #fff;
      animation: ${drawBottom} 2.5s;
    }
  }
`;

const CinemaWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const TestWrapper = styled.div`
  &:before {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* z-index: 0; */
    z-index: -1; // 다른 요소들보다 뒤에 위치하도록 설정
    pointer-events: none; // 마우스 이벤트를 통과시킴
    overflow: hidden;
  }
`;
export default CinemaEffect;
