import React, { useEffect, useReducer, ReactNode } from "react";
import FontFaceObserver from "fontfaceobserver";
import "./style.css";

/*prop types
 **********************************************************************************************/
interface LoadingProviderProps {
	children: ReactNode;
	assets: Asset[];
	loader?: ReactNode;
	handleErrors?: boolean;
	error?: ReactNode;
	onLoaded?: () => void;
}

interface Asset {
	type: string;
	src: string;
}

/*reducer types
 **********************************************************************************************/
interface LoadingState {
	assetsToLoad: number;
	assetsLoaded: number;
	error: boolean;
}

type LoadingAction = { type: "REGISTER" } | { type: "LOADED" } | { type: "ERROR" };

/*reducer initial state
 **********************************************************************************************/
const initialState: LoadingState = {
	assetsToLoad: 0,
	assetsLoaded: 0,
	error: false,
};

/*reducer to handle state changes
 **********************************************************************************************/
function loadingReducer(state: LoadingState, action: LoadingAction): LoadingState {
	switch (action.type) {
		//register each asset that will be qued up for loading
		case "REGISTER":
			return { ...state, assetsToLoad: state.assetsToLoad + 1 };
		//increment the number of assets that have loaded
		case "LOADED":
			return { ...state, assetsLoaded: state.assetsLoaded + 1 };
		//set error to true if an asset fails to load
		case "ERROR":
			return { ...state, error: true };
		default:
			throw new Error(`Onus: Unsupported action type: ${(action as any).type}`);
	}
}

/*onus main component
 **********************************************************************************************/
const Onus: React.FC<LoadingProviderProps> = ({ children, assets, loader, handleErrors, error, onLoaded }) => {
	//conditional logic to handle invalid props
	if (!assets) {
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

	//initialize state
	const [state, dispatch] = useReducer(loadingReducer, initialState);

	useEffect(() => {
		//temporary storage for media elements so we can clean them up in the dom when we finish
		const mediaElements: HTMLMediaElement[] = [];

		//handle asset errors
		const handleAssetError = (type: string, src: string, handleErrors?: boolean) => {
			if (handleErrors) {
				console.error(`Onus: Failed to load ${type} asset from source: ${src}`);
				dispatch({ type: "ERROR" });
			}
		};

		//loop over assets
		assets.forEach((asset) => {
			const { type, src } = asset;

			//initialize registration with our reducer
			dispatch({ type: "REGISTER" });

			switch (type) {
				//IMAGES AND SVGS
				case "image":
				case "svg":
					const imgElement = new Image();
					imgElement.src = src;
					imgElement.onload = () => dispatch({ type: "LOADED" });
					imgElement.onerror = () => handleAssetError(type, src, handleErrors);

					break;

				//VIDEOS AND AUDIO
				case "video":
				case "audio":
					const media = type === "video" ? document.createElement("video") : new Audio(src);
					media.oncanplaythrough = () => {
						dispatch({ type: "LOADED" });
						media.oncanplaythrough = null;
					};
					media.onerror = () => handleAssetError(type, src, handleErrors);
					media.src = src;
					mediaElements.push(media);
					break;

				// FONTS
				case "font":
					const loadFonts = async () => {
						//use fontfaceobserver to listen for when the font is loaded
						const font = new FontFaceObserver(src);
						try {
							await font.load();
							dispatch({ type: "LOADED" });
						} catch (err) {
							handleAssetError(type, src, handleErrors);
						}
					};

					loadFonts();

					break;

				default:
					throw new Error(`Onus: Unsupported asset type: ${type}`);
			}
		});

		//clean up media elements
		return () => {
			mediaElements.forEach((media) => {
				media.oncanplaythrough = null;
				media.onerror = null;
			});
		};
	}, [assets, handleErrors]);

	//determine if all assets have loaded
	function determineIfAllAssetsLoaded() {
		if (state.assetsToLoad !== 0 && state.assetsLoaded !== 0 && state.assetsToLoad === state.assetsLoaded) {
			return true;
		} else {
			return false;
		}
	}

	//fire onLoaded callback if all assets have loaded
	useEffect(() => {
		if (determineIfAllAssetsLoaded() && onLoaded) {
			onLoaded();
		}
		// eslint-disable-next-line
	}, [state.assetsToLoad, state.assetsLoaded]);

	//var to determine if all assets have loaded
	const allAssetsLoaded = determineIfAllAssetsLoaded();

	//conditional logic to render children, loader, or error
	if (handleErrors && state.error) {
		return error || <div className="react-onus-error">An error occurred while loading assets.</div>;
	}

	return allAssetsLoaded ? children : loader || <div className="react-onus-loader" />;
};

export default Onus;
