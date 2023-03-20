import { Link } from "react-router-dom";
import styled from "styled-components";
const Component = styled.div`
	display: flex;
	flex: 1;
	padding: 0;
	border: 1px solid #222;
	${'' /* border: 1px solid #303030; */}
		transition: all 0.5s ease-in-out;
		${(props) => !props.empty ?
			`&:hover {
			border: 1px solid #888;
			transition: all 0s ease-in-out;
		}`: ''
		}
	
	overflow: hidden;
	position: relative;
	${"" /* background-color: ${(props) => (props.today ? "#101010" : "")}; */}
	&:before {
		${(props) =>
			props.background
				? `background: url(` + CoverURL(props.background) + `);`
				: ""}
		background-size: cover;
		content: "";
		flex: 1;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		filter: blur(5px);
		opacity: 0.3;
		transform: scale(1.1)
	}
	@media screen and (max-width: 900px) {
		flex-direction: column;
	}
`;
const Number = styled.span`
	position: absolute;
	top: 10px;
	left: 10px;
	width: 20px;
	height: 20px;
	text-align: center;
	text-shadow: -1px -1px 1px #000000, 1px -1px 1px #000000, -1px 1px 1px #000000,
		1px 1px 1px #000000;
	${(props) =>
		props.today &&
		`
		font-weight: 690;
		color: #111;
		border-radius:3px;
		background-color: orange;
		text-shadow:none;
	`}
`;
const Cover = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	object-fit: ${(props) => (props.multiple ? "cover" : "contain")};
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
const CoverSmallURL = (id) =>
	`https://images.igdb.com/igdb/image/upload/t_cover_small/${id}.png`;

export function Day({ date, day, data, today, empty }) {
	return (
		<Component empty={empty} today={today} background={data ? data[0].cover : false}>
			{data &&
				data.map((game) => (
					<Wrapper key={game.cover}>
						<Link to={`../game/${game.slug}`}>
							<Cover
								alt={game.name}
								src={CoverURL(game.cover)}
								multiple={data.length > 1}
							/>
						</Link>
					</Wrapper>
				))}
			<Number today={today}>{day}</Number>
		</Component>
	);
}
