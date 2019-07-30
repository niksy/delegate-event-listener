'use strict';

const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonJs = require('rollup-plugin-commonjs');

module.exports = {
	input: 'index.js',
	output: [
		{
			file: 'index.cjs.js',
			format: 'cjs',
			sourcemap: true
		},
		{
			file: 'index.esm.js',
			format: 'esm',
			sourcemap: true
		}
	],
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		nodeResolve(),
		commonJs({
			sourceMap: true
		})
	]
};
