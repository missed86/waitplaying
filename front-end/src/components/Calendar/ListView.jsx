import { useState } from "react";
// import "./Calendar.css";
import styled from "styled-components";
import Item from "./Item";

const Component = styled.div`
  display: flex;
  flex: 1 1 0px;
  flex-direction: column;
  border: 2px solid rgb(32, 32, 32);
  /* max-height: 90vh; */
  /* height: 90vh; */
  margin-bottom: 10px;
  overflow: hidden;
  border-radius: 5px;
`;
const Header = styled.div`
  display: flex;
  background-color: #202020;
    text-transform: uppercase;
  /* flex: 1 1 0%; */
  padding: 10px;
  /* height: 45px; */
`;
const Wrapper = styled.div`
  overflow-y: auto;
  flex: 1 1 0px;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-track {
  }

  &::-webkit-scrollbar-thumb {
    background-color: #202020;
    padding: 10px;
    border-radius: 5px;
  }
`;
const Month = styled.div`
  padding: 10px;
  height: 50px;
  background-color: #959595;
  color: black;
  font-size: 1.2em;
  
  font-weight: 500;
`;




export default function ListView() {
  return (
    <Component>
      <Header>My Next Releases</Header>
      <Wrapper>
        <Month>February 2023</Month>
        <Item name="God of War Ragnarök" date="2023-02-21" />
        <Item name="God of War 2" date="2023-02-23" />
        <Item name="God of War 3" date="2023-02-24" />
        
      </Wrapper>
    </Component>
  );
}
