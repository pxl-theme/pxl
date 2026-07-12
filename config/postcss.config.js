/** @type {import('postcss-load-config').Config} */

import postcssImportExtGlob from "postcss-import-ext-glob";
import postcssImport        from "postcss-import";
import postcssLightningcss  from "postcss-lightningcss";
// import autoprefixer from 'autoprefixer',
// import postcssCustomMedia from 'postcss-custom-media',
// Replaced by LightningCSS

import postcssWillChange    from "postcss-will-change";
import postcssMixins        from "postcss-mixins";
import postcssNested        from "postcss-nested";
import postcssPseudoAnyLink from "postcss-pseudo-class-any-link";
// import postcssCSSValidator from 'postcss-w3c-css'

// import * as postcssPseudoClassAnyLink from "postcss-pseudo-class-any-link";


const config = {
	plugins: [
		postcssImportExtGlob({ sort: 'asc' }),
		postcssImport({ from: "../static/style/index.css" }),
		postcssLightningcss({
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
		postcssWillChange,
		postcssMixins,
		postcssNested,
		postcssPseudoAnyLink
	]
};
export default config;
