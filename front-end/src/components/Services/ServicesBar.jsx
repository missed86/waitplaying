import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FilterCheckbox from "./FilterCheckbox";
import FilterCheckboxInOut from "./FilterCheckbox_in_out";

const Container = styled.div`
	display: flex;
	flex: 1;
	height: 50px;
`;
const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex: 1;
	${(props) =>
		props.fixedDiv && `
        padding: 0 50px;
        position: fixed;
        top: 60px;
        left: 50%;
        width: calc(100% - 60px);
        transform: translateX(-50%);
        @media only screen and (max-width: 600px) {
            width: calc(100% - 20px);
        }
		z-index: 3;
    `}
`;

const Bar = styled.div`
	height: 50px;
	background-color: #222;
	display: flex;
	border-radius: 5px;
	border: 1px solid #2a2a2a;
	padding: 0 10px;
	align-items: center;
	width: 100%;
	gap:10px;
`;
const Spacer = styled.div`
flex:1;
`;

export default function ServicesBar({filter, setFilter, loading}) {
	const [fixedDivVisible, setFixedDivVisible] = useState(false);
	const fixedDivRef = useRef(null);


	useEffect(() => {
		function handleScroll() {
			const fixedDiv = fixedDivRef.current;
			const divPosition = fixedDiv.getBoundingClientRect().top;

			if (divPosition < 60) {
				setFixedDivVisible(true);
			} else {
				setFixedDivVisible(false);
			}
		}

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<Container ref={fixedDivRef}>
			<Wrapper fixedDiv={fixedDivVisible}>
				<Bar>
					<FilterCheckbox loading={loading} filter={filter} setFilter={setFilter} service="gamepass_pc"/>
					<FilterCheckbox loading={loading} filter={filter} setFilter={setFilter}  service="gamepass_console"/>
					<FilterCheckbox loading={loading} filter={filter} setFilter={setFilter}  service="psplus"/>
					<Spacer/>
					<FilterCheckboxInOut loading={loading} filter={filter} setFilter={setFilter}/>
				</Bar>{/*"Gamepass PC - Gamepass Console - Playstation Premium"*/}
			</Wrapper>
		</Container>
	);
}
