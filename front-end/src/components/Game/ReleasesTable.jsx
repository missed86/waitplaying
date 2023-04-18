import styled from "styled-components";
import moment from "moment";
import PlatformIcon from "./PlatformIcon";

const Component = styled.div`
    display: flex;
    margin: 0 0 15px 0;
	flex-direction: column;
`
const Table = styled.table`
flex:1;
 ${'' /* border-collapse: collapse; */}
`
const Row = styled.tr`
`
const Cell = styled.td`
    ${'' /* border: 1px solid #333; */}
    ${'' /* padding: 5px; */}
	${ props => props.icon && `
		width:60px;
		padding-left:0;

	`}
`
const Label = styled.h2`
	display:block;
	font-size: 12px;
	text-transform: uppercase;
	border-bottom: 1px solid #fff
`
const FromNow = styled.span`
    color: #888;
    font-size: 0.9em;
    white-space: nowrap;
`

export function ReleasesTable({ platforms, release_dates }) {
console.log("🚀 ~ file: ReleasesTable.jsx:38 ~ ReleasesTable ~ release_dates:", release_dates)
console.log("🚀 ~ file: ReleasesTable.jsx:38 ~ ReleasesTable ~ platforms:", platforms)

	const releaseText = (date) => {
		const release_date = moment(date.release_date)
		switch (date.category) {
			case 1:
				return (
					<Cell>
						{`${release_date.format("MMMM, YYYY")}`}
					</Cell>
				)
			case 2:
				return (
					<Cell>
						{`${release_date.format("YYYY")}`}
					</Cell>
				)
			case 3:
				return (
					<Cell>
						{`Q1 ${release_date.format("YYYY")}`}
					</Cell>
				)
			case 4:
				return (
					<Cell>
						{`Q2 ${release_date.format("YYYY")}`}
					</Cell>
				)
			case 5:
				return (
					<Cell>
						{`Q3 ${release_date.format("YYYY")}`}
					</Cell>
				)
			case 6:
				return (
					<Cell>
						{`Q4 ${release_date.format("YYYY")}`}
					</Cell>
				)
			case 7:
				return (
					<Cell>
						{"TBD"}
					</Cell>
				)
			default:
				return (<Cell>
					{release_date.format("LL")}{" "}
						<FromNow>({release_date.fromNow()})</FromNow>
					</Cell>
				)
		}
	}
	
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
				<tbody>
					{dates().map((date) => {
						{/* const release_date = moment(date.release_date); */}
						return (
							<Row key={date.slug}>
								<Cell icon><PlatformIcon slug={date.slug}/></Cell>
								<Cell>{date.platform}</Cell>
								
								{releaseText(date)}
								
							</Row>
						);
					})}
				</tbody>
			</Table>
		</Component>
	);
}
