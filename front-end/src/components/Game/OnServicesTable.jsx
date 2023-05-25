import styled from "styled-components";
import moment from "moment";

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
    
    ${(props) => !props.active && `
        opacity: 0.5;
		filter: grayscale(100%);
		`
    }
`;
const Cell = styled.div`
	${"" /* border: 1px solid #333; */}
	padding: 5px;
	display: table-cell;
	vertical-align: middle;
	${(props) =>
		props.icon &&
		`
		width:45px;
		padding-left:0;

	`}
	${(props) =>
		props.date &&
		`
		text-align:right;
	`}
    span {
        white-space: nowrap;
    }
    
`;

const Icon = styled.div`
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
    display:flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
	width: 45px;
	height: 45px;
	${(props) => props.service === "gamepass_pc" && "background-color: #232323"};
	${(props) =>
		props.service === "gamepass_console" && "background-color: #167416"};
	${(props) => props.service === "psplus" && "background-color: #003087"};
	svg {
		width: 35px;
		height: 35px;
	}
`;

const formattedDate = (date) => {
	const momentDate = moment(date);
	return momentDate.format("LL");
};

export default function OnServicesTable({ services }) {
	const { gamepass_pc, gamepass_console, psplus } = services;

	const dateLabel = (service) => {
		if (services[service].active) {
			return <>{'Since'} <span>{formattedDate(services[service].start_date)}</span></>;
		} else {
			return <>{'Until'} <span>{formattedDate(services[service].end_date)}</span></>;
		}
	};

	const ServiceTile = ({ service , label}) => {
		return (
			services[service].game.id && (
				<Row active={services[service].active}>
					<Cell icon>
						<Icon service={service}>{serviceIcon[service].icon}</Icon>
					</Cell>
					<Cell>{label}</Cell>
					<Cell date>{dateLabel(service)}</Cell>
				</Row>
			)
		);
	};

	return (
		<Component>
			<Table>
				<ServiceTile service={"gamepass_pc"} label="Game Pass PC"/>
                <ServiceTile service={"gamepass_console"} label="Game Pass Console"/>
                <ServiceTile service={"psplus"} label="PS Plus Premium"/>
				{!gamepass_pc.game.id && !gamepass_console.game.id && !psplus.game.id && (
                    <Row>
                        <Cell>Not seen on services</Cell>
                    </Row>
                )}
			</Table>
		</Component>
	);
}
const serviceIcon = {
	psplus: {
		label: "Plus",
		color: "#003087",
		icon: (
			<svg width="30.562" height="30.33" viewBox="0.571 0.718 30.562 30.33">
				<defs>
					<clipPath id="g" clipPathUnits="userSpaceOnUse">
						<path d="M0 0h2899v2877H0z"></path>
					</clipPath>
					<clipPath id="a" clipPathUnits="userSpaceOnUse">
						<path d="M2853.1 1237.8a70.95 70.95 0 00-8.09-3.14c-2.77-.9-5.64-1.63-8.58-2.23-2.96-.59-5.99-1.03-9.11-1.31l-628.92-54.26-397.25-260.321 605.72 58.731c3 .308 5.94.742 8.79 1.339 2.85.602 5.62 1.352 8.32 2.25 2.69.871 5.31 1.903 7.81 3.071a71.919 71.919 0 017.3 3.879c140.51 85.311 281 170.641 421.51 255.961a78.849 78.849 0 00-7.5-3.97z"></path>
					</clipPath>
					<clipPath id="c" clipPathUnits="userSpaceOnUse">
						<path d="M960.797 2762.68c-1.926 8.54-2.844 16.86-2.867 24.86-.024 7.99.875 15.66 2.617 22.91 1.719 7.24 4.293 14.05 7.617 20.34a80.059 80.059 0 0012.145 17.17c-109.094-117.88-218.18-235.75-327.246-353.62-4.614-4.98-8.559-10.54-11.817-16.6-3.238-6.06-5.762-12.6-7.512-19.54-1.742-6.95-2.679-14.29-2.754-21.92-.066-7.64.739-15.57 2.485-23.7l145.211-676.67 341.984 315z"></path>
					</clipPath>
					<clipPath id="k" clipPathUnits="userSpaceOnUse">
						<path d="M2898.91 1328.59v.07l-.02.1c-.63 7.34-1.94 14.89-3.96 22.56l-173.38 658.07c-1.97 7.44-4.55 14.68-7.67 21.63l-.01.05-.04.06c-3.12 6.94-6.77 13.6-10.89 19.92-8.24 12.68-18.31 23.97-29.56 33.33a139.68 139.68 0 01-17.49 12.41l-.16.12-.15.07c-6.08 3.61-12.37 6.69-18.78 9.15-6.48 2.48-13.09 4.34-19.74 5.51-6.65 1.17-13.34 1.64-19.99 1.37l-622.27-26.18-168.03 683.82c-3.64 14.87-9.96 28.99-18.26 41.8-4.15 6.39-8.79 12.47-13.85 18.14l-.02.04-.03.03a151.28 151.28 0 01-16.29 15.75c-11.59 9.67-24.51 17.45-38.03 22.82-6.77 2.67-13.69 4.75-20.68 6.15l-.05.01h-.03c-7 1.4-14.07 2.11-21.12 2.09l-633.45-2.77c-7.47-.03-14.61-.83-21.33-2.33l-.08-.01-.06-.01c-6.74-1.51-13.07-3.72-18.94-6.54-11.8-5.68-21.741-13.86-29.382-23.98-7.645-10.13-12.969-22.19-15.52-35.57-1.285-6.7-1.871-13.73-1.695-21.02.172-7.29 1.102-14.84 2.844-22.57l159.863-711.77-717.219-30.16c-16.367-.69-31.281-4.7-44.25-11.37a96.046 96.046 0 01-17.89-11.88l-.078-.05-.059-.07a94.152 94.152 0 01-14.586-15.38c-8.586-11.37-14.691-24.75-17.797-39.48a109.29 109.29 0 01-2.343-22.98l-.012-.04v-.02c.012-7.95.836-16.14 2.543-24.5l150.945-739.9c1.766-8.65 4.34-17 7.598-25.04l.035-.12.055-.09c3.281-8.03 7.253-15.7 11.832-22.93 4.601-7.27 9.816-14.09 15.527-20.43l.035-.04.059-.04a149.684 149.684 0 0118.554-17.33c13.289-10.47 28.207-18.59 43.977-23.71 15.746-5.15 32.316-7.27 48.918-5.86l727.266 62.76 173.44-772.23c1.92-8.61 4.61-16.918 7.93-24.86l.07-.281.14-.25a152.705 152.705 0 0111.83-22.578 149.771 149.771 0 0115.27-20.063l.03-.078.06-.039A147.492 147.492 0 011560.55 245c6.37-5 13.11-9.43 20.11-13.168l.15-.094.16-.066c7.01-3.742 14.26-6.801 21.72-9.09 7.47-2.32 15.1-3.883 22.81-4.613l.07-.028h.09c7.7-.699 15.47-.621 23.23.387l655.56 84.563c7.29.941 14.18 2.699 20.64 5.191l.1.008.09.07a85.013 85.013 0 0117.96 9.57c5.52 3.86 10.55 8.36 15.06 13.379l.12.121.11.168c4.48 5.024 8.43 10.59 11.82 16.614 6.82 12.168 11.29 26.187 13.06 41.32 1.75 15.09.78 31.34-3.3 47.977L2198.4 1176.86l628.92 54.26c13.44 1.17 25.43 5.41 35.57 12.12 10.13 6.68 18.43 15.79 24.54 26.67 3.03 5.41 5.52 11.27 7.42 17.48l.03.1.03.09c1.9 6.22 3.21 12.78 3.88 19.65.68 6.86.73 14.02.12 21.36z"></path>
					</clipPath>
					<clipPath id="e" clipPathUnits="userSpaceOnUse">
						<path d="M2327.04 308.859a89.068 89.068 0 00-7.19-2.621 98.066 98.066 0 00-7.53-2 93.67 93.67 0 00-7.87-1.347l-655.56-84.563c-15.59-2.008-31.24-.406-46.2 4.254-14.99 4.637-29.29 12.316-42.14 22.418-12.84 10.129-24.21 22.68-33.37 37.051-9.14 14.371-16.07 30.57-19.97 47.969l-173.44 772.23-362-266.109 156.81-730.68a138.873 138.873 0 0118.52-45.27c8.56-13.511 19.28-25.312 31.44-34.761 12.14-9.48 25.73-16.621 39.98-20.89 14.25-4.27 29.2-5.642 44.12-3.63l628.78 85.969c2.54.363 5.08.812 7.54 1.36 2.47.562 4.88 1.222 7.26 1.952 2.37.758 4.66 1.61 6.94 2.547a84.29 84.29 0 016.58 3.102c138.05 72.07 276.09 144.14 414.14 216.199-2.23-1.141-4.49-2.23-6.84-3.18z"></path>
					</clipPath>
					<clipPath id="j" clipPathUnits="userSpaceOnUse">
						<path d="M0 0h2899v2877H0z"></path>
					</clipPath>
					<clipPath id="h" clipPathUnits="userSpaceOnUse">
						<path d="M606.504 1039.49c-16.602-1.41-33.172.71-48.918 5.86-15.77 5.12-30.688 13.24-43.977 23.71a151.481 151.481 0 00-34.175 37.84c-9.204 14.53-15.969 30.8-19.52 48.18l-150.945 739.9c-1.922 9.43-2.727 18.66-2.5 27.55.222 8.9 1.472 17.45 3.652 25.56 2.18 8.1 5.289 15.75 9.234 22.84a96.012 96.012 0 0014.27 19.37c-102.344-107.46-204.684-214.9-307.035-322.34a93.94 93.94 0 01-13.774-18.6 97.398 97.398 0 01-9.03-21.82c-2.145-7.73-3.419-15.88-3.716-24.32-.304-8.47.383-17.21 2.133-26.17l136.57-700.32c3.204-16.421 9.493-31.75 18.122-45.429a139.013 139.013 0 0132.144-35.5c12.543-9.789 26.672-17.289 41.621-21.992 14.942-4.68 30.711-6.559 46.539-5.028l694.571 67.36 362 266.109z"></path>
					</clipPath>
					<linearGradient
						id="b"
						x1="0"
						x2="1"
						y1="0"
						y2="0"
						gradientTransform="scale(884.318 -884.318) rotate(20 5.028 5.446)"
						gradientUnits="userSpaceOnUse"
						spreadMethod="pad"
					>
						<stop offset="0" stopColor="#c99517"></stop>
						<stop offset="0.473" stopColor="#ba621c"></stop>
						<stop offset="1" stopColor="#ba621c"></stop>
					</linearGradient>
					<linearGradient
						id="i"
						x1="0"
						x2="1"
						y1="0"
						y2="0"
						gradientTransform="scale(1429.733 -1429.733) rotate(20 2.96 -.61)"
						gradientUnits="userSpaceOnUse"
						spreadMethod="pad"
					>
						<stop offset="0" stopColor="#c99517"></stop>
						<stop offset="0.473" stopColor="#ba621c"></stop>
						<stop offset="1" stopColor="#ba621c"></stop>
					</linearGradient>
					<linearGradient
						id="f"
						x1="0"
						x2="1"
						y1="0"
						y2="0"
						gradientTransform="scale(1459.221 -1459.221) rotate(20 1.644 1.546)"
						gradientUnits="userSpaceOnUse"
						spreadMethod="pad"
					>
						<stop offset="0" stopColor="#c99517"></stop>
						<stop offset="0.473" stopColor="#ba621c"></stop>
						<stop offset="1" stopColor="#ba621c"></stop>
					</linearGradient>
					<linearGradient
						id="d"
						x1="0"
						x2="1"
						y1="0"
						y2="0"
						gradientTransform="scale(597.32 -597.32) rotate(20 11.858 .888)"
						gradientUnits="userSpaceOnUse"
						spreadMethod="pad"
					>
						<stop offset="0" stopColor="#c99517"></stop>
						<stop offset="0.473" stopColor="#ba621c"></stop>
						<stop offset="1" stopColor="#ba621c"></stop>
					</linearGradient>
					<linearGradient
						id="l"
						x1="0"
						x2="1"
						y1="0"
						y2="0"
						gradientTransform="scale(2245.13 -2245.13) rotate(-55 -.057 -.566)"
						gradientUnits="userSpaceOnUse"
						spreadMethod="pad"
					>
						<stop offset="0" stopColor="#f5f7b4"></stop>
						<stop offset="0.164" stopColor="#f5f7b4"></stop>
						<stop offset="0.485" stopColor="#f4c716"></stop>
						<stop offset="1" stopColor="#f4c716"></stop>
					</linearGradient>
				</defs>
				<g clipPath="url(#a)" transform="matrix(.01054 0 0 -.01054 .57 31.049)">
					<path
						fill="url(#b)"
						d="M2853.1 1237.8a70.95 70.95 0 00-8.09-3.14c-2.77-.9-5.64-1.63-8.58-2.23-2.96-.59-5.99-1.03-9.11-1.31l-628.92-54.26-397.25-260.321 605.72 58.731c3 .308 5.94.742 8.79 1.339 2.85.602 5.62 1.352 8.32 2.25 2.69.871 5.31 1.903 7.81 3.071a71.919 71.919 0 017.3 3.879c140.51 85.311 281 170.641 421.51 255.961a78.849 78.849 0 00-7.5-3.97"
					></path>
				</g>
				<g clipPath="url(#c)" transform="matrix(.01054 0 0 -.01054 .57 31.049)">
					<path
						fill="url(#d)"
						d="M960.797 2762.68c-1.926 8.54-2.844 16.86-2.867 24.86-.024 7.99.875 15.66 2.617 22.91 1.719 7.24 4.293 14.05 7.617 20.34a80.059 80.059 0 0012.145 17.17c-109.094-117.88-218.18-235.75-327.246-353.62-4.614-4.98-8.559-10.54-11.817-16.6-3.238-6.06-5.762-12.6-7.512-19.54-1.742-6.95-2.679-14.29-2.754-21.92-.066-7.64.739-15.57 2.485-23.7l145.211-676.67 341.984 315-159.863 711.77"
					></path>
				</g>
				<g clipPath="url(#e)" transform="matrix(.01054 0 0 -.01054 .57 31.049)">
					<path
						fill="url(#f)"
						d="M2327.04 308.859a89.068 89.068 0 00-7.19-2.621 98.066 98.066 0 00-7.53-2 93.67 93.67 0 00-7.87-1.347l-655.56-84.563c-15.59-2.008-31.24-.406-46.2 4.254-14.99 4.637-29.29 12.316-42.14 22.418-12.84 10.129-24.21 22.68-33.37 37.051-9.14 14.371-16.07 30.57-19.97 47.969l-173.44 772.23-362-266.109 156.81-730.68a138.873 138.873 0 0118.52-45.27c8.56-13.511 19.28-25.312 31.44-34.761 12.14-9.48 25.73-16.621 39.98-20.89 14.25-4.27 29.2-5.642 44.12-3.63l628.78 85.969c2.54.363 5.08.812 7.54 1.36 2.47.562 4.88 1.222 7.26 1.952 2.37.758 4.66 1.61 6.94 2.547a84.29 84.29 0 016.58 3.102c138.05 72.07 276.09 144.14 414.14 216.199-2.23-1.141-4.49-2.23-6.84-3.18"
					></path>
				</g>
				<g clipPath="url(#g)" transform="matrix(.01054 0 0 -.01054 .57 31.049)">
					<g clipPath="url(#h)">
						<path
							fill="url(#i)"
							d="M253 768v1h-5v1h-6v1h-5v1h-4v1h-3v1h-4v1h-2v1h-2v1h-2v1h-3v1h-2v1h-2v1h-3v1h-2v1h-1v1h-2v1h-2v1h-1v1h-2v1h-1v1h-2v1h-2v1h-1v1h-2v1h-1v1h-1v1h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v2h-1v1h-1v1h-1v2h-1v1h-1v1h-1v1h-1v2h-1v1h-1v1h-1v1h-1v2h-1v2h-1v1h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v3h-1v3h-1v3h-1v3h-1v4h-1v3h-1v4h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v6H9v5H8v5H7v5H6v5H5v5H4v5H3v5H2v6H1v10H0v26h1v6h1v5h1v4h1v3h1v3h1v2h1v3h1v2h1v2h1v2h1v2h1v2h1v2h1v1h1v2h1v1h1v2h1v1h1v2h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v-2h-1v-1h-1v-1h-1v-1h-1v-2h-1v-1h-1v-1h-1v-1h-1v-2h-1v-1h-1v-2h-1v-1h-1v-2h-1v-1h-1v-2h-1v-2h-1v-2h-1v-2h-1v-3h-1v-2h-1v-3h-1v-3h-1v-2h-1v-4h-1v-4h-1v-6h-1v-8h-1v-20h1v-8h1v-6h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-5h1v-5h1v-5h1v-5h1v-5h1v-5h1v-4h1v-3h1v-4h1v-3h1v-3h1v-3h1v-3h1v-2h1v-3h1v-2h1v-2h1v-2h1v-2h1v-2h1v-2h1v-2h1v-2h1v-1h1v-2h1v-1h1v-2h1v-2h1v-1h1v-1h1v-1h1v-2h1v-1h1v-1h1v-1h1v-2h1v-1h1v-1h1v-2h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h2v-1h1v-1h1v-1h1v-1h2v-1h1v-1h2v-1h1v-1h2v-1h1v-1h2v-1h2v-1h1v-1h2v-1h1v-1h2v-1h2v-1h2v-1h2v-1h2v-1h2v-1h3v-1h2v-1h2v-1h2v-1h3v-1h3v-1h3v-1h5v-1h5v-1h5v-1h5v-1h30v1h12v1h11v1h12v1h11v1h12v1h11v1h12v1h12v1h11v1h12v1h11v1h12v1h12v1h11v1h12v1h11v1h12v1h12v1h11v1h12v1h11v1h12v1h11v1h12v1h12v1h11v1h12v1h11v1h12v1h12v1h11v1h12v1h11v1h12v1h12v1h11v1h12v1h11v1h12v1h11v1h12v1h12v1h11v1h12v1h11v1h12v1h12v1h11v1h12v1h11v1h12v1h11v1h12v1h12v1h11v1h12v1h11v1h12v1h12v1h11v1h12v1h11v1h4v-2h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-2v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-10v-1h-11v-1h-10v-1h-10v-1h-11v-1h-10v-1"
						></path>
					</g>
				</g>
				<g clipPath="url(#j)" transform="matrix(.01054 0 0 -.01054 .57 31.049)">
					<g clipPath="url(#k)">
						<path
							fill="url(#l)"
							d="M1625 217v1h-6v1h-5v1h-5v1h-5v1h-3v1h-3v1h-2v1h-2v1h-3v1h-2v1h-3v1h-2v1h-2v1h-2v1h-2v1h-1v1h-2v1h-2v1h-1v1h-2v1h-1v1h-2v1h-1v1h-2v1h-1v1h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v2h-1v1h-1v1h-1v2h-1v1h-1v1h-1v2h-1v1h-1v1h-1v2h-1v1h-1v1h-1v2h-1v1h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v3h-1v3h-1v3h-1v3h-1v3h-1v3h-1v3h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v1h-2v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-32v1h-5v1h-5v1h-5v1h-5v1h-3v1h-3v1h-3v1h-2v1h-2v1h-2v1h-3v1h-2v1h-2v1h-2v1h-2v1h-2v1h-2v1h-1v1h-2v1h-1v1h-2v1h-2v1h-1v1h-2v1h-1v1h-2v1h-1v1h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v2h-1v1h-1v1h-1v2h-1v1h-1v1h-1v1h-1v2h-1v1h-1v1h-1v2h-1v1h-1v2h-1v1h-1v2h-1v2h-1v2h-1v2h-1v2h-1v1h-1v2h-1v2h-1v2h-1v2h-1v2h-1v3h-1v3h-1v3h-1v3h-1v4h-1v3h-1v3h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v5h-1v4h-1v5h-1v8h-1v9h-1v17h1v9h1v7h1v4h1v3h1v3h1v3h1v2h1v3h1v3h1v1h1v2h1v2h1v2h1v2h1v1h1v2h1v2h1v1h1v2h1v1h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h2v1h1v1h2v1h1v1h2v1h1v1h2v1h1v1h2v1h1v1h2v1h2v1h2v1h3v1h2v1h3v1h3v1h3v1h3v1h5v1h6v1h5v1h14v1h24v1h23v1h24v1h24v1h24v1h24v1h23v1h24v1h24v1h24v1h23v1h24v1h24v1h24v1h24v1h23v1h24v1h24v1h24v1h23v1h24v1h24v1h24v1h24v1h23v1h24v1h24v1h24v1h23v1h22v2h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v5h-1v4h-1v4h-1v5h-1v4h-1v5h-1v4h-1v6h-1v8h-1v8h-1v6h1v12h1v8h1v3h1v3h1v3h1v3h1v3h1v3h1v1h1v2h1v2h1v2h1v2h1v2h1v1h1v2h1v1h1v1h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h2v1h1v1h2v1h1v1h2v1h1v1h2v1h1v1h2v1h1v1h2v1h3v1h3v1h3v1h3v1h2v1h3v1h6v1h9v1h74v1h229v1h357v-1h6v-1h3v-1h4v-1h3v-1h3v-1h4v-1h2v-1h3v-1h2v-1h2v-1h2v-1h2v-1h2v-1h2v-1h1v-1h2v-1h2v-1h2v-1h1v-1h2v-1h1v-1h1v-1h2v-1h1v-1h2v-1h1v-1h2v-1h1v-1h1v-1h1v-1h1v-1h2v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-2h1v-1h1v-1h1v-2h1v-1h1v-1h1v-2h1v-1h1v-1h1v-2h1v-1h1v-1h1v-2h1v-1h1v-2h1v-2h1v-2h1v-2h1v-2h1v-2h1v-2h1v-2h1v-1h1v-3h1v-3h1v-2h1v-3h1v-3h1v-3h1v-3h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h3v1h24v1h24v1h24v1h23v1h24v1h24v1h24v1h23v1h24v1h24v1h24v1h24v1h23v1h24v1h24v1h24v1h23v1h24v1h24v1h24v1h24v1h23v1h24v1h24v1h24v1h23v1h4v-1h15v-1h5v-1h4v-1h4v-1h3v-1h4v-1h3v-1h2v-1h2v-1h2v-1h2v-1h2v-1h2v-1h2v-1h2v-1h2v-1h2v-1h1v-1h2v-1h1v-1h1v-1h2v-1h1v-1h2v-1h1v-1h1v-1h2v-1h1v-1h1v-1h2v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-2h1v-1h1v-1h1v-2h1v-1h1v-1h1v-1h1v-2h1v-1h1v-1h1v-1h1v-2h1v-2h1v-1h1v-2h1v-2h1v-2h1v-1h1v-2h1v-2h1v-2h1v-2h1v-2h1v-2h1v-2h1v-3h1v-3h1v-3h1v-2h1v-3h1v-3h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-4h1v-4h1v-4h1v-4h1v-3h1v-5h1v-6h1v-6h1v-33h-1v-5h-1v-5h-1v-5h-1v-3h-1v-2h-1v-2h-1v-3h-1v-2h-1v-2h-1v-3h-1v-1h-1v-2h-1v-2h-1v-1h-1v-1h-1v-1h-1v-2h-1v-1h-1v-1h-1v-2h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-2v-1h-1v-1h-2v-1h-3v-1h-2v-1h-2v-1h-2v-1h-2v-1h-3v-1h-4v-1h-4v-1h-4v-1h-8v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-12v-1h-11v-1h-12v-1h-11v-1h-12v-1h-11v-1h-2v-1h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-4h1v-5h1v-4h1v-4h1v-4h1v-4h1v-7h1v-7h1v-35h-1v-4h-1v-4h-1v-5h-1v-4h-1v-3h-1v-2h-1v-3h-1v-2h-1v-3h-1v-2h-1v-3h-1v-1h-1v-2h-1v-2h-1v-1h-1v-2h-1v-1h-1v-1h-1v-2h-1v-1h-1v-2h-1v-1h-1v-1h-1v-2h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-1v-1h-2v-1h-1v-1h-1v-1h-2v-1h-2v-1h-2v-1h-2v-1h-2v-1h-1v-1h-2v-1h-2v-1h-3v-1h-3v-1h-4v-1h-4v-1h-4v-1h-4v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-8v-1h-8v-1h-8v-1h-7v-1h-12v-1"
						></path>
					</g>
				</g>
				<path
					fill="#cc6b1b"
					d="M10.906 12.647l.74 3.78-3.62.301-.74-3.855zm1.642 4.46l-1.03-5.253-5.133.32 1.03 5.362 5.133-.428m15.252-2.09c-.32.355-.779.55-1.295.55-1.13 0-2.186-.956-2.305-2.089-.054-.523.093-1.008.416-1.367.32-.354.779-.55 1.295-.55 1.13 0 2.186.957 2.305 2.09.054.523-.093 1.008-.416 1.367zm1.159-1.444c-.16-1.521-1.527-2.759-3.048-2.759-.73 0-1.387.283-1.85.797-.467.518-.681 1.21-.604 1.945.16 1.521 1.528 2.759 3.048 2.759.73 0 1.388-.283 1.85-.797.467-.518.681-1.21.604-1.945m-6.253 12.163l.464-.619-2.177-1.57 1.574-2.18-.619-.463-1.572 2.177-2.42-1.814-.464.619 2.419 1.813-1.813 2.418.618.464 1.812-2.417 2.178 1.572M18.297 6.563l-3.745.133 1.3-3.45zm-2.61-4.71L13.351 7.5l6.072-.35-3.738-5.299"
				></path>
			</svg>
		),
	},
	gamepass_pc: {
		label: "PC",
		icon: (
			<svg viewBox="0 0 64 64">
				<path fill="#fff" d="M 28.908 58.875 C 24.68 58.47 20.399 56.952 16.721 54.552 C 13.64 52.541 12.944 51.715 12.944 50.065 C 12.944 46.752 16.587 40.949 22.82 34.334 C 26.36 30.576 31.291 26.172 31.824 26.291 C 32.86 26.523 41.148 34.608 44.251 38.413 C 49.157 44.431 51.413 49.358 50.267 51.555 C 49.396 53.225 43.991 56.489 40.02 57.743 C 36.747 58.776 32.449 59.214 28.908 58.875 Z M 8.781 46.62 C 6.221 42.692 4.927 38.824 4.302 33.23 C 4.096 31.383 4.17 30.326 4.77 26.535 C 5.52 21.809 8.21 16.343 11.444 12.978 C 12.821 11.546 12.944 11.511 14.623 12.076 C 16.661 12.763 18.838 14.266 22.215 17.319 L 24.184 19.101 L 23.109 20.422 C 18.115 26.557 12.844 35.252 10.857 40.632 C 9.777 43.557 9.342 46.492 9.807 47.714 C 10.12 48.54 9.832 48.232 8.781 46.62 Z M 53.732 47.289 C 53.985 46.054 53.665 43.786 52.915 41.498 C 51.291 36.544 45.863 27.327 40.878 21.061 L 39.309 19.088 L 41.006 17.53 C 43.223 15.494 44.762 14.275 46.423 13.24 C 47.733 12.424 49.606 11.701 50.411 11.701 C 50.907 11.701 52.654 13.514 54.064 15.493 C 56.249 18.557 57.856 22.272 58.67 26.139 C 59.196 28.638 59.24 33.987 58.755 36.479 C 58.357 38.525 57.516 41.178 56.696 42.978 C 56.081 44.326 54.553 46.945 53.883 47.797 C 53.539 48.235 53.539 48.234 53.732 47.289 Z M 29.361 10.765 C 27.062 9.598 23.513 8.344 21.553 8.006 C 20.866 7.888 19.694 7.822 18.949 7.86 C 17.331 7.941 17.404 7.857 19.998 6.631 C 22.155 5.612 23.954 5.013 26.396 4.5 C 29.143 3.923 34.307 3.916 37.011 4.486 C 39.931 5.102 43.37 6.381 45.307 7.574 L 45.883 7.928 L 44.562 7.861 C 41.936 7.729 38.11 8.79 34.002 10.789 C 32.763 11.392 31.685 11.873 31.606 11.859 C 31.528 11.845 30.518 11.352 29.361 10.765 Z"></path>
			</svg>
		),
		color: "#232323",
	},
	gamepass_console: {
		label: "Xbox",
		icon: (
			<svg viewBox="0 0 64 64">
				<path fill="#fff" d="M 28.908 58.875 C 24.68 58.47 20.399 56.952 16.721 54.552 C 13.64 52.541 12.944 51.715 12.944 50.065 C 12.944 46.752 16.587 40.949 22.82 34.334 C 26.36 30.576 31.291 26.172 31.824 26.291 C 32.86 26.523 41.148 34.608 44.251 38.413 C 49.157 44.431 51.413 49.358 50.267 51.555 C 49.396 53.225 43.991 56.489 40.02 57.743 C 36.747 58.776 32.449 59.214 28.908 58.875 Z M 8.781 46.62 C 6.221 42.692 4.927 38.824 4.302 33.23 C 4.096 31.383 4.17 30.326 4.77 26.535 C 5.52 21.809 8.21 16.343 11.444 12.978 C 12.821 11.546 12.944 11.511 14.623 12.076 C 16.661 12.763 18.838 14.266 22.215 17.319 L 24.184 19.101 L 23.109 20.422 C 18.115 26.557 12.844 35.252 10.857 40.632 C 9.777 43.557 9.342 46.492 9.807 47.714 C 10.12 48.54 9.832 48.232 8.781 46.62 Z M 53.732 47.289 C 53.985 46.054 53.665 43.786 52.915 41.498 C 51.291 36.544 45.863 27.327 40.878 21.061 L 39.309 19.088 L 41.006 17.53 C 43.223 15.494 44.762 14.275 46.423 13.24 C 47.733 12.424 49.606 11.701 50.411 11.701 C 50.907 11.701 52.654 13.514 54.064 15.493 C 56.249 18.557 57.856 22.272 58.67 26.139 C 59.196 28.638 59.24 33.987 58.755 36.479 C 58.357 38.525 57.516 41.178 56.696 42.978 C 56.081 44.326 54.553 46.945 53.883 47.797 C 53.539 48.235 53.539 48.234 53.732 47.289 Z M 29.361 10.765 C 27.062 9.598 23.513 8.344 21.553 8.006 C 20.866 7.888 19.694 7.822 18.949 7.86 C 17.331 7.941 17.404 7.857 19.998 6.631 C 22.155 5.612 23.954 5.013 26.396 4.5 C 29.143 3.923 34.307 3.916 37.011 4.486 C 39.931 5.102 43.37 6.381 45.307 7.574 L 45.883 7.928 L 44.562 7.861 C 41.936 7.729 38.11 8.79 34.002 10.789 C 32.763 11.392 31.685 11.873 31.606 11.859 C 31.528 11.845 30.518 11.352 29.361 10.765 Z"></path>
			</svg>
		),
		color: "#167416",
	},
};
