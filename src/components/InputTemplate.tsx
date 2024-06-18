import styled from "styled-components";
import { useEffect, useState, memo } from "react";

interface InputTemplateProps {
  title: string;
  placeholder: string;
  onChange: (e: any) => void;
  value: string;
}

// const InputTemplate: React.FC<InputTemplateProps> = memo(
//   ({ title, placeholder, value, onChange }) => (
//     <Wrapper>
//       <TitleStyled>{title}</TitleStyled>
//       <InputStyled
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//       />
//     </Wrapper>
//   )
// );
const InputTemplate = (props: InputTemplateProps) => (
  <Wrapper>
    <TitleStyled>{props.title}</TitleStyled>
    <InputStyled
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TitleStyled = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 25px;
`;

const InputStyled = styled.input`
  padding: 15px 0;
  /* padding-left: 25px; */
  /* padding-right: -25px; */
  border-radius: 10px;
  background-color: #fff;
  color: var(--gray);
  font-size: 1rem;
  border: 1px solid var(--gray);
  width: 100%;

  &::placeholder {
    padding: 25px;
    color: var(--gray);
    font-size: 1rem;
  }
`;

export default InputTemplate;
