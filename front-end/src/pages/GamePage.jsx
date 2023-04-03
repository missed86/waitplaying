import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

import "./Game.css";

import GameOptions from "../components/Game/GameOptions";
import Gallery from "../components/Game/Gallery";
import { ReleasesTable } from "../components/Game/ReleasesTable";

const CoverURL = (id) =>
	`https://images.igdb.com/igdb/image/upload/t_cover_big/${id}.png`;
const ScreenshotURL = (id) =>
	`https://images.igdb.com/igdb/image/upload/t_original/${id}.jpg`;

const Label = styled.h2`
	display: block;
	font-size: 12px;
	text-transform: uppercase;
	border-bottom: 1px solid #333;
`;
const releaseText = (date) => {
	const release_date = moment(date.date);
	switch (date.category) {
		case 1:
			return `${release_date.format("MMMM, YYYY")}`;
		case 2:
			return `${release_date.format("YYYY")}`;
		case 3:
			return `Q1 ${release_date.format("YYYY")}`;
		case 4:
			return `Q2 ${release_date.format("YYYY")}`;
		case 5:
			return `Q3 ${release_date.format("YYYY")}`;
		case 6:
			return `Q4 ${release_date.format("YYYY")}`;
		case 7:
			return "TBD";
		default:
			return "TBD";
	}
};
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
		release_dates,
		...extra
	} = data ? data : {};
	screenshots = screenshots ? screenshots.split(",") : [];
	// console.log("🚀 ~ file: GamePage.jsx:101 ~ GamePage ~ release_dates[0].date:", release_dates[0].category)
	
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
								<h2>{releaseText(release_dates[0])}</h2>
							</div>
							{/* <p>
								{platforms
									.map((e) => e.name)
									.sort()
									.join(", ")}
							</p> */}

							<Label>Release Dates</Label>
							<ReleasesTable
								platforms={platforms}
								release_dates={release_dates}
							/>
							{/* <p>{genres.join(", ")}</p> */}
							<Label>Summary</Label>
							<p>{summary}</p>
							{/* <p>Follows: {extra.follows}</p>
							<p>
								Critic Rating: {Math.round(extra.aggregated_rating * 10) / 10}
							</p>
							<p>User Rating: {Math.round(extra.total_rating * 10) / 10}</p> */}
						</div>
					</div>
					<Label>Screenshots</Label>
					<Gallery screenshots={screenshots} />
				</div>
			)}
		</>
	);
}
