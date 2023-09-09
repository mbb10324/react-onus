import { ReactNode } from "react";

//asset type
export interface Asset {
	type: "font" | "image" | "video" | "audio" | "svg";
	src: string;
}

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
