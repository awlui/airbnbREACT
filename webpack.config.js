const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	style: path.join(__dirname, 'app/main.scss'),
	test: path.join(__dirname, 'tests'),
	boostrap: path.join(__dirname, 'node_modules/bootstrap-sass')
};
const pkg = require('./package.json');
process.env.BABEL_ENV = TARGET;
const common = {
	entry: {
		app: PATHS.app,
		style: PATHS.style
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		loaders: [
		{
			test: /\.jsx?$/,
			loaders: ['babel-loader?cacheDirectory'],
			include: PATHS.app
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'node_modules/html-webpack-template/index.ejs',
			title: 'React Map',
			appMountId: 'root',
			inject: false
		})
	]
};

if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		entry: {
			style: PATHS.style
		},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
		devtool: 'eval-source-map',
		devServer: {
			contentBase: PATHS.build,
			historyApiFallback: true,
			hot: true,
			inline: true,
			stats: 'errors-only',
			host: process.env.HOST,
			port: process.env.PORT
		},
		module: {
			loaders: [
				{
					test: /\.scss$/,
					loaders: ['style-loader', 'css-loader', 'sass-loader'],
					include: PATHS.app
				}, 
			]
		},
		plugins: [
		new webpack.HotModuleReplacementPlugin()
		]
	});
}

if (TARGET === 'build' || TARGET === 'stats') {
	module.exports = merge(common, {
		entry: {
			vendor: Object.keys(pkg.dependencies).filter(function(v) {
				return v !== 'alt-utils';
			}),
			style: PATHS.style
		},
	output: {
		path: PATHS.build,
		filename: '[name].[chunkhash].js',
		chunkFilename: '[chunkhash].js'
	},
	module: {
		loaders: [
			{
				test: /\.scss?/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader!sass-loader"
				}),
				include: PATHS.app
			}
		]
	},
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}),
			new webpack.optimize.CommonsChunkPlugin({
				names: ['vendor', 'manifest']
			}),
			new CleanPlugin([PATHS.build], {
				verbose: false
			}),
			new ExtractTextPlugin('[name].[chunkhash].css')
		]
	});
}

if (TARGET === 'test' || TARGET === 'tdd') {
	module.exports = merge(common, {
		devtool: 'inline-source-map',
		resolve: {
			alias: {
				'app': PATHS.app
			}
		},
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.jsx?$/,
					loader: 'isparta-instrumenter-loader',
					exclude: /(node_modules)/
				}
			],
			loaders: [
				{
					test: /\.jsx?$/,
					loaders: ['babel-loader?cacheDirectory'],
					include: PATHS.test
				}
			]
		}
	})
}