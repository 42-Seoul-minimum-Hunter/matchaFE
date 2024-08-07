import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Header from "@/components/Header";
import { getCookie } from "@/api/cookie";
import { io, Socket } from "socket.io-client";

const token = getCookie("jwt");

// const socket = io("http://localhost:3001", {
//   auth: {
//     authorization: token,
//   },
// });

export const SocketContext = createContext<null>(null);

// const socket = io("http://localhost:3001", {
//   auth: {
//     //  jwt넣기
//     userId: 1,
//     // token: "abc123",
//   },
// });

// export const SocketContext = createContext(null);

const Layout = () => {
  const location = useLocation();
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  //  jwt 토큰이 있으면 main, 없으면 로그인 페이지로 이동
  // useEffect(() => {
  //   if (!loginToken && !isMainPage) navigate("/main");
  //   else if (!loginToken && !isMainPage) navigate("/login");
  //   else {
  //     console.log("로그인 성공");
  //   }
  // }, []);

  const directOutletPaths = [
    "/twoFactor",
    "/login",
    "/signup",
    "/signup/detail",
    "/resetPW",
  ];

  // 현재 경로가 directOutletPaths에 포함되어 있는지 확인
  const isDirectOutletPath = directOutletPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return isDirectOutletPath ? (
    <Outlet />
  ) : (
    // <SocketContext.Provider value={socket}>
    <Wrapper>
      <Header />
      <MainStyled>
        <Outlet />
      </MainStyled>
    </Wrapper>
    // </SocketContext.Provider>
  );
};

export default Layout;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 1440px; */
  height: 100%;
  overflow: scroll;
`;

const MainStyled = styled.div`
  /* position: relative; */
  max-width: 1440px;
  width: 100%;
  /* margin: 0 auto; */
  margin-bottom: 30px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
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
