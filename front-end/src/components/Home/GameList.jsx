import { Link } from "react-router-dom";
import GameCard from "../GameCard";
import {useQuery} from "react-query"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState, useRef, useEffect } from 'react'


import "./GameList.css";

function getFormattedDate(date) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  date = new Date(date)
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("default", options);
  }
}


export default function GameList({ date, filters }) {
  const [parent, enableAnimations] = useAutoAnimate()

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  // console.log(filter)
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
	const platformsFilter = filters
  // console.log("Data",data);
  if (!data.length || !data.some(({platforms}) => platforms.some(e=>platformsFilter.includes(e)))) {
    return null;
  }



	return (
		<div className="GameGroup" ref={parent}>
			<div className="date">{getFormattedDate(date)}</div>
			<div className="GameList" ref={parent}>
				{!data || data.length === 0 ? null : data.map(({game, platforms}) => (
					platforms.some(e=>platformsFilter.includes(e)) && game.cover!= null?
					<Link key={game.id} to={`/game/${game.slug}`} className="no-link flex">
						<GameCard image={game.cover} title={game.name} platforms={platforms} />
					</Link>
				:""))}
			</div>
		</div>
	);
}
