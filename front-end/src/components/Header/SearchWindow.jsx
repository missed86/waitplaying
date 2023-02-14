import styled from "styled-components";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const Component = styled.div`
	position: absolute;
    flex-direction: column;
    display: flex;
	visibility: hidden;
	top: 0;
	right: 0;
	width: 400px;
	min-height: 200px;
	background-color: #303030;
	border-radius: 5px;
	opacity: 0;
	transition: all 0.3s ease-in-out;
	${"" /* z-index: 1; */}
	padding: 5px 5px;

	&::before {
		position: fixed;
		background-color: rgba(0, 0, 0, 0.5);
		content: "";
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		transition: all 0.3s ease-in-out;
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
    flex:1;
    align-items: center;
    border-radius: 5px;
    &:hover {
        background-color: #505050
    }
    margin: 0 10px;
    
`
const Cover = styled.img`
    margin: 5px 10px;
    height: 65px;
    border-radius: 5px;
`
const CoverAside = styled.div`

`
const Data = styled.div`
    display: flex;
    flex-direction: column;
    & h1 {
        font-size: 16px;
        font-weight: normal;
        padding:0;
        margin:0;
    }
    & h2 {
        color: lightgrey;
        font-size: 14px;
        font-weight: normal;
        padding:0;
        margin:0;
    }
`


const CoverURL = (cover) => `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.png`
const GameURL = (slug) => `/game/${slug}`

export default function SearchWindow({ query, active }) {
	const [debouncedQuery, setDebouncedQuery] = useState("");

	useEffect(() => {
		console.log(query);
		const timeoutId = setTimeout(() => {
			setDebouncedQuery(query);
		}, 1000);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [query]);

	const { data, error, status } = useQuery({
		queryKey: active ? ["SearchBox", { q: debouncedQuery }] : null,
		queryFn: active
			? () =>
					fetch(`http://127.0.0.1:8000/api/search/?q=${debouncedQuery}`).then(
						(res) => res.json()
					)
			: () => {},
	});

	if (status === "loading") {
		return (
			<Component className={active ? "show" : ""}>
				<div>Loading...</div>
			</Component>
		);
	}

	if (error) {
		return (
			<Component className={active ? "show" : ""}>
				<div>Error: {error.message}</div>
			</Component>
		);
	}
	return (
		<Component className={active ? "show" : ""}>
			{data &&
				data.map((e) => (
                    <Link key={e.id} to={`/game/${e.slug}`} className="no-link flex">
					<Item>
						<CoverAside><Cover src={CoverURL(e.cover)}></Cover></CoverAside>
						<Data>
                            <h1>{e.name}</h1>
                            <h2>{e.first_release_date}</h2>
                        </Data>
					</Item>
                    </Link>
				))}
		</Component>
	);
}
