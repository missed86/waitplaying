import { useState } from "react";
import styled from "styled-components";
import { arrow_in, arrow_out } from "../../assets/icons";

const Component = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 5px 5px;
	border-radius: 5px;
	border: 1px solid #2a2a2a;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	overflow: hidden;
	width: 40px;
`;
const Icon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease-in-out;
	svg {
		fill: white;
		width: 20px;
		height: 20px;
	}
`;

export default function FilterCheckboxInOut({ filter, setFilter }) {
	// console.log(filter);

	const stages = ["all", "in", "out"];
	const handleClick = () => {
		const currentIndex = stages.indexOf(filter.in_out);
		const nextIndex = (currentIndex + 1) % stages.length;
		const nextValue = stages[nextIndex];
		setFilter({ ...filter, in_out: nextValue });
	};

	return (
		<Component onClick={handleClick}>
			<Icon filter={filter.in_out}>
				{filter.in_out == "all" && (
					<>
						<>{arrow_in("#548935")}</>
						<>{arrow_out("#962b2b")}</>
					</>
				)}
				{filter.in_out == "in" && arrow_in("#548935")}
				{filter.in_out == "out" && arrow_out("#962b2b")}
			</Icon>
		</Component>
	);
}
