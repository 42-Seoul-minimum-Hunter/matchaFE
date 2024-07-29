import { tagItem } from "@/pages/SignUpPage";
import React, { useEffect, useRef, useState } from "react";
// import { ReactComponent as ChevronIcon } from "@/assets/icons/chevron-icon.svg";
import styled from "styled-components";

const DropboxTemplate = ({
  options,
  type,
  onSelect,
}: {
  options: tagItem[];
  type: string;
  onSelect: (option: tagItem) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<tagItem | null>(null);

  const toggleDropbox = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: tagItem) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <DropboxContainer ref={dropdownRef}>
      <DropboxHeader onClick={toggleDropbox}>
        {selectedOption ? selectedOption.label : type}
        <ChevronIcon $isOpen={isOpen} />
      </DropboxHeader>
      {isOpen && (
        <OptionsList>
          {options.map((option) => (
            <Option
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </Option>
          ))}
        </OptionsList>
      )}
    </DropboxContainer>
  );
};

const DropboxContainer = styled.div`
  position: relative;
  width: 350px;
`;

const DropboxHeader = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChevronIcon = styled.div<{ $isOpen: boolean }>`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #333;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.3s ease;
`;

const OptionsList = styled.ul`
  z-index: 1;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Option = styled.li`
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.4;
  letter-spacing: -0.025em;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default DropboxTemplate;
