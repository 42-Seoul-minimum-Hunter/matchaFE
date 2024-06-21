import { useState } from "react";
import styled from "styled-components";
const ImageUpload = ({
  setShowImages,
  showImages,
}: {
  setShowImages: (value: string[]) => void;
  showImages: string[];
}) => {
  // const [showImages, setShowImages] = useState<string[]>([]);

  // 이미지 상대경로 저장
  const handleAddImages = (event: any) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }
    console.log("imageUrlLists", imageUrlLists);

    setShowImages(imageUrlLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return (
    <Wrapper id="test1">
      {/* <ImageLable htmlFor="input-file" onChange={handleAddImages}> */}
      <InputImageUpload
        type="file"
        id="input-file"
        multiple
        accept="image/*"
        onChange={handleAddImages}
      />
      {/* <span> . asdf사진추가</span> */}
      {/* </ImageLable> */}
      {/* <Plus /> */}
      <SelectImageContainer>
        {showImages.map((image, id) => (
          <ImageContainer key={id}>
            <img src={image} />
            <DeleteStyled onClick={() => handleDeleteImage(id)}>
              삭제
            </DeleteStyled>
          </ImageContainer>
        ))}
      </SelectImageContainer>
    </Wrapper>
  );
};

export default ImageUpload;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const DeleteStyled = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #646f7c;
  color: white;
  padding: 5px;
  border-radius: 8px;
`;

const InputImageUpload = styled.input`
  /* visibility: hidden; */
  &::-webkit-file-upload-button {
    visibility: hidden;
  }
  width: 130px;
  height: 140px;

  &::before {
    content: "+";
    display: inline-block;
    width: 130px;
    height: 140px;
    background-color: #646f7c;
    border-radius: 10px;
    /* border: 1px solid #999; */
    /* border-radius: 3px; */
    /* padding: 5px 8px; */
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    /* text-shadow: 1px 1px #fff; */
    font-weight: 700;
    font-size: 4rem;
  }

  /* &:hover::before {
    border-color: black;
  }

  &:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  } */
`;

const SelectImageContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  & img {
    width: 130px;
    height: 140px;
    border-radius: 8px;
  }
`;
