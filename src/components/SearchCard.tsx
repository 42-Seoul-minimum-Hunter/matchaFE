// import { ISearchDateDto } from "@/pages/SearchPage";
// import styled from "styled-components";

// const SearchCard = ({ img, nickname, age, handler, rate }: ISearchDateDto) => {
//   return (
//     <Wrapper onClick={handler}>
//       <img src={img} />
//       <TitleStyled>
//         <p>{nickname}</p>
//         <p>{age}</p>
//         <p>rate</p>
//       </TitleStyled>
//     </Wrapper>
//   );
// };

// export default SearchCard;

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   /* gap: 10px; */

//   & > img {
//     width: 180px;
//     height: 200px;
//     fit: cover;
//     border-radius: 15px;
//     margin-bottom: 10px;
//   }
// `;

// const TitleStyled = styled.div`
//   display: flex;
//   gap: 10px;
//   font-weight: 600;
// `;

import React, { useState } from "react";
import { ISearchDateDto } from "@/pages/SearchPage";
import styled from "styled-components";
import Stars from "./Stars"; // Stars 컴포넌트를 import 합니다.

const SearchCard = ({ img, nickname, age, handler, rate }: ISearchDateDto) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Wrapper
      onClick={handler}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageContainer>
        <StyledImage src={img} alt={nickname} />
        <Overlay $isHovered={isHovered}>
          <OverlayContent>
            <p>{nickname}</p>
            {isHovered && (
              <>
                <p>{age}</p>
                <Stars rating={rate} />
              </>
            )}
          </OverlayContent>
        </Overlay>
      </ImageContainer>
    </Wrapper>
  );
};

export default SearchCard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 180px;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div<{ $isHovered: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, ${(props) => (props.$isHovered ? 0.7 : 0.2)});
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  transition: background-color 0.3s ease;
`;

const OverlayContent = styled.div`
  color: white;
  text-align: center;

  p {
    margin: 5px 0;
    font-weight: 600;
  }
`;
