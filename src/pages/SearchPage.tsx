import { axiosFindUser } from "@/api/axios.custom";
import { InterestLableMap } from "@/types/maps";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { tagItem } from "./SignUpPage";
import { ReactComponent as FilterIcon } from "@/assets/icons/filter-icon.svg";
import TagList from "@/components/TagTemplate";
import FilterModal from "@/components/search/FilterModal";
import SearchCard from "@/components/search/SearchCard";

export interface ISearchDateDto {
  profileImages: string;
  username: string;
  age: number;
  rate: number;
  si?: string;
  gu?: string;
}

const HashTagsList: tagItem[] = Object.entries(InterestLableMap).map(
  ([value, label]) => ({ value, label })
);

type ModalType = "age" | "rate" | "location" | "hashtag";

const SearchPage = () => {
  const [searchData, setSearchData] = useState<ISearchDateDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: ModalType | null;
  }>({
    isOpen: false,
    type: null,
  });
  const [values, setValues] = useState({
    age: { min: 20, max: 100 },
    rate: { min: 0, max: 5 },
    location: { si: "", gu: "" },
    hashtag: [] as string[],
  });
  const cardsPerPage = 15;
  const currentCards = searchData.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const paginate = setCurrentPage;
  const openModal = (type: ModalType) => setModalState({ isOpen: true, type });
  const closeModal = () => setModalState({ isOpen: false, type: null });
  const tryFindUser = async () => {
    try {
      const res = await axiosFindUser(
        values.location.si || undefined,
        values.location.gu || undefined,
        values.age.min,
        values.age.max,
        values.rate.min,
        values.rate.max,
        values.hashtag.length > 0 ? values.hashtag : undefined
      );
      console.log("res search", res);
      setSearchData(res.data.users);
    } catch (error: any) {
      console.log("search page error", error);
    }
  };

  const handleSave = (value: any) => {
    if (modalState.type) {
      switch (modalState.type) {
        case "age":
        case "rate":
          setValues((prev) => ({
            ...prev,
            [modalState.type as keyof typeof prev]: {
              min: value[0],
              max: value[1],
            },
          }));
          break;
        case "location":
          setValues((prev) => ({ ...prev, location: value }));
          break;
        case "hashtag":
          setValues((prev) => ({ ...prev, hashtag: value }));
          break;
      }
      closeModal();
    }
  };

  useEffect(() => {
    tryFindUser();
  }, [values]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <Container>
      <FilterContainer>
        {["age", "rate", "location", "hashtag"].map((type) => (
          <FilterItemStyled
            key={type}
            onClick={() => openModal(type as ModalType)}
          >
            <FilterTitleStyled>
              {type.charAt(0).toUpperCase() + type.slice(1)}
              <FilterIcon />
            </FilterTitleStyled>

            <FilterValueContainer>
              <FilterValueStyled>
                {type === "age" && `${values.age.min} ~ ${values.age.max}`}
                {type === "rate" && `${values.rate.min} ~ ${values.rate.max}`}
                {type === "location" &&
                  (values.location.si
                    ? `${values.location.si}${
                        values.location.gu ? `, ${values.location.gu}` : ""
                      }`
                    : "Not set")}
              </FilterValueStyled>
            </FilterValueContainer>
          </FilterItemStyled>
        ))}
      </FilterContainer>

      <SelectTagStyled>
        <TagList
          tags={HashTagsList}
          onTagSelect={() => {}}
          onTagRemove={(tag) => {
            setValues((prev) => ({
              ...prev,
              hashtag: prev.hashtag.filter((t) => t !== tag.value),
            }));
          }}
          selectedTags={values.hashtag || []}
          showRemoveIcon={true}
          selectable={false} // 선택 기능 비활성화
          showSelectedOnly={true}
        />
      </SelectTagStyled>

      <SearchCardContainer>
        {currentCards.map((data) => (
          <SearchCard key={data.username} {...data} />
        ))}
      </SearchCardContainer>

      {modalState.isOpen && modalState.type && (
        <FilterModal
          title={modalState.type}
          onClose={closeModal}
          onSave={handleSave}
          values={values}
        />
      )}
      <Pagination>
        {Array.from({
          length: Math.ceil(searchData.length / cardsPerPage),
        }).map((_, index) => (
          <PageButton
            key={index}
            onClick={() => paginate(index + 1)}
            $active={currentPage === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </Container>
  );
};
export default SearchPage;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<{ $active: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid
    ${(props) => (props.$active ? "var(--brand-main-1)" : "var(--line-gray-3)")};
  background-color: ${(props) =>
    props.$active ? "var(--brand-main-1)" : "white"};
  color: ${(props) => (props.$active ? "white" : "var(--black)")};
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) =>
      props.$active ? "var(--brand-main-1)" : "var(--brand-sub-2)"};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 32px 32px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const FilterItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 210px;
  border: 1px solid var(--black);
  box-shadow: 5px 5px 5px 0 var(--black);
  padding: 10px 20px;
  align-items: flex-end;

  @media screen and (max-width: 768px) {
    width: calc(50% - 30px);
  }

  @media screen and (max-width: 460px) {
    width: 100%;
  }
`;

const FilterTitleStyled = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.4;

  width: 100%;
  border-bottom: 1px solid var(--black);
`;

const FilterValueContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--black);
  width: 92px;
  height: 43px;
`;

const FilterValueStyled = styled.div`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
`;

const SearchCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(252px, calc(17.5vw - 0.694vw)), 1fr)
  );
  grid-auto-rows: min(300px, calc((17.5vw - 0.694vw) * 1.19));
  gap: 26px;
  width: 100%;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(min(252px, calc(23.3vw - 0.933vw)), 1fr)
    );
    grid-auto-rows: min(300px, calc((23.3vw - 0.933vw) * 1.19));
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(min(252px, calc(35vw - 1.4vw)), 1fr)
    );
    grid-auto-rows: min(300px, calc((35vw - 1.4vw) * 1.19));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SelectTagStyled = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
  margin-bottom: 80px;
`;
