import styled from "styled-components";
import { ReactComponent as ProfileIcon } from "@/assets/icons/profile-icon.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/search-icon.svg";
import { ReactComponent as MessageIcon } from "@/assets/icons/message-icon.svg";
import { ReactComponent as AlarmIcon } from "@/assets/icons/alarm-icon.svg";
import { ReactComponent as LogoutIcon } from "@/assets/icons/logout-icon.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { axiosLogout, axiosProfileMe } from "@/api/axios.custom";
import { SocketContext } from "@/pages/LayoutPage";
import useRouter from "@/hooks/useRouter";

// TODO: Router 테이블 만들어서 해당 라우터에서 색상 표현
const Header = () => {
  const { goToSignup, goToProfile, goTologin } = useRouter();
  const socket = useContext(SocketContext);

  // socket.on("getAlarms", (data: any) => {
  //   console.log("onlineStatus On", data);
  // });
  // useEffect(() => {}, []);

  // socket.on("connect_error", (error: any) => {
  //   console.error("Socket connection error:", error);
  // });

  // 알람 설정 나중에
  // useEffect(() => {
  //   if (socket) {
  //     console.log("socket", socket);
  //     socket.on("getAlarms", (data: any) => {
  //       console.log("onlineStatus On", data);
  //     });
  //   }
  // }, []);

  // const checkAlarm = () => {
  //   socket.emit("getAlarms");
  // };

  // const onClickLogout = () => {
  //   try {
  //     const res = axiosLogout();
  //     console.log("logout ", res);
  //   } catch (error: any) {
  //     console.log("error", error);
  //     throw error;
  //   }
  //   navigate("/login");
  // };

  const tryProfileMe = async () => {
    try {
      const res = await axiosProfileMe();
      console.log("res", res);
      onClickProfile();
    } catch (error: any) {
      console.log("error", error);
      throw error;
    }
  };

  return (
    <Wrapper>
      <HeaderContainer>
        <NavStyled>Profile</NavStyled>
        <NavStyled>Search</NavStyled>
        <NavStyled>Chat</NavStyled>
      </HeaderContainer>
      <TitleStyled>
        MEET<span>CHA</span>
      </TitleStyled>
      <HeaderContainer>
        <NavStyled onClick={goTologin}>Log In</NavStyled>
        <NavStyled onClick={goToSignup}>Sign Up</NavStyled>
      </HeaderContainer>
    </Wrapper>
  );
};

export default Header;

const NavStyled = styled.div`
  border: 1px solid var(--black);
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 1rem;
  font-weight: 400;

  @media screen and (max-width: 1024px) {
    font-size: 0.8rem;
  }

  &:hover {
    background-color: var(--brand-sub-2);
    /* color: var(--white); */
  }
  /* @media screen and (max-width: 768px) {
    font-size: 0.6rem;
  } */
`;

const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  min-width: 368px;
  height: 100%;
  @media screen and (max-width: 1024px) {
    min-width: 280px;
  }
  @media screen and (max-width: 768px) {
    min-width: unset;
  }
`;

const Wrapper = styled.div`
  display: flex;
  border: 1px solid var(--black);
  min-height: 100px;
  max-width: 1440px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    justify-content: center;
    font-size: 1rem;
    min-height: 80px;
  }
`;

const TitleStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border: 1px solid var(--black);
  font-family: var(--main-font);
  font-size: 3rem;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.06em;

  & > span {
    color: var(--brand-main-1);
  }
  @media screen and (max-width: 1024px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    flex: 1;
  }
`;
