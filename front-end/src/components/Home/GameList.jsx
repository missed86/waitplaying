import { Link } from "react-router-dom";
import GameCard from "../GameCard";

import "./GameList.css";

export default function GameList({ games, date }) {
	return (
		<div className="GameGroup">
			<div className="date">{date}</div>
			<div className="GameList">
				{games.map(({ title, cover, slug, platforms, id }) => (
					<Link key={id} to={`/game/${slug}`} className="no-link">
						<GameCard image={cover} title={title} platforms={platforms} />
					</Link>
				))}
			</div>
		</div>
	);
}
