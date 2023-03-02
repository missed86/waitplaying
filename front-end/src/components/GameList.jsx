import { Link } from "react-router-dom";
import GameCard from "./GameCard";
import axios from "axios";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
// import "./GameList.css";

const GameGroup = styled.div`
  margin-bottom: 20px;
`;
const DateDiv = styled.div`
  text-transform: uppercase;
  display: flex;
  ${"" /* width: 100px; */}
  padding: 5px;
  background-color: rgb(26, 26, 26);
  margin: 10px 0;
`;
const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  grid-gap: 15px;
  @media only screen and (max-width: 450px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

function getFormattedDate(date) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  date = new Date(date);
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
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const labelDiff = () =>
      diffDays < 0
        ? `${Math.abs(diffDays)} days ago`
        : `${diffDays} days remaining`;
    return `${date.toLocaleDateString("default", options)} (${labelDiff()})`;
  }
}

export default function GameList({ date, filters }) {
  const { user, tokens, logoutUser } = useContext(AuthContext);
  const [parent, enableAnimations] = useAutoAnimate();

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = user
    ? {
        method: "GET",
        url: `http://127.0.0.1:8000/api/releases/${date}/`,
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      }
    : {
        method: "GET",
        url: `http://127.0.0.1:8000/api/releases/${date}/`,
      };
  const fetchData = async () => {
    try {
      const response = await axios.request(options);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

  if (error) {
    logoutUser();
    return <div>Error: {error.message}</div>;
  }

  const filteredData = data.filter(({ platforms }) =>
    platforms.some((e) => filters.includes(e))
  );

  if (!filteredData.length) {
    return null;
  }

  // console.log("🚀 ~ file: GameList.jsx:106 ~ GameList ~ filteredData:",date, filteredData)
  return (
    filteredData[0].game.cover &&
    (loading ? (
      <GameGroup ref={parent}>
        <DateDiv>{getFormattedDate(date)}</DateDiv>
        <List ref={parent}>
          <GameCard
			empty={true}
          />
        </List>
      </GameGroup>
    ) : (
      <GameGroup ref={parent}>
        <DateDiv>{getFormattedDate(date)}</DateDiv>
        <List ref={parent}>
          {filteredData.map(({ game, platforms, mark }) =>
            game.cover ? (
              <Link
                key={game.id}
                to={`/game/${game.slug}`}
                className="no-link flex"
              >
                <GameCard
                  image={game.cover}
                  title={game.name}
                  platforms={platforms}
                  marked={user ? (mark ? mark : false) : false}
                />
              </Link>
            ) : null
          )}
        </List>
      </GameGroup>
    ))
  );
}
