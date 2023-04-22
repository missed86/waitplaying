import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [loginWindow, setLoginWindow] = useState(false);
	const [authTokens, setAuthTokens] = useState(() =>
		localStorage.getItem("authTokens")
			? JSON.parse(localStorage.getItem("authTokens"))
			: null
	);
	const [user, setUser] = useState(() =>
		localStorage.getItem("authTokens")
			? jwt_decode(localStorage.getItem("authTokens"))
			: null
	);

	console.log(
		"🚀 ~ file: AuthContext.jsx:15 ~ AuthProvider ~ authTokens",
		authTokens
	);

	console.log("🚀 ~ file: AuthContext.jsx:20 ~ AuthProvider ~ user", user);

	const loginUser = async (e) => {
		// setLoading(true);
		e.preventDefault();
		console.log(
			"🚀 ~ file: AuthContext.jsx:15 ~ loginUser ~ e",
			"Form submitted"
		);

		let response = await fetch("http://localhost:8000/auth/token/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: e.target.username.value,
				password: e.target.password.value,
			}),
		});
		let data = await response.json();
		console.log("🚀 ~ file: AuthContext.jsx:29 ~ loginUser ~ data", data);

		if (response.status === 200) {
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
			// navigate("");
		} else {
			alert("Something went wrong!");
		}
		// setLoading(false);
	};
	const showLoginWindow = (value) => {
		setLoginWindow(value);
	};
	const logoutUser = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("authTokens");
		navigate("/");
	};

	// const [isUpdatingToken, setIsUpdatingToken] = useState(false);

	let updatingToken = false;
	const updateToken = async () => {
		if (updatingToken) {
			return; // Si está actualizando el token, no haga nada
		}

		console.log("Update token called");
		updatingToken = true; // Establecer a true para indicar que estamos actualizando el token

		try {
			let response = await fetch("http://localhost:8000/auth/token/refresh/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					refresh: authTokens.refresh,
				}),
			});
			let data = await response.json();

			if (response.status === 200) {
				setAuthTokens(data);
				setUser(jwt_decode(data.access));
				localStorage.setItem("authTokens", JSON.stringify(data));
			} else {
				setAuthTokens(null);
				setUser(null);
				localStorage.removeItem("authTokens");
				navigate("/");
			}
		} catch (error) {
			console.error(error);
		} finally {
			updatingToken = false; // Establecer a false para indicar que terminamos de actualizar el token
		}
	};

	const contextData = {
		user: user,
		tokens: authTokens,
		loginUser: loginUser,
		logoutUser: logoutUser,
		updateToken: updateToken,
		loginWindow: loginWindow,
		showLoginWindow: showLoginWindow,
		updatingToken:updatingToken,
	};

	// useEffect(() => {
	// 	let fourMinutes = 1000 * 60 * 4;
	// 	let interval = setInterval(() => {
	// 		if (authTokens) {
	// 			updateToken();
	// 		}
	// 	}, fourMinutes);
	// 	return () => clearInterval(interval);
	// }, [authTokens, loading]);


	return (
		<AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
	);
};
