import { render, screen } from "@testing-library/react";
import Onus from "../lib/index";
import "@testing-library/jest-dom";
import { useOnusReducer } from "../lib/onusReducer";
import { useOnusHook } from "../lib/onusHook";
import { Asset } from "../lib/onusTypes";

// Mock the `useOnusReducer` function
jest.mock("../lib/onusReducer", () => ({
	useOnusReducer: jest.fn(),
}));

// Mock the `useOnusHook` function since we're not testing its implementation details in this test suite
jest.mock("../lib/onusHook", () => ({
	useOnusHook: jest.fn(),
}));

const assets: Asset[] = [
	{ type: "font", src: "Roboto" },
	{ type: "image", src: "https://via.placeholder.com/150" },
	{ type: "image", src: "https://via.placeholder.com/150" },
];

describe("Onus Component", () => {
	beforeEach(() => {
		(useOnusReducer as jest.Mock).mockClear();
		(useOnusHook as jest.Mock).mockClear();
	});

	/**********************************************************************************************/
	test("renders children when all assets are loaded", () => {
		(useOnusReducer as jest.Mock).mockReturnValue({
			state: { assetsToLoad: 3, assetsLoaded: 3, error: false },
			dispatch: jest.fn(),
		});

		render(
			<Onus assets={assets}>
				<div>Children</div>
			</Onus>
		);

		expect(screen.getByText("Children")).toBeInTheDocument();
		expect(screen.queryByTestId("react-onus-loader")).not.toBeInTheDocument();
	});

	/**********************************************************************************************/
	test("renders children when handleLoading is false", () => {
		(useOnusReducer as jest.Mock).mockReturnValue({
			state: { assetsToLoad: 3, assetsLoaded: 3, error: false },
			dispatch: jest.fn(),
		});

		render(
			<Onus assets={assets} handleLoading={false}>
				<div>Children</div>
			</Onus>
		);

		expect(screen.getByText("Children")).toBeInTheDocument();
		expect(screen.queryByTestId("react-onus-loader")).not.toBeInTheDocument();
	});

	/**********************************************************************************************/
	test("succesfully calls the callback function", () => {
		(useOnusReducer as jest.Mock).mockReturnValue({
			state: { assetsToLoad: 3, assetsLoaded: 3, error: false },
			dispatch: jest.fn(),
		});

		const onLoadedMock = jest.fn();

		render(
			<Onus assets={assets} onLoaded={onLoadedMock}>
				<div>Children</div>
			</Onus>
		);

		expect(onLoadedMock).toHaveBeenCalledTimes(1);
	});

	/**********************************************************************************************/
	test("renders loader when assets are not fully loaded", () => {
		(useOnusReducer as jest.Mock).mockReturnValue({
			state: { assetsToLoad: 3, assetsLoaded: 1, error: false },
			dispatch: jest.fn(),
		});

		render(
			<Onus assets={assets}>
				<div>Children</div>
			</Onus>
		);

		expect(screen.queryByText("Children")).not.toBeInTheDocument();
		expect(screen.getByTestId("react-onus-loader")).toBeInTheDocument();
	});

	/**********************************************************************************************/
	test("renders error when there's an error and handleErrors is true", () => {
		(useOnusReducer as jest.Mock).mockReturnValue({
			state: { assetsToLoad: 3, assetsLoaded: 1, error: true },
			dispatch: jest.fn(),
		});

		render(
			<Onus assets={assets} handleErrors>
				<div>Children</div>
			</Onus>
		);

		expect(screen.getByTestId("react-onus-error")).toBeInTheDocument();
		expect(screen.queryByText("Children")).not.toBeInTheDocument();
		expect(screen.queryByTestId("react-onus-loader")).not.toBeInTheDocument();
	});
});
