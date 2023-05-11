// import './UserButton.css'
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../context/AuthContext";
import StyledLink from "../StyledLink";
import LoginModal from "./LoginModal"

const Component = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	top: 45px;
	right: 0;
	width: 300px;
	background-color: #404040;
	border-radius: 8px;
	overflow: hidden;
	visibility: hidden;
	&.show {
		visibility: visible;
	}
`;

const Header = styled.div`
	display: flex;
	flex-grow: 1;
	flex-direction: row;
	padding: 10px;
	border-bottom: 1px solid #707070;
`;

const AvatarWrapper = styled.div`
	padding: 0 10px;
	justify-content: center;
	align-items: center;
	display: flex;
`;

const UserData = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	flex: 1;
`;
const UserText = styled.span``;
const EmailText = styled.span`
	color: #999999;
`;

const Menu = styled.div`
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		li {
			display: flex;
			height: 45px;
			padding: 0 10px;
			align-items: center;
			flex: 1;
			:hover {
				background-color: #505050;
			}
		}
	}
`;
const Avatar = styled.img`
	overflow: hidden;
	border-radius: 50%;
	object-fit: fill;
	width: 35px;
	height: 35px;
`;

export default function UserMenu({ actived, setActived }) {
	// console.log("🚀 ~ file: UserMenu.jsx:64 ~ UserMenu ~ actived", actived);
	const { user, logoutUser, loginWindow, showLoginWindow } = useContext(AuthContext);
	const [modal, setModal] = useState(false);

	useEffect(() => {
		console.log(loginWindow);
	}, [loginWindow]);

  const clkLogin = () => {
    showLoginWindow(true)
    setActived(false)
  }
	return user ? (
		<Component className={actived ? "show" : ""}>
			<Header>
				<AvatarWrapper>
					<Avatar src="/assets/default_user.png" alt="default_user" />
				</AvatarWrapper>
				<UserData>
					<UserText>{user.username}</UserText>
					<EmailText>{user.email}</EmailText>
				</UserData>
			</Header>
			<Menu>
				<ul>
					<StyledLink onClick={logoutUser}>
						<li>LOGOUT</li>
					</StyledLink>
				</ul>
			</Menu>
		</Component>
	) : (
  <>
    <LoginModal actived={modal} setActived={setModal}/>
		<Component className={actived ? "show" : ""}>
			<Menu>
				<ul>
					<StyledLink onClick={clkLogin}>
						<li>LOGIN</li>
					</StyledLink>
				</ul>
			</Menu>
		</Component>
  </>
	);
}
