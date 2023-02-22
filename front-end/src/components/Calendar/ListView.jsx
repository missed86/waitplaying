import { useState } from "react";
// import "./Calendar.css";
import styled from "styled-components";
import ListViewMonth from "./ListViewMonth"

const Component = styled.div`
  max-width: 350px;
  display: flex;
  flex: 1 1 0px;
  flex-direction: column;
  margin-bottom: 10px;
  overflow: hidden;
  border-radius: 5px;
`;
const Header = styled.div`
  display: flex;
  background-color: #202020;
  text-transform: uppercase;
  padding: 10px;
`;
const Wrapper = styled.div`
  overflow-y: auto;
  flex: 1 1 0px;
  border-right: 2px solid rgb(32, 32, 32);
  border-left: 2px solid rgb(32, 32, 32);
  border-bottom: 2px solid rgb(32, 32, 32);
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


const prueba = [
  { name: "God of War Ragnarök", cover: 23123 },
  { name: "God of War Ragnarök 2", cover: 23123 },
];
const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function dateToString(date) {
  // 2022-03 -> March 2022
  const datetime = new Date(date+"-01")
  return `${monthList[datetime.getMonth()]} ${datetime.getFullYear()}`
}

export default function ListView({ list }) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const nowMonth = today.getMonth();
  const nowYear = today.getFullYear();
  
  const reorganized_list = [];
  let max_date = "";
  for (const date in list) {
    const datetime = new Date(date);
    
    const year = datetime.getFullYear();
    const month = `${year}-${String(datetime.getMonth()+1).padStart(2, '0')}`;
    
    if (datetime.getTime()>=today.getTime()) {
      max_date = month > max_date ? month : max_date;
      
      reorganized_list[month] = !reorganized_list[month]
      ? (reorganized_list[month] = [])
      : reorganized_list[month];
      reorganized_list[month][date] = list[date];
    }
    
  }
  console.log("🚀 ~ file: ListView.jsx:98 ~ ListView ~ Object.entries(reorganized_list):", Object.entries(reorganized_list))

  return (
    <Component>
      <Header>My Next Releases</Header>
      <Wrapper>
        {
          Object.entries(reorganized_list).map(([month, dates]) => 
            	<ListViewMonth month={dateToString(month)} dates={dates}/>
          	)
        }
      </Wrapper>
    </Component>
  );
}
