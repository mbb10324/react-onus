import rainforest from "../Images/rainforest.jpg";

export default function Arca() {
	return (
		<>
			<div className="homeContainer">
				<div className="homeHeader">
					<h1>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua.
					</h1>

					<img src={rainforest} alt="Home Rainforest" />
				</div>
			</div>

			<video
				data-testid="arca-video"
				src="https://raw.githubusercontent.com/mbb10324/react-arca/master/docs/assets/videos/react-arca.mp4"
				autoPlay
				loop
				muted
			/>
			<h1 data-testid="arca-message">
				react-arca is designed to empower the developer. If you have any issues
				<br /> or want to see things added/removed, reach out to us on{" "}
				<a href="https://github.com/mbb10324/react-arca" target="_blank" rel="noopener noreferrer">
					github
				</a>
			</h1>
		</>
	);
}
