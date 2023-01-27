import { Link } from "react-router-dom";

export default function CalendarCell({ game, children, ...other }) {
	console.log(game);
	return (
		<>
			{game ? (
				<Link to={`../game/${game[0].slug}`} className="no-link">
					<div className="Calendar-cell has-game" {...other}>
						<span class="CalendarCell-day">{children}</span>
						{game && (
							<img
								className="CalendarCell-cover"
								src={game[0].cover}
								alt={game[0].title}
							></img>
						)}
					</div>
				</Link>
			) : (
				<div className="Calendar-cell" {...other}>
					<span class="CalendarCell-day">{children}</span>
				</div>
			)}
		</>
	);
}
