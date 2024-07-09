import { axiosFindUser } from "@/api/axios.custom";
import LocationDropdown from "@/components/LocationDropdown";
import Modal, { IModalOptions } from "@/components/Modal";
import SearchCard from "@/components/SearchCard";
import { ageLableMap, InterestLableMap, rateLableMap } from "@/types/maps";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { images } from "./ProfilePage";
import { tagItem } from "./SignUpPage";
import { ReactComponent as FilterIcon } from "@/assets/icons/filter-icon.svg";
import ModalFin from "@/components/ModalFIn";

const ageFilterList: tagItem[] = Object.entries(ageLableMap).map(
  ([key, name]) => ({ key, name })
);
const rateFilterList: tagItem[] = Object.entries(rateLableMap).map(
  ([key, name]) => ({ key, name })
);

const interestTagList: tagItem[] = Object.entries(InterestLableMap).map(
  ([key, name]) => ({ key, name })
);

export interface ISearchDateDto {
  profileImages: string;
  username: string;
  age: number;
  rate: number;
  // 프론트에서 필요한가?
  commonHashtags: number;
  // handler: () => void;
}

const SearchPage = () => {
  const [searchData, setSearchData] = useState<ISearchDateDto[]>([]);
  const [filterList, setFilterList] = useState<IModalOptions[]>([]);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedSubArea, setSelectedSubArea] = useState<string>("");
  const handleAreaChange = (e: any) => {
    setSelectedArea(e.target.value);
  };
  const handleSubAreaChange = (e: any) => {
    setSelectedSubArea(e.target.value);
  };
  const openModal = (title: string) => {
    setModalOpen(true);
    setModalTitle(title);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // useEffect(() => {
  //   console.log("selectedArea", selectedArea);
  //   console.log("selectedSubArea", selectedSubArea);
  // }, [selectedArea, selectedSubArea]);

  // 모달 태그 선택 창

  const tryFindUser = async () => {
    let si = selectedArea;
    let gu = selectedSubArea;
    let minAge = 0;
    let maxAge = 0;
    // let username = "";
    let minRate = 0;
    let maxRate = 0;
    let hashtags: string[] = [];
    try {
      const res = await axiosFindUser(
        undefined,
        undefined,
        undefined,
        undefined,
        si,
        gu,
        undefined
      );
      console.log("res", res);
      console.log("res data", res.data.users);
      setSearchData(res.data.users);
    } catch (error: any) {
      console.log("search page error", error);
    }
  };

  const onSubmint = (selectedOption: IModalOptions[]) => {
    setFilterList([...selectedOption]);
    console.log("filterList", filterList);
    closeModal();
    tryFindUser();
  };

  const selectModalOptions = (title: string) => {
    if (title === "Age") {
      return ageFilterList;
    } else if (title === "Rate") {
      return rateFilterList;
    } else {
      return interestTagList;
    }
  };

  const onClickTag = (tag: IModalOptions) => {
    if (filterList.some((item) => item.name === tag.name)) {
      setFilterList(filterList.filter((item) => item.name !== tag.name));
    } else {
      setFilterList([...filterList, tag]);
    }
  };

  return (
    <Wrapper>
      <FilterWrapper>
        <FilterTitleStyled onClick={() => openModal("test")}>
          Filter
          <FilterIcon />
        </FilterTitleStyled>
      </FilterWrapper>
      <SelectTagStyled>
        {filterList.map((tag) => (
          <TagStyled key={tag.name}>{tag.name}</TagStyled>
        ))}
      </SelectTagStyled>
      <SearchCardWrapper>
        {searchData.map((data) => (
          <SearchCard key={data.username} {...data} />
        ))}
      </SearchCardWrapper>
      {modalOpen && (
        <ModalFin
          modalTitle={modalTitle}
          options={selectModalOptions(modalTitle)}
          title="Age"
          closeModal={closeModal}
          onClickTag={onClickTag}
          filterList={filterList}
          onSubmint={onSubmint}
          selectedArea={selectedArea}
          selectedSubArea={selectedSubArea}
          handleAreaChange={handleAreaChange}
          handleSubAreaChange={handleSubAreaChange}
        />
      )}
    </Wrapper>
  );
};
export default SearchPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
  padding-top: 10px;
`;

const SearchCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 200px);

  /* grid-template-rows: 200px 200px; */
  grid-auto-rows: 250px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }

  /* @media (max-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  } */

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const TagStyled = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  padding: 5px 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
`;

const FilterTitleStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  font-weight: 600;
  width: 100px;
  height: 40px;
`;

const SelectTagStyled = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 30px;
`;
