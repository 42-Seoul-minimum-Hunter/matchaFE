import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { useEffect, useState } from "react";
import { RangeState } from "./FilterModal";

// const NumberRangeInput = ({ type }: { type: string }) => {
//   // console.log("type", type);
//   const [minNumber, setMinNumber] = useState<number>(0);
//   const [maxNumber, setMaxNumber] = useState<number>(100);
//   const [error, setError] = useState<string>("");
//   console.log("number rerender");
//   useEffect(() => {
//     validateNumbers();
//   }, [minNumber, maxNumber]);

//   const validateNumbers = () => {
//     if (minNumber > maxNumber) {
//       setError("Minimum number cannot be greater than maximum number.");
//     } else {
//       setError("");
//     }
//   };

//   const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Math.max(0, Math.min(100, Number(e.target.value)));
//     setMinNumber(value);
//   };

//   const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Math.max(0, Math.min(100, Number(e.target.value)));
//     setMaxNumber(value);
//   };

//   return (
//     <Container>
//       <TitleStyled>{type}</TitleStyled>
//       <InputGroup>
//         <Label htmlFor="minNumber">Min {type}:</Label>
//         <Input
//           type="number"
//           id="minNumber"
//           value={minNumber}
//           onChange={handleMinChange}
//           min={0}
//           max={100}
//         />
//       </InputGroup>
//       <InputGroup>
//         <Label htmlFor="maxNumber">Max {type}:</Label>
//         <Input
//           type="number"
//           id="maxNumber"
//           value={maxNumber}
//           onChange={handleMaxChange}
//           min={0}
//           max={100}
//         />
//       </InputGroup>
//       {error && <ErrorMessage>{error}</ErrorMessage>}
//     </Container>
//   );
// };

interface NumberRangeInputProps {
  type: string;
  range: RangeState;
  onChange: (minOrMax: "min" | "max", value: number) => void;
}

const NumberRangeInput: React.FC<NumberRangeInputProps> = ({
  type,
  range,
  onChange,
}) => {
  const [error, setError] = useState<string>("");

  console.log("number rerender");
  useEffect(() => {
    validateNumbers();
  }, [range.min, range.max]);

  const validateNumbers = () => {
    if (range.min > range.max) {
      setError("Minimum number cannot be greater than maximum number.");
    } else {
      setError("");
    }
  };

  const handleChange =
    (minOrMax: "min" | "max") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(0, Math.min(100, Number(e.target.value)));
      onChange(minOrMax, value);
    };

  return (
    <Container>
      <TitleStyled>{type}</TitleStyled>
      <InputGroup>
        <Label htmlFor={`min${type}`}>Min {type}:</Label>
        <Input
          type="number"
          id={`min${type}`}
          value={range.min}
          onChange={handleChange("min")}
          min={0}
          max={100}
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor={`max${type}`}>Max {type}:</Label>
        <Input
          type="number"
          id={`max${type}`}
          value={range.max}
          onChange={handleChange("max")}
          min={0}
          max={100}
        />
      </InputGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};
export default NumberRangeInput;

const Container = styled.div`
  font-family: Arial, sans-serif;
  /* max-width: 300px; */
  /* max-width: 150px; */
  width: 80%;
  margin: 0 auto;
  /* padding: 20px; */
  /* background-color: #f0f0f0; */
  border-radius: 8px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
`;

const InputGroup = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  text-align: right;
  /* border: 1px solid #ddd; */
  border-radius: 4px;
  color: #fff;
  /* box-sizing: border-box; */
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
`;

const TitleStyled = styled.div`
  text-align: left;
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 500;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 20px;
`;
