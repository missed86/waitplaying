import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
	const [authTokens, setAuthTokens] = useState(()=>
		localStorage.getItem("authTokens")
			? JSON.parse(localStorage.getItem("authTokens"))
			: null
	);
	console.log("🚀 ~ file: AuthContext.jsx:15 ~ AuthProvider ~ authTokens", authTokens)
	const [user, setUser] = useState(()=>
		localStorage.getItem("authTokens")
			? jwt_decode(localStorage.getItem("authTokens"))
			: null
	);

	const [loading, setLoading] = useState(true)
	console.log("🚀 ~ file: AuthContext.jsx:20 ~ AuthProvider ~ user", user)
	const navigate = useNavigate();

	const loginUser = async (e) => {
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
				'username': e.target.username.value,
				'password': e.target.password.value,
			}),
		});
		let data = await response.json();
		console.log("🚀 ~ file: AuthContext.jsx:29 ~ loginUser ~ data", data);

		if (response.status === 200) {
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
			navigate("/");
		} else {
			alert("Something went wrong!");
		}
	};

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem("authTokens")
		navigate("/");
  } 

	const updateToken = async () => {
		console.log("Update token called")
		let response = await fetch("http://localhost:8000/auth/token/refresh/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				'refresh': authTokens.refresh}),
		});
		let data = await response.json();
		
		if (response.status === 200) {
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
		} else {
			setAuthTokens(null)
			setUser(null)
			localStorage.removeItem("authTokens")
			navigate("/");
		}

	}
	const contextData = {
		user: user,
		loginUser: loginUser,
		logoutUser: logoutUser
	};


	useEffect(()=> {
		let fourMinutes = 1000*60*4
		let interval = setInterval(()=> {
			if (authTokens) {
				updateToken()
			}
		}, fourMinutes)
		return ()=> clearInterval(interval)
	}, [authTokens, loading]) 
	return (
		<AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
	);
};
