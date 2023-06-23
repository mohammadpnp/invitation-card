const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode   : 'development',
	entry  : path.resolve(__dirname, 'src/index.js'),
	output : {
		path    : path.resolve(__dirname, 'output'),
		filename: 'bundle.js',
	},
	resolve: {
		extensions: [
			'.js',
			'.jsx',
			'.tsx',
		],
	},
	module : {
		rules: [
			{
				test   : /\.(js|jsx|tsx)$/,
				exclude: /node_modules/,
				use    : {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/i,
				use : ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin(
			{
				template: './public/index.html',
				filename: './index.html',
			},
		),
	],
};
