// import './UserButton.css'
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import UserMenu from "./UserMenu";
import { user_circle, user_icon } from "../../assets/icons";

const Component = styled.div`
	width: 35px;
	height: 35px;
	position: relative;
`;
const Avatar = styled.div`
	cursor: pointer;
	overflow: hidden;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	object-fit: fill;
	align-items: center;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 2px;
	
`;


export default function UserButton() {
	const [actived, setActived] = useState(false);
	const element = useRef();

	const handleClick = () => {
		setActived(!actived);
	};
	useEffect(() => {
		const handler = (event) => {
			if (!element.current) {
				return;
			}
			if (!element.current.contains(event.target)) {
				setActived(false);
			}
		};
		document.addEventListener("click", handler, true);
		return () => {
			document.removeEventListener("click", handler);
		};
	}, []);
	return (
		<Component ref={element}>
			<Avatar onClick={handleClick}>{user_icon}</Avatar>
			<UserMenu actived={actived} setActived={setActived}/>
		</Component>
	);
}
