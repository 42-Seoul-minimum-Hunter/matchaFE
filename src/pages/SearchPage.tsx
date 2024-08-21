import { axiosFindUser } from "@/api/axios.custom";
import { InterestLableMap } from "@/types/maps";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { tagItem } from "./SignUpPage";
import { ReactComponent as FilterIcon } from "@/assets/icons/filter-icon.svg";
import TagList from "@/components/TagTemplate";
import FilterModal from "@/components/search/FilterModal";
import SearchCard from "@/components/search/SearchCard";
import useRouter from "@/hooks/useRouter";
import { HashTagsList } from "@/types/tags";

export interface ISearchDateDto {
  profileImages: string;
  username: string;
  age: number;
  rate: number;
  si?: string;
  gu?: string;
}

type ModalType = "age" | "rate" | "location" | "hashtag" | "sort";

// const SearchPage = () => {
//   const { goToMain } = useRouter();
//   const [searchData, setSearchData] = useState<ISearchDateDto[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalProfiles, setTotalProfiles] = useState(0);
//   const [modalState, setModalState] = useState<{
//     isOpen: boolean;
//     type: ModalType | null;
//   }>({
//     isOpen: false,
//     type: null,
//   });
//   const [values, setValues] = useState({
//     age: { min: 20, max: 100 },
//     rate: { min: 0, max: 5 },
//     location: { si: "", gu: "" },
//     hashtag: [] as string[],
//     sort: "descRate",
//   });

//   const openModal = (type: ModalType) => setModalState({ isOpen: true, type });
//   const closeModal = () => setModalState({ isOpen: false, type: null });
//   const tryFindUser = async (page: number) => {
//     try {
//       const res = await axiosFindUser(
//         values.location.si || undefined,
//         values.location.gu || undefined,
//         values.age.min || undefined,
//         values.age.max || undefined,
//         values.rate.min || undefined,
//         values.rate.max || undefined,
//         values.hashtag.length > 0 ? values.hashtag : undefined,
//         page,
//         values.sort || undefined
//       );
//       setSearchData(res.data.users);
//       setTotalProfiles(res.data.totalCount);
//       setCurrentPage(res.data.currentPage);
//     } catch (error: any) {
//       goToMain();
//       console.log("search page error", error);
//     }
//   };

//   const handleSave = (value: any) => {
//     if (modalState.type) {
//       switch (modalState.type) {
//         case "age":
//         case "rate":
//           setValues((prev) => ({
//             ...prev,
//             [modalState.type as keyof typeof prev]: {
//               min: value[0],
//               max: value[1],
//             },
//           }));
//           break;
//         case "location":
//           setValues((prev) => ({ ...prev, location: value }));
//           break;
//         case "hashtag":
//           setValues((prev) => ({ ...prev, hashtag: value }));
//           break;
//         case "sort":
//           setValues((prev) => ({ ...prev, sort: value }));
//           break;
//       }
//       closeModal();
//     }
//   };

//   // const isFirstRender = useRef(true);

//   useEffect(() => {
//     tryFindUser(1);
//     // if (isFirstRender.current) {
//     //   tryFindUserBrowser(1);
//     //   isFirstRender.current = false;
//     // } else {
//     //   tryFindUser(1);
//     // }
//   }, [values]);

//   const totalPages = Math.ceil(totalProfiles / 15);
//   const pageGroup = Math.ceil(currentPage / 10);
//   const lastPage = pageGroup * 10;
//   const firstPage = lastPage - 9;

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//       tryFindUser(newPage);
//     }
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [currentPage]);

const SearchPage = () => {
  const { goToMain } = useRouter();
  const [searchData, setSearchData] = useState<ISearchDateDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProfiles, setTotalProfiles] = useState(0);
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
    sort: "descRate",
  });

  const initialValuesRef = useRef(values);

  const openModal = (type: ModalType) => setModalState({ isOpen: true, type });
  const closeModal = () => setModalState({ isOpen: false, type: null });

  const tryFindUser = async (page: number) => {
    try {
      const isAgeChanged =
        values.age.min !== initialValuesRef.current.age.min ||
        values.age.max !== initialValuesRef.current.age.max;

      const isRateChanged =
        values.rate.min !== initialValuesRef.current.rate.min ||
        values.rate.max !== initialValuesRef.current.rate.max;

      const changedValues = {
        si:
          values.location.si !== initialValuesRef.current.location.si
            ? values.location.si
            : undefined,
        gu:
          values.location.gu !== initialValuesRef.current.location.gu
            ? values.location.gu
            : undefined,
        minAge: isAgeChanged ? values.age.min : undefined,
        maxAge: isAgeChanged ? values.age.max : undefined,
        minRate: isRateChanged ? values.rate.min : undefined,
        maxRate: isRateChanged ? values.rate.max : undefined,
        hashtag:
          JSON.stringify(values.hashtag) !==
          JSON.stringify(initialValuesRef.current.hashtag)
            ? values.hashtag
            : undefined,
        sort:
          values.sort !== initialValuesRef.current.sort
            ? values.sort
            : undefined,
      };

      const res = await axiosFindUser(
        changedValues.si,
        changedValues.gu,
        changedValues.minAge,
        changedValues.maxAge,
        changedValues.minRate,
        changedValues.maxRate,
        changedValues.hashtag && changedValues.hashtag.length > 0
          ? changedValues.hashtag
          : undefined,
        page,
        changedValues.sort
      );
      setSearchData(res.data.users);
      setTotalProfiles(res.data.totalCount);
      setCurrentPage(res.data.currentPage);
    } catch (error: any) {
      goToMain();
      console.log("search page error", error);
    }
  };

  const handleSave = (value: any) => {
    if (modalState.type) {
      setValues((prev) => {
        const newValues = { ...prev };
        switch (modalState.type) {
          case "age":
          case "rate":
            newValues[modalState.type] = { min: value[0], max: value[1] };
            break;
          case "location":
            newValues.location = value;
            break;
          case "hashtag":
            newValues.hashtag = value;
            break;
          case "sort":
            newValues.sort = value;
            break;
        }
        return newValues;
      });
      closeModal();
    }
  };

  useEffect(() => {
    tryFindUser(1);
  }, [values]);

  const totalPages = Math.ceil(totalProfiles / 15);
  const pageGroup = Math.ceil(currentPage / 10);
  const lastPage = pageGroup * 10;
  const firstPage = lastPage - 9;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      tryFindUser(newPage);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <Container>
      <FilterContainer>
        {["age", "rate", "location", "hashtag", "sort"].map((type) => (
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
                {type === "sort" && `${values.sort}`}
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
        {searchData.map((data) => (
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
        <ArrowButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </ArrowButton>

        {firstPage > 1 && (
          <>
            <PageButton onClick={() => handlePageChange(1)}>1</PageButton>
            {firstPage > 2 && <PageEllipsis>...</PageEllipsis>}
          </>
        )}

        {[...Array(10)].map((_, index) => {
          const pageNumber = firstPage + index;
          return pageNumber <= totalPages ? (
            <PageButton
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              $active={currentPage === pageNumber}
            >
              {pageNumber}
            </PageButton>
          ) : null;
        })}

        {lastPage < totalPages && (
          <>
            {lastPage < totalPages - 1 && <PageEllipsis>...</PageEllipsis>}
            <PageButton onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </PageButton>
          </>
        )}

        <ArrowButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </ArrowButton>
      </Pagination>
    </Container>
  );
};
export default SearchPage;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 5px;
`;

const PageButton = styled.button<{ $active?: boolean; disabled?: boolean }>`
  margin: 0 2px;
  padding: 5px 10px;
  border: 1px solid
    ${(props) =>
      props.disabled
        ? "var(--line-gray-2)"
        : props.$active
        ? "var(--brand-main-1)"
        : "var(--line-gray-3)"};
  background-color: ${(props) =>
    props.disabled
      ? "var(--line-gray-1)"
      : props.$active
      ? "var(--brand-main-1)"
      : "white"};
  color: ${(props) =>
    props.disabled
      ? "var(--line-gray-3)"
      : props.$active
      ? "white"
      : "var(--black)"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 5px;
  font-size: 14px;
  min-width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? "var(--line-gray-1)"
        : props.$active
        ? "var(--brand-main-1)"
        : "var(--brand-sub-2)"};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--brand-main-2);
  }
`;

const ArrowButton = styled(PageButton)`
  font-weight: bold;
`;

const PageEllipsis = styled.span`
  margin: 0 5px;
  color: var(--black);
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
