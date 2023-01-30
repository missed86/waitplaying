import { useState } from "react";
import CalendarCell from "../components/Calendar/CalendarCell";
// import "./Calendar.css";
import styled from "styled-components";

const myGames = {
	"2023-01-16": [
		{
			title: "A Plague Tale: Requiem",
			slug: "a-plague-tale-requiem",
			cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5pwb.png",
			platforms: ["PS5", "SeriesX/S", "PC"],
			id: "hft6hwetr5",
		},
	],
	"2023-01-12": [
		{
			title: "The Callisto Protocol",
			slug: "the-callisto-protocol",
			cover: "./assets/pruebas/co4ymo.png",
			platforms: ["SeriesX/S", "One", "PS4", "PS5", "PC"],
			id: "hft6htr5",
		},
	],
	"2023-01-01": [
		{
			title: "God of War Ragnarök",
			slug: "god-of-war-ragnarok",
			cover: "./assets/pruebas/co5s5v.png",
			platforms: ["PS5", "PS4"],
			id: "sda54d3sa",
		},
	],
	"2023-06-22": [
		{
			title: "Final Fantasy XVI",
			slug: "final-fantasy-xvi",
			cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5w3k.png",
			platforms: ["PS5", "PC"],
			id: "sda54d35sa",
		},
	],
};

const Main = styled.div`
	display: flex;
	flex-direction: column;
	/* height: 100%; */
	/* max-height: 800px; */
	flex: 1;
	max-width: 1000px;
`;
const Month = styled.div`
	display: flex;
	/* flex-grow:1; */
	justify-content: space-between;
	/* width: 100%; */
	height: 50px;
	align-items: center;
	font-size: 2em;
	${'' /* font-style: italic; */}
	font-weight: bold;
`;
const Weekdays = styled.div`
	text-align: center;
	font-size: 14px;
	display: grid;
	grid-template-columns: repeat(7, 142px);
`;
const Cells = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 142px);
  flex: 1;
`;
export default function Calendar() {
	const [date, setDate] = useState(new Date());
	const monthList = [
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

	const currentDay = date.getDay();
	const currentMonth = date.getMonth();
	const currentYear = date.getFullYear();
	const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
	const firstDayOfMonthWeekday = firstDayOfMonth.getDay() + 1;
	console.log(firstDayOfMonthWeekday);

	const days = [];
	const month = currentMonth < 10 ? `0${currentMonth + 1}` : currentMonth + 1;

	days.push(
		<CalendarCell
			game={myGames[`${currentYear}-${month}-01`]}
			style={{ gridColumn: firstDayOfMonthWeekday }}
			data-date={`${currentYear}-${month}-01`}
			key={`${currentYear}-${month}-01`}
		>
			01
		</CalendarCell>
	);
	for (let i = 2; i <= daysInMonth; i++) {
		const day = i < 10 ? `0${i}` : i; // agrega cero a la izquierda si i < 10
		const dateString = `${currentYear}-${month}-${day}`;
		days.push(
			<CalendarCell
				data-date={dateString}
				key={dateString}
				game={myGames[dateString]}
			>
				{day}
			</CalendarCell>
		);
    console.log(dateString)
	}

	const handleClickPrevMonth = () => {
		setDate(new Date(currentYear, currentMonth - 1, 1));
	};
	const handleClickNextMonth = () => {
		setDate(new Date(currentYear, currentMonth + 1, 1));
	};

	return (
		<Main>
			<Month>
				<button onClick={handleClickPrevMonth}>Prev</button>{" "}
				<span>
					{monthList[currentMonth]} {currentYear}
				</span>{" "}
				<button onClick={handleClickNextMonth}>Next</button>
			</Month>
			<Weekdays>
				<div>Su</div>
				<div>Mo</div>
				<div>Tu</div>
				<div>We</div>
				<div>Th</div>
				<div>Fr</div>
				<div>Sa</div>
			</Weekdays>
			<Cells>{days}</Cells>
		</Main>
	);
}
