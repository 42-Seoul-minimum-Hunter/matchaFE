import styled from "styled-components";
import { ReactComponent as ProfileIcon } from "@/assets/icons/profile-icon.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/search-icon.svg";
import { ReactComponent as MessageIcon } from "@/assets/icons/message-icon.svg";
import { ReactComponent as AlarmIcon } from "@/assets/icons/alarm-icon.svg";
import { ReactComponent as LogoutIcon } from "@/assets/icons/logout-icon.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { axiosLogout, axiosProfileMe } from "@/api/axios.custom";
import { useMediaQuery } from "usehooks-ts";
import { SocketContext } from "@/pages/LayoutPage";

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const socket = useContext(SocketContext);

  // socket.on("getAlarms", (data: any) => {
  //   console.log("onlineStatus On", data);
  // });
  // useEffect(() => {}, []);

  // socket.on("connect_error", (error: any) => {
  //   console.error("Socket connection error:", error);
  // });

  useEffect(() => {
    if (socket) {
      console.log("socket", socket);
      socket.on("getAlarms", (data: any) => {
        console.log("onlineStatus On", data);
      });
    }
  }, []);

  // const checkAlarm = () => {
  //   socket.emit("getAlarms");
  // };

  const onClickLogout = () => {
    try {
      const res = axiosLogout();
      console.log("logout ", res);
    } catch (error: any) {
      console.log("error", error);
      throw error;
    }
    navigate("/login");
  };
  const onClickProfile = () => {
    navigate("/profile");
  };
  const onClickSearch = () => {
    navigate("/search");
  };
  const onClickMessage = () => {
    navigate("/message");
  };
  const onClickAlarm = () => {
    navigate("/alarm");
  };

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
  const navItems = [
    { icon: <ProfileIcon />, label: "Profile", onClick: tryProfileMe },
    {
      icon: <SearchIcon />,
      label: "Search",
      onClick: onClickSearch,
    },
    {
      icon: <MessageIcon />,
      label: "Message",
      onClick: onClickMessage,
    },
    { icon: <AlarmIcon />, label: "Alarm", onClick: onClickAlarm },
    { icon: <LogoutIcon />, label: "Logout", onClick: onClickLogout },
  ];

  return (
    <Wrapper>
      <LogStyled>MATCHA</LogStyled>
      <NavBarStyled>
        {navItems.map((item, index) => (
          <NavItemStyled key={index} onClick={item.onClick}>
            {item.icon}
            {!isMobile && <p>{item.label}</p>}
          </NavItemStyled>
        ))}
      </NavBarStyled>
    </Wrapper>
  );
};

export default Header;

const IconStyled = styled.div`
  width: 24px;
  height: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 25px;
  padding: 0 32px;
`;

const LogStyled = styled.div`
  font-family: var(--main-font);
  font-size: 2.2rem;
  font-weight: 700;
`;

const NavBarStyled = styled.div`
  display: flex;
  gap: 15px;
`;

const NavItemStyled = styled.div`
  display: flex;
  align-items: center;

  & > p {
    font-size: 1rem;
  }
`;
