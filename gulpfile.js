/***** Modules
*/
/**** Essentials
*/
import gulp                from 'gulp';
const {src, dest, parallel, series, task, watch} = gulp;
import pump                from "pump"
import del                 from "del"
import rename              from "gulp-rename"
import stringReplace       from "gulp-string-replace"
import sourcemaps          from "gulp-sourcemaps"
import filter              from "gulp-filter"
import zip                 from "gulp-zip"
import browsersyncSrc      from "browser-sync"
import path                from "path"
const browsersync = browsersyncSrc.create();

/**** HTML
*/
import htmlmin             from "gulp-htmlmin"
import {htmlValidator}     from "gulp-w3c-html-validator"

/** PostHTML Plugins
*/
import posthtml            from "gulp-posthtml"

import posthtmlInclude     from "posthtml-include"
import posthtmlLorem       from "posthtml-lorem"
import posthtmlMd          from "posthtml-md"
import posthtmlAltAlways   from "posthtml-alt-always"
// import posthtmlExpressions from "posthtml-expressions"

/**** CSS
*/
import stylelint           from "gulp-stylelint"
import sorter              from "css-declaration-sorter"
import nano                from "cssnano"
import purgeCSS            from "gulp-purgecss"
import w3cCSS              from "gulp-w3c-css"

import rcs                 from "gulp-rcs"

/**** JavaScript
*/
import concat              from "gulp-concat"
import uglifyjs            from "uglify-es"
import composer            from "gulp-uglify/composer.js"
const uglifyMinify         = composer(uglifyjs, console);
// import eslint              from "gulp-eslint"
import eslint              from "gulp-eslint7"

/** PostCSS Plugins
*/
import postcss             from "gulp-postcss"
import autoprefixer        from "autoprefixer"
// import colorMod            from "postcss-color-mod-function"
import mixins              from "postcss-mixins"
// import calc                from "postcss-calc" // To reduce calc values
// import presetenv           from "postcss-preset-env"
import nested              from "postcss-nested"
// import nesting              from "postcss-nesting"
import extractMediaQuery   from "postcss-extract-media-query"
import willChange          from "postcss-will-change"
// import focus               from "postcss-focus"
import customMedia         from "postcss-custom-media"
import atImport            from "postcss-import"
import atImportGlob        from "postcss-import-ext-glob"
// import urlrev              from "postcss-urlrev"
import extend              from "postcss-extend"
import anylinkPseudo       from "postcss-pseudo-class-any-link"
import overflowWrap        from "postcss-replace-overflow-wrap"
import cssPseudos          from "postcss-pseudoelements"
import fontVariant         from "postcss-font-variant"
import inlineSVG           from "postcss-inline-svg"
import brandColors         from "postcss-brand-colors"

// import fontgrabbermodule   from "postcss-font-grabber"
// const  {fontGrabber} = fontgrabbermodule;

// import fontMagician        from "postcss-font-magician"

// import colorblind          from "postcss-colorblind"


/**** Images
*/
/** imagemin Plugins
 * https://www.npmjs.com/browse/keyword/imageminplugin
*/
import imagemin, {gifsicle, svgo} from "gulp-imagemin"
// import imagemin, {gifsicle,mozjpeg,optipng,svgo} from "gulp-imagemin"
// import webp          from "gulp-webp"
import webp                from "imagemin-webp"
import gif2webp            from "imagemin-gif2webp"
import svgstore            from "gulp-svgstore"
// import svgmin              from "gulp-svgmin"
import cheerio             from "gulp-cheerio"

/***** Paths & Variables
*/

/**** Directory Names and Paths
*/
// All files on-going production, where things get dirty.
const srcDir = "src";
const srcPath = {
	html:     srcDir+"/html",
	css:      srcDir+"/css",
	js:       srcDir+"/js",
	img:      srcDir+"/img",
	icon:     srcDir+"/icon/slices",
	font:     srcDir+"/font",
	eleventy: srcDir+"/11ty"
	// icon:     srcDir+"/icon",
};
const watched = {
	html: srcPath.html + "/**/*.html",
	// html: srcPath.html + "/index.html",

	css: srcPath.css + "/a.css",
	cssAll: srcPath.css + "/**/*.css",
	// css: [srcPath.css + "/style.css", srcPath.css + "/icon.css"],
	// css: srcPath.css + "/**/*.css",

	jsMain: srcPath.js + "/**/*.js",
	// jsMain: [srcPath.js + "/**/*.js", "!" + srcPath.js + "/vendor/*.js" ],

	img1: srcPath.img + "/**/*.{jpg,png,tif,webp}", // Image extensions to convert to WebP
	img2: srcPath.img + "/**/*.{svg,gif}", // To optimize GIFs and SVGs
	// img: [srcPath.img + "/**/*", "!" + srcPath.img + "/icon/*"], except icon material

	icon: srcPath.icon + "/**/*.svg", // for sprites

	font: srcPath.font + "/**/*.woff2",
	// font: srcPath.font + "/**/*.{woff2,ttf,svg}",

	all: srcPath.src + "/**/*.*",
	eleventy: srcPath.eleventy + "/**/*"
};

// All text-based files prepared for distribution, unminified but processed.
const predistDir = "pre-dist";
const predist = {
	html: predistDir + "/**/*.html",
	css: predistDir + "/*.css",
	js: predistDir + "/**/*.js"
}

// Ready-to-export distribution files.
const distDir = "dist";

// Third party JavaScript libraries, dependencies.
const jsVendors = [
	// Warning: jQuery must be on the top!!!
	"node_modules/jquery/dist/jquery.min.js",
	"node_modules/enquire.js/dist/enquire.min.js",
	"node_modules/colcade/colcade.js",
	//TODO: Need to minimize colcade.js in the mergeVendor task.
	"node_modules/lazysizes/lazysizes.min.js",
	"node_modules/no-darkreader/nodarkreader.min.js"
];
// const jsVendor: srcPath.js + "/vendor/*.js";

// var jsOutputOrig = [distDir + "/*.js", "!"+distDir+"/*.min.js"];


/**** Renaming Functions
*/
// const renameHTMLFunction = (a)=> {
// 	a.extname = ".min.html";
// 	return a;
// };

const renameCSSFunction = (a)=> {
// example.css -> example.m.css
	a.extname = ".m.css";
	return a;
};
const renameJSFunction = (a)=> {
// example.js -> example.m.js
	a.extname = ".m.js";
	return a;
};

/***** General Tasks
*/

/** BrowserSync
*/
// General config for BrowserSync
function broSync() {
	browsersync.init({
		open: false,
		server: {
			baseDir: distDir
		},
		port: 3000
	});
}
// Reload task for BrowserSync
function broSyncReload(cb) {
	browsersync.reload();
	cb();
}
/**** HTML Tasks
*/
function texts() {
// Process PostHTML plugins to all HTML pages
	return src(watched.html)
		.pipe(posthtml([
			posthtmlInclude({ root: srcPath.html }),
			posthtmlLorem(),
			posthtmlMd(),
			posthtmlAltAlways()
			// posthtmlExpressions({ locals: { theMessage: "This is a message from gulpfile.js" }}),
		]))
		.pipe(dest(predistDir));
}
function clearHTMLIncludes() {
// Clear all HTML includes just in case to get rid of abandoned/old pages
	return del([predistDir + "/includes", predistDir + "/layouts"]);
}
function validateHTML() {
// Validate HTML syntax by the W3C standarts
	return src(predist.html)
		.pipe(htmlValidator.analyzer())
		.pipe(htmlValidator.reporter());
}
function minifyHTML() {
// Clear whitespaces and linebreaks of HTML files
	// return src(watched.html)
	return src(predist.html)
		// .pipe(rename(renameHTMLFunction))
		.pipe(htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
			minifyURLs: true,
			removeComments: true,
			removeOptionalTags: true,
			removeRedundantAttributes: true,
			// removeEmptyElements: true,
			removeStyleLinkTypeAttributes: true,
			removeScriptTypeAttributes: true,
			useShortDoctype: true
		}))
		.pipe(dest(distDir));
}

/**** CSS Tasks
*/
function styles () {
// Process all PostCSS plugins in production CSS files
	let processors = [
		atImportGlob({sort: 'asc'}),
		atImport({ from: watched.css }),
		willChange,
		autoprefixer,
		mixins,
		// calc({mediaQueries: true,selectors: true,precision: 10}),
		// presetenv
		nested,
		// nesting,
		customMedia,
		// colorMod,
		// focus,
		extend,
		// urlrev({relativePath: "src/"}),
		brandColors,
		inlineSVG,
		cssPseudos,
		fontVariant,
		anylinkPseudo,
		w3cCSS,

		// fontGrabber({
		// 	cssDest: predistDir,
		// 	fontDest: watched.font
		// }),

		// fontMagician({
		// 	formats: 'woff2',
		// 	display: 'swap',
		// 	hosted: [srcPath.font]
		// }),

		// colorblind({method:'tritanopia'}),
		overflowWrap({method: "copy"})
	];
	return src(watched.css)
		.pipe(postcss(processors))
		.pipe(dest(predistDir));
}
function lintCSS(){
// Check main CSS files for syntax errors or warnings.
	return src(predist.css)
		.pipe(stylelint({
			failAfterError: true,
			// reportOutputDir: "reports/stylelint",
			// reporters: [
			// 	{formatter: "verbose", console: true},
			// 	{formatter: "json", save: "report.json"}
			// ],
			debug: true
		}))
}
function sortCSS() {
// Sort CSS declarations by a specific order.
	return src(predist.css)
		.pipe(postcss([ sorter({})]))
		.pipe(dest(predistDir));
}

function minifyCSS() {
// Minimize the filesize of processed and linted CSS files.
	return src(predist.css)
		// .pipe(sourcemaps.init())
		// .pipe(sourcemaps.write("map/", {
		//   sourceMappingURLPrefix: "https://www.mydomain.com/"
		// }))
		.pipe(rename(renameCSSFunction))
		.pipe(postcss([ nano({ autoprefixer: false }) ]))
		// .pipe(sourcemaps.write("map/"))
		.pipe(dest(distDir));
}

function clearMedia() {
// Preparation for extracting media queries
	return del(distDir + "/*.mq-*.css");
}


function extractMedia() {
// Extract and separate all declarations inside media queries one by one
	return src([distDir + "/*.m.css", "!" + distDir + "/*.un.*"])
		.pipe(postcss([
			extractMediaQuery({
				output: {
					path: distDir,
					name: '[name].mq-[query].[ext]'
				},
				stats: false,
				extractAll: false,
				queries: {
					// Make sure it's synchronized with the media queries from css/abstract/00-media.css

					// Media Queries for Wrist or smaller
					// "screen and (max-width:2in)": "s",

					// Media Queries for Palm or smaller
					// "screen and (max-width:calc(calc(640/16)*1em)-1px)": "s",

					// Media Queries for Palm or bigger
					"screen and (min-width:calc(calc(640/16)*1em))": "m",

					// Media Queries for Lap or bigger
					"screen and (min-width:calc(calc(960/16)*1em))": "l",

					// Media Queries for Desk or bigger
					"screen and (min-width:calc(calc(1280/16)*1em))": "l",

					// Media Queries for Wall or bigger
					"screen and (min-width:calc(calc(1600/16)*1em))": "xl",

					// Media Queries for Mall or bigger
					"screen and (min-width:calc(calc(1920/16)*1em))": "xl",

					// Media Queries for Titan or bigger
					"screen and (min-width:calc(calc(2400/16)*1em))": "xl",

					// Inputs with Cursor
					"(any-hover:hover)": "cur",
					"(any-pointer:fine)": "cur",
					"(any-hover:hover) and (any-pointer:fine)": "cur",

					// Dark Color Scheme
					"(prefers-color-scheme:dark)": "dark"
				}
			})
		]))
		.pipe(dest(distDir));
}

/**** JavaScript Tasks
*/
function lintJS() {
// Check all main JavaScript files for errors or warnings. Exit when there's error.
	return src(watched.jsMain)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.result(result => {
			// Called for each ESLint result.
			console.log(`ESLint result: ${result.filePath}`);
			console.log(`# Messages: ${result.messages.length}`);
			console.log(`# Warnings: ${result.warningCount}`);
			console.log(`# Errors: ${result.errorCount}`);
		}))
		.pipe(eslint.failAfterError())
		/* Move unchanged and corrected JS files to the pre-dist directory */
		.pipe(dest(predistDir));
}
function mergeVendor(cb) {
// Get JavaScript libraries and concetanate into one vendor JS file with respective order.
	pump([
		src(jsVendors),
		sourcemaps.init(),
		concat("v.js"),
		uglifyMinify(),
		sourcemaps.write("map/"),
		// Skip predist directory, has nothing to do with selector renaming or minimizing.
		dest(distDir)
	],cb);
}

function concatJS(cb) {
// Concatenate main JS files into one file, create source map for easy debugging later.
	var options = {};
	pump([
		src(predist.js),
		sourcemaps.init(),
		// concat("a.js"),
		dest(predistDir),
		// rename("a.m.js"),
		rename(renameJSFunction),
		uglifyMinify(options),
		sourcemaps.write("map/"),
		dest(distDir)
	],
	cb
	);
}

/***** Image Tasks
*/
function convertToWebP() {
// For JPG, PNG, TIFF, SVG and WebP
	return src(watched.img1)
		.pipe(imagemin([
			webp({
				// quality: 75
				// https://github.com/imagemin/imagemin-webp#options
			})
		]))
		.pipe(rename({ extname: '.webp' }))
		.pipe(dest(distDir + "/img"));
}

function optimizeImg() {
// GIF and SVG only
	// return src([watched.img, "!" + "sprite.pxl-icons.svg"])
	// return src([watched.img2, "!" + watched.icon])
	return src(watched.img2)
		.pipe(imagemin([
			gifsicle({
				interlaced: false,
				optimizationLevel: 3
			})
			// ,mozjpeg({quality: 75, progressive: true})
			// ,optipng({optimizationLevel: 5})
			,svgo({
				plugins: [
					{
						name: 'cleanupIDs',
						active: 'false'
					}
				]
			})
		], {
			verbose: true
		}
		))
		.pipe(dest(distDir + "/img"));
}

/***** Other Tasks
*/
function font() {
	// Move fonts to the specified output directory
	return src(watched.font)
		.pipe(dest(distDir + "/font"));
}

function icon() {
	// Move and process SVG icons
	return src(watched.icon)

		// .pipe(svgmin())
		.pipe(svgstore({inlineSVG: true }))
		.pipe(imagemin([
			svgo({
				plugins: [
					{ active:false,name:'inlineStyles' },
					{ active:false,name:'mergeStyles' },
					{ active:true,name:'convertStyleToAttrs' },
					{ active:true,name:'reusePaths' }
				]
			})
		]
		,{
			verbose: false
		}
		))
		.pipe(cheerio({
			run: ($) => {
				$('defs').find('[stroke]').attr({'stroke': 'var(--iconColor)', 'stroke-width': 'var(--iconWeight)'});
				$('g').find('[stroke]').attr({'stroke': 'var(--iconColor)', 'stroke-width': 'var(--iconWeight)'});
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(rename("pi.svg"))
		.pipe(dest(distDir));
}
// Clear all distribution and pre-distribution files
const clear = () => del([predistDir,distDir]);

function zipIt() {
// Make an archive of all distribution files
	return src(distDir + "/**/*")
		.pipe(zip("dist.zip"))
		.pipe(dest("."));
}

// Clear externally generated build files relevant to Eleventy
const clear11ty = () => del("./11ty-build");

function export11ty() {
// Prepare externally generated build files for exportation to the Eleventy environment

	// Copy templates, includes and layouts
	return src(watched.eleventy)
		.pipe(dest("./11ty-build")),

	// Copy CSS & JS,
	src([
		distDir + "/*.m.css",
		distDir + "/*.mq-*.css",
		distDir + "/*.m.js",
		distDir + "/v.js",
		// distDir + "/pi.svg"
		distDir + "/*.svg"
	])
		.pipe(dest("./11ty-build/src/assets/")),

	// src(distDir + "/map/**")
	// 	.pipe(dest("./11ty-build/src/assets/map/")),

	// Copy image assets except fillers
	src([distDir + "/img/**", "!"+distDir+"/img/filler/**"])
		.pipe(dest("./11ty-build/src/assets/img/")),

	// Copy fonts
	src(distDir + "/font/**")
		.pipe(dest("./11ty-build/src/assets/font/"));
}

function unCSS() {
// Delete unused CSS from HTML or JS or make a rejected list of it.
	return src(predist.css)
		// .pipe(rename({
		// 	suffix: ".un"
		// }))
		.pipe(purgeCSS({
			// Check docs for more config: https://purgecss.com/configuration.html
			content: [predist.html, predist.js]
			// safelist: ['', /^nav-/]
			// rejected: true
			// rejectedCss: true
		}))
		.pipe(dest(predistDir));
}

function renameSelectors() {
/* Rename all CSS selectors from the DOM tree and all relevant HTML, JS files */

	// return src(["dist/*.css","src/js/*.js","dist/**/*.html"]

	// All files in the input must not minimized.
	return src(predistDir + "/**/*.{css,js,html}")
		.pipe(rcs({
			// mapping: './config/renaming_map.json'
			replaceKeyframes: true,
			exclude: ["pi","iconColor","iconWeight"]
		}))
		// .pipe(rcs.writeMapping(distDir))
		// .pipe(dest(distDir));
		.pipe(dest(predistDir));
}

/***** Export Files
*/

/***** Task Groups
*/
task("cssInit", series(styles, lintCSS, sortCSS));
task("cssMin", series(minifyCSS, clearMedia, extractMedia));
task("htmlInit", series(texts, clearHTMLIncludes));
task("htmlMin", series(minifyHTML));
task("jsInit", series(lintJS));
task("jsMin", series(mergeVendor, concatJS));

// task("css", series(styles, lintCSS, sortCSS), renameSelectors, series(minifyCSS, unCSS, clearMedia, extractMedia), ()=>{
task("css", series("cssInit", "cssMin"), ()=>{
	browsersync.stream({match: distDir + "/**/*.css"});
});

// task("html", series(texts, w3c), ()=>{
// task("html", series(texts, clearHTMLIncludes, validateHTML, minifyHTML), ()=>{
task("html", series("htmlInit", "htmlMin"), ()=>{
	browsersync.stream({match: distDir + "/**/*.html"});
});

// task("js", series(lintJS), ()=>{
task("js", series("jsInit", "jsMin"), ()=>{
	// browsersync.stream();
	browsersync.stream({match: distDir + "/**/*.js"});
});

task("img", parallel(convertToWebP,optimizeImg), ()=>{
	browsersync.stream({match: distDir + "/**/*.{png,jpg,jpeg,webp,gif,svg}"});
});

/**** Watch Files
*/
// function reportChanges(event) {
// 	console.log("File " + event.path + " was " + event.type + ", running tasks…");
// 	/*TODO: event type and path always outputs "Undefined" */
// }
/* Detect file changes from various filetypes and apply relevant tasks automatically.*/
function watchFiles() {
	watch(watched.cssAll, series("css",broSyncReload)).on("change", ()=>{
		console.log("Changes on CSS files detected, running tasks…");
	});
	watch(watched.html, series("html",broSyncReload)).on("change", ()=>{
		console.log("Changes on HTML files detected, running tasks…");
	});
	watch(watched.jsMain, series("js",broSyncReload)).on("change", ()=>{
		console.log("Changes on JS files detected, running tasks…");
	});
	watch(watched.img1, series(convertToWebP,broSyncReload)).on("change", ()=>{
		console.log("Changes on images detected, running tasks…");
	});
	watch(watched.img2, series(optimizeImg,broSyncReload)).on("change", ()=>{
		console.log("Changes on SVG, GIF images detected, running tasks…");
	});
	watch(watched.icon, series(icon)).on("change", ()=>{
		console.log("Changes on icons detected, running tasks…");
	});
	// watch([watched.cssAll], series("css",broSyncReload)).on("change", reportChanges);

	// watch(watched.html, ["js"]).on("change", function(event) {
	// 	console.log("File " + event.path + " was " + event.type + ", running tasks…");
	// });
}
/***** Defined Tasks
*/

// Build
const build = series(clear, parallel("cssInit", "htmlInit", "jsInit"), parallel("cssMin", "htmlMin", "jsMin"), font, "img", icon);
const buildMin = series(clear, parallel("cssInit", "htmlInit", "jsInit"), series(renameSelectors), parallel("cssMin", "htmlMin", "jsMin"), font, "img", icon);
// const buildMin = series(clear, parallel("cssInit", "htmlInit", "jsInit"), series(unCSS, renameSelectors), parallel("cssMin", "htmlMin", "jsMin"), font, "img", icon);

// Watch/start automated tasks for all defined production files and update/refresh automatically when change detected
const watchWBroSync = parallel(watchFiles, broSync);

// Build and archive distributed directory
const compress = series(build, zipIt);

// Build only Eleventy related files/templates/data
const eleventy = series(build, clear11ty, export11ty);

export { build, buildMin, compress, eleventy, clear11ty, export11ty, watchWBroSync, clear, icon, renameSelectors }

// Default task (when executed with "gulp" in CLI)
export default watchWBroSync
