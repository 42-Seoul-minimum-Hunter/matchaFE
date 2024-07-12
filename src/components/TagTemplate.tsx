import styled from "styled-components";

import { useEffect, useRef, useState } from "react";
import { tagItem } from "@/pages/SignUpPage";

export interface ITagTemplateProps<T> {
  title?: string;
  tagList: tagItem[];
  setState: React.Dispatch<React.SetStateAction<T>>;
  initialState?: T;
  isModify?: boolean;
  selectedTag?: string[];
}

const TagTemplate = <T,>({
  title,
  tagList,
  initialState,
  setState,
  isModify,
  selectedTag,
}: ITagTemplateProps<T>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const buttons = wrapperRef.current?.querySelectorAll("button");
    // console.log("selectedTag", selectedTag);
    // console.log("tagList", tagList);
    if (isModify) {
      buttons?.forEach((button) => {
        if (
          selectedTag &&
          selectedTag.includes(button.classList[0].toLowerCase())
        ) {
          button.classList.add("selected");
        }
      });
    } else {
      if (title === "Interest") {
        let temp: any[] = initialState ? [...(initialState as any[])] : [];
        buttons?.forEach((button) => {
          const buttonClassName = button.className;
          // if (button.classList.contains(`${initialState}`)) {
          if (temp.some((item) => buttonClassName.includes(item))) {
            button.classList.add("selected");
          }
        });
      } else {
        buttons?.forEach((button) => {
          if (button.classList.contains(`${initialState}`)) {
            button.classList.add("selected");
          }
        });
      }
    }
  }, [initialState]);

  const clickToggle = (e: any) => {
    const target = e.target as HTMLButtonElement;
    if (isModify && target === e.currentTarget) return;

    if (title === "Interest") {
      const selectedKey = target.className.split(" ")[0];
      const buttons = wrapperRef.current?.querySelectorAll("button");

      let temp: any[] = initialState ? [...(initialState as any[])] : [];
      if (target.classList.contains("selected")) {
        // setState(temp?.filter((item: any) => item !== selectedKey));
        setState(
          temp.filter((item) => item !== selectedKey) as React.SetStateAction<T>
        );
        target.classList.remove("selected");
        return;
      } else {
        setState([...temp, selectedKey] as React.SetStateAction<T>);
      }
    } else {
      const selectedKey = target.className.split(" ")[0];
      const buttons = wrapperRef.current?.querySelectorAll("button");
      if (target.classList.contains("selected")) {
        target.classList.remove("selected");
        setState(null as React.SetStateAction<T>);
        return;
      }
      buttons?.forEach((button) => {
        if (button.classList.contains("selected")) {
          button.classList.remove("selected");
        }
      });
      // target.classList.add("selected");
      setState(selectedKey as React.SetStateAction<T>);
    }
  };

  return (
    <Wrapper>
      {title && <h2>{title}</h2>}
      <TagWrapper ref={wrapperRef}>
        {tagList.map((item, index) => (
          <button key={index} className={item.key} onClick={clickToggle}>
            {item.name}
          </button>
        ))}
      </TagWrapper>
    </Wrapper>
  );
};

export default TagTemplate;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    margin-bottom: 25px;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  button {
    padding: 12px 15px;
    border-radius: 10px;
    width: fit-content;
    display: flex;
    /* border: 1px solid var(--tag-stroke); */
    flex-direction: column;

    color: var(--black);
    background-color: var(--white);
    border: 1px solid var(--tag-stroke);
  }

  /* button.categoryButton {
    color: var(--normal-text-color);
    background-color: var(--card-content-bg-color);
  } */

  button.selected {
    /* target.style.color = "var(--white)";
        target.style.backgroundColor = "var(--vermilion)"; */
    color: var(--white);
    background-color: var(--vermilion);
  }
`;

// button.not-selected {
//   /* target.style.color = "var(--white)";
//       target.style.backgroundColor = "var(--vermilion)"; */
//   color: var(--white);
//   background-color: var(--vermilion);
// }

// const Button = styled.div`
//   width: fit-content;
//   display: flex;
//   flex-direction: column;
//   background-color: var(--vermilion);
// `;
