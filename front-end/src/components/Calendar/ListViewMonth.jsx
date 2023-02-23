import styled from "styled-components";
import Day from "./Item";

const Title = styled.div`
  padding: 10px;
  height: 50px;
  background-color: #959595;
  color: white;
  font-size: 1.2em;
  text-shadow: 0px 0px 5px black;
  background-image: url("${props=>props.background}");
  background-repeat: no-repeat, repeat;
  background-size: cover;
  background-position: center;
  font-weight: 500;
  text-shadow: -2px -2px 2px #00000070, 2px -2px 2px #00000070, -2px 2px 2px #00000070, 2px 2px 2px #00000070;
`;
const CoverURL = (id) =>
	`https://images.igdb.com/igdb/image/upload/t_cover_big/${id}.png`;


export default function Month({ month, dates }) {
  
  return (
    <>
      <Title background={CoverURL(dates[Object.keys(dates)[0]][0].cover)}>{month}</Title>
      {Object.entries(dates).map(([date,game]) => (
        <Day key={date} games={game} date={date} />
      ))}
    </>
  );
}
