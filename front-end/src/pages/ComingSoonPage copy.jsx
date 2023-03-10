// import GameGroup from "../components/GameGroup";
import { useState } from "react";
import GameList from "../components/GameList";
import PlatformBar from "../components/PlatformBar";

import "./Home.css";

const dates = [];
const today = new Date();
const platforms = ["PS4", "PS5", "Switch", "XONE", "Series X", "PC", "PSVR2" ]

for (let i = 0; i <= 10; i++) {
	const nextDate = new Date();
	nextDate.setDate(today.getDate() + i+1);
	const formattedDate = nextDate.toISOString().slice(0, 10);
	dates.push(formattedDate);
  }

function ComingSoonPage() {
	// const filter = platforms.filter((e) => e.actived === true).map((e) => e.name);
	const [filters, setFilters] = useState(
		localStorage.getItem("filtersStore")
		  ? JSON.parse(localStorage.getItem("filtersStore"))
		  : platforms
	  );
	return (
		<div className="Home">
			<PlatformBar filters={filters} setFilters={setFilters}/>
			<h1>Coming Soon</h1>
			{dates.map((date) => (
				<GameList key={date} date={date} filters={filters}/>
			))}
		</div>
	);
}

export default ComingSoonPage;
