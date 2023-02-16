import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Drawer = styled.div`
	position: fixed;
	height: 100%;
	width: 270px;
	background-color: #101010;
	left: calc(-100%);
	top: 0;
	z-index: 1005;
	transition: all 0.3s ease-in-out;
	${"" /* box-shadow: 100px 0 100px #00000080; */}
	&.show {
		left: 0;
		transition: all 0.3s ease-in-out;
		@media only screen and (min-width: 970px) {
			display: none;
		}
	}
	@media only screen and (max-width: 540px) {
		width: 100%;
		left: calc(-100%);
	}
`;
const Background = styled.div`
	visibility: hidden;
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 1001;
	left: 0;
	top: 0;
	background-color: #00000070;
	opacity: 0;
	transition: all 0.3s ease-in-out;
	&.show {
		visibility: visible;
		opacity: 1;
		transition: all 0.3s ease-in-out;
		@media only screen and (min-width: 970px) {
			display: none;
		}
	}
`;
const Menu = styled.ul`
	margin: 60px 0 0 0;
	padding: 0;
`;
const Item = styled.li`
	list-style: none;
	display: flex;
	height: 50px;
	align-items: center;
	padding: 0 0 0 40px;
`;
const ItemLink = styled(NavLink)`
	color: gray;
	text-decoration: none;
	&.active {
		color: white;
	}
	&:hover {
		color: white;
	}
`;
export default function HiddenMenu({ show, toogle, close }) {
	return (
		<>
			<Background onClick={close} className={show ? "show" : ""} />
			<Drawer className={show ? "show" : ""}>
				<Menu>
					<ItemLink onClick={close} to="/">
						<Item>Home</Item>
					</ItemLink>

					<ItemLink onClick={close} to="/">
						<Item>Releases</Item>
					</ItemLink>

					<ItemLink onClick={close} to="/coming-soon">
						<Item>Coming Soon</Item>
					</ItemLink>

					<ItemLink onClick={close} to="/services">
						<Item>On Services</Item>
					</ItemLink>

					<ItemLink onClick={close} to="/calendar">
						<Item>My calendar</Item>
					</ItemLink>
				</Menu>
			</Drawer>
		</>
	);
}
