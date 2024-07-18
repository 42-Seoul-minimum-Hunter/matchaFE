import { LocationData } from "@/assets/mock/mock";
import { IRangeDto } from "@/pages/SearchPage";
import styled from "styled-components";

const LocationDropdown = ({
  selectedArea,
  selectedSubArea,
  handleChange,
  isFixed,
}: {
  selectedArea: string;
  selectedSubArea: string;
  handleChange: (
    category: keyof IRangeDto,
    field: string,
    value: string
  ) => void;
  isFixed?: boolean;
}) => {
  const subAreas =
    LocationData.find((area) => area.name === selectedArea)?.subArea || [];
  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange("location", "si", e.target.value);
  };

  const handleSubAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange("location", "gu", e.target.value);
  };
  return (
    <Area>
      {isFixed ? (
        <>
          <FixedSelectStyled>{selectedArea}</FixedSelectStyled>
          <FixedSelectStyled>{selectedSubArea}</FixedSelectStyled>
        </>
      ) : (
        <>
          <SelectStyled value={selectedArea} onChange={handleAreaChange}>
            <OptionStyled value="">지역을 선택해주세요</OptionStyled>
            {LocationData.map((area) => (
              <OptionStyled key={area.name} value={area.name}>
                {area.name}
              </OptionStyled>
            ))}
          </SelectStyled>
          <SelectStyled value={selectedSubArea} onChange={handleSubAreaChange}>
            <OptionStyled value="">시,군,구를 선택해주세요</OptionStyled>
            {subAreas.map((subArea) => (
              <OptionStyled key={subArea} value={subArea}>
                {subArea}
              </OptionStyled>
            ))}
          </SelectStyled>
        </>
      )}
    </Area>
  );
};

export default LocationDropdown;

const Area = styled.div`
  display: flex;
  gap: 20px;
`;

const SelectStyled = styled.select`
  width: 200px;
  padding: 10px;
  background-color: var(--white);
  color: var(--black);
  border: 1px solid var(--black);
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
`;

const FixedSelectStyled = styled.div`
  width: 200px;
  padding: 10px;
  background-color: var(--white);
  color: var(--black);
  border: 1px solid var(--black);
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
`;

const OptionStyled = styled.option``;
