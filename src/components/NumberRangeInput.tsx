import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RangeState } from "./FilterModal";
import { IRangeDto } from "@/pages/SearchPage";

interface NumberRangeInputProps {
  type: "Rate" | "Age";
  range: RangeState;
  handleChange: (
    category: keyof IRangeDto,
    field: string,
    value: string
  ) => void;
}

const NumberRangeInput: React.FC<NumberRangeInputProps> = ({
  type,
  range,
  handleChange,
}) => {
  const maxAllowedValue = type === "Rate" ? 5 : 100;
  const [error, setError] = useState("");
  const [minValue, setMinValue] = useState(range.min || 0);
  const [maxValue, setMaxValue] = useState(range.max || maxAllowedValue);

  useEffect(() => {
    validateNumbers();
  }, [minValue, maxValue]);

  const validateNumbers = () => {
    if (minValue > maxValue) {
      setError("Minimum number cannot be greater than maximum number.");
    } else {
      setError("");
    }
  };

  const handleRangeChange =
    (field: "min" | "max") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const category = type.toLowerCase() as keyof IRangeDto;
      const value = Math.max(
        0,
        Math.min(maxAllowedValue, Number(e.target.value))
      );
      if (field === "min") {
        setMinValue(value);
      } else {
        setMaxValue(value);
      }
      handleChange(category, field, value.toString());
    };

  return (
    <Container>
      <TitleStyled>{type}</TitleStyled>
      <InputGroup>
        <Label>Min {type}:</Label>
        <Input
          type="number"
          value={minValue.toString()}
          onChange={handleRangeChange("min")}
        />
      </InputGroup>
      <InputGroup>
        <Label>Max {type}:</Label>
        <Input
          type="number"
          value={maxValue.toString()}
          onChange={handleRangeChange("max")}
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
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  /* width: 170px; */
`;

const Input = styled.input`
  width: 80px;
  padding: 8px;
  text-align: right;
  /* border: 1px solid #ddd; */
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid var(--gray);
  color: var(--black);
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
