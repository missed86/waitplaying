import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import "./Game.css";

import GameOptions from "../components/Game/GameOptions";



const CoverURL = (id) =>
  `https://images.igdb.com/igdb/image/upload/t_cover_big/${id}.png`;
const ScreenshotURL = (id) =>
  `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${id}.jpg`;

export default function GamePage() {
  const { slug } = useParams();
  const options = {
    method: "GET",
  };
  const { data, error, status } = useQuery(`game-${slug}`, () =>
    fetch(`http://127.0.0.1:8000/api/games/${slug}/`, options)
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

  console.log(data);
  let {
    id,
    name,
    cover,
    screenshots,
    // genres,
    first_release_date,
    summary,
    platforms,
    ...extra
  } = data[0];
  screenshots = screenshots !== null ? screenshots.split(",") : [];
  platforms;

  return (
    <div className="Game">
      <div className="backcover-wrapper">
        <img
          className="backcover"
          src={ScreenshotURL(screenshots[0])}
          alt={name}
        />
      </div>
      <div className="main">
        <div className="side-menu">
          <img className="cover" src={CoverURL(cover)} alt={name} />
          <GameOptions gameid={id}/>
        </div>
        <div className="description">
          <div className="title">
            <h1>{name}</h1>
            <h2>{first_release_date}</h2>
          </div>
          <p>{platforms.map(e=>e.name).sort().join(", ")}</p>
          {/* <p>{genres.join(", ")}</p> */}
          <p>{summary}</p>
          <p>Follows: {extra.follows}</p>
          <p>Critic Rating: {Math.round(extra.aggregated_rating*10)/10}</p>
          <p>User Rating: {Math.round(extra.total_rating*10)/10}</p>
        </div>
      </div>
    </div>
  );
}
