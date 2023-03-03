import { Link } from "react-router-dom";
import styled from "styled-components";
const Component = styled.div`
	display: flex;
	flex: 1;
	padding: 0;
	border: 1px solid #303030;
	overflow: hidden;
	position: relative;
`;
const Number = styled.span`
	position: absolute;
	top: 10px;
	left: 10px;
`;
const Cover = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	object-fit: cover;
	height: 100%;
`;
const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex: 1;
	transition: all 0.3s ease-in-out;
	&:hover {
		flex: 4;
		transition: all 0.3s ease-in-out;
	}
`;

const CoverURL = (id) =>
	`https://images.igdb.com/igdb/image/upload/t_cover_big/${id}.png`;

export function Day({ date, day, data }) {
	console.log("🚀 ~ file: Day.jsx:39 ~ Day ~ data:", data)
	
	return (
		<Component>
			<Number>{day}</Number>
			{data &&
				data.map((game) => (
					<Wrapper key={game.cover}>
						<Link to={`../game/${game.slug}`}><Cover alt={game.name} src={CoverURL(game.cover)} /></Link>
					</Wrapper>
				))}
		</Component>
	);
}
