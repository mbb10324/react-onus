import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import rainforest from "./Images/rainforest.jpg";
import Arca from "./Components/Arca";
import Onus from "react-onus";
import "./App.css";

export default function App() {
	const assets = [
		{
			type: "font",
			src: "TitilliumWeb-Regular",
		},
		{
			type: "image",
			src: rainforest as string,
		},
		{
			type: "video",
			src: "https://raw.githubusercontent.com/mbb10324/react-arca/master/docs/assets/videos/react-arca.mp4",
		},
	];

	return (
		<Onus assets={assets}>
			<div className="app">
				<Router>
					<Routes>
						<Route path="/" element={<Arca />} />
					</Routes>
				</Router>
			</div>
		</Onus>
	);
}
