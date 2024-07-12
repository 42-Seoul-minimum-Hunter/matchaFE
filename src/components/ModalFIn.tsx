import styled from "styled-components";
import { ReactComponent as ChevronIcon } from "@/assets/icons/chevron-icon.svg";

import { useState } from "react";
import NumberRangeInput from "./NumberRangeInput";
import LocationDropdown from "./LocationDropdown";

export interface IModalOptions {
  key: string;
  name: string;
}

interface IModalProps {
  options: IModalOptions[];
  title: string;
  // modalOpen: boolean;
  closeModal: () => void;
  onClickTag: (tag: IModalOptions) => void;
  modalTitle: string;
  filterList: IModalOptions[];
  onSubmint: (selectedOption: IModalOptions[]) => void;
  // ModalLable: string;
  // onChangeValue: (value: string) => void;
  selectedArea: string;
  selectedSubArea: string;
  handleAreaChange: (e: any) => void;
  handleSubAreaChange: (e: any) => void;
}

const ModalFin = ({
  options,
  title,
  closeModal,
  filterList,
  onSubmint,
  selectedArea,
  selectedSubArea,
  handleAreaChange,
  handleSubAreaChange,
}: // ModalLable,
IModalProps) => {
  const [selectedOption, setSelectedOption] =
    useState<IModalOptions[]>(filterList);
  console.log("age", title);
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
          <NumberRangeInput type="rate" />
          <NumberRangeInput type="age" />
        </RowContainer>
        <TitleStyled>Location</TitleStyled>
        <LocationDropdown
          selectedArea={selectedArea}
          selectedSubArea={selectedSubArea}
          handleAreaChange={handleAreaChange}
          handleSubAreaChange={handleSubAreaChange}
        />
        <TitleStyled>Hashtags</TitleStyled>
        <ModalSelectionContainer>
          {options.map((option) => (
            <ModalSelectionOption
              key={option.key}
              // onClick={() => onClickTag(option)}
              onClick={() => onClickTagTest(option)}
              $isSelected={selectedOption.some(
                (item) => item.name === option.name
              )}
            >
              {option.name}
            </ModalSelectionOption>
          ))}
        </ModalSelectionContainer>
        <SubmitStyled onClick={() => onSubmint(selectedOption)}>
          적용하기
        </SubmitStyled>
      </ModalBodyStyled>
    </ModalStyled>
  );
};

export default ModalFin;

const TitleStyled = styled.div`
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 500;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  position: absolute;
  width: 520px;
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
  background-color: var(--light-vermilion);
  color: var(--white);
  padding: 10px 0;

  border-radius: 10px;
  margin-top: 20px;
`;
