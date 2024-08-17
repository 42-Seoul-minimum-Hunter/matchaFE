import React, { useCallback, useState } from "react";
import styled from "styled-components";
import DropboxTemplate from "../DropboxTemplate";
import TagList from "../TagTemplate";
import RangeSlider from "./Slider";
import { LocationData } from "@/assets/mock/mock";
import { tagItem } from "@/pages/LoginPage";
import { InterestLableMap, sortLableMap } from "@/types/maps";

interface ModalProps {
  title: "age" | "rate" | "location" | "hashtag" | "sort";
  onClose: () => void;
  onSave: (value: any) => void;

  // TODO : type 정의하기
  values?: any;
}

const SortTagList: tagItem[] = Object.entries(sortLableMap).map(
  ([value, label]) => ({ value, label })
);

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
      case "sort":
        return values.sort || "dscRate";
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
                setValue({ si: option.value, gu: "" }); // gu를 초기화
              }}
              selectedValue={value.si}
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
                  setValue((prev: any) => ({ ...prev, gu: option.value }));
                }}
                selectedValue={value.gu}
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
      case "sort":
        return (
          <DropboxTemplate
            options={SortTagList}
            type="sort"
            onSelect={(option) => setValue(option.value)}
            selectedValue={value.sort}
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
