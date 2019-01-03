'use strict';

const minimist = require('minimist');

let config;

const args = minimist(process.argv.slice(2), {
	'default': {
		local: false
	}
});

const local = args.local;
const port = 9001;

if ( local ) {
	config = {
		browsers: ['Chrome'],
	};
} else {
	config = {
		browserStack: {
			startTunnel: true,
			project: 'delegate-event-listener',
			name: 'Automated (Karma)',
			build: 'Automated (Karma)'
		},
		customLaunchers: {
			'BS-Chrome': {
				base: 'BrowserStack',
				browser: 'Chrome',
				os: 'Windows',
				'os_version': '7',
				project: 'delegate-event-listener',
				build: 'Automated (Karma)',
				name: 'Chrome'
			},
			'BS-Firefox': {
				base: 'BrowserStack',
				browser: 'Firefox',
				os: 'Windows',
				'os_version': '7',
				project: 'delegate-event-listener',
				build: 'Automated (Karma)',
				name: 'Firefox'
			},
			'BS-IE9': {
				base: 'BrowserStack',
				browser: 'IE',
				'browser_version': '9',
				os: 'Windows',
				'os_version': '7',
				project: 'delegate-event-listener',
				build: 'Automated (Karma)',
				name: 'IE9'
			},
		},
		browsers: ['BS-Chrome', 'BS-Firefox', 'BS-IE9']
	};
}

module.exports = function ( baseConfig ) {

	baseConfig.set(Object.assign({
		basePath: '',
		frameworks: ['mocha'],
		files: [
			'test/**/*.html',
			'test/**/.webpack.js'
		],
		exclude: [],
		preprocessors: {
			'test/**/*.html': ['html2js'],
			'test/**/.webpack.js': ['webpack', 'sourcemap']
		},
		reporters: ['mocha'],
		port: port,
		colors: true,
		logLevel: baseConfig.LOG_INFO,
		autoWatch: false,
		client: {
			captureConsole: true
		},
		browserConsoleLogOptions: {
			level: 'log',
			format: '%b %T: %m',
			terminal: true
		},
		webpack: {
			mode: 'none',
			devtool: 'cheap-module-inline-source-map',
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: [{
							loader: 'babel-loader'
						}]
					}
				]
			}
		},
		singleRun: true,
		concurrency: Infinity
	}, config));

};
