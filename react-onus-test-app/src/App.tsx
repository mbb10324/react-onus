import rainforest from "./Images/rainforest.jpg";
import Onus from "react-onus";
import "./App.css";

export default function App() {
	const assets = [
		{
			type: "font",
			src: "TitilliumWeb-SemiBold",
		},
		{
			type: "image",
			src: rainforest as string,
		},
		{
			type: "video",
			//eslint-disable-next-line
			src: "https://www.shutterstock.com/shutterstock/videos/1067294764/preview/stock-footage-open-source-code-programmer-business-computer-developer-free-software-and-freedom-in-internet.webm",
		},
	];

	return (
		<Onus
			assets={assets}
			onLoaded={() => {
				console.log("onloaded fired");
			}}
		>
			<div className="app-container">
				<div className="app-header">
					<h1>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua.
					</h1>
					<img src={rainforest} alt="Home Rainforest" />
				</div>
				<video
					//eslint-disable-next-line
					src="https://www.shutterstock.com/shutterstock/videos/1067294764/preview/stock-footage-open-source-code-programmer-business-computer-developer-free-software-and-freedom-in-internet.webm"
					autoPlay
					loop
					muted
					style={{ width: "100vw", height: "auto" }}
				/>
			</div>
		</Onus>
	);
}
