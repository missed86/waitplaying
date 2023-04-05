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


function App() {
	return (
			<AuthProvider>
				<div className="App">
					<Header/>
					<main>
						<Routes>
							<Route path="/" element={<HomePage />} exact/>
							<Route path="/coming-soon" element={<ComingSoonPage />} />
							<Route path="/services" element={<ServicesPage />} />
							<Route path="/game/:slug" element={<GamePage />} />
							<Route path="/calendar" element={<CalendarPage />} />
							<Route path="/login" element={<LoginPage />} />
						</Routes>
					</main>
				</div>
			</AuthProvider>
	);
}

export default App;
