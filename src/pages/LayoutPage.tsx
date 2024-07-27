import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import CircleContainer from "@/components/BackgroundColor";
import Header from "@/components/Header";
import { getCookie } from "@/api/cookie";
import { io, Socket } from "socket.io-client";
import Test from "@/components/Test";

const token = getCookie("jwt");

// interface SocketContextType {
//   socket: Socket<any, any>;
// }
const socket = io("http://localhost:3001", {
  auth: {
    authorization: token,
  },
});

export const SocketContext = createContext<null>(null);

// const socket = io("http://localhost:3001", {
//   auth: {
//     //  jwt넣기
//     userId: 1,
//     // token: "abc123",
//   },
// });

// export const SocketContext = createContext(null);

const COLORS = [
  "#27F122",
  "#EE26FF",
  "#BDFF00",
  "#7553FF",
  "#FF000F",
  "#00FFE0",
];

const Layout = () => {
  const location = useLocation();
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  //  jwt 토큰이 있으면 search, 없으면 로그인 페이지로 이동
  const isRootPath: boolean = location.pathname === "/";
  const isLoginPage: boolean = location.pathname === "/login";
  const isFindPasswordPage: boolean = location.pathname === "/findPW";
  const isTwoFactorPage: boolean = location.pathname === "/twoFactor";
  const isRegisterPage: boolean = location.pathname === "/register";
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

  return isLoginPage ||
    isRegisterPage ||
    isFindPasswordPage ||
    isTwoFactorPage ? (
    <>
      {/* <Test /> */}
      {/* <Content> */}
      <Outlet />
      {/* </Content> */}
    </>
  ) : (
    <SocketContext.Provider value={socket}>
      <Wrapper>
        {/* <CircleContainer circleCount={12} circleColors={COLORS} /> */}
        <Test />
        <Content>
          <Header />
          <MainStyled>
            <Outlet />
          </MainStyled>
        </Content>
      </Wrapper>
    </SocketContext.Provider>
  );
};

export default Layout;

const Content = styled.div`
  width: 100%;
  /* height: 100%; */
  position: relative;
  z-index: 1; // Test 컴포넌트보다 위에 위치하도록 설정
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const MainStyled = styled.div`
  /* position: relative; */
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 30px;
  height: 80%;
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
