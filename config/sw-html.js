/**
 * Transform `src/index.html` for Offline use.
 * @see  https://github.com/jantimon/html-webpack-plugin#events
 */
class OfflineHTML {
	// constructor(opts) {}
	apply(compiler) {
		const titleRgx = new RegExp('__title__', 'g');
		const contentRgx = new RegExp('__content__', 'g');
		const scriptTypeRgx = new RegExp('type="text/javascript" ', 'g');

		compiler.plugin('compilation', webpack => {
			webpack.plugin('html-webpack-plugin-after-html-processing', (plugin, cb) => {
				const data = plugin.html.replace(contentRgx, 'void 0').replace(titleRgx, 'Hacker News').replace(scriptTypeRgx, '');
				webpack.assets['index.html'] = {
					size: () => data.length,
					source: () => data,
				};
				cb(null, plugin);
			});
		});
	}
}

module.exports = OfflineHTML;
