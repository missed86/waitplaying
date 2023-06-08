// import GameGroup from "../components/GameGroup";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import GameCard from "../components/GameCard";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import moment from "moment";

// const dates = [];
// const today = new Date();
const platforms = ["PS4", "PS5", "Switch", "XONE", "Series X", "PC", "PSVR2"];
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

// for (let i = 0; i <= 10; i++) {
// 	const nextDate = new Date();
// 	nextDate.setDate(today.getDate() - i);
// 	const formattedDate = nextDate.toISOString().slice(0, 10);
// 	dates.push(formattedDate);
// }
const CoverURL = (cover) =>
	`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.png`;

const Page = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-shrink: 1;
	justify-content: center;
	`;
const Section = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
	grid-gap: 15px;
	@media only screen and (max-width: 450px) {
		grid-template-columns: repeat(2, 1fr);
	}
	opacity: ${(props) => (props.isLoading ? 0 : 1)};
	transition: all 1s ease-in-out;
	margin-bottom: 30px;
`;
const Title = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
const Main = styled.div`
	@media only screen and (min-width: 1295px) {
		width: 1250px;
		margin: 0 auto;
	}

`;
const formattedDate = (date) => moment(date).format("MMMM DD");

function HomePage() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`https://api.waitplaying.com/home/`)
			.then((response) => {
				setData(response.data);
				setLoading(false);
				setError(null);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	}, []);
	const { featured_releases, featured_next_month, most_anticipated_year } =
		data || [];

	return loading ? (
		<Loading />
	) : (
		<Page>
			<Main>
				{featured_releases && (
					<>
						<Title>
							<h1>Games of the month</h1>
							{/* <span>More...</span> */}
						</Title>
						<Section>
							{featured_releases.map(
								({ game, platforms, slug, release_date }) => (
									<Link
										key={game.id}
										to={`/game/${slug}`}
										className="no-link flex"
									>
										<GameCard
											image={game.cover}
											title={game.name}
											platforms={platforms.map(
												(platform) => platform.abbreviation
											)}
											release_date={formattedDate(release_date)}
										/>
									</Link>
								)
							)}
						</Section>
					</>
				)}
				{featured_next_month && (
					<>
						<Title>
							<h1>
								Games of{" "}
								{
									months[
										new Date(featured_next_month[0].release_date).getMonth()
									]
								}
							</h1>
							{/* <span>More...</span> */}
						</Title>
						<Section>
							{featured_next_month.map(
								({ game, platforms, slug, release_date }) => (
									<Link
										key={game.id}
										to={`/game/${slug}`}
										className="no-link flex"
									>
										<GameCard
											image={game.cover}
											title={game.name}
											platforms={platforms.map(
												(platform) => platform.abbreviation
											)}
											release_date={formattedDate(release_date)}
										/>
									</Link>
								)
							)}
						</Section>
					</>
				)}
				{most_anticipated_year && (
					<>
						<Title>
							<h1>Most anticipated games of the year</h1>
							{/* <span>More...</span> */}
						</Title>
						<Section>
							{most_anticipated_year.map(
								({ game, platforms, slug, release_date }) => (
									<Link
										key={game.id}
										to={`/game/${slug}`}
										className="no-link flex"
									>
										<GameCard
											image={game.cover}
											title={game.name}
											platforms={platforms.map(
												(platform) => platform.abbreviation
											)}
											release_date={formattedDate(release_date)}
										/>
									</Link>
								)
							)}
						</Section>
					</>
				)}
			</Main>
		</Page>
	);
}

export default HomePage;
