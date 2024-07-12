import styled from "styled-components";
import { ReactComponent as ChevronIcon } from "@/assets/icons/chevron-icon.svg";

import { useState } from "react";
import NumberRangeInput from "./NumberRangeInput";
import LocationDropdown from "./LocationDropdown";

export interface IModalOptions {
  key: string;
  name: string;
}

export interface RangeState {
  min: number;
  max: number;
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

const FilterModal = ({
  options,
  // title,
  closeModal,
  filterList,
  onSubmint,
  selectedArea,
  selectedSubArea,
  handleAreaChange,
  handleSubAreaChange,
}: IModalProps) => {
  const [selectedOption, setSelectedOption] =
    useState<IModalOptions[]>(filterList);
  const [rateRange, setRateRange] = useState({ min: 0, max: 100 });
  const [ageRange, setAgeRange] = useState({ min: 0, max: 100 });

  const handleRateChange = (minOrMax: "min" | "max", value: number) => {
    setRateRange((prev) => ({ ...prev, [minOrMax]: value }));
  };

  const handleAgeChange = (minOrMax: "min" | "max", value: number) => {
    setAgeRange((prev) => ({ ...prev, [minOrMax]: value }));
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
  console.log("filter render");
  return (
    <ModalStyled onClick={closeModal}>
      <ModalBodyStyled onClick={(e: any) => e.stopPropagation()}>
        <RowContainer>
          {/* <NumberRangeInput type="Rate" />
          <NumberRangeInput type="Age" /> */}
          <NumberRangeInput
            type="Rate"
            range={rateRange}
            onChange={handleRateChange}
          />
          <NumberRangeInput
            type="Age"
            range={ageRange}
            onChange={handleAgeChange}
          />
        </RowContainer>
        <RowStyled>
          <TitleStyled>Location</TitleStyled>
          <LocationDropdown
            selectedArea={selectedArea}
            selectedSubArea={selectedSubArea}
            handleAreaChange={handleAreaChange}
            handleSubAreaChange={handleSubAreaChange}
          />
        </RowStyled>
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
        {/* 여기서 정보 넘겨주기 */}
        <SubmitStyled onClick={() => onSubmint(selectedOption)}>
          적용하기
        </SubmitStyled>
      </ModalBodyStyled>
    </ModalStyled>
  );
};

export default FilterModal;

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
