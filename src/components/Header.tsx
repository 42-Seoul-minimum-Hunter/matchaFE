import styled from "styled-components";
import { ReactComponent as ProfileIcon } from "@/assets/icons/profile-icon.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/search-icon.svg";
import { ReactComponent as MessageIcon } from "@/assets/icons/message-icon.svg";
import { ReactComponent as AlarmIcon } from "@/assets/icons/alarm-icon.svg";
import { ReactComponent as LogoutIcon } from "@/assets/icons/logout-icon.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const onClickLogout = () => {
    navigate("/main");
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

  return (
    <Wrapper>
      <LogStyled>MATCHA</LogStyled>
      <NavBarStyled>
        <NavItemStyled onClick={onClickProfile}>
          <ProfileIcon />
          <p>Profile</p>
        </NavItemStyled>
        <NavItemStyled onClick={onClickSearch}>
          <SearchIcon />
          <p>Search</p>
        </NavItemStyled>
        <NavItemStyled onClick={onClickMessage}>
          <MessageIcon />
          <p>Message</p>
        </NavItemStyled>
        <NavItemStyled onClick={onClickAlarm}>
          <AlarmIcon />
          <p>Alarm</p>
        </NavItemStyled>
        <NavItemStyled onClick={onClickLogout}>
          <LogoutIcon />
          <p>Logout</p>
        </NavItemStyled>
      </NavBarStyled>
    </Wrapper>
  );
};

export default Header;

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
  gap: 30px;
`;

const NavItemStyled = styled.div`
  display: flex;
  align-items: center;
`;
