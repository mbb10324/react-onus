import { ReactNode } from "react";

/**
 * `Asset` An object type containing the type and source of an asset to be loaded.
 *
 * @typedef {Object} Asset
 * @property {("font" | "image" | "video" | "audio" | "svg")} type - The type of the asset.
 * @property {string} src - The source of the asset.
 */

export type Asset = {
	type: "font" | "image" | "video" | "audio" | "svg";
	src: string;
};

//prop types
export interface LoadingProviderProps {
	children: ReactNode;
	assets: Asset[];
	loader?: ReactNode;
	error?: ReactNode;
	handleLoading?: boolean;
	handleErrors?: boolean;
	onLoaded?: () => void;
}

//reducer state types
export interface LoadingState {
	assetsToLoad: number;
	assetsLoaded: number;
	error: boolean;
}

//reducer action types
export type LoadingAction = { type: "REGISTER" } | { type: "LOADED" } | { type: "ERROR" };
