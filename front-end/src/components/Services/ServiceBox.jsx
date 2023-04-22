import styled from "styled-components"
import { Link } from "react-router-dom";
import GameCard from "../GameCard";

const img_routes = {
    psplus: "/assets/services/psplus.png",
    gamepass_pc: "/assets/services/gppc.png",
    gamepass_console: "/assets/services/gpxbox.png",
}

const Component = styled.div`
    display:flex;
    flex-direction: column;
    margin: 20px 0;
    border-radius: 10px;
    overflow: hidden;
`
const Header = styled.div`
    display:flex;
    background-color: ${props => {
        switch(props.service){
            case "psplus":
                return "#003399";
            case "gamepass_console":
                return "#167416";
            case "gamepass_pc":
                return "#232323";
            default:
                return "darkgrey";
        }
    }};
`
const HeaderLogo = styled.img`
    height:70px;
    margin:5px;
`
const Body = styled.div`
    display:flex;
    flex-direction: row;
    gap:10px;
    margin:10px;

`


export default function ServiceBox({service, data}) {
    return (
        <Component>
            <Header service={service}>
                <HeaderLogo src={img_routes[service]}></HeaderLogo>
            </Header>
            <Body>
            {data &&
				data.in.map((e) =>
					e.game && e.game.cover ? (
						<Link
							key={e.game.id}
							to={`/game/${e.game.slug}`}
							className="no-link flex"
						>
							<GameCard
								image={e.game.cover}
								title={e.game.name}
								platforms={null}
								// marked={user ? (mark ? mark : false) : false}
							/>
						</Link>
					) : null
				)}
            </Body>
            <Body>
            {data &&
				data.out.map((e) =>
					e.game && e.game.cover ? (
						<Link
							key={e.game.id}
							to={`/game/${e.game.slug}`}
							className="no-link flex"
						>
							<GameCard
								image={e.game.cover}
								title={e.game.name}
								platforms={null}
								// marked={user ? (mark ? mark : false) : false}
							/>
						</Link>
					) : null
				)}
            </Body>
        </Component>
    )
}