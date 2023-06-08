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
	const { user, tokens, logoutUser,updateToken } = useContext(AuthContext);
	const [parent] = useAutoAnimate();

	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const options = () =>
		user
			? {
					method: "GET",
					url: `https://api.waitplaying.com/services/`,
					headers: {
						Authorization: `Bearer ${tokens.access}`,
					},
			  }
			: {
					method: "GET",
					url: `https://api.waitplaying.com/services/`,
			  };
	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await axios.request(options());
			setData(response.data);
			setLoading(false);
		} catch (error) {
			// logoutUser();
			// setError(error);
			// setLoading(true);
			updateToken();
		}
	};

	useEffect(() => {
		// logoutUser();
		if (error) {
			// logoutUser();
			// setError(null);
			// setLoading(true);
			updateToken();
		} else {
			fetchData();
			setLoading(false);
		}
	}, [user, tokens]); // error

	const gamepass_pc = data && data["gamepass_pc"];
	const gamepass_console = data && data["gamepass_console"];
	const psplus = data && data["psplus"];

	return (
		<Page>
        <ServiceBox service="psplus" data={psplus}/>
        <ServiceBox service="gamepass_console" data={gamepass_console}/>
        <ServiceBox service="gamepass_pc" data={gamepass_pc}/>
			
		</Page>
	);
}