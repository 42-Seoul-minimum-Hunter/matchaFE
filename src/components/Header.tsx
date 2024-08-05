import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { axiosLogout, axiosProfileMe } from "@/api/axios.custom";
import { SocketContext } from "@/pages/LayoutPage";
import useRouter from "@/hooks/useRouter";

// TODO: Router 테이블 만들어서 해당 라우터에서 색상 표현
const Header = () => {
  const {
    goToSignup,
    goTologin,
    goToSearch,
    goToProfileMe,
    goToChat,
    goToAlarm,
    goToSetting,
  } = useRouter();
  const [disable, setDisable] = useState<boolean>(false);
  const [isAlarm, setIsAlarm] = useState<boolean>(false);
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
      // onClickProfile();
    } catch (error: any) {
      console.log("error", error);
      throw error;
    }
  };
  const handleNavClick = (action: () => void) => {
    if (disable) {
      alert("로그인 해주세요");
    } else {
      action();
    }
  };

  // jwt로 인증
  const onClickLogout = () => {
    setDisable(!disable);
  };
  const test = () => {
    setIsAlarm(!isAlarm);
  };

  return (
    <Wrapper>
      <HeaderContainer>
        <NavStyled onClick={() => handleNavClick(goToProfileMe)}>
          Profile
        </NavStyled>
        <NavStyled onClick={() => handleNavClick(goToSearch)}>Search</NavStyled>
        <NavStyled onClick={() => handleNavClick(goToChat)}>Chat</NavStyled>
      </HeaderContainer>
      <TitleStyled>
        MEET<span>CHA</span>
      </TitleStyled>
      <HeaderContainer>
        {disable ? (
          <>
            <NavStyled onClick={goTologin}>Log In</NavStyled>
            <NavStyled onClick={goToSignup}>Sign Up</NavStyled>
          </>
        ) : (
          <>
            <NavStyled
              onClick={() => handleNavClick(goToAlarm)}
              $isAlarm={isAlarm}
            >
              Alarm
            </NavStyled>
            <NavStyled onClick={() => handleNavClick(goToSetting)}>
              Setting
            </NavStyled>
            <NavStyled onClick={() => onClickLogout()}>Logout</NavStyled>
            {/* <NavStyled onClick={() => test()}>Logout</NavStyled> */}
          </>
        )}
      </HeaderContainer>
    </Wrapper>
  );
};

export default Header;

const NavStyled = styled.div<{ $isAlarm?: boolean }>`
  border: 1px solid var(--black);
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 1rem;
  font-weight: 400;
  position: relative;

  @media screen and (max-width: 1024px) {
    font-size: 0.8rem;
  }

  &:hover {
    background-color: var(--brand-sub-2);
  }

  ${({ $isAlarm }) =>
    $isAlarm &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 5px;
      right: 5px;
      width: 10px;
      height: 10px;
      background-color: var(--brand-main-1);
      border-radius: 50%;
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
      }
      
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
      }
      
      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
      }
    }
  `}
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
