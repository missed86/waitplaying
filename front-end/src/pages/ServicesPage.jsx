import { Link } from "react-router-dom";
// import GameCard from "../GameCard";
import axios from "axios";
import { useAutoAnimate } from "@formkit/auto-animate/react";
// import autoAnimate from "@formkit/auto-animate";
import { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";

import ServiceBox from "../components/Services/ServiceBox";

const Page = styled.div``;

export default function ServicesPage() {
	const { user, tokens, logoutUser } = useContext(AuthContext);
	const [parent] = useAutoAnimate();

	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const options = () =>
		user
			? {
					method: "GET",
					url: `http://127.0.0.1:8000/api/services/`,
					headers: {
						Authorization: `Bearer ${tokens.access}`,
					},
			  }
			: {
					method: "GET",
					url: `http://127.0.0.1:8000/api/services/`,
			  };
	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await axios.request(options());
			setData(response.data);
			setLoading(false);
		} catch (error) {
			logoutUser();
			setError(error);
			setLoading(true);
		}
	};

	useEffect(() => {
		// logoutUser();
		if (error) {
			logoutUser();
			setError(null);
			setLoading(true);
		} else {
			fetchData();
			setLoading(false);
		}
	}, [user, tokens]); // error

	const gamepass_pc = data && data["gamepass_pc"];
	const gamepass_console = data && data["gamepass_console"];
	const psplus = data && data["psplus"];

	// console.log("🚀 ~ file: ServicesPage.jsx:61 ~ ServicesPage ~ data:", data);
	return (
		<Page>
        <ServiceBox service="psplus" data={psplus}/>
        <ServiceBox service="gamepass_console" data={gamepass_console}/>
        <ServiceBox service="gamepass_pc" data={gamepass_pc}/>
			
		</Page>
	);
}
