const { readFileSync } = require('fs');
const { join, resolve } = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const setup = require('./setup');

const dist = join(__dirname, '../dist');
const exclude = /(.*([\/\\]node_modules|\.\.)[\/\\](@[^\/\\]+[\/\\])?[^\/\\]+)([\/\\].*)?$/g;

module.exports = env => {
	const isProd = env && env.production;

	return {
		entry: {
			app: './src/index.js',
			vendor: [
				// pull these to a `vendor.js` file
				'preact'
			]
		},
		output: {
			path: dist,
			filename: '[name].[hash].js',
			publicPath: '/'
		},
		resolve: {
			alias: {
				// you may need `preact-compat` instead!
				'react': 'preact/aliases',
	 			'react-dom': 'preact/aliases'
			}
		},
		module: {
			rules: [{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include(file) {
					if (file.split(/[/\\]/).indexOf('node_modules')===-1) return true;
					if (/(mimic-fn|mem|p-(memoize|queue))/i.test(file)) return true; // edge cases
					let pkg, manifest = resolve(file.replace(exclude, '$1'), 'package.json');
					try {
						pkg = JSON.parse(readFileSync(manifest));
					} catch (e) {}
					return !!(pkg.module || pkg['jsnext:main']);
				}
			}, {
				test: /\.(sass|scss)$/,
				loader: isProd ? ExtractText.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader!postcss-loader!sass-loader'
				}) : 'style-loader!css-loader!postcss-loader!sass-loader'
			}]
		},
		plugins: setup(isProd),
		devtool: !isProd && 'eval',
		devServer: {
			contentBase: dist,
			port: process.env.PORT || 3000,
			historyApiFallback: true,
			compress: isProd,
			inline: !isProd,
			hot: !isProd
		}
	};
};
