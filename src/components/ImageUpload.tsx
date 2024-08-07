import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as PlusIcon } from "@/assets/icons/plus-icon.svg";
import { ReactComponent as RightArrowIcon } from "@/assets/icons/right-arrow-icon.svg";
import { ReactComponent as LeftArrowIcon } from "@/assets/icons/left-arrow-icon.svg";
import styled from "styled-components";

const ImageUploader = ({
  images,
  setImages,
  isReadOnly,
}: {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  isReadOnly?: boolean;
}) => {
  // console.log("images", images);
  const useParams = location.pathname.includes("signup");

  // console.log("useParams", useParams);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prevImages) => [
        ...prevImages,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    if (currentIndex > 0 && index < currentIndex)
      setCurrentIndex((prev) => prev - 1);
  };
  const handleScroll = (direction: "left" | "right") => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (direction === "right" && currentIndex < images.length - 4) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // 트랜지션 시간과 일치시킵니다

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <Container $useParams={useParams}>
      {!isReadOnly && (
        <UploadButton onClick={() => fileInputRef.current?.click()}>
          <PlusIcon />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
          />
        </UploadButton>
      )}

      <ImageContainer>
        <ImageWrapper $translateX={-currentIndex * 143}>
          {images.map((image, index) => (
            <ImageItem key={index}>
              <Image src={image} alt={`Uploaded ${index}`} />

              {!isReadOnly && (
                <DeleteButton onClick={() => handleDelete(index)}>
                  삭제
                </DeleteButton>
              )}
            </ImageItem>
          ))}
        </ImageWrapper>
      </ImageContainer>

      <ScrollButtons>
        <ScrollButton
          onClick={() => handleScroll("left")}
          disabled={currentIndex === 0 || isTransitioning}
        >
          <LeftArrowIcon />
        </ScrollButton>
        <ScrollButton
          onClick={() => handleScroll("right")}
          disabled={currentIndex >= images.length - 4 || isTransitioning}
        >
          <RightArrowIcon />
        </ScrollButton>
      </ScrollButtons>
    </Container>
  );
};

const Container = styled.div<{ $useParams: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  width: 740px;

  ${({ $useParams }) => `
    @media screen and (max-width: ${$useParams ? "768px" : "1360px"}) {
      width: 100%;
    }
  `}
`;

const ImageContainer = styled.div`
  width: 572px; // 4개의 이미지와 마진을 포함한 너비
  overflow: hidden;
`;

const ImageWrapper = styled.div<{ $translateX: number }>`
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(${(props) => props.$translateX}px);
`;

const ImageItem = styled.div`
  position: relative;
  width: 133px;
  height: 143px;
  margin-right: 10px;
  flex-shrink: 0;
  border: 1px solid var(--line-gray-2);
  border-radius: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 0.5rem;
  font-weight: 500;
  color: var(--black);
  border: 1px solid var(--line-gray-2);
  border-radius: 2px;
  background-color: #f0f0f0;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ScrollButtons = styled.div`
  position: absolute;
  top: -54px;
  right: 35px;
  display: flex;
  @media screen and (max-width: 400px) {
    right: 0px;
  }
`;

const ScrollButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 34px;
  height: 34px;

  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--line-gray-2);
  margin-left: 5px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  color: var(--black);
`;

const UploadButton = styled.button`
  width: 133px;
  height: 143px;
  background-color: #f0f0f0;
  border: 2px solid var(--line-gray-2);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;

  & > input {
    display: none;
  }
`;

export default ImageUploader;

// import styled from "styled-components";
// import { ReactComponent as PlusIcon } from "@/assets/icons/plus-icon.svg";
// const ImageUpload = ({
//   setShowImages,
//   showImages,
// }: {
//   setShowImages: (value: string[]) => void;
//   showImages: string[];
// }) => {
//   // 이미지 상대경로 저장
//   const handleAddImages = (event: any) => {
//     const imageLists = event.target.files;
//     let imageUrlLists = [...showImages];

//     for (let i = 0; i < imageLists.length; i++) {
//       const currentImageUrl = URL.createObjectURL(imageLists[i]);
//       imageUrlLists.push(currentImageUrl);
//     }

//     if (imageUrlLists.length > 5) {
//       imageUrlLists = imageUrlLists.slice(0, 5);
//     }
//     console.log("imageUrlLists", imageUrlLists);

//     setShowImages(imageUrlLists);
//   };

//   // X버튼 클릭 시 이미지 삭제
//   const handleDeleteImage = (id: number) => {
//     setShowImages(showImages.filter((_, index) => index !== id));
//   };

//   return (
//     <Wrapper id="test1">
//       {/* <ImageLable htmlFor="input-file" onChange={handleAddImages}> */}
//       <InputImageUpload
//         type="file"
//         id="input-file"
//         multiple
//         accept="image/*"
//         onChange={handleAddImages}
//       />

//       <SelectImageContainer>
//         {showImages.map((image, id) => (
//           <ImageContainer key={id}>
//             <img src={image} />
//             <DeleteStyled onClick={() => handleDeleteImage(id)}>
//               삭제
//             </DeleteStyled>
//           </ImageContainer>
//         ))}
//       </SelectImageContainer>
//     </Wrapper>
//   );
// };

// export default ImageUpload;

// const Wrapper = styled.div`
//   display: flex;
//   gap: 20px;
// `;

// const DeleteStyled = styled.div`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background-color: #646f7c;
//   border: 1px solid var(--line-gray-1);
//   color: white;
//   padding: 5px;
//   border-radius: 8px;
// `;

// const InputImageUpload = styled.input`
//   /* visibility: hidden; */
//   &::-webkit-file-upload-button {
//     visibility: hidden;
//   }
//   width: 133px;
//   height: 143px;
//   border: 1px solid var(--line-gray-1);
//   border-radius: 10px;

//   &::before {
//     content: "+";
//     display: inline-block;
//     width: 133px;
//     height: 143px;
//     /* background-color: #646f7c; */
//     outline: none;
//     white-space: nowrap;
//     /* font-family: ; */
//     /* -webkit-user-select: none; */
//     cursor: pointer;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     /* text-shadow: 1px 1px #fff; */
//     font-weight: 700;
//     font-size: 4rem;
//   }
// `;

// const SelectImageContainer = styled.div`
//   display: flex;
//   gap: 10px;
// `;

// const ImageContainer = styled.div`
//   display: flex;
//   position: relative;
//   & img {
//     width: 130px;
//     height: 140px;
//     border-radius: 8px;
//   }
// `;
