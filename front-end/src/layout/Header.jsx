// import logo from '../logo.svg';
import { Link } from "react-router-dom";
import SearchBar from "../components/Header/SearchBar";
import UserButton from "../components/Header/UserButton";
import "./Header.css";

function Header() {
	return (
		<header className="Header">
			<div className="header-content">
				<div className="logo">
					<b>WaitPlaying</b>
				</div>
				<div className="menu">
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/">Releases</Link>
						</li>
						<li>
							<Link to="/coming">Coming Soon</Link>
						</li>
						<li>
							<Link to="/services">On Services</Link>
						</li>
					</ul>
				</div>
				<SearchBar />
				<UserButton />
			</div>
		</header>
	);
}

export default Header;
