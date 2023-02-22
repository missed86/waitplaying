import styled from "styled-components";
import Day from "./Item";

const Title = styled.div`
  padding: 10px;
  height: 50px;
  background-color: #959595;
  color: black;
  font-size: 1.2em;
  text-shadow: 0px 0px 5px white;
  background-image: url("https://images.igdb.com/igdb/image/upload/t_cover_big/co2gn3.png");
  background-repeat: no-repeat, repeat;
  background-size: cover;
  font-weight: 500;
`;

export default function Month({ month, dates }) {
  console.log("🚀 ~ file: ListViewMonth.jsx:18 ~ Month ~ dates:", dates)
  console.log("🚀 ~ file: ListViewMonth.jsx:17 ~ Month ~ month:", month);
  return (
    <>
      <Title>{month}</Title>
      {Object.entries(dates).map(([date,game]) => (
        <Day games={game} date={date} />
      ))}
    </>
  );
}
