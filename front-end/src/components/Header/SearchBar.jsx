import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

import SearchWindow from "./SearchWindow";

// https://heroicons.com/
// https://www.systemuicons.com/
const Component = styled.div`
  z-index: 1000;
  position: relative;
  display: flex;
  /* padding:0 50px 0 0; */
  position: relative;
  flex-grow: 1;
  ${props => (props.mobile ? `
    top: 50px;
    left: 0;
    margin:10px;
  ` 
  :`
  margin-left: 15px;
    @media only screen and (max-width: 540px) {
      display: none;
    }

  `
  )}
`;
const Input = styled.input`
  flex-grow: 1;
  padding: 0 10px 0 040px;
  background-color: rgb(39, 39, 39);
  border: none;
  border-radius: 5px;
  height: 38px;
  color: lightgrey;
  z-index: 3;
  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: gray;
  }
`;
const InputIcon = styled.span`
  position: absolute;
  color: lightgrey;
  top: 9px;
  left: 7px;
  width: 20px;
  height: 20px;
  z-index: 3;
`;

const Background = styled.div`
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  z-index: -1;
  content: "";
  position: fixed;
  ${props => (props.mobile ? `
    background-color: black;
  `
  :`
    background-color: rgba(0, 0, 0, 0.5);
  `)}
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &.show {
    visibility: visible;
    opacity: 1;
    z-index: -1;
    transition: all 0.3s ease-in-out;
  }
`;

const SEARCH_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

// const SEARCH_ICON2 = <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8.5" r="5"/><path d="m17.571 17.5-5.571-5.5"/></g></svg>

export default function SearchBar({mobile, mobileSetSearch}) {
  const [inputValue, setInputValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    if (event.target.value.length > 2) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };
  const handleFocus = (event) => {
    setInputValue(event.target.value);
    if (event.target.value.length > 2) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };
  const handleBlur = () => {
    if(!mobile)
    setShowSearch(false);
  };

  useEffect(() => {
    if(mobile)
    inputRef.current.focus();
  }, [mobile])
  
  return (
    <Component mobile={mobile}>
      <Input
        ref={inputRef}
        onFocus={handleFocus}
        type="search"
        placeholder="Search"
        onChange={handleChange}
      />
      <InputIcon>{SEARCH_ICON}</InputIcon>
      <SearchWindow
        mobile={mobile}
        mobileSetSearch={mobileSetSearch}
        query={inputValue}
        setActive={setShowSearch}
        active={showSearch}
      />
      <Background
        mobile={mobile}
        onClick={handleBlur}
        className={showSearch ? "show" : ""}
      ></Background>
    </Component>
  );
}
