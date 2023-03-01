// import './UserButton.css'
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import UserMenu from "./UserMenu";

const Component = styled.div`
	width: 35px;
	height: 35px;
	position: relative;
`;
const Avatar = styled.img`
	cursor: pointer;
	overflow: hidden;
	border-radius: 50%;
	object-fit: fill;
	width: 35px;
	height: 35px;
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
			<Avatar
				src="/assets/default_user.png"
				alt="default_user"
				onClick={handleClick}
			/>
			<UserMenu actived={actived} setActived={setActived}/>
		</Component>
	);
}
