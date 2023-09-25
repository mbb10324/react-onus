import { Asset, LoadingState } from "./onusTypes";
import { ReactNode } from "react";

/**
 * `handleGeneralErrors` Validates the assets and children props and throws errors for invalid values.
 * This function checks the following:
 * - Assets prop must be provided and be a valid array of Asset objects.
 * - Children prop must be provided.
 *
 * @param {Asset[]} assets - The array of assets to be validated.
 * @param {ReactNode} children - The children prop to be validated.
 * @throws {Error} Throws an error if validation fails.
 */

export function handleGeneralErrors(assets: Asset[], children: ReactNode) {
	if (!assets || assets.length === 0) {
		console.error("Onus: You must provide at least one asset.");
		throw new Error("Onus: You must provide at least one asset.");
	}
	if (!children) {
		console.error("Onus: You must provide at least one child component.");
		throw new Error("Onus: You must provide at least one child component.");
	}
	if (
		!Array.isArray(assets) ||
		!assets.every((asset) => asset && typeof asset.type === "string" && typeof asset.src === "string")
	) {
		console.error("Onus: Invalid assets. Expected an array of objects with 'type' and 'src' properties.");
		throw new Error("Onus: Invalid assets. Expected an array of objects with 'type' and 'src' properties.");
	}
}

/**
 * `determineIfAllAssetsLoaded` Determines if all assets have been successfully loaded based on the given state.
 *
 * @param {LoadingState} state - The loading state containing information about assets to load and assets loaded.
 * @returns {boolean} Returns true if all assets have been loaded, otherwise returns false.
 */

export function determineIfAllAssetsLoaded(state: LoadingState) {
	if (state.assetsToLoad !== 0 && state.assetsLoaded !== 0 && state.assetsToLoad === state.assetsLoaded) {
		return true;
	} else {
		return false;
	}
}
