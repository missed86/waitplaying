import styled from "styled-components";

const Component = styled.div`
  padding: 10px;
  flex-direction: row;
  display: flex;
`;
const DateDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const DayName = styled.span`
  text-align: center;
  font-size: 0.9em;
  line-height: 10px;
  `;
const Day = styled.span`
  text-align: center;
  font-size: 1.3em;
  `;
const Game = styled.div`
  padding: 10px 10px 10px 20px;
  `;

export default function Item({ name, cover, date }) {
  const datetime = new Date(date);
  const weekday = datetime.getDay();
  const day = datetime.getDate();
  const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return (
    <Component>
      <DateDiv>
        <DayName>{weekdays[weekday]}</DayName>
        <Day>{day}</Day>
      </DateDiv>
      <Game>{name}</Game>
    </Component>
  );
}
