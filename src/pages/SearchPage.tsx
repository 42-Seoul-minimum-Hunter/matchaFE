import { axiosFindUser } from "@/api/axios.custom";
import LocationDropdown from "@/components/LocationDropdown";
import Modal, { IModalOptions } from "@/components/Modal";
import SearchCard from "@/components/SearchCard";
import SearchHeader from "@/components/SearchHeader";
import SearchModal from "@/components/SearchModal";
import { ageLableMap, InterestLableMap, rateLableMap } from "@/types/maps";
import { ageType } from "@/types/tag.enum";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { images } from "./ProfilePage";
import { tagItem } from "./SignUpPage";

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
  img: string;
  nickname: string;
  age: number;
  rate: number;
  handler: () => void;
}

const SearchPage = () => {
  const navigator = useNavigate();
  const [filterList, setFilterList] = useState<IModalOptions[]>([]);
  const [modalTitle, setModalTitle] = useState<string>("");
  // const [ageType, setAgeType] = useState<ageType | null>(null);
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

  // 모달 태그 선택 창
  const onSubmint = (selectedOption: IModalOptions[]) => {
    setFilterList([...selectedOption]);
    console.log("filterList", filterList);
    closeModal();
    // try {
    //   const res = axiosFindUser();
    //   console.log(res);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  useEffect(() => {
    let si = selectedArea;
    let gu = selectedSubArea;
    let minAge = 0;
    let maxAge = 0;
    let username = "";
    let minRate = 0;
    let maxRate = 0;
    let hashtags: string[] = [];
    filterList.forEach((option) => {
      if (ageFilterList.some((item) => item.name === option.name)) {
        // 나이 필터 처리
        const [min, max] = option.name.split("~");
        minAge = parseInt(min);
        maxAge = parseInt(max);
      }
      //   else if (rateFilterList.some((item) => item.name === option.name)) {
      //     // 평점 필터 처리
      //     const [min, max] = option.name.split("~");
      //     minRate = parseInt(min);
      //     maxRate = parseInt(max);
      //   } else if (interestTagList.some((item) => item.name === option.name)) {
      //     // 관심사 태그 처리
      //     hashtags.push(option.name);
      //   }
    });
    try {
      const res = axiosFindUser({
        minAge,
        maxAge,
        username,
        minRate,
        maxRate,
        si,
        gu,
        hashtags,
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }, [filterList]);

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

  const onProfileClick = () => {
    navigator("/profile");
  };

  const mockData: ISearchDateDto[] = Array.from({ length: 30 }, (_, index) => ({
    img: images[index % images.length],
    nickname: `User${index + 1}`,
    age: index + 23,
    rate: Math.round(Math.random() * 60) / 10,
    handler: () => {
      // userName 백으로 보내고 profile 페이지로 이동
      onProfileClick();
      // console.log(`Handler for User${index + 1}`);
    },
  }));

  return (
    <Wrapper>
      <FilterWrapper>
        <FilterTitleStyled onClick={() => openModal("Age")}>
          Age
        </FilterTitleStyled>
        <FilterTitleStyled onClick={() => openModal("Rate")}>
          Rate
        </FilterTitleStyled>
        <FilterTitleStyled onClick={() => openModal("Interest")}>
          Interest
        </FilterTitleStyled>
        <LocationDropdown
          selectedArea={selectedArea}
          selectedSubArea={selectedSubArea}
          handleAreaChange={handleAreaChange}
          handleSubAreaChange={handleSubAreaChange}
        />
      </FilterWrapper>
      <SelectTagStyled>
        {filterList.map((tag) => (
          <TagStyled key={tag.name}>{tag.name}</TagStyled>
        ))}
      </SelectTagStyled>

      <SearchCardWrapper>
        {mockData.map((data) => (
          <SearchCard key={data.nickname} {...data} />
        ))}
      </SearchCardWrapper>
      {modalOpen && (
        <Modal
          modalTitle={modalTitle}
          options={selectModalOptions(modalTitle)}
          title="Age"
          // modalOpen={modalOpen}
          closeModal={closeModal}
          onClickTag={onClickTag}
          filterList={filterList}
          onSubmint={onSubmint}
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
