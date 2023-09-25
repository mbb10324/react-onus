import { renderHook, act } from "@testing-library/react";
import { useOnusReducer } from "../lib/onusReducer";

describe("useOnusReducer", () => {
	it("should initialize with the correct initialState", () => {
		const { result } = renderHook(() => useOnusReducer());
		expect(result.current.state).toEqual({
			assetsToLoad: 0,
			assetsLoaded: 0,
			error: false,
		});
	});

	it("should handle the REGISTER action", () => {
		const { result } = renderHook(() => useOnusReducer());
		act(() => {
			result.current.dispatch({ type: "REGISTER" });
		});
		expect(result.current.state.assetsToLoad).toEqual(1);
	});

	it("should handle the LOADED action", () => {
		const { result } = renderHook(() => useOnusReducer());
		act(() => {
			result.current.dispatch({ type: "LOADED" });
		});
		expect(result.current.state.assetsLoaded).toEqual(1);
	});

	it("should handle the ERROR action", () => {
		const { result } = renderHook(() => useOnusReducer());
		act(() => {
			result.current.dispatch({ type: "ERROR" });
		});
		expect(result.current.state.error).toBe(true);
	});

	it("should return the current state for unknown actions", () => {
		const { result } = renderHook(() => useOnusReducer());
		act(() => {
			result.current.dispatch({ type: "UNKNOWN" } as any);
		});
		expect(result.current.state).toEqual({
			assetsToLoad: 0,
			assetsLoaded: 0,
			error: false,
		});
	});
});
