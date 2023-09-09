import { determineIfAllAssetsLoaded, handleGeneralErrors } from "./onusHelpers";
import { LoadingProviderProps } from "./onusTypes";
import { useOnusReducer } from "./onusReducer";
import { useOnusHook } from "./onusHook";
import { useEffect } from "react";
import "./style.css";

/**
 * `Onus` This component manages the preloading of provided assets  (images, fonts, videos, audio, svgs),
 * optionally displaying a loader component or an error component based on the loading state
 * and any errors that may arise. When all assets are loaded, it displays the children components.
 *
 * @prop assets - (Required) An array of assets to preload.
 * @prop loader - (Optional) A custom loader component to show while assets are loading.
 * @prop error - (Optional) A custom error component to show if an error occurs while loading assets.
 * @prop handleLoading - (Optional) Flag to indicate if Onus should handle the rendering during loading. If set to false, children are rendered immediately.
 * @prop handleErrors - (Optional) Flag to indicate if Onus should handle errors during asset loading.
 * @prop onLoaded - (Optional) A callback function to be invoked when all assets have finished loading.
 *
 * @example
 *import Onus from 'react-onus';
 *
 *function App() {
 *      const assets = [
 *          { type: "font", src: "Roboto" },
 *          { type: "image", src: "https://via.placeholder.com/150" },
 *      ];
 *
 *      return (
 *          <Onus assets={assets}>
 *              <div>
 *                  <h1>Your App</h1>
 *                  <img src="https://via.placeholder.com/150" alt="placeholder" />
 *              </div>
 *          </Onus>
 *      );
 *}
 */

export default function Onus(props: LoadingProviderProps) {
	//destructure props
	const { children, assets, loader, error, handleLoading = true, handleErrors, onLoaded } = props;

	//handle all potential immediate errors
	handleGeneralErrors(assets, children);

	//initialize reducer
	const { state, dispatch } = useOnusReducer();

	//initialize hook to handle loading and errors
	useOnusHook(dispatch, assets, handleErrors);

	//fire onLoaded callback if all assets have loaded
	useEffect(() => {
		if (determineIfAllAssetsLoaded(state) && onLoaded) {
			onLoaded();
		}
		/* eslint-disable-next-line */
	}, [state.assetsToLoad, state.assetsLoaded]);

	//decide if we should render the error
	if (handleErrors && state.error) {
		return error || <div className="react-onus-error">An error occurred while loading assets.</div>;
	}
	//if we don't want to handle loading, just render the children
	if (!handleLoading) {
		return children;
	}
	//render the children if all assets have loaded, otherwise render the loader
	return determineIfAllAssetsLoaded(state) ? children : loader || <div className="react-onus-loader"></div>;
}
