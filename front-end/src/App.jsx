import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";

import Header from "./layout/Header";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import Game from "./pages/Game";
import Calendar from "./pages/Calendar";


const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
		<div className="App">
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/coming" element={<ComingSoon />} />
					<Route path="/game/:slug" element={<Game />} />
					<Route path="/calendar/" element={<Calendar />} />
				</Routes>
			</main>
		</div>
		</QueryClientProvider>
	);
}

export default App;