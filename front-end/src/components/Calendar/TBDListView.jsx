import styled from "styled-components";
import Day from "./Item";
import { Link } from "react-router-dom";


const Game = styled.div`
	padding: 10px 10px 10px 20px;
	background-color: #2f2f2f;
	border-radius: 5px;
`;
const Games = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	flex: 1;
    padding:10px;
`;
const Title = styled.div`
	padding: 10px;
	height: 50px;
	color: white;
	font-size: 1.2em;
	background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
		url("${(props) => props.background}");
	background-repeat: no-repeat, repeat;
	background-size: cover;
	background-position: center;
	background-color: rgba(128, 128, 128, 0.5);
	font-weight: 500;
	text-shadow: -2px -2px 2px #00000070, 2px -2px 2px #00000070,
		-2px 2px 2px #00000070, 2px 2px 2px #00000070;
	cursor: default;
`;
const Center = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`
const CoverURL = (id) =>
	`https://images.igdb.com/igdb/image/upload/t_cover_big/${id}.png`;

export default function TBDListView({ TBDListView }) {
	return (
		TBDListView.lenght>0 ? 
		<>
			<Title background={CoverURL(TBDListView[0][1])} alt="To Be Determinated">TBD</Title>
            <Games>
			
			{TBDListView.map((game, index) => (
				<Link key={'ItemLink'+index+game[0]} to={`/game/${game[2]}`} className="no-link">
                    <Game>{game[0]}</Game>
                </Link>
			))}

            </Games>
		</>
		:
		<>
			<Center>No following games</Center>
		</>
	);
}
