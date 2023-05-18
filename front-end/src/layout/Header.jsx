// import logo from '../logo.svg';
import { Link, NavLink } from "react-router-dom";
import SearchBar from "../components/Header/SearchBar";
import UserButton from "../components/Header/UserButton";
import HiddenMenu from "../components/Header/HiddenMenu";
import styled from "styled-components";
import Logo from "../assets/logo";
import MenuIcon from "../assets/menu-icon";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { search_icon, close_icon } from "../assets/icons";

// import "./Header.css";

const Component = styled.div`
	display: flex;
	position: sticky;
	top: 0px;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.8);
	height: 56px;
	align-items: center;
	margin-bottom: 15px;
	justify-content: space-around;
	width: 100%;
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	flex: 1;
	margin: 0 30px;
	gap: 10px;
	@media only screen and (max-width: 540px) {
		position: relative;
	}
	@media only screen and (max-width: 970px) {
		margin: 0 10px;
	}
`;
const MenuButton = styled.button`
	display: none;
	background-color: transparent;
	color: #fff;
	border-radius: 50%;
	border: none;
	z-index: 1010;
	height: 40px;
	width: 40px;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	&:hover {
		background-color: #303030;
	}
	@media only screen and (max-width: 970px) {
		display: flex;
	}
	@media only screen and (max-width: 540px) {
		display: flex;
	}
`;
const LogoDiv = styled.div`
	margin-left: 0px;
	display: flex;
	svg {
		z-index: 2000;
		height: 30px;
		width: 180px;
	}
	@media only screen and (max-width: 540px) {
		margin: 0 auto;
	}
`;
const Menu = styled.div`
	margin: 0 25px;

	ul {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 15px;
		padding: 0;
	}
	& li {
		display: inline-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		flex-shrink: 0;
	}
	& li a {
		text-decoration: none;
		color: gray;
		&.active {
			color: white;
		}
	}
	& li a:hover {
		text-decoration: none;
		color: white;
	}

	@media only screen and (max-width: 970px) {
		display: none;
		width: 100%;
		margin: 0;
	}
	@media only screen and (max-width: 540px) {
		position: absolute;
		top: 45px;
		left: -35px;
		/* display:flex; */
		opacity: 0.8;
		background-color: #000;
		padding: 10px 20px;
		ul {
			flex-direction: column;
			align-items: flex-start;
			text-align: left;
		}
	}
`;

const RoundButton = styled.button`
	position: absolute;
	cursor: pointer;
	overflow: hidden;
	border-radius: 50%;
	object-fit: fill;
	width: 40px;
	height: 40px;
	border: none;
	background-color: transparent;
	color: #fff;
	display: flex;
	align-items: center;
	${(props) => (props.close 
	? `right: 5px; top:8px; z-index:2000;`
	: "right: 35px;")}
	@media only screen and (min-width: 540px) {
		display: none;
	}
	transition: all 0.3s ease-in-out;
`;

const SearchWindow = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 1);
	visibility: ${({ show }) => (show ? "visible" : "hidden")};
	@media only screen and (min-width: 540px) {
		display: none;
	}
`;

export default function Header() {
	const { user } = useContext(AuthContext);
	const [showMenu, setShowMenu] = useState(false);
	const [showSearch, setShowSearch] = useState(false);

	const toogleMenu = () => {
		setShowMenu(!showMenu);
		
		setTimeout(() => {
			setShowSearch(false);
		}, 500);
		
	};
	const closeMenu = () => {
		setShowMenu(false);
	};
	const toogleSearch = () => {
		showSearch ? setShowSearch(false) : setShowSearch(true);
	};

	const closeSearch = () => {
		setShowSearch(false);
	};

	return (
		<Component>
			<Wrapper>
				<MenuButton onClick={toogleMenu}>{MenuIcon}</MenuButton>
				<HiddenMenu show={showMenu} toogle={toogleMenu} close={closeMenu} />
				<Link onClick={closeMenu} to="/">
					<LogoDiv>{Logo}</LogoDiv>
				</Link>
				<Menu>
					{/* {user && user.username} */}
					<ul>
						<li>
							{/*  className={({isActive})=> isActive ? "active": ""}  */}
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/">Releases</NavLink>
						</li>
						<li>
							<NavLink to="/coming-soon">Coming Soon</NavLink>
						</li>
						<li>
							<NavLink to="/services">On Services</NavLink>
						</li>
						{user && (
							<li>
								<NavLink to="/calendar">My calendar</NavLink>
							</li>
						)}
					</ul>
				</Menu>
				<SearchBar />
				<RoundButton onClick={toogleSearch}>{search_icon(2)}</RoundButton>
				<UserButton />
				{showSearch && (
					<>
						<SearchWindow show={showSearch}>
							<RoundButton close onClick={closeSearch}>
								{close_icon}
							</RoundButton>
							<SearchBar mobile mobileSetSearch={setShowSearch}/>
						</SearchWindow>
					</>
				)}
			</Wrapper>
		</Component>
	);
}
