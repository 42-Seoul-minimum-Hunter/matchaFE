import { ISearchDateDto } from "@/pages/SearchPage";
import styled from "styled-components";

const SearchCard = ({ img, nickname, age, handler }: ISearchDateDto) => {
  return (
    <Wrapper onClick={handler}>
      <img src={img} />
      <TitleStyled>
        <p>{nickname}</p>
        <p>{age}</p>
      </TitleStyled>
    </Wrapper>
  );
};

export default SearchCard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 10px; */

  & > img {
    width: 180px;
    height: 200px;
    fit: cover;
    border-radius: 15px;
    margin-bottom: 10px;
  }
`;

const TitleStyled = styled.div`
  display: flex;
  gap: 10px;
  font-weight: 600;
`;
