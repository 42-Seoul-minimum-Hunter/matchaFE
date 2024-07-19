import styled from "styled-components";
import { ReactComponent as ChevronIcon } from "@/assets/icons/chevron-icon.svg";
import { useState } from "react";
import NumberRangeInput from "./NumberRangeInput";
import LocationDropdown from "./LocationDropdown";
import { IRangeDto } from "@/pages/SearchPage";
import { InterestLableMap } from "@/types/maps";
import { tagItem } from "@/pages/SignUpPage";

export interface IModalOptions {
  key: string;
  name: string;
}

export interface RangeState {
  min: number | undefined;
  max: number | undefined;
}

interface IModalProps {
  closeModal: () => void;
  onClickTag: (tag: IModalOptions) => void;
  filterList: IModalOptions[];
  onSubmint: (
    selectedOption: IModalOptions[],
    localRangeData: IRangeDto
  ) => void;
  // handleChange: (
  //   category: keyof IRangeDto,
  //   field: string,
  //   value: number | string
  // ) => void;
  rangeData: IRangeDto;
}

const FilterModal = ({
  closeModal,
  filterList,
  onSubmint,
  // handleChange,
  rangeData,
}: IModalProps) => {
  const [selectedOption, setSelectedOption] =
    useState<IModalOptions[]>(filterList);
  const hashTagsList: tagItem[] = Object.entries(InterestLableMap).map(
    ([key, name]) => ({ key, name })
  );

  const [localRangeData, setLocalRangeData] = useState<IRangeDto>(rangeData);

  const handleLocalChange = (
    category: keyof IRangeDto,
    field: string,
    value: number | string
  ) => {
    setLocalRangeData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const onClickTagTest = (tag: IModalOptions) => {
    if (selectedOption.some((item) => item.name === tag.name)) {
      setSelectedOption(
        selectedOption.filter((item) => item.name !== tag.name)
      );
    } else {
      setSelectedOption([...selectedOption, tag]);
    }
  };

  return (
    <ModalStyled onClick={closeModal}>
      <ModalBodyStyled onClick={(e: any) => e.stopPropagation()}>
        <RowContainer>
          <NumberRangeInput
            type="Rate"
            range={localRangeData.rate}
            handleChange={handleLocalChange}
          />
          <NumberRangeInput
            type="Age"
            range={localRangeData.age}
            handleChange={handleLocalChange}
          />
        </RowContainer>
        <RowStyled>
          <TitleStyled>Location</TitleStyled>
          <LocationDropdown
            selectedArea={localRangeData.location.si}
            selectedSubArea={localRangeData.location.gu}
            handleChange={handleLocalChange}
          />
        </RowStyled>
        <TitleStyled>Hashtags</TitleStyled>
        <ModalSelectionContainer>
          {hashTagsList.map((tag) => (
            <ModalSelectionOption
              // 이미 선택된 태그 색칠
              $isSelected={selectedOption.some(
                (item) => item.name === tag.name
              )}
              key={tag.name}
              onClick={() => onClickTagTest(tag)}
            >
              {tag.name}
            </ModalSelectionOption>
          ))}
        </ModalSelectionContainer>
        {/* 여기서 정보 넘겨주기 */}
        <ButtonContainer>
          <SubmitStyled className="exit" onClick={closeModal}>
            나가기
          </SubmitStyled>
          <SubmitStyled
            className="apply"
            onClick={() => onSubmint(selectedOption, localRangeData)}
          >
            적용하기
          </SubmitStyled>
        </ButtonContainer>
      </ModalBodyStyled>
    </ModalStyled>
  );
};

export default FilterModal;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const RowStyled = styled.div`
  margin-bottom: 40px;
`;

const TitleStyled = styled.div`
  text-align: left;
  padding-bottom: 20px;
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 500;
  border-bottom: 1px solid #d9d9d9;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalSelectionOption = styled.div<{ $isSelected: boolean }>`
  background-color: ${(props) =>
    props.$isSelected ? "var(--vermilion)" : "var(--white)"};
  color: ${(props) => (props.$isSelected ? "var(--white)" : "var(--black)")};
  border: ${(props) =>
    props.$isSelected ? "none" : "1px solid var(--light-gray)"};

  width: 100px;
  padding: 5px 15px;
  border-radius: 10px;
`;

const ModalSelectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`;

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBodyStyled = styled.div`
  z-index: 1000; // 높은 z-index 추가
  position: absolute;
  width: 520px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
  overflow: scroll;
  /* width: 80%; */
  /* height: 500px; */
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
`;

const SubmitStyled = styled.div`
  &.apply {
    background-color: var(--light-vermilion);
    color: var(--white);
  }
  &.exit {
    background-color: #a1a1a1;
    color: var(--white);
  }
  padding: 10px 15px;
  border-radius: 10px;
  margin-top: 20px;
`;
