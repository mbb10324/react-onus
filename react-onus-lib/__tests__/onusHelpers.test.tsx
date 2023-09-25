import { handleGeneralErrors, determineIfAllAssetsLoaded } from "../lib/onusHelpers";
import { Asset, LoadingState } from "../lib/onusTypes";

describe("handleGeneralErrors", () => {
	test("throws an error if assets are not provided", () => {
		expect(() => handleGeneralErrors([], <div>Child</div>)).toThrow("Onus: You must provide at least one asset.");
	});

	test("throws an error if children are not provided", () => {
		const assets: Asset[] = [{ type: "image", src: "imageSrc" }];
		expect(() => handleGeneralErrors(assets, undefined)).toThrow("Onus: You must provide at least one child component.");
	});

	test("throws an error if assets are not an array", () => {
		expect(() => handleGeneralErrors({} as any, <div>Child</div>)).toThrow(
			"Onus: Invalid assets. Expected an array of objects with 'type' and 'src' properties."
		);
	});

	test("doesn't throw any error for valid inputs", () => {
		const assets: Asset[] = [{ type: "image", src: "imageSrc" }];
		expect(() => handleGeneralErrors(assets, <div>Child</div>)).not.toThrow();
	});
});

describe("determineIfAllAssetsLoaded", () => {
	test("returns false if assetsToLoad and assetsLoaded are both zero", () => {
		const state: LoadingState = { assetsToLoad: 0, assetsLoaded: 0, error: false };
		expect(determineIfAllAssetsLoaded(state)).toBe(false);
	});

	test("returns false if assetsToLoad is non-zero and assetsLoaded is zero", () => {
		const state: LoadingState = { assetsToLoad: 2, assetsLoaded: 0, error: false };
		expect(determineIfAllAssetsLoaded(state)).toBe(false);
	});

	test("returns false if assetsToLoad is zero and assetsLoaded is non-zero", () => {
		const state: LoadingState = { assetsToLoad: 0, assetsLoaded: 2, error: false };
		expect(determineIfAllAssetsLoaded(state)).toBe(false);
	});

	test("returns true if assetsToLoad equals assetsLoaded and both are non-zero", () => {
		const state: LoadingState = { assetsToLoad: 2, assetsLoaded: 2, error: false };
		expect(determineIfAllAssetsLoaded(state)).toBe(true);
	});

	test("returns false if assetsToLoad doesn't equal assetsLoaded and both are non-zero", () => {
		const state: LoadingState = { assetsToLoad: 3, assetsLoaded: 2, error: false };
		expect(determineIfAllAssetsLoaded(state)).toBe(false);
	});
});
