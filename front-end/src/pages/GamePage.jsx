import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

import "./Game.css";

import GameOptions from "../components/Game/GameOptions";
import Gallery from "../components/Game/Gallery";

const CoverURL = (id) =>
	`https://images.igdb.com/igdb/image/upload/t_cover_big/${id}.png`;
const ScreenshotURL = (id) =>
	`https://images.igdb.com/igdb/image/upload/t_original/${id}.jpg`;

export default function GamePage() {
	const { slug } = useParams();
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://127.0.0.1:8000/api/games/${slug}/`)
			.then((response) => {
				setData(response.data[0]);
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	}, [slug]);

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
	} = data ? data : {};
	screenshots = screenshots ? screenshots.split(",") : [];
	const release_date = moment(first_release_date);

	return (
		<>
			{loading && <div>Loading...</div>}
			{!loading && error && <Item>Error: {error.message}</Item>}
			{!loading && (
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
							<GameOptions gameid={id} />
						</div>
						<div className="description">
							<div className="title">
								<h1>{name}</h1>
								<h2>
									{release_date.format("LL")} ({release_date.fromNow()})
								</h2>
							</div>
							<p>
								{platforms
									.map((e) => e.name)
									.sort()
									.join(", ")}
							</p>
							{/* <p>{genres.join(", ")}</p> */}
							<p>{summary}</p>
							<p>Follows: {extra.follows}</p>
							<p>
								Critic Rating: {Math.round(extra.aggregated_rating * 10) / 10}
							</p>
							<p>User Rating: {Math.round(extra.total_rating * 10) / 10}</p>
						</div>
					</div>
					<Gallery screenshots={screenshots} />
				</div>
			)}
		</>
	);
}
