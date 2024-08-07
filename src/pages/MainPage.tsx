import styled from "styled-components";
import { ReactComponent as BigHeartIcon } from "@/assets/icons/big-heart-icon.svg";

const MainPage = () => {
  return (
    <Container>
      <Title>Find your Real Connections</Title>
      <BigHeartIcon />
    </Container>
  );
};

export default MainPage;

const Container = styled.div``;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.4;
`;
