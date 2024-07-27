import { axiosFindUser } from "@/api/axios.custom";
import Modal, { IModalOptions } from "@/components/Modal";
import SearchCard from "@/components/SearchCard";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as FilterIcon } from "@/assets/icons/filter-icon.svg";
import { SocketContext } from "./LayoutPage";
import FilterModal from "@/components/FilterModal";
import Tag from "@/components/Tag";

export interface ISearchDateDto {
  profileImages: string;
  username: string;
  age: number;
  rate: number;
  // 프론트에서 필요한가?
  commonHashtags: number;
}

export interface IRangeDto {
  rate: { min: number | undefined; max: number | undefined };
  age: { min: number | undefined; max: number | undefined };
  location: { si: string; gu: string };
}

const SearchPage = () => {
  const [searchData, setSearchData] = useState<ISearchDateDto[]>([]);
  const [filterList, setFilterList] = useState<IModalOptions[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [rangeData, setRangeData] = useState<IRangeDto>({
    rate: { min: undefined, max: undefined },
    age: { min: undefined, max: undefined },
    location: { si: "", gu: "" },
  });

  const handleChange = useCallback(
    (category: keyof IRangeDto, field: string, value: number | string) => {
      setRangeData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: value,
        },
      }));
    },
    []
  );
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  //NOTE:  모달 태그 선택 창, 최악의 방법... ?사용..
  // TODO -> minAge만 들어갔을때 오류 안던지는거 같음
  const tryFindUser = async (selectedOption?: IModalOptions[]) => {
    let si = rangeData.location.si || undefined;
    let gu = rangeData.location.gu || undefined;
    let minAge = rangeData.age.min || undefined;
    let maxAge = rangeData.age.max || undefined;
    let minRate = rangeData.rate.min || undefined;
    let maxRate = rangeData.rate.max || undefined;
    // let hashtags = selectedOption.map((item) => item.key) || [];
    let hashtags =
      selectedOption && Array.isArray(selectedOption)
        ? selectedOption.map((item) => item.key)
        : undefined;
    try {
      const res = await axiosFindUser(
        si,
        gu,
        minAge,
        maxAge,
        minRate,
        maxRate,
        hashtags
      );
      // console.log("res", res);
      console.log("res data", res.data.users);
      setSearchData(res.data.users);
    } catch (error: any) {
      console.log("search page error", error);
    }
  };

  const onSubmint = (
    selectedOption: IModalOptions[],
    newRangeData: IRangeDto
  ) => {
    // 이때 모달의 모든 값들 여기로 보냄
    // 적용하기 버튼을 누르게 되면 range를 누르게 만들기
    setFilterList([...selectedOption]);
    setRangeData(newRangeData);
    tryFindUser(selectedOption);
    closeModal();
  };

  useEffect(() => {
    tryFindUser();
  }, []);

  const onClickTag = (tag: IModalOptions) => {
    if (filterList.some((item) => item.name === tag.name)) {
      setFilterList(filterList.filter((item) => item.name !== tag.name));
    } else {
      setFilterList([...filterList, tag]);
    }
  };

  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("connect", () => {
      {
        message: "message";
        id: 1;
      }
    });
  }, []);

  return (
    <>
      <Wrapper>
        <FilterWrapper>
          <FilterTitleStyled onClick={() => openModal()}>
            Filter
            <FilterIcon />
          </FilterTitleStyled>
        </FilterWrapper>
        <SelectTagStyled>
          {rangeData.location.si && (
            <TagStyled>{rangeData.location.si}</TagStyled>
          )}
          {rangeData.location.gu && (
            <TagStyled>{rangeData.location.gu}</TagStyled>
          )}
          {rangeData.age.min !== undefined &&
            rangeData.age.max !== undefined && (
              <TagStyled>
                age
                {rangeData.age.min} ~ {rangeData.age.max}
              </TagStyled>
            )}
          {rangeData.rate.min !== undefined &&
            rangeData.rate.max !== undefined && (
              <TagStyled>
                rate
                {rangeData.rate.min} ~ {rangeData.rate.max}
              </TagStyled>
            )}
          {filterList.map((tag) => (
            <TagStyled key={tag.name}>{tag.name}</TagStyled>
          ))}
        </SelectTagStyled>
        <SearchCardWrapper>
          {searchData.map((data) => (
            <SearchCard key={data.username} {...data} />
          ))}
        </SearchCardWrapper>
      </Wrapper>
      {modalOpen && (
        <FilterModal
          closeModal={closeModal}
          onClickTag={onClickTag}
          filterList={filterList}
          onSubmint={onSubmint}
          // handleChange={handleChange}
          rangeData={rangeData}
        />
      )}
    </>
  );
};
export default SearchPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(3px);
  /* filter: blur(6px); */
  /* justify-content: center; */
  /* height: 100%; */
  height: 85vh;
  padding-top: 10px;
  z-index: 1;
`;

// const SearchCardWrapper = styled.div`
//   backdrop-filter: blur(6px);
//   display: grid;
//   grid-template-columns: repeat(5, 200px);

//   /* grid-template-rows: 200px 200px; */
//   grid-auto-rows: 250px;
//   @media (max-width: 1000px) {
//     grid-template-columns: repeat(4, 1fr);
//   }

//   @media (max-width: 720px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (max-width: 480px) {
//     grid-template-columns: 1fr;
//   }
// `;

const SearchCardWrapper = styled.div`
  backdrop-filter: blur(6px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
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

  color: var(--font-search-color);
  & > svg > path {
    stroke: var(--font-search-color);
  }
`;

const SelectTagStyled = styled.div`
  backdrop-filter: blur(6px);
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

const FilterWrapper = styled.div`
  backdrop-filter: blur(6px);
  display: flex;
  gap: 30px;
`;
