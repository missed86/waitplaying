import styled from "styled-components";
import { Link } from "react-router-dom";

const Component = styled.div`
	padding: 10px;
	flex-direction: row;
	display: flex;
`;
const DateDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 4px 10px 0 0;
	align-items: center;
	width: 1.6em;
`;
const DayName = styled.span`
	text-align: center;
	font-size: 0.9em;
	line-height: 10px;
`;
const Day = styled.span`
	text-align: center;
	font-size: 1.3em;
`;
const Games = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	flex: 1;
`;
const Game = styled.div`
	padding: 10px 10px 10px 20px;
	background-color: #2f2f2f;
	border-radius: 5px;
`;

export default function Item({ games, date }) {
	const datetime = new Date(date);
	const weekday = datetime.getDay();
	const day = datetime.getDate();
	const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
	return (
		<Component>
			<DateDiv>
				<DayName>{weekdays[weekday]}</DayName>
				<Day>{day}</Day>
			</DateDiv>
			<Games key={"ListItemGames-" + date}>
				{games.map((game) => (
					<Link key={'ItemLink'+game.id+game.name} to={`/game/${game.slug}`} className="no-link">
						<Game key={game.name}>{game.name}</Game>
					</Link>
				))}
			</Games>
		</Component>
	);
}
