const assetTransformer = {
	process() {
		return "module.exports = {};";
	},
	getCacheKey() {
		return "assetTransformer";
	},
};

module.exports = {
	verbose: true,
	moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
	moduleDirectories: ["node_modules"],
	moduleNameMapper: {
		"\\.(css|less)$": "identity-obj-proxy",
		"\\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|flac|aac)$": assetTransformer,
	},
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	testEnvironment: "jsdom",
	collectCoverageFrom: ["lib/**/*.{ts,tsx}"],
};
