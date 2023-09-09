import { Asset, LoadingAction } from "./onusTypes";
import FontFaceObserver from "fontfaceobserver";
import { Dispatch, useEffect } from "react";

/**
 * `useOnusHook` Custom React hook to handle the loading/errors for assets. This component utilizes a single useEffect
 * which handles the main logic for determing if an asset has loaded or errored, and dispatchs the
 * reducer accordingly.
 *
 * @param {Dispatch<LoadingAction>} dispatch - A dispatch function from useReducer to manage asset loading state.
 * @param {Asset[]} assets - An array of assets that are to be loaded.
 * @param {boolean|undefined} handleErrors - Flag to determine if errors should be handled and logged.
 * @throws {Error} Throws an error if an unsupported asset type is provided.
 */

export function useOnusHook(dispatch: Dispatch<LoadingAction>, assets: Asset[], handleErrors: boolean | undefined) {
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
						/**use fontfaceobserver to listen for when the font is loaded**/
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
		/* eslint-disable-next-line */
	}, [assets, handleErrors]);
}
