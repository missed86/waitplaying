import { useState } from "react";
// import "./Calendar.css";

import styled from "styled-components";
import ListViewMonth from "./ListViewMonth";
import {calendar_days} from "../../assets/icons"

const Component = styled.div`
  max-width: 350px;
  display:flex;
  flex: 1 1 0px;
  flex-direction: column;
  margin-bottom: 10px;
  overflow: hidden;
  border-radius: 5px;
  @media screen and (max-width: 900px) {
    display: ${(props) => (props.calendarView ? "none" : "flex")};
    max-width: inherit;
  }
`;
const Header = styled.div`
  display: flex;
  background-color: #202020;
  text-transform: uppercase;
  padding: 10px;
  justify-content: space-between;
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
const ToogleButton = styled.button`
  color: white;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 30px;
  svg {
    height: 25px;
    width: 25px;
  }
  cursor: pointer;
  @media screen and (min-width: 900px) {
    display: none;
  }
`

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
  const datetime = new Date(date + "-01");
  return `${monthList[datetime.getMonth()]} ${datetime.getFullYear()}`;
}

export default function ListView({ list, calendarView, setCalendarView }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nowMonth = today.getMonth();
  const nowYear = today.getFullYear();

  const reorganized_list = [];
  let max_date = "";
  for (const date in list) {
    const datetime = new Date(date);

    const year = datetime.getFullYear();
    const month = `${year}-${String(datetime.getMonth() + 1).padStart(2, "0")}`;

    if (datetime.getTime() >= today.getTime()) {
      max_date = month > max_date ? month : max_date;

      reorganized_list[month] = !reorganized_list[month]
        ? (reorganized_list[month] = [])
        : reorganized_list[month];
      reorganized_list[month][date] = list[date];
    }
  }

  const toogleCalendar = () => {
    setCalendarView(!calendarView);
  };
  return (
    <Component calendarView={calendarView}>
      <Header>
        <span>My Next Releases</span>
        
        <ToogleButton onClick={toogleCalendar}>{calendar_days}</ToogleButton>
      </Header>
      <Wrapper>
        {Object.entries(reorganized_list).map(([month, dates]) => (
          <ListViewMonth
            key={month}
            month={dateToString(month)}
            dates={dates}
          />
        ))}
      </Wrapper>
    </Component>
  );
}
