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
	return (
		<Component>
			<Number>{day}</Number>
			{data &&
				data.map((game) => (
					<Wrapper key={game.cover}>
						<Cover alt={game.name} src={CoverURL(game.cover)} />
					</Wrapper>
				))}
		</Component>
	);
}
