import { Link } from "react-router-dom";
import styled from "styled-components";

const Cover = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
	transition: all 0.2s ease-in-out;
	z-index: 10;
`;
const Cell = styled.div`
	position: relative;
	/* display: grid; */
	text-align: right;
	border: 1px solid rgb(49, 49, 49);
	height: 110px;
	width: 100%;
	&:hover ${Cover} {
		position: absolute;
		top:0;
		left:0;
		transform: scale(1.2);
		overflow: visible;
		transition:all 0.2s ease-in-out;
	}

	${(props) =>
		props.hasGame &&
		`
			cursor: pointer;
			${Day} {
				z-index: 11;
				opacity: 0.3;
				transition:all 0.2s ease-in-out;
			}
			&:hover ${Day}{
					opacity: 0;
					transition:all 0.2s ease-in-out;
}
		`}
`;
const Day = styled.span`
	transition: all 0.2s ease-in-out;
	position: absolute;
	right: 10px;
	bottom: -25px;
	opacity: 0.3;
	font-size: 67px;
	font-style: italic;
	font-weight: 700;
	text-shadow: 5px 5px 5px black;
`;

export default function CalendarCell({ game, children, ...other }) {
	return (
		<>
			{game ? (
				<Link to={`../game/${game[0].slug}`} className="no-link">
					<Cell hasGame {...other}>
						<Day>{children}</Day>
						{game && <Cover src={game[0].cover} alt={game[0].title}></Cover>}
					</Cell>
				</Link>
			) : (
				<Cell {...other}>
					<Day>{children}</Day>
				</Cell>
			)}
		</>
	);
}
