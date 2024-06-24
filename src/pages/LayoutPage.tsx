import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CircleContainer from "@/components/BackgroundColor";
import Header from "@/components/Header";
import { getCookie } from "@/api/cookie";

const loginToken = false;
const token = getCookie("jwt");
const registerToken = false;

const COLORS = [
  "#27F122",
  "#EE26FF",
  "#BDFF00",
  "#7553FF",
  "#FF000F",
  "#00FFE0",
];

// const token = getCookie("jwt");

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //  jwt 토큰이 있으면 search, 없으면 로그인 페이지로 이동
  const isRootPath: boolean = location.pathname === "/";
  const isLoginPage: boolean = location.pathname === "/login";
  const isFindPasswordPage: boolean = location.pathname === "/findPW";
  const isTwoFactorPage: boolean = location.pathname === "/twoFactor";
  const isRegisterPage: boolean = location.pathname === "/signup";
  // const isMainPage: boolean = location.pathname === "/main";

  // useEffect(() => {
  //   if (!loginToken && !isMainPage) navigate("/main");
  //   else if (!loginToken && !isMainPage) navigate("/login");
  //   else {
  //     console.log("로그인 성공");
  //   }
  // }, []);

  // console.log("isLoginPage,isRegisterPage", isoginPage, isRegisterPage);
  // console.log("isLoginPage || isRegisterPage", isLoginPage || isRegisterPage);

  //

  return isLoginPage ||
    isRegisterPage ||
    isFindPasswordPage ||
    isTwoFactorPage ? (
    <Outlet />
  ) : (
    <Wrapper>
      {/* <CircleContainer circleCount={12} circleColors={COLORS} /> */}
      <Header />
      <MainStyled>
        <Outlet />
      </MainStyled>
    </Wrapper>
  );
};

export default Layout;

const BackgroundCircleStyled = styled.div`
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    /* width: 100%;
    height: 100%; */
    background-color: rgba(22, 15, 15, 0.5);
    z-index: -1;
    width: 100%;
    height: 100%;
  }
`;

const TestCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #27f122;
  filter: blur(50px);
`;

const Wrapper = styled.div`
  /* position: relative; */
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const MainStyled = styled.div`
  /* position: relative; */
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 30px;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
    overflow: auto;
    height: auto;
    margin: 40px auto;
  }
`;

const LoginWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
  /* /* height: 100%; */
  /* align-items: center; */
  /* height: auto; */
`;
