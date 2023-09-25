import { renderHook, act, waitFor } from "@testing-library/react";
import { useOnusHook } from "../lib/onusHook";
import { Asset } from "../lib/onusTypes";

const globalContext = typeof window !== "undefined" ? window : global;

let originalCreateElement: typeof document.createElement;
let mockVideoElement: any;
let mockFontObserver: jest.Mock;

// Mock FontFaceObserver
jest.mock("fontfaceobserver", () => {
	return jest.fn().mockImplementation((fontName) => {
		return {
			load: mockFontObserver,
		};
	});
});

const mockMethods = {
	oncanplaythrough: jest.fn(),
	onerror: jest.fn(),
	play: jest.fn(),
	pause: jest.fn(),
};

const mockProperties = {
	src: "",
};

function MockVideoElement() {
	// Use the originalCreateElement to bypass the mock
	const videoElement = originalCreateElement.call(document, "video");
	Object.assign(videoElement, mockMethods, mockProperties);
	mockVideoElement = videoElement; // Store it
	return videoElement;
}

describe("useOnusHook", () => {
	let mockDispatch: jest.Mock;
	let mockImageObject: any;

	beforeAll(() => {
		globalContext.Image = jest.fn().mockImplementation(() => {
			const mockObj = {
				onload: null,
				onerror: null,
			};
			mockImageObject = mockObj;
			return mockObj;
		});
	});

	beforeEach(() => {
		originalCreateElement = document.createElement;
		mockDispatch = jest.fn();

		(document.createElement as any) = function (type: string) {
			if (type === "video") {
				return MockVideoElement();
			}
			return originalCreateElement.call(document, type);
		};
		mockFontObserver = jest.fn();
	});

	afterEach(() => {
		document.createElement = originalCreateElement;
		mockDispatch.mockReset();
		(globalContext.Image as jest.Mock).mockClear();
		mockImageObject = undefined;
	});

	afterAll(() => {
		delete (globalContext as any).Image;
	});

	it("registers an asset", () => {
		const assets: Asset[] = [{ type: "image", src: "some-src.jpg" }];
		renderHook(() => useOnusHook(mockDispatch, assets, true));
		expect(mockDispatch).toHaveBeenCalledWith({ type: "REGISTER" });
	});

	it("successfully loads an image asset", () => {
		const assets: Asset[] = [{ type: "image", src: "some-src.jpg" }];
		renderHook(() => useOnusHook(mockDispatch, assets, true));

		// Ensure that the Image constructor has been called
		expect(globalContext.Image).toHaveBeenCalledTimes(1);

		// Simulate the image being loaded
		act(() => {
			if (mockImageObject && mockImageObject.onload) {
				mockImageObject.onload();
			}
		});
		expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: "LOADED" });
	});

	it("errors while loading an image asset", () => {
		const assets: Asset[] = [{ type: "image", src: "some-src.jpg" }];
		renderHook(() => useOnusHook(mockDispatch, assets, true));

		// Ensure that the Image constructor has been called
		expect(globalContext.Image).toHaveBeenCalledTimes(1);

		// Simulate the image error event
		act(() => {
			if (mockImageObject && mockImageObject.onerror) {
				mockImageObject.onerror();
			}
		});

		// Verify that an error has been dispatched
		expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: "ERROR" }); // Adjust this if your hook makes more dispatch calls before the error.
	});

	it("successfully loads a video asset", () => {
		const assets: Asset[] = [{ type: "video", src: "some-video.mp4" }];
		renderHook(() => useOnusHook(mockDispatch, assets, true));

		act(() => {
			if (mockVideoElement && mockVideoElement.oncanplaythrough) {
				mockVideoElement.oncanplaythrough();
			}
		});

		expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: "LOADED" });
	});

	it("errors while loading a video asset", () => {
		const assets: Asset[] = [{ type: "video", src: "some-video.mp4" }];
		renderHook(() => useOnusHook(mockDispatch, assets, true));

		act(() => {
			if (mockVideoElement && mockVideoElement.onerror) {
				mockVideoElement.onerror();
			}
		});

		expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: "ERROR" });
	});

	it("successfully loads a font asset", async () => {
		const assets: Asset[] = [{ type: "font", src: "some-font-name" }];

		mockFontObserver.mockResolvedValueOnce(null); // Simulate font loading successfully

		renderHook(() => useOnusHook(mockDispatch, assets, true));

		await act(async () => {
			/* just wait */
		});

		expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: "LOADED" });
	});

	it("errors while loading a font asset", async () => {
		const assets: Asset[] = [{ type: "font", src: "some-font-name" }];

		mockFontObserver.mockRejectedValueOnce(new Error("Font loading error")); // Simulate font loading error

		renderHook(() => useOnusHook(mockDispatch, assets, true));

		await act(async () => {
			/* just wait */
		});

		expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: "ERROR" });
	});

	it("throws an error for an unsupported asset type", async () => {
		const mockDispatch = jest.fn();
		const assets: Asset[] = [{ type: "unsupportedType", src: "some-src" }] as any;

		let error: any;
		try {
			act(() => {
				renderHook(() => useOnusHook(mockDispatch, assets, true));
			});
		} catch (e) {
			error = e;
		}

		await waitFor(() => {
			expect(error).toBeDefined();
			expect(error.message).toBe("Onus: Unsupported asset type: unsupportedType");
		});
	});

	it("successfully registers an audio asset", () => {
		const mockDispatch = jest.fn();
		const assets: Asset[] = [{ type: "audio", src: "test-audio.mp3" }];

		act(() => {
			renderHook(() => useOnusHook(mockDispatch, assets, true));
		});

		// Assuming a "REGISTER" action is dispatched when registering an asset
		expect(mockDispatch).toHaveBeenCalledWith({ type: "REGISTER" });
	});
});
