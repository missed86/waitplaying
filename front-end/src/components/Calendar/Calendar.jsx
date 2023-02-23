import styled from "styled-components";
import { useState } from "react";

import { Day } from "./Day";

const Component = styled.div`
	display: flex;
	display: flex;
	flex: 1 1 0px;
	flex-direction: column;
	/* border: 2px solid rgb(32, 32, 32); */
	margin-bottom: 10px;
	overflow: hidden;
	border-radius: 5px;
`;
const Header = styled.div`
	display: flex;
	background-color: #202020;
	text-transform: uppercase;
	padding: 10px;
`;
const Week = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;
const Weekday = styled.div`
	display: flex;
	justify-content: center;
	flex: 1;
`;
const Days = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
`;
const Row = styled.div`
	display: flex;
	flex: 1;
	flex-direction: row;
`;

const generateMonthRows = (year, month, list) => {
	// console.log("🚀 ~ file: Calendar.jsx:44 ~ generateMonthRows ~ list:", list);
	let firstDay = new Date(year, month, 1).getDay() + 1;
	console.log(
		"🚀 ~ file: Calendar.jsx:46 ~ generateMonthRows ~ firstDay:",
		firstDay
	);
	// if (firstDay === 0) { // Si el primer día del mes es domingo
	//   firstDay = 7; // Ajustar el valor de firstDay a 7
	// } else {
	//   firstDay -= 1; // Restar 1 al valor de firstDay
	// }
	const numDays = getDaysInMonth(year, month);
	const rows = [];
	let days = [];
	let cellCount = 0;

	// Agregar días vacíos antes del primer día del mes
	const firstEmptyDays = 7 - firstDay;
	for (let i = 0; i < firstEmptyDays; i++) {
		days.push(<Day key={`empty-${i}`} />);
		cellCount++;
	}

	// Agregar los días del mes
	for (let i = 1; i <= numDays; i++) {
		const date = `${year}-${(month + 1).toString().padStart(2, "0")}-${i
			.toString()
			.padStart(2, "0")}`;
		cellCount++;
		days.push(
			<Day
				key={i}
				date={date}
				day={i}
				data={list && list[date] ? list[date] : null}
			/>
		);
		if (cellCount % 7 === 0) {
			rows.push(<Row key={i}>{days}</Row>);
			days = [];
		}
	}

	// Agregar días vacíos después del último día del mes
	if (days.length > 0) {
		const numEmptyDays = 7 - days.length;
		for (let i = 0; i < numEmptyDays; i++) {
			days.push(<Day key={`empty-${i}`} />);
		}
		rows.push(<Row key={numDays}>{days}</Row>);
	}

	return rows;
};

const getMonthName = (month) => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return months[month];
};

const getDaysInMonth = (year, month) => {
	return new Date(year, month + 1, 0).getDate();
};

export default function Calendar({ list }) {
	const [date, setDate] = useState(new Date());
	const year = date.getFullYear();
	const month = date.getMonth();

	const handlePrevMonth = () => {
		setDate(new Date(year, month - 1, 1));
	};
	const handleNextMonth = () => {
		setDate(new Date(year, month + 1, 1));
	};
	return (
		<Component>
			<Header>
				{`${getMonthName(month)} ${year}`}{" "}
				<button onClick={handlePrevMonth}>Prev</button>
				<button onClick={handleNextMonth}>Next</button>
			</Header>
			<Week>
				<Weekday>mon</Weekday>
				<Weekday>tue</Weekday>
				<Weekday>wed</Weekday>
				<Weekday>thu</Weekday>
				<Weekday>fri</Weekday>
				<Weekday>sat</Weekday>
				<Weekday>sun</Weekday>
			</Week>
			<Days>{generateMonthRows(year, month, list)}</Days>
		</Component>
	);
}
