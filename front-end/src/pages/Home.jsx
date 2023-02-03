// import GameGroup from "../components/GameGroup";
import GameList from "../components/Home/GameList";
import PlatformBar from "../components/PlatformBar";
import {useState} from "react"

import "./Home.css";

const games = {
	"17-01-2023": [
		{
			title: "God of War Ragnarök",
			slug: "god-of-war-ragnarok",
			cover: "./assets/pruebas/co5s5v.png",
			platforms: ["PS5", "PS4"],
			id: "sda54d3sa",
		},
		{
			title: "The Callisto Protocol",
			slug: "the-callisto-protocol",
			cover: "./assets/pruebas/co4ymo.png",
			platforms: ["SeriesX/S", "One", "PS4", "PS5", "PC"],
			id: "hft6htr5",
		},
	],
	"16-01-2023": [
		{
			title: "A Plague Tale: Requiem",
			slug: "a-plague-tale-requiem",
			cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5pwb.png",
			platforms: ["PS5", "SeriesX/S", "PC"],
			id: "hft6hwetr5",
		},
	],
	"22-06-2023": [
		{
			title: "Final Fantasy XVI",
			slug: "final-fantasy-xvi",
			cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5w3k.png",
			platforms: ["PS5", "PC"],
			id: "hft6hwetr6545",
		},
	],
};

const dates = ["2023-02-03", "2023-02-02", "2023-02-01"]

function Home() {
	const [filters, setFilters] = useState([]);
	return (
		<div className="Home">
			<PlatformBar filters={filters} setFilters={setFilters} />
			<h1>New Releases</h1>
			{
				dates.map((date) => (
					<GameList key={date} date={date} filter={filters}/>
				))
			}
		</div>
	);
}

export default Home;
