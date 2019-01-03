'use strict';

const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonJs = require('rollup-plugin-commonjs');

module.exports = {
	input: 'index.js',
	output: [
		{
			file: 'dist/index.cjs.js',
			format: 'cjs'
		},
		{
			file: 'dist/index.esm.js',
			format: 'esm'
		}
	],
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		nodeResolve(),
		commonJs()
	]
};
