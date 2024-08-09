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
  console.log("images", images);
  const useParams = location.pathname.includes("signup");
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

  // const decodeBase64Url = (base64Url: string): string => {
  //   try {
  //     console.log("base64Url", atob(base64Url));
  //     return atob(base64Url);
  //   } catch (e) {
  //     console.error("Invalid base64 string:", e);
  //     return "";
  //   }
  // };

  const decodeBase64Url = (url: string): string => {
    // URL이 이미 디코딩되어 있거나 일반 URL인 경우 그대로 반환
    if (url.startsWith("http") || url.startsWith("data:image")) {
      return url;
    }

    try {
      // base64 디코딩 시도
      const decoded = atob(url);
      // 디코딩된 문자열이 URL 형식이면 그대로 반환
      if (decoded.startsWith("http")) {
        return decoded;
      }
      // 디코딩된 문자열이 URL 형식이 아니면 data URL로 변환
      return `data:image/png;base64,${url}`;
    } catch (e) {
      console.error("Invalid base64 string:", e);
      // 디코딩에 실패하면 원래 URL 반환
      return url;
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
              <Image
                // src={image}
                src={decodeBase64Url(image)}
                alt={`Uploaded ${index}`}
              />

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
