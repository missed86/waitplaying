import { Link } from "react-router-dom";
import GameCard from "../GameCard";
import {useQuery} from "react-query"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState, useRef, useEffect } from 'react'
import styled  from "styled-components";
// import "./GameList.css";

const GameGroup = styled.div`
  margin-bottom: 20px;
`
const DateDiv = styled.div`
  display:flex;
  width: 100px;
  padding:5px;
  background-color: rgb(26, 26, 26);
  margin: 10px 0; 
`
const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(190px,1fr));
  grid-gap: 15px;
  @media only screen and (max-width: 450px) {
    grid-template-columns: repeat(2, 1fr);
 }
`

function getFormattedDate(date) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  date = new Date(date)
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
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
  data.sort((a,b)=>{
    if (a.game.follows === null && b.game.follows === null) {
      return b.game.aggregated_rating - a.game.aggregated_rating;
    } else if (a.game.follows === null) {
      return 1;
    } else if (b.game.follows === null) {
      return -1;
    } else {
      return b.game.follows - a.game.follows;
    }
  })
	const platformsFilter = filters
  // console.log("Data",data);
  if (!data.length || !data.some(({platforms}) => platforms.some(e=>platformsFilter.includes(e)))) {
    return null;
  }



	return (
		<GameGroup ref={parent}>
			<DateDiv>{getFormattedDate(date)}</DateDiv>
			<List ref={parent}>
				{!data || data.length === 0 ? null : data.map(({game, platforms}) => (
					platforms.some(e=>platformsFilter.includes(e)) && game.cover!= null?
					<Link key={game.id} to={`/game/${game.slug}`} className="no-link flex">
						<GameCard image={game.cover} title={game.name} platforms={platforms} />
					</Link>
				:""))}
			</List>
		</GameGroup>
	);
}
