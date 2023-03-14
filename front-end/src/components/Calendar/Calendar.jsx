import styled from "styled-components";
import { useState } from "react";

import { Day } from "./Day";
import {
  chevron_right,
  chevron_left,
  menu_icon,
  calendar_today,
} from "../../assets/icons";

const Component = styled.div`
  display: flex;
  flex: 1 1 0px;
  flex-direction: column;
  /* border: 2px solid rgb(32, 32, 32); */
  margin-bottom: 10px;
  overflow: hidden;
  border-radius: 5px;
  @media screen and (max-width: 900px) {
    display: ${(props) => (!props.calendarView ? "none" : "flex")};
  }
`;
const Header = styled.div`
  display: flex;
  background-color: #202020;
  text-transform: uppercase;
  /* padding: 10px; */
  justify-content: space-between;
  height: 41px;
  align-items: center;
`;
const Month = styled.span`
  padding: 0 0 0 10px;
`;
const Week = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Weekday = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;
const Days = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
const Buttons = styled.div`
  display: inline-flex;
  align-items: center;
`;
const Button = styled.button`
  color: white;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  cursor: pointer;
  /* margin: 0 10px 0 0; */
  svg {
    height: 25px;
    width: 25px;
    ${(props) =>
      props.calendar &&
      `
        height: 30px;
        width: 30px;
        transform: translateY(-1px);
      `
      }
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
  width: 41px;
  cursor: pointer;
  svg {
    height: 25px;
    width: 25px;
  }
  @media screen and (min-width: 900px) {
    display: none;
  }
`;

const generateMonthRows = (year, month, list) => {
  let firstDay = new Date(year, month, 1).getDay()+2;
  const today = `${year}-${(month + 1).toString().padStart(2, "0")}-${new Date().getDate()
    .toString()
    .padStart(2, "0")}`;
    
  const numDays = getDaysInMonth(year, month);
  const rows = [];
  let days = [];
  let cellCount = 0;

  // Agregar días vacíos antes del primer día del mes
  const firstEmptyDays = 7 - firstDay;
  for (let i = 0; i < firstEmptyDays; i++) {
    days.push(<Day key={`empty-${i}`} />);
    cellCount++;
  }

  // Agregar los días del mes
  for (let i = 1; i <= numDays; i++) {
    const date = `${year}-${(month + 1).toString().padStart(2, "0")}-${i
      .toString()
      .padStart(2, "0")}`;
    cellCount++;
    days.push(
      <Day
        key={i}
        date={date}
        day={i}
        data={list && list[date] ? list[date] : null}
        today= {date == today}
      />
    );
    if (cellCount % 7 === 0) {
      rows.push(<Row key={i}>{days}</Row>);
      days = [];
    }
  }

  // Agregar días vacíos después del último día del mes
  if (days.length > 0) {
    const numEmptyDays = 7 - days.length;
    for (let i = 0; i < numEmptyDays; i++) {
      days.push(<Day key={`empty-${i}`} />);
    }
    rows.push(<Row key={numDays}>{days}</Row>);
  }

  return rows;
};

const getMonthName = (month) => {
  const months = [
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
  return months[month];
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export default function Calendar({ list, calendarView, setCalendarView }) {
  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date().getDate();

  const handleToday = () => {
    setDate(new Date());
  };
  const handlePrevMonth = () => {
    setDate(new Date(year, month - 1, 1));
  };
  const handleNextMonth = () => {
    setDate(new Date(year, month + 1, 1));
  };
  const toogleCalendar = () => {
    setCalendarView(!calendarView);
  };
  return (
    <Component calendarView={calendarView}>
      <Header>
        <Month>{`${getMonthName(month)} ${year}`}</Month>
        <Buttons>
          <Button calendar onClick={handleToday}>
            {calendar_today(today)}
          </Button>
          <Button onClick={handlePrevMonth}>{chevron_left}</Button>
          <Button onClick={handleNextMonth}>{chevron_right}</Button>

          <ToogleButton onClick={toogleCalendar}>{menu_icon}</ToogleButton>
        </Buttons>
      </Header>
      <Week>
        <Weekday>mon</Weekday>
        <Weekday>tue</Weekday>
        <Weekday>wed</Weekday>
        <Weekday>thu</Weekday>
        <Weekday>fri</Weekday>
        <Weekday>sat</Weekday>
        <Weekday>sun</Weekday>
      </Week>
      <Days>{generateMonthRows(year, month, list)}</Days>
    </Component>
  );
}
