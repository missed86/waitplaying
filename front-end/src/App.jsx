import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

import Header from "./layout/Header";
import HomePage from "./pages/HomePage";
import ComingSoonPage from "./pages/ComingSoonPage";
import GamePage from "./pages/GamePage";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<div className="App">
					<Header />
					<main>
						<Routes>
							<Route path="/" element={<HomePage />} exact/>
							<Route path="/coming-soon" element={<ComingSoonPage />} />
							<Route path="/game/:slug" element={<GamePage />} />
							<Route path="/calendar" element={<CalendarPage />} />
							<Route path="/login" element={<LoginPage />} />
						</Routes>
					</main>
				</div>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
