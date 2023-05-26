import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

import Header from "./layout/Header";
import HomePage from "./pages/HomePage";
import ComingSoonPage from "./pages/ComingSoonPage";
import GamePage from "./pages/GamePage";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";
import ServicesPage from "./pages/ServicesPage";
import Error404 from "./components/404";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import SEO from "./components/Services/SEO";

function App() {
	return (
		<HelmetProvider>
		<AuthProvider>
			<SEO/>
			<div className="App">
				<Header />
				<main>
					<Routes>
						<Route path="/" exact element={<HomePage />} />
						<Route path="/coming-soon" element={<ComingSoonPage />} />
						<Route path="/services" element={<ServicesPage />} />
						<Route path="/game/:slug" element={<GamePage />} />
						<Route path="/calendar" element={<CalendarPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="*" element={<Error404 what="page" />} />
					</Routes>
				</main>
			</div>
		</AuthProvider>
		</HelmetProvider>
	);
}

export default App;
