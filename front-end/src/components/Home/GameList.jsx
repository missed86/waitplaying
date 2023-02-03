import { Link } from "react-router-dom";
import GameCard from "../GameCard";
import {useQuery} from "react-query"

import "./GameList.css";
import { useEffect } from "react";

export default function GameList({ date, filters }) {
	useEffect(() => {
    console.log("GameList updated", filters);
  }, [filters]);

	const options = {
    method: "GET",
  };
  const { data, error, status } = useQuery(`game-${date}`, () =>
    fetch(`http://127.0.0.1:8000/api/releases/${date}/`, options)
      .then((response) => response.json())
      .catch((err) => {
        throw err;
      })
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

	const platformsFilter = ["PS5", "PS4", "Switch", "PC", "Series X"]
  console.log("Data",data);
	console.log("Filters", filters)
  


	return (
		<div className="GameGroup">
			<div className="date">{date}</div>
			<div className="GameList">
				{data.map(({game, platforms}) => (
					platforms.some(e=>platformsFilter.includes(e))?
					<Link key={game.id} to={`/game/${game.slug}`} className="no-link">
						{/* {console.log(game)} */}
						<GameCard image={game.cover} title={game.name} platforms={platforms} />
					</Link>
				:""))}
			</div>
		</div>
	);
}
