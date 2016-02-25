import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import dotenv from 'dotenv';
import NpmInstallPlugin from 'npm-install-webpack-plugin';

// read environment from .env file
dotenv.config();

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
	entry: {
		app: PATHS.app
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: PATHS.build,
		filename: 'app.js'
	},
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loaders: ['eslint'],
				include: PATHS.app
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				query: {
					cacheDirectory: true
				},
				include: PATHS.app
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: PATHS.app
			}
		]
	}
};

let config = common;
if (TARGET === 'start' || !TARGET) {
	config = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			contentBase: PATHS.build,
			hot: true,
			inline: true,
			progress: true,
			stats: 'errors-only',

			// for usage with html5 history api: serve index.html instead of 404s
			historyApiFallback: true,

			// read host and port from environment
			host: process.env.HOST,
			port: process.env.PORT
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new NpmInstallPlugin({
				save: true
			})
		]
	});
}

export default config;
