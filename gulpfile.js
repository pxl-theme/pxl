/* ----------- Dependencies ------------*/

const gulp = require("gulp"),
	{ src, dest, parallel, series, task } = require("gulp"),
	pump          = require("pump"),
	del           = require("del"),
	rename        = require("gulp-rename"),
	stringReplace = require("gulp-string-replace"),
	sourcemaps    = require("gulp-sourcemaps"),
	filter        = require("gulp-filter"),
	zip           = require("gulp-zip"),
	browsersync   = require("browser-sync").create(),
	htmlmin       = require("gulp-htmlmin"),
	w3cjs         = require("gulp-w3cjs"),
	stylelint     = require("gulp-stylelint"),
	imagemin      = require("gulp-imagemin"),
	inlinesvg     = require("postcss-inline-svg"),
	svgSprite     = require("gulp-svg-sprite"),
	concat        = require("gulp-concat"),
	uglifyjs      = require("uglify-es"),
	composer      = require("gulp-uglify/composer"),
	minify        = composer(uglifyjs, console),
	eslint        = require("gulp-eslint"),
	purgeCSS      = require("gulp-purgecss"),

	pngcrush      = require("imagemin-pngcrush"),
	postcss       = require("gulp-postcss"),
	autoprefixer  = require("autoprefixer"),
	sorter        = require("css-declaration-sorter"),
	nano          = require("cssnano"),

	colorMod      = require("postcss-color-mod-function"),
	customProp    = require("postcss-custom-properties"),
	mixins        = require("postcss-mixins"),
	calc          = require("postcss-calc"),
	util          = require("postcss-utilities"),
	nested        = require("postcss-nested"),
	willchange    = require("postcss-will-change"),
	focus         = require("postcss-focus"),
	custommedia   = require("postcss-custom-media"),
	atImport      = require("postcss-import"),
	urlrev        = require("postcss-urlrev"),
	extend        = require("postcss-extend"),

	cssPseudos    = require("postcss-pseudoelements"),
	fontVariant   = require("postcss-font-variant"),


// Not really necessary stuff, but doesn't hurts
	anylinkPseudo = require("postcss-pseudo-class-any-link"),
	overflowWrap  = require("postcss-replace-overflow-wrap"),

// PostHTML
	posthtml      = require("gulp-posthtml");

// Wishlist
//
// postcss-css-mix
// postcss-aspect-ratio
// postcss-currency
// postcss-round-subpixels (may have a problem with hairline border)
// postcss-inline-comments
// postcss-brand-colors
//

/*-----Paths-&-Variables----*/

var path = {
	src: "src",
	html: "src/html",
	css: "src/css",
	js: "src/js",
	img: "src/img",
	icon: "src/icon",
	font: "src/font",
	jekyll: "src/jekyll"
};
var outputDir = "dist";

var cssOutputOrig = [outputDir + "/*.css", "!"+outputDir+"/*.min.css"];
var htmlOutputOrig = [outputDir + "/*.html", "!"+outputDir+"/*.min.html"];
// var htmlOutputOrig = [HTMLoutputDir + "**/*.html"];
// var jsOutputOrig = [outputDir + "/*.js", "!"+outputDir+"/*.min.js"];

var watched = {
	// css: path.css + "/**/*.css",
	css: path.css + "/style.css",

	// html: path.html + "/index.html",
	// html: HTMLoutputDir + "/index.html",
	html: path.html + "/**/*.html",
	// img: [path.img + "/**/*", "!" + path.img + "/icon/*"], except icon material
	// js: path.js + "/**/*.js",
	// js: [path.js + "/**/*.js", "!node_modules/**", "!feather.js"],
	// js = {vendor: path.js + "/vendor/*.js", main: path.js + "/main.js"},
	jsVendor: path.js + "/vendor/*.js",
	jsMain: [path.js + "/**/*.js", "!" + path.js + "/vendor/*.js" ],

	img: path.img + "/**/*",

	icon: path.icon + "/**/*.svg",
	// for making icon sprite

	font: [path.font + "/**/*.woff2", path.font + "/**/*.ttf"],
	
	all: path.src + "/**/*.*",
	jekyll: path.jekyll + "/**/*"
};
// var renameJSFunction = function (pathjs) {
// 	pathjs.extname = ".min.js";
// 	return pathjs;
// };

var renameCSSFunction = function (pathcss) {
	pathcss.extname = ".min.css";
	return pathcss;
};
// var renameHTMLFunction = function (pathhtml) {
// 	pathhtml.extname = ".min.html";
// 	return pathhtml;
// };


/*-----Tasks----------------*/

/*--CSS Tasks--*/
function styles () {
	let processors = [
		atImport({ from: watched.css }),
		willchange,
		autoprefixer,
		mixins,
		customProp({ strict: false, preserve: true }),
		calc({mediaQueries: true,selectors: true}),
		nested,
		custommedia,
		colorMod,
		focus,
		extend,
		urlrev({relativePath: "src/"}),
		util,
		inlinesvg,

		cssPseudos,
		fontVariant,
		anylinkPseudo,
		overflowWrap({method: "copy"})
	];
	return src(watched.css)
		.pipe(postcss(processors))
		.pipe(dest(outputDir));
}


function lintCSS(){
	return src(cssOutputOrig)
		.pipe(stylelint({
			failAfterError: true,
			reportOutputDir: "reports/stylelint",
			reporters: [
				{formatter: "verbose", console: true},
				{formatter: "json", save: "report.json"}
			],
			debug: true
		}));
}

function renameCSS() {
	return src(cssOutputOrig)
		.pipe(rename(renameCSSFunction))
		.pipe(dest(outputDir));
}

function sourcemap() {
	return src(cssOutputOrig)
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write("map/"))
		// .pipe(sourcemaps.write("map/", {
		//   sourceMappingURLPrefix: "https://www.mydomain.com/"
		// }))
		.pipe(dest(outputDir));
}

function minifyCSS() {
	return src(outputDir + "/*.min.css")
		.pipe(postcss([ nano({ autoprefixer: false })]))
		.pipe(dest(outputDir));
}

function sortCSS() {
	return src(outputDir + "/*.min.css")
		.pipe(postcss([ sorter({ order: "alphabetically" })]))
		.pipe(dest(outputDir));
}

function unCSS() {
	return src(outputDir + "/*.min.css")
		.pipe(
			purgeCSS({
				content: ["dist/**/*.html", "dist/**/*.js"]
			})
		)
		.pipe(dest(outputDir));
}

/*--HTML Tasks --*/

/*--First Scenario--*/
// task("texts", function(){
// 	return src(watched.html)
// 		.pipe(posthtml([
// 			/* Text Plugins */
// 			require("posthtml-lorem")(),
// 			require("posthtml-md")(),
// 			/* DOM Plugins */
// 			require("posthtml-alt-always")(),
// 			require("posthtml-expressions")({ locals: { theMessage: "This is a message from gulpfile.js" }}),
// 			require("posthtml-include")(),
// 			require("posthtml-cache")()
// 		]))
// 		// .pipe(rename(renameHTMLFunction))
// 		.pipe(htmlmin({collapseWhitespace: true}))
// 		.pipe(dest(outputDir));
// });
// gulp.task("w3c", ["texts"], function () {
// 	return src(htmlOutputOrig)
// 		.pipe(w3cjs())
// 		.pipe(w3cjs.reporter());
// });
function texts() {
	return src(watched.html)
		.pipe(posthtml([
			require("posthtml-include")({ root: path.html }),
			require("posthtml-lorem")(),
			require("posthtml-md")(),
			require("posthtml-alt-always")(),
			require("posthtml-expressions")({ locals: { theMessage: "This is a message from gulpfile.js" }})
		]))
		// .pipe(rename(renameHTMLFunction))
		.pipe(htmlmin({collapseWhitespace: true, minifyCSS: true, minifyJS: true, removeComments: true}))
		.pipe(dest(outputDir));
}

function w3c() {
	return src(htmlOutputOrig)
		.pipe(w3cjs())
		.pipe(w3cjs.reporter());
}

/*--JavaScript Tasks--*/
function lintJS() {
	pump([
		src(watched.jsMain),
		eslint({
			rules: {"camelcase":1,"comma-dangle":2,"quotes":0},
			// envs: ["browser],
			globals: ["jQuery","$"]
		}),
		eslint.result(result => {
			// Called for each ESLint result.
			console.log(`ESLint result: ${result.filePath}`);
			console.log(`# Messages: ${result.messages.length}`);
			console.log(`# Warnings: ${result.warningCount}`);
			console.log(`# Errors: ${result.errorCount}`);
		})
	]);
}

// function concatVendor() {
// 	pump([
// 		src(watched.jsVendor),
// 		concat("vendor.js"),
// 		dest(outputDir),
// 	]);
// }
function concatVendor() {
	return src(watched.jsVendor)
		.pipe(concat("vendor.js"))
		.pipe(dest(outputDir))
}

function concatJS(cb) {
	var options = {};
	pump([
		src(watched.jsMain),
		sourcemaps.init(),
		concat("script.js"),
		dest(outputDir),
		rename("script.min.js"),
		minify(options),
		sourcemaps.write("map/"),
		dest(outputDir)
	],
	cb
	);
}
// function concatJS() {
// 	return src(watched.jsMain)
// 		.pipe(sourcemaps.init())
// 		.pipe(concat("script.js")),

// 	dest(outputDir)
// 		.pipe(rename("script.min.js"))
// 		// minify().on("error", function(err) {
// 		// 	gutil.log(gutil.colors.red("[Error]"), err.toString());
// 		// 	// this.emit("end");
// 		// }),
// 		.pipe(minify())
// 		.pipe(sourcemaps.write("map/")),
// 	dest(outputDir);
// }

// BrowserSync
function broSync() {
	browsersync.init({
		server: {
			baseDir: outputDir
		},
		port: 3000
	});
}
function broSyncReload() {
	browsersync.reload();
}

// gulp.task("renameHTML", series(w3c), function () {
// 	return src(htmlOutputOrig)
// 		.pipe(rename(renameHTMLFunction))
// 		.pipe(dest(outputDir));
// });


/*-----Production & Independent Tasks-----*/

function img() {
	return src([watched.img, "!" + "sprite.pxl-icons.svg"])
		.pipe(imagemin([
			imagemin.svgo({
				plugins: [
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(dest(outputDir + "/img"));
}


// function makeSprite() {
// 	return src(watched.icon)
// 		.pipe(svgSprite({
// 			dest: "./",
// 			mode: { symbol: { dest: "./" } }
// 		}))
// 		.pipe(rename({
// 			basename: "pxl-icons",
// 			dirname: "./",
// 			prefix: "sprite" + "."
// 		}))
// 		.pipe(dest(path.img))
// 		.pipe(stringReplace(new RegExp(' stroke-width="2"', "g"), "", {logs: {enabled: false} }))
// 		.pipe(stringReplace(new RegExp(' fill="#000"', "g"), "", {logs: {enabled: false} }))
// 		.pipe(stringReplace(new RegExp(' stroke="#000"', "g"), "", {logs: {enabled: false} }))
// 		.pipe(dest(outputDir + "/img"));
// }

function font() {
	return src(watched.font)
		.pipe(dest(outputDir + "/font"));
}

function clear() {
	return del([outputDir]);
}
function zipIt() {
	return src(outputDir + "/**/*")
		.pipe(zip("dist.zip"))
		.pipe(dest("."));
}

function clearJekyllFiles() {
	return del(["./jekyll-build"]);
}
function exportJekyllFiles() {

	// Copy templates, includes and layouts
	return src(watched.jekyll)
		.pipe(dest("./jekyll-build")),

	// Copy CSS & JS,
	src([
		outputDir + "/*.min.css",
		outputDir + "/*.min.js",
		outputDir + "/vendor.js"
	])
		.pipe(dest("./jekyll-build/assets/")),

	src(outputDir + "/map/**")
		.pipe(dest("./jekyll-build/assets/map/")),

	// Copy image assets except fillers
	src([outputDir + "/img/**", "!"+outputDir+"/img/filler/**"])
		.pipe(dest("./jekyll-build/assets/img/")),

	// Copy fonts
	src(outputDir + "/font/**")
		.pipe(dest("./jekyll-build/assets/font/"));
}

// function fetchClass() {
// 	return src(PATHTOSOURCE)
// 	.pipe(posthtml([
//		require("posthtml-classes")()({
// 		    fileSave: true,
// 		    filePath: "classList.css",
// 		    overwrite: false,
// 		    eol: "\n",
// 		    nested: false
// 		})
//     ]));
// }

/* ----------- Export Tasks ------------*/



/*-----Watch----------------*/

function watchFiles() {
	gulp.watch(path.css + "/**/*.css", series("css")).on("change", function(e) {
		console.log("File " + e.path + " was " + e.type + ", running tasks...");
	});
	gulp.watch(path.src + "/**/*.html", series("html")).on("change", function(e) {
		console.log("File " + e.path + " was " + e.type + ", running tasks...");
	});
	gulp.watch(path.js + "/**/*.js", series("js")).on("change", function(e) {
		console.log("File " + e.path + " was " + e.type + ", running tasks...");
	});
	// gulp.watch(watched.html, ["js"]).on("change", function(e) {
	// 	console.log("File " + e.path + " was " + e.type + ", running tasks...");
	// });
	gulp.watch(watched.all).on("change", broSyncReload);
}


/*-----Task Groups----------*/

task("css", series(styles, lintCSS, renameCSS, sourcemap, minifyCSS), function() {
	browsersync.stream({match: outputDir + "/**/*.css"});
});
// task("html", series("texts", "w3c, function() {
task("html", series(texts), function() {
	browsersync.stream({match: outputDir + "/**/*.html"});
});

task("js", series(concatVendor, concatJS), function() {
	browsersync.stream();
	browsersync.stream({match: outputDir + "/**/*.js"});
});

const build = series(clear, parallel("css", "html", "js"), sortCSS, img, font);
const watch = parallel(watchFiles, broSync);
const compress = series(build, zipIt);
const jekyll = series(build, clearJekyllFiles, exportJekyllFiles);

module.exports = { sortCSS, unCSS, img, font, clear, clearJekyllFiles, build, zipIt, compress, jekyll, watch, default: watch };
