import styled from "styled-components";
import { useState, useEffect } from "react";

import SearchWindow from "./SearchWindow"

// https://heroicons.com/
// https://www.systemuicons.com/
const Component = styled.div`
	z-index: 1000;
	position: relative;
	display: flex;
	/* padding:0 50px 0 0; */
	margin-left: 15px;
	position: relative;
	flex-grow: 1;
	@media only screen and (max-width: 540px) {
		display: none;
	}
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

export default function SearchBar() {
	const [inputValue, setInputValue] = useState("");
	const [showSearch, setShowSearch] = useState(false);
  const [searchResult, setSearchResult] = useState({})
  
  

  const handleChange = (event) => {
    setInputValue(event.target.value);
    if (event.target.value.length > 2) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

	return (
		<Component>
			<Input type="text" placeholder="Search" onChange={handleChange}></Input>
			<InputIcon>{SEARCH_ICON}</InputIcon>
			<SearchWindow query={inputValue} active={showSearch} className={showSearch ? "show" : ""}/>
		</Component>
	);
}
