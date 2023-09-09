import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import eslint from "@rollup/plugin-eslint";

export default [
	{
		input: "./lib/index.tsx", //source
		output: [
			{
				file: "dist/index.es.js", //ecma module
				format: "es",
				exports: "named",
			},
		],
		plugins: [
			eslint({
				throwOnError: true,
				throwOnWarning: true,
				include: ["lib/**/*.ts", "lib/**/*.tsx"],
				exclude: ["node_modules/**"],
			}),
			//bundles css into js and minifys
			postcss({
				plugins: [],
				minimize: true,
			}),
			typescript({
				tsconfig: "./tsconfig.json", // Path to your tsconfig.json file
			}),
			//makes react work
			babel({
				exclude: "node_modules/**",
				presets: ["@babel/preset-react"],
			}),
			//ensures our peer deps are always required
			external(),
			//ensures we can find the users node_modules
			resolve(),
			//resolves commonjs modules
			commonjs(),
			//minifys our js
			terser(),
		],
	},
];
