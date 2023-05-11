import { useEffect, useState } from "react";
import GameList from "../components/GameList";
import PlatformBar from "../components/PlatformBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import "./Home.css";
import styled from "styled-components";

const Home = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
// const dates = [];
// const today = new Date();
const platforms = ["PS4", "PS5", "Switch", "XONE", "Series X", "PC", "PSVR2", "Meta Quest 2"];

const MAX_NUM_DATES = 90;

function HomePage() {
  const [dates, setDates] = useState([]);
  const [numDates, setNumDates] = useState(5);
  const [key, setKey] = useState(0);

  const [parent] = useAutoAnimate()

  const [filters, setFilters] = useState(
    localStorage.getItem("filtersStore")
      ? JSON.parse(localStorage.getItem("filtersStore"))
      : platforms
  );
  useEffect(() => {
    const today = new Date();
    const newDates = [];
    for (let i = 0; i < numDates; i++) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() - i);
      const formattedDate = nextDate.toISOString().slice(0, 10);
      newDates.push(formattedDate);
    }
    setDates(newDates);
  }, [numDates]);
  // console.log("🚀 ~ file: HomePage.jsx:39 ~ HomePage ~ numDates:", numDates);
  useEffect(() => {
    if (numDates > 30) {
      setNumDates(10);
      setKey((prevKey) => prevKey + 1);
    }
  }, [filters]);
  return (
    <Home>
      <PlatformBar filters={filters} setFilters={setFilters} />
      <h1>New Releases</h1>
      <InfiniteScroll ref={parent}
        style={{ overflow: "hidden" }}
        key={key}
        dataLength={numDates}
        next={() => {
          if (numDates >= MAX_NUM_DATES) {
            return; // no cargues más fechas si se ha alcanzado el límite máximo
          }
          setNumDates(numDates + 1);
        }}
        hasMore={numDates < MAX_NUM_DATES} // no hay más fechas si se ha alcanzado el límite máximo
      >
        {dates.slice(0, numDates).map((date) => (
          <GameList key={date} date={date} filters={filters}/>
        ))}
      </InfiniteScroll>
    </Home>
  );
}

export default HomePage;
