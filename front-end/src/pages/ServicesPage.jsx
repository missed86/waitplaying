import { useNavigate } from "react-router-dom";
// import GameCard from "../GameCard";
import axios from "axios";
import { useAutoAnimate } from "@formkit/auto-animate/react";
// import autoAnimate from "@formkit/auto-animate";
import { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";

import ServicesBar from "../components/Services/ServicesBar";
import { arrow_in, arrow_out } from "../assets/icons";

import moment from "moment";
import SEO from "../components/Services/SEO";
import Loading from "../components/Loading";

const Page = styled.div`
	width: 100%;
`;
const List = styled.div`
	margin: 10px 0;
`;
const Table = styled.div`
	display: table;
	width: 100%;
`;
const Row = styled.div`
	display: table-row;
	&:hover {
		${"" /* background-color: #3C3C3C; */}
		border-radius: 5px;
		box-shadow: 0px 0px 3px 0px #888;
		cursor: pointer;
	}
`;
const Cell = styled.div`
	border-bottom: 1px solid #202020;
	display: table-cell;
	vertical-align: middle;
	padding: 10px 5px;

	${(props) =>
		props.styled == "type" &&
		`
		text-align:center;
		& svg {
			width: 20px;
		}
	`}
	${(props) =>
		props.dates &&
		`
		@media only screen and (max-width: 600px) {
			display: none;
		}
		white-space: nowrap;
	`}

	${(props) =>
		props.styled == "title" &&
		`
		font-size: 1.1rem;
		padding-left: 20px;
	`}
`;
const Cover = styled.img`
	height: 100px;
	aspect-ratio: 0.75;
	border-radius: 5px;
	object-fit: cover;
`;
const Box = styled.div`
	padding: 5px;
	display: flex;
	border-radius: 5px;
	width: 150px;
	flex-direction: row;
	${(props) =>
		props.service && `background-color: ${service_colors[props.service]};`}
	${(props) =>
		props.active &&
		`
		opacity: 0.7;
	`}
`;
const Badge = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 2px;
`;
const service_colors = {
	psplus: "#003087",
	gamepass_pc: "#232323",
	gamepass_console: "#167416",
};
const img_routes = {
	psplus: "/assets/services/psplus-mini.png",
	gamepass_pc: "/assets/services/gppc-mini.png",
	gamepass_console: "/assets/services/gpxbox-mini.png",
};
const CoverURL = (cover) =>
	`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.png`;

function removeDuplicateIds(array) {
	const ids = new Set();

	// Filtrar el array manteniendo solo los objetos con ids únicos
	const resultado = array.filter((obj) => {
		if (ids.has(obj.game.id)) {
			// Si el id ya fue visto, se omite este objeto
			return false;
		}
		// Si es la primera vez que se encuentra el id, se agrega al set
		ids.add(obj.game.id);
		return true;
	});

	// return resultado;
	return array;
}

const formattedDate = (date) => {
	const momentDate = moment(date);
	return momentDate.format("LL");
};

export default function ServicesPage() {
	const { user, tokens, logoutUser, updateToken } = useContext(AuthContext);
	const [parent] = useAutoAnimate();

	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const [filter, setFilter] = useState(() =>
		localStorage.getItem("services_filter") 
		? JSON.parse(localStorage.getItem("services_filter")) 
		: {
			gamepass_pc: true,
			gamepass_console: true,
			psplus: true,
			in_out: "all",
		}
	);

	const options = {
		method: "GET",
		url: `https://api.waitplaying.com/services2/`,
		params: {
			gamepass_pc: filter.gamepass_pc.toString(),
			gamepass_console: filter.gamepass_console.toString(),
			psplus: filter.psplus.toString(),
			in_out: filter.in_out,
		},
	};
	const fetchData = async (notfirst) => {
		if (!notfirst) setLoading(true);
		try {
			const response = await axios.request(options);
			// console.log(options())
			setData(response.data);
			setLoading(false);
		} catch (error) {
			// logoutUser();
			// setError(error);
			// setLoading(true);
			updateToken();
		}
	};

	useEffect(() => {
		fetchData(true);
		localStorage.setItem("services_filter", JSON.stringify(filter));
	}, [filter]);

	useEffect(() => {
		// logoutUser();
		if (error) {
			// logoutUser();
			// setError(null);
			// setLoading(true);
			updateToken();
		} else {
			fetchData();
			setLoading(false);
		}
	}, [user, tokens]); // error

	const navigate = useNavigate();
	const customLink = (slug) => {
		navigate(`/game/${slug}`);
	};

	return (
		<Page>
			<SEO title="WaitPlaying - On Services" path="services"/>
			<h1>On Services</h1>
			<ServicesBar loading={loading} filter={filter} setFilter={setFilter} />
			{loading ? (
					<Loading />
				) : 
			(<List>
					{data && (
						<Table>
							{removeDuplicateIds(data).map((element, index) => {
								return (
									<Row
										onClick={() => customLink(element.game.slug)}
										key={element.game.id + element.service + index}
										service={element.service}
									>
										<Cell styled="type">
											{element.type == "in"
												? arrow_in("#548935")
												: arrow_out("#962b2b")}
										</Cell>
										<Cell>
											<Box
												service={element.service}
												active={element.type == "out"}
											>
												<Cover src={CoverURL(element.game.cover)} />
												<Badge>
													<img src={img_routes[element.service]}></img>
												</Badge>
											</Box>
										</Cell>
										<Cell styled="title">{element.game.name}</Cell>
										<Cell dates>
											{element.type == "in"
												? <>Since <span>{formattedDate(element.start_date)}</span></>
												: <>Until <span>{formattedDate(element.end_date)}</span></>
											}
										</Cell>
									</Row>
								);
							})}
						</Table>
					)
				}
			</List>)
			}
		</Page>
	);
}
