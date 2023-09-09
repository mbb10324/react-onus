import { LoadingAction, LoadingState } from "./onusTypes";
import { useReducer } from "react";

/**
 *`useOnusReducer` Custom React hook to manage the state and actions associated with loading assets.
 * Internally, it leverages a reducer (`loadingReducer`) to handle state updates.
 */

//initialize reducer
export function useOnusReducer() {
	const [state, dispatch] = useReducer(loadingReducer, initialState);
	return { state, dispatch };
}

//reducer to handle state changes
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
			return state;
	}
}

//initial state
const initialState: LoadingState = {
	assetsToLoad: 0,
	assetsLoaded: 0,
	error: false,
};
