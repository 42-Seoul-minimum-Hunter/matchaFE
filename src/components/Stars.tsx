// import styled from "styled-components";
// import { ReactComponent as StarIcon } from "@/assets/icons/star-icon.svg";
// import { ReactComponent as EmptyStarIcon } from "@/assets/icons/empty-star-icon.svg";

// const Stars = ({ rating }: { rating: number }) => {
//   const filledWidth = `${(rating / 5) * 100}%`;

//   return (
//     <Wrapper>
//       <StarsContainer>
//         <EmptyStars>
//           {[...Array(5)].map((_, i) => (
//             <StarWrapper key={`empty-${i}`}>
//               <EmptyStarIcon />
//             </StarWrapper>
//           ))}
//         </EmptyStars>
//         <FilledStars style={{ width: filledWidth }}>
//           {[...Array(5)].map((_, i) => (
//             <StarWrapper key={`filled-${i}`}>
//               <StarIcon />
//             </StarWrapper>
//           ))}
//         </FilledStars>
//       </StarsContainer>
//       <StarsRatingTextStyled>{rating}</StarsRatingTextStyled>
//     </Wrapper>
//   );
// };

import styled from "styled-components";
import { ReactComponent as StarIcon } from "@/assets/icons/star-icon.svg";
import { ReactComponent as EmptyStarIcon } from "@/assets/icons/empty-star-icon.svg";
import { useState } from "react";

interface StarsProps {
  rating: number;
  editable?: boolean;
  onRatingChange?: (newRating: number) => void;
}

const Stars = ({ rating, editable = false, onRatingChange }: StarsProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const filledWidth = `${((hoverRating ?? rating) / 5) * 100}%`;

  const calculateRating = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const decimal = Math.round((x / rect.width) * 10) / 10;
    return index + decimal;
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (editable) {
      const newRating = calculateRating(e, index);
      setHoverRating(Math.min(5, Math.max(0, newRating)));
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (editable && onRatingChange) {
      const newRating = calculateRating(e, index);
      onRatingChange(Math.min(5, Math.max(0, newRating)));
    }
  };

  return (
    <>
      <Wrapper onMouseLeave={handleMouseLeave}>
        <StarsContainer>
          <EmptyStars>
            {[...Array(5)].map((_, i) => (
              <StarWrapper
                key={`empty-${i}`}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onClick={(e) => handleClick(e, i)}
              >
                <EmptyStarIcon />
              </StarWrapper>
            ))}
          </EmptyStars>
          <FilledStars style={{ width: filledWidth }}>
            {[...Array(5)].map((_, i) => (
              <StarWrapper
                key={`filled-${i}`}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onClick={(e) => handleClick(e, i)}
              >
                <StarIcon />
              </StarWrapper>
            ))}
          </FilledStars>
        </StarsContainer>
        <StarsRatingTextStyled>
          {(hoverRating ?? rating).toFixed(1)}
        </StarsRatingTextStyled>
      </Wrapper>
    </>
  );
};

export default Stars;

const Wrapper = styled.div`
  display: inline-block;
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid #a1a1a1;
  display: flex;
  width: 140px;
  /* & > :firsts-child {
    margin-left: 40px;
  } */
`;

const StarsRatingTextStyled = styled.div`
  margin-left: 5px;
  line-height: 120%;
`;

const StarsContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const EmptyStars = styled.div`
  display: flex;
`;

const FilledStars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
`;

const StarWrapper = styled.div``;
