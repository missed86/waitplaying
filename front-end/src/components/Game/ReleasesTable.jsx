import styled from "styled-components";
import moment from "moment";
import PlatformIcon from "./PlatformIcon";

const Component = styled.div`
	display: flex;
	margin: 0 0 15px 0;
	flex-direction: column;
`;
const Table = styled.div`
	display: table;
	width: 100%;
	${"" /* border-collapse: collapse; */}
`;
const Row = styled.div`
	display: table-row;
`;
const Cell = styled.div`
	${"" /* border: 1px solid #333; */}
	padding: 5px;
	display: table-cell;
	vertical-align: middle;
	${(props) =>
		props.icon &&
		`
		width:40px;
		padding-left:0;

	`}
	${(props) =>
		props.date &&
		`
		text-align:right;
	`}
`;
const Label = styled.h2`
	display: block;
	font-size: 12px;
	text-transform: uppercase;
	border-bottom: 1px solid #fff;
`;
const FromNow = styled.span`
	color: #888;
	font-size: 0.9em;
	white-space: nowrap;
`;

export function ReleasesTable({ platforms, release_dates }) {
	const releaseText = (date) => {
		const release_date = moment(date.release_date);
		switch (date.category) {
			case 1:
				return <>{`${release_date.format("MMMM, YYYY")}`}</>;
			case 2:
				return <>{`${release_date.format("YYYY")}`}</>;
			case 3:
				return <>{`Q1 ${release_date.format("YYYY")}`}</>;
			case 4:
				return <>{`Q2 ${release_date.format("YYYY")}`}</>;
			case 5:
				return <>{`Q3 ${release_date.format("YYYY")}`}</>;
			case 6:
				return <>{`Q4 ${release_date.format("YYYY")}`}</>;
			case 7:
				return <>{"TBD"}</>;
			default:
				return (
					<>
						{release_date.format("LL")}{" "}
						<FromNow>({release_date.fromNow()})</FromNow>
					</>
				);
		}
	};

	const dates = () => {
		const releaseDates = [];
		release_dates.forEach((releaseDate) => {
			const platform = platforms.find(
				(platform) => platform.id === releaseDate.platform
			);
			if (!platform) return null;
			releaseDates.push({
				platform: platform.name,
				abbreviation: platform.abbreviation,
				slug: platform.slug,
				release_date: releaseDate.date,
				category: releaseDate.category,
			});
		});
		return releaseDates;
	};
	return (
		<Component>
			<Table>
					{dates().map((date) => {
						return (
							<Row key={date.slug}>
								<Cell icon>
									<PlatformIcon slug={date.slug} />
								</Cell>
								<Cell>{date.platform}</Cell>
								<Cell date>{releaseText(date)}</Cell>
							</Row>
						);
					})}
			</Table>
		</Component>
	);
}
