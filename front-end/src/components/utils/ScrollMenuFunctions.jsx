import { useContext, useState, useCallback, useEffect } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import styled from "styled-components";

export function onWheel(apiObj, ev) {
	const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

	if (isThouchpad) {
		ev.stopPropagation();
		return;
	}

	if (ev.deltaY < 0) {
		apiObj.scrollNext();
	} else if (ev.deltaY > 0) {
		apiObj.scrollPrev();
	}
}

export const preventDefault = (ev) => {
	if (ev.preventDefault) {
		ev.preventDefault();
	}
	ev.returnValue = false;
};

const enableBodyScroll = () => {
	document && document.removeEventListener("wheel", preventDefault, false);
};

const disableBodyScroll = () => {
	document &&
		document.addEventListener("wheel", preventDefault, {
			passive: false,
		});
};

export function usePreventBodyScroll() {
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		hidden ? disableBodyScroll() : enableBodyScroll();

		return enableBodyScroll;
	}, [hidden]);

	const disableScroll = useCallback(() => setHidden(true), []);
	const enableScroll = useCallback(() => setHidden(false), []);

	return { disableScroll, enableScroll };
}

const ArrowButton = styled.button`
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: center;
	opacity: ${(props) => (props.disabled ? "0" : "1")};
	userselect: none;
	position: absolute;
	z-index: 950;
	height: 100%;
	margin: 0px;
	color: white;
	align-items: ${(props) => (props.direction == "left" ? "start" : "end")};
	font-size: 2rem;
	background: ${(props) =>
		props.direction == "left"
			? "linear-gradient(90deg, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)"
			: "linear-gradient(270deg, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)"};
	width: 70px;
	${
		"" /* box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 1);
		  box-shadow: rgba(0, 0, 0, 1) 0px 5px 5px, rgba(0, 0, 0, 1) 0px 0px 0px 3px; */
	}
	border: none;
	left: ${(props) => (props.direction == "left" ? "0px" : "auto")};
	right: ${(props) => (props.direction == "right" ? "0px" : "auto")};
`;
function Arrow({ children, disabled, onClick, direction }) {
	return (
		<ArrowButton disabled={disabled} onClick={onClick} direction={direction}>
			{children}
		</ArrowButton>
	);
}
export function LeftArrow() {
	const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

	return (
		<Arrow
			direction="left"
			disabled={isFirstItemVisible}
			onClick={() => scrollPrev()}
		>
			{"<"}
		</Arrow>
	);
}

export function RightArrow() {
	const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

	return (
		<Arrow
			direction="right"
			disabled={isLastItemVisible}
			onClick={() => scrollNext()}
		>
			{">"}
		</Arrow>
	);
}
