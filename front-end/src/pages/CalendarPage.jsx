import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
// import "./Calendar.css";
import styled from "styled-components";

import ListView from "../components/Calendar/ListView";
import Calendar from "../components/Calendar/Calendar";
import { useNavigate } from "react-router-dom";
import SEO from "../components/Services/SEO";

const Page = styled.div`
	display: flex;
	flex: 1 1 0%;
	height: 100%;
	gap: 10px;
`;

export default function CalendarPage() {
	const { user, tokens, logoutUser, updateToken } = useContext(AuthContext);
	const [list, setList] = useState(null);
	const [calendarView, setCalendarView] = useState(false);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();
	if (!user) navigate("/");

	const getFollows = async () => {
		setLoading(true);
		let response = await fetch(`https://api.waitplaying.com/auth/calendar/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + String(tokens.access),
			},
		});
		let data = await response.json();
		if (response.status === 200) {
			// algoritmo de ordenación
			const ordered = Object.keys(data)
				.sort()
				.reduce((obj, key) => {
					obj[key] = data[key];
					return obj;
				}, {});
			setList(ordered);
		} else if (response.status === 401) {
			// logoutUser();

			updateToken();
		}
		setLoading(false);
	};
	useEffect(() => {
		if (!user) navigate("/");
		getFollows();
	}, [tokens]);

	useEffect(() => {}, [tokens]);
	return <>
			<SEO title="WaitPlaying - My Calendar" path="calendar" />
		{	
		loading ? (
			<Page>Loading...</Page>
		) : (
			user && (
				<Page>
					<ListView
						list={list}
						calendarView={calendarView}
						setCalendarView={setCalendarView}
					/>
					<Calendar
						list={list}
						calendarView={calendarView}
						setCalendarView={setCalendarView}
					/>
				</Page>
			)
		)
		}
	</>
}
