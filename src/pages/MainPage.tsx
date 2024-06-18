import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as HeartIcon } from "@/assets/icons/main-heart.svg";
import { ReactComponent as WeddingIcon } from "@/assets/icons/main-wedding.svg";

const MainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const isMainPage: boolean = location.pathname === "/login";

  const onClickSignInButton = () => {
    navigate("/login");
  };

  const onClickSignUpButton = () => {
    navigate("/signup");
  };

  return (
    <Wrapper>
      <LeftSectionStyled>
        {/* <WeddingIcon /> */}
        <TitleStyled>새로운 인연을 만나세요</TitleStyled>
      </LeftSectionStyled>
      <RightSectionStyled>
        <CardStyled>
          <TitleStyled>MATCHA</TitleStyled>
          <HeartIcon />
          <SignWrapper>
            <SignStyled onClick={onClickSignInButton}>SIGN IN</SignStyled>
            <SignStyled onClick={onClickSignUpButton}>SIGN UP</SignStyled>
          </SignWrapper>
        </CardStyled>
      </RightSectionStyled>

      <Outlet />
    </Wrapper>
  );
};

export default MainPage;

const SignWrapper = styled.div`
  display: flex;
  & > :first-child {
    margin-right: 20px;
  }
`;

const SignStyled = styled.div`
  font-size: 1.5rem;
  font-family: var(--main-font);
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const CardStyled = styled.div`
  /* width: 100%; */
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const LeftSectionStyled = styled.div`
  /* background-color: #3a3; */
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightSectionStyled = styled.div`
  background-color: #fff;
  /* opacity: 0.5; */
  /* width: 80%; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const TitleStyled = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  font-family: var(--main-font);
`;
