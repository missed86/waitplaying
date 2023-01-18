// import GameGroup from "../components/GameGroup";
import GameList from "../components/Home/GameList";
import PlatformBar from "../components/PlatformBar";

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
};

function Home() {
	return (
		<div className="Home">
			<PlatformBar />
			<h1>New Releases</h1>
			{
				Object.keys(games).map((date) => (
					<GameList key={date} date={date} games={games[date]} />
				))
			}
		</div>
	);
}

export default Home;
