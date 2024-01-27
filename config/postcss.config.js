/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: [
		require('postcss-import-ext-glob')({sort: 'asc'}),
		require('postcss-import')({ from: "../static/style/index.css" }),
		require('postcss-lightningcss')
		({
			lightningcssOptions: {
				errorRecovery: true,
				sourceMap: false,
				minify: false,
				cssModules: false,
				drafts: {
					customMedia: true,
					nesting: false
				}
			}
		}),
		require('postcss-will-change'),
		// require('autoprefixer'), // might got replaced by parcel-css in the future
		require('postcss-mixins'),
		require('postcss-nested'), // might got replaced by parcel-css in the future
		// require('postcss-custom-media'), // might got replaced by parcel-css in the future
		require('postcss-brand-colors'),
		require('postcss-pseudo-class-any-link')
		// require('postcss-w3c-css')
	]
}
module.exports = config
