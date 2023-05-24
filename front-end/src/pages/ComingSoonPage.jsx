import { useEffect, useState } from "react";
import GameList from "../components/GameList";
import PlatformBar from "../components/PlatformBar";
import InfiniteScroll from "react-infinite-scroll-component";

import "./Home.css";

// const dates = [];
// const today = new Date();
const platforms = ["PS4", "PS5", "Switch", "XONE", "Series X", "PC", "PSVR2"]; //, "Meta Quest 2"

// for (let i = 0; i <= 10; i++) {
// 	const nextDate = new Date();
// 	nextDate.setDate(today.getDate() - i);
// 	const formattedDate = nextDate.toISOString().slice(0, 10);
// 	dates.push(formattedDate);
// }

const MAX_NUM_DATES = 90

function HomePage() {
	const [dates, setDates] = useState([]);
	const [numDates, setNumDates] = useState(10);
  const [key, setKey] = useState(0);

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
			nextDate.setDate(today.getDate() + i+1);
			const formattedDate = nextDate.toISOString().slice(0, 10);
			newDates.push(formattedDate);
		}
		setDates(newDates);
	}, [numDates]);
	useEffect(() => {
    if (numDates > 30) {
      setNumDates(10);
      setKey((prevKey) => prevKey + 1);
    }
	}, [filters]);
	return (
		<div className="Home">
			<h1>Coming Soon</h1>
			<PlatformBar filters={filters} setFilters={setFilters} />
			<InfiniteScroll
				style={{"overflow":"hidden"}}
				key={key}
				dataLength={numDates}
				next={() => {
					if (numDates >= MAX_NUM_DATES) {
						return; // no cargues más fechas si se ha alcanzado el límite máximo
					}
					setNumDates(numDates + 3);
				}}
				hasMore={numDates < MAX_NUM_DATES} // no hay más fechas si se ha alcanzado el límite máximo
			>
				{dates.slice(0, numDates).map((date) => (
					<GameList key={date} date={date} filters={filters} />
				))}
			</InfiniteScroll>
		</div>
	);
}

export default HomePage;
