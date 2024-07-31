import React, { useCallback, useState } from "react";
import styled from "styled-components";
import DropboxTemplate from "./DropboxTemplate";
import TagList from "./TagTemplate";
import RangeSlider from "./Slider";
import { LocationData } from "@/assets/mock/mock";
import { tagItem } from "@/pages/LoginPage";
import { InterestLableMap } from "@/types/maps";

interface ModalProps {
  title: "age" | "rate" | "location" | "hashtag";
  onClose: () => void;
  onSave: (value: any) => void;

  // TODO : type 정의하기
  values?: any;
}

const HashTagsList: tagItem[] = Object.entries(InterestLableMap).map(
  ([value, label]) => ({ value, label })
);

console.log("HashTagsList", HashTagsList);

const FilterModal: React.FC<ModalProps> = ({
  title,
  onClose,
  onSave,
  values,
}) => {
  const [value, setValue] = useState<any>(() => {
    switch (title) {
      case "age":
        return [values.age.min, values.age.max];
      case "rate":
        return [values.rate.min, values.rate.max];
      case "location":
        return { si: values.location.si, gu: values.location.gu };
      case "hashtag":
        return values.hashtag || [];
      default:
        return null;
    }
  });

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  const renderContent = () => {
    switch (title) {
      case "age":
        return (
          <RangeSlider
            min={20}
            max={100}
            step={1}
            values={value || [20, 100]}
            onChange={(values) => setValue(values)}
          />
        );
      case "rate":
        return (
          <RangeSlider
            min={0}
            max={5}
            step={0.1}
            values={value || [0, 5]}
            onChange={(values) => setValue(values)}
          />
        );
      case "location":
        return (
          <>
            <DropboxTemplate
              options={LocationData.map((loc) => ({
                value: loc.name,
                label: loc.name,
              }))}
              type="Si"
              onSelect={(option) => {
                setValue((prev) => ({ si: option.value, gu: "" }));
              }}
            />
            {value.si && (
              <DropboxTemplate
                options={
                  LocationData.find(
                    (loc) => loc.name === value.si
                  )?.subArea.map((sub) => ({ value: sub, label: sub })) || []
                }
                type="Gu"
                onSelect={(option) => {
                  setValue((prev) => ({ ...prev, gu: option.value }));
                }}
              />
            )}
          </>
        );
      case "hashtag":
        return (
          <TagList
            tags={HashTagsList}
            onTagSelect={(tag) =>
              setValue((prev: string[]) =>
                prev.includes(tag.value)
                  ? prev.filter((t) => t !== tag.value)
                  : [...prev, tag.value]
              )
            }
            selectedTags={value || []}
            selectable
          />
        );
      default:
        return null;
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
        </ModalHeader>
        <ModalBody>{renderContent()}</ModalBody>
        <ModalFooter>
          <ButtonStyled onClick={onClose}>Cancel</ButtonStyled>
          <ButtonStyled onClick={handleSave}>Save</ButtonStyled>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled components...

export default FilterModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonStyled = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  background-color: #f0f0f0;
  color: var(--black);
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: var(--brand-sub-2);
    color: var(--brand-main-1);
  }
`;

// import styled from "styled-components";
// import { ReactComponent as ChevronIcon } from "@/assets/icons/chevron-icon.svg";

// import { useState } from "react";
// import NumberRangeInput from "./NumberRangeInput";
// import LocationDropdown from "./LocationDropdown";

// export interface IModalOptions {
//   key: string;
//   name: string;
// }

// export interface RangeState {
//   min: number;
//   max: number;
// }

// interface IModalProps {
//   options: IModalOptions[];
//   title: string;
//   closeModal: () => void;
//   onClickTag: (tag: IModalOptions) => void;
//   modalTitle: string;
//   filterList: IModalOptions[];
//   onSubmint: (selectedOption: IModalOptions[]) => void;
//   selectedArea: string;
//   selectedSubArea: string;
//   handleAreaChange: (e: any) => void;
//   handleSubAreaChange: (e: any) => void;
// }

// const FilterModal = ({
//   options,
//   closeModal,
//   filterList,
//   onSubmint,
//   selectedArea,
//   selectedSubArea,
//   handleAreaChange,
//   handleSubAreaChange,
// }: IModalProps) => {
//   const [selectedOption, setSelectedOption] =
//     useState<IModalOptions[]>(filterList);
//   const [rateRange, setRateRange] = useState({ min: 0, max: 100 });
//   const [ageRange, setAgeRange] = useState({ min: 0, max: 100 });

//   const handleRateChange = (minOrMax: "min" | "max", value: number) => {
//     setRateRange((prev) => ({ ...prev, [minOrMax]: value }));
//   };

//   const handleAgeChange = (minOrMax: "min" | "max", value: number) => {
//     setAgeRange((prev) => ({ ...prev, [minOrMax]: value }));
//   };

//   const onClickTagTest = (tag: IModalOptions) => {
//     if (selectedOption.some((item) => item.name === tag.name)) {
//       setSelectedOption(
//         selectedOption.filter((item) => item.name !== tag.name)
//       );
//     } else {
//       setSelectedOption([...selectedOption, tag]);
//     }
//   };
//   console.log("filter render");
//   return (
//     <ModalStyled onClick={closeModal}>
//       <ModalBodyStyled onClick={(e: any) => e.stopPropagation()}>
//         <RowContainer>
//           {/* <NumberRangeInput type="Rate" />
//           <NumberRangeInput type="Age" /> */}
//           <NumberRangeInput
//             type="Rate"
//             range={rateRange}
//             onChange={handleRateChange}
//           />
//           <NumberRangeInput
//             type="Age"
//             range={ageRange}
//             onChange={handleAgeChange}
//           />
//         </RowContainer>
//         <RowStyled>
//           <TitleStyled>Location</TitleStyled>
//           <LocationDropdown
//             selectedArea={selectedArea}
//             selectedSubArea={selectedSubArea}
//             handleAreaChange={handleAreaChange}
//             handleSubAreaChange={handleSubAreaChange}
//           />
//         </RowStyled>
//         <TitleStyled>Hashtags</TitleStyled>
//         <ModalSelectionContainer>
//           {options.map((option) => (
//             <ModalSelectionOption
//               key={option.key}
//               // onClick={() => onClickTag(option)}
//               onClick={() => onClickTagTest(option)}
//               $isSelected={selectedOption.some(
//                 (item) => item.name === option.name
//               )}
//             >
//               {option.name}
//             </ModalSelectionOption>
//           ))}
//         </ModalSelectionContainer>
//         {/* 여기서 정보 넘겨주기 */}
//         <SubmitStyled onClick={() => onSubmint(selectedOption)}>
//           적용하기
//         </SubmitStyled>
//       </ModalBodyStyled>
//     </ModalStyled>
//   );
// };

// export default FilterModal;

// const RowStyled = styled.div`
//   margin-bottom: 40px;
// `;

// const TitleStyled = styled.div`
//   text-align: left;
//   padding-bottom: 20px;
//   font-size: 2rem;
//   margin-bottom: 20px;
//   font-weight: 500;
//   border-bottom: 1px solid #d9d9d9;
// `;

// const RowContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 10px;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const ModalSelectionOption = styled.div<{ $isSelected: boolean }>`
//   background-color: ${(props) =>
//     props.$isSelected ? "var(--vermilion)" : "var(--white)"};
//   color: ${(props) => (props.$isSelected ? "var(--white)" : "var(--black)")};
//   border: ${(props) =>
//     props.$isSelected ? "none" : "1px solid var(--light-gray)"};

//   width: 100px;
//   padding: 5px 15px;
//   border-radius: 10px;
// `;

// const ModalSelectionContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
//   width: 100%;
// `;

// const ModalStyled = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.4);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalBodyStyled = styled.div`
//   position: absolute;
//   width: 520px;
//   /* width: 80%; */
//   /* height: 500px; */
//   padding: 40px;
//   text-align: center;
//   background-color: rgb(255, 255, 255);
//   border-radius: 10px;
//   box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: space-between;
// `;

// const SubmitStyled = styled.div`
//   background-color: var(--light-vermilion);
//   color: var(--white);
//   padding: 10px 0;

//   border-radius: 10px;
//   margin-top: 20px;
// `;
