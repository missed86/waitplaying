import styled from "styled-components";
import { css, keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Component = styled.div`
	position: absolute;
	flex-direction: column;
	display: flex;
	visibility: hidden;
	${(props) =>
		props.mobile
			? `
		width: 100%;
		top: 50px;
		height:calc(100vh - 140px);
	`
			: `
		top: 0;
		right: 0;
		width: 500px;
		max-height: 50vh;
	`}
	min-height: 80px;
	background-color: #202020;
	border-radius: 7px;
	opacity: 0;
	transition: all 0.3s ease-in-out;
	padding: 10px 0px;
	overflow-y: auto;
	::-webkit-scrollbar-thumb {
		background-color: #505050;
		padding: 10px;
		border-radius: 5px;
	}
	::-webkit-scrollbar {
		width: 5px;
		background-color: transparent;
	}

	&.show {
		visibility: visible;
		opacity: 1;
		top: calc(100% + 10px);
		transition: all 0.3s ease-in-out;
	}
`;
const Item = styled.div`
	display: flex;
	flex-grow: 1;
	align-items: center;
	border-radius: 5px;
	&:hover {
		background-color: #303030;
	}
	margin: 0 10px;
	padding: 5px 0;
	max-height: 100px;
`;
const Cover = styled.img`
	border-radius: 5px;
	aspect-ratio: 0.75;
	object-fit: cover;
	${(props) =>
		props.mobile
			? `	
		margin: 10px 10px;
		height: 90px;
	`
			: `
		margin: 5px 15px;
		height: 75px;
	`}
`;
const CoverAside = styled.div`
	display: flex;
	align-items: center;
`;
const skeletonAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
	  `;


const LoadingData = styled.div`
	display: flex;
	flex-direction: column;

	& h1 {
		${(props) =>
			props.mobile
				? `
      font-size: 17px;
    `
				: `
      font-size: 16px;
    `}
		font-weight: normal;
		padding: 0;
		margin: 0;

		color: transparent;
		background-color: #303030;
		margin-bottom: 5px;

		width: fit-content;
		color: #808080;
		font-weight: normal;

		color: transparent;
		background-color: #303030;
		width: fit-content;

		background-image: linear-gradient(
			120deg,
			rgba(255, 255, 255, 0) 30%,
			rgba(255, 255, 255, 0.1) 50%,
			rgba(255, 255, 255, 0) 70%
		);
		background-size: 200px 100%;
		background-repeat: no-repeat;
		animation: ${skeletonAnimation} 1300ms ease-in-out infinite;
	}

	& h2 {
		${(props) =>
			props.mobile
				? `
      font-size: 15px;
    `
				: `
      font-size: 14px;
    `}

		color: #808080;
		font-weight: normal;
		padding: 0;
		margin: 0;

		color: transparent;
		background-color: #303030;
		width: fit-content;

		${"" /* background-color: #eee; */}
		background-image: linear-gradient(
			120deg,
			rgba(255, 255, 255, 0) 30%,
			rgba(255, 255, 255, .1) 50%,
			rgba(255, 255, 255, 0) 70%
		);
		background-size: 200px 100%;
		background-repeat: no-repeat;
		animation: ${skeletonAnimation} 1300ms ease-in-out infinite;
	}
`;
const Data = styled.div`
	display: flex;
	flex-direction: column;
	& h1 {
		${(props) =>
			props.mobile
				? `	
		font-size: 17px;
	`
				: `
		font-size: 16px;
	`}
		font-weight: normal;
		padding: 0;
		margin: 0;
	}
	& h2 {
		${(props) =>
			props.mobile
				? `	
		font-size: 15px;
	`
				: `
		font-size: 14px;
	`}
		color: #808080;
		font-weight: normal;
		padding: 0;
		margin: 0;
	}
`;

const LoadingCover = styled.div`
	border-radius: 5px;
	aspect-ratio: 0.75;
	object-fit: cover;
	background-color: #303030;
	${(props) =>
		props.mobile
			? `	
		margin: 10px 10px;
		height: 90px;
	`
			: `
		margin: 5px 15px;
		height: 75px;
	`}
	background-image: linear-gradient(
			120deg,
			rgba(255, 255, 255, 0) 30%,
			rgba(255, 255, 255, .1) 50%,
			rgba(255, 255, 255, 0) 70%
		);
	background-size: 200px 100%;
	background-repeat: no-repeat;
	animation: ${skeletonAnimation} 1300ms ease-in-out infinite;
`;
const CoverURL = (cover) =>
	`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.png`;
const CoverSmallURL = (cover) =>
	`https://images.igdb.com/igdb/image/upload/t_cover_small/${cover}.png`;
const GameURL = (slug) => `/game/${slug}`;

export default function SearchWindow({
	query,
	active,
	setActive,
	mobile,
	mobileSetSearch,
}) {
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedQuery(query);
		}, 500);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [query]);
	useEffect(() => {
		if (debouncedQuery.length > 2) {
			setLoading(true);
			axios
				.get(`https://api.waitplaying.com/search/?q=${debouncedQuery}`)
				.then((response) => {
					setData(response.data);
					setError(null);
					setLoading(false);
				})
				.catch((error) => {
					setError(error);
					setLoading(false);
				});
		}
	}, [debouncedQuery]);

	const handleClick = () => {
		setActive(false);
		if (mobile) mobileSetSearch(false);
	};

	const releaseText = (date) => {
		const release_date = moment(date.date);
		switch (date.category) {
			case 0:
				return `${release_date.format("LL")} (${release_date.fromNow()})`;
			case 1:
				return `${release_date.format("MMMM, YYYY")}`;
			case 2:
				return `${release_date.format("YYYY")}`;
			case 3:
				return `Q1 ${release_date.format("YYYY")}`;
			case 4:
				return `Q2 ${release_date.format("YYYY")}`;
			case 5:
				return `Q3 ${release_date.format("YYYY")}`;
			case 6:
				return `Q4 ${release_date.format("YYYY")}`;
			case 7:
				return "TBD";
			default:
				return "TBD";
		}
	};
	return (
		<Component className={active ? "show" : ""} mobile={mobile}>
			{loading && (
				<Item>
					<CoverAside>
						<LoadingCover mobile={mobile} />
						<LoadingData mobile={mobile}>
							<h1>Lorem ipsum dolor sit amet consectetur</h1>
							<h2>{"Loading 0, 0000 (0 loading ago)"} </h2>
						</LoadingData>
					</CoverAside>
				</Item>
			)}
			{!loading && error && <Item>Error: {error.message}</Item>}
			{!loading &&
				data &&
				data.map((e) => (
					<Link
						onClick={handleClick}
						key={e.id}
						to={`/game/${e.slug}`}
						className="no-link flex"
					>
						<Item key={e.name}>
							<CoverAside>
								<Cover src={CoverSmallURL(e.cover)} mobile={mobile}></Cover>
							</CoverAside>
							<Data mobile={mobile}>
								<h1>{e.name}</h1>
								<h2>
									{e.release_dates
										? releaseText(e.release_dates[0])
										: e.first_release_date}
								</h2>
							</Data>
						</Item>
					</Link>
				))}
		</Component>
	);
}
