var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	entry: [
		'babel-polyfill',
		path.resolve(__dirname, 'src/main.jsx')
	],
	resolve: {
		//When requiring, you don't need to add these extensions
		extensions: [".js", ".jsx", ".scss"]
	},
	output: {
		path: __dirname + '/build',
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new OpenBrowserPlugin({ url: 'http://localhost:8080' })
	],
	module: {
		loaders: [
			{
				test: /\.css$/,
				include: path.resolve(__dirname, 'src'),
				loader: 'style-loader!css-loader?modules'
			},
			{
				test: /\.jsx?$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8192'
			},
			{
				test: /\.scss$/,
				include: path.resolve(__dirname, 'src'),
				loaders: ["style-loader", "css-loader", "sass-loader"]
			},
		]
	}
};