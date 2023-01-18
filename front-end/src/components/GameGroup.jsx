import GameList from "./Home/GameList";

export default function GameGroup({ games }) {
	return (
		<>
			{games.map((games) => (
				<GameList games={games} />
			))}
		</>
	);
}
