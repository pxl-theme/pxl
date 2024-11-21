// vim: set ts=4 sw=4 tw=0 noet foldenable :

// 📦 Imports from Packages
	import path from 'path'

	// import { InputPathToUrlTransformPlugin } from "@11ty/eleventy"
	import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'

	import pluginCacheBuster     from '@mightyplow/eleventy-plugin-cache-buster'
	import pluginRSS             from '@11ty/eleventy-plugin-rss'
	import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
	// TODO: Replace 11ty syntax highlighter plugin with Shiki Twoslash highlighter (as Markdown It Plugin) later.
	import nbspFilter            from 'eleventy-nbsp-filter'
	import pluginTargetSafe      from 'eleventy-plugin-target-safe'
	import { DateTime }          from "luxon"
	// import yaml                  from 'js-yaml'
	// import pluginSchema          from '@quasibit/eleventy-plugin-schema'

	const templateFormats = ["md", "liquid"]

	import EleventyFetch from '@11ty/eleventy-fetch';

// ℹ️ Other cool plugins:
	// https://github.com/inframanufaktur/eleventy-plugin-clean-urls

	// https://github.com/sophiekoonin/eleventy-plugin-redirects
	// Automatically generates Vercel or Netlify friendly redirects files
	// (or client-side redirects) Won't work if vercel.json exists

	// https://github.com/declanbyrd/eleventy-plugin-mastoarchive
	// Fetch your own public posts from Mastodon so you can display them
	// on your personal website.

	// https://github.com/patrickxchong/eleventy-plugin-svg-sprite
	// Compiles a directory of SVG files into a single SVG Sprite and
	// adds shortcodes to embed SVG Sprite and SVG content in Eleventy templates

	// https://github.com/gfscott/eleventy-plugin-embed-everything
	// Automatically embed common media formats in your pages,
	// requiring only a URL in your markdown files.

	// https://github.com/tannerdolby/eleventy-plugin-social-img
	// Generates social share images at build-time via puppeteer (headless Chromium).

	// https://github.com/bnoctis/eleventy-multisite
	// Adds multi-site support

	// https://github.com/bradleyburgess/eleventy-plugin-broken-links
	// Checks your build for broken external links

	// https://github.com/binyamin/eleventy-plugin-backlinks
	// Collects and displays backlinks from collections

	// https://github.com/JordanShurmer/eleventy-plugin-nesting-toc
	// Generate a Table of Contents from page content

	// https://github.com/saneef/eleventy-plugin-git-commit-date
	// Add filters for git commit date etc.

	// https://github.com/gregives/eleventy-critical-css
	// Extracts and inlines critical (above-the-fold) CSS from your HTML templates

	// https://github.com/11ty/eleventy-activity-feed
	// Creates one centralized RSS feed for all of the content you create
	// across the web (aggregates from Twitter, RSS, Atom, Mastodon, YouTube)

	// https://github.com/TigersWay/eleventy-plugin-ancestry
	// Creates a real hierarchical navigation, following folders and documents.

// 📚 Imports from Local Library
	import hostname         from "../view/_lib/hostname.js"
	import includes         from "../view/_lib/includes.js"
	import reject           from "../view/_lib/reject.js"
	import select           from "../view/_lib/select.js"
	import jsonify          from "../view/_lib/jsonify.js"
	import markdownify      from "../view/_lib/markdownify.js"
	import clearIndex       from "../view/_lib/clearIndex.js"
	import sortBy           from "../view/_lib/sortBy.js"
	import tokenize         from "../view/_lib/tokenize.js"
	import ExcerptGenerator from "../view/_lib/excerptGenerator.js"
	import getFirstImage    from "../view/_lib/getFirstImage.js"
	import paginatorLink    from "../view/_lib/paginatorLink.js"
	import markdownIt       from "../view/_lib/markdown-it.config.js"

export default (cfg) => {
// 🩳 Filters/Shortcodes
	cfg.addFilter('hostname', hostname);
	cfg.addFilter('includes', includes);
	cfg.addFilter('reject', reject);
	cfg.addFilter('select', select);
	cfg.addFilter('jsonify', jsonify);
	cfg.addFilter('markdownify', markdownify);
	cfg.addFilter('clearIndex', clearIndex);
	cfg.addFilter('sortBy', sortBy);
	cfg.addFilter('tokenize', tokenize);
	cfg.addFilter('excerptGenerator', (content) => {
		return new ExcerptGenerator().getExcerpt(content, 500);
	});
	// Get first image of a post {{ getFirstImage post }}
	cfg.addShortcode('getFirstImage', post => getFirstImage(post));

	const numberOfWordsToJoin = 2;
	const maxLength = 10;
	cfg.addFilter('nbsp', nbspFilter(numberOfWordsToJoin, maxLength));

	cfg.addFilter('paginatorLink', paginatorLink);

// 📆 Date/Time Filters
	// Add (non-Liquid to Liquid) filters of unique date formats that is compatible to
	// RSS templates (via Eleventy RSS Plugin)
	cfg.addLiquidFilter("dateToRfc3339", pluginRSS.dateToRfc3339); // for Atom feeds => 2024-01-08T12:30:00Z
	cfg.addLiquidFilter("dateToRfc822", pluginRSS.dateToRfc822); // for RSS feeds => Mon, 08 Jan 2024 15:30:00 +0000
	cfg.addLiquidFilter("getNewestCollectionItemDate", pluginRSS.getNewestCollectionItemDate);

	// Changing locale imports an access to the Intl APIs and the *full* ICU data.
	// In case of having problems, check these links:
	// https://moment.github.io/luxon/#/install?id=nodejs
	// https://nodejs.org/api/intl.html#embed-the-entire-icu-full-icu

	// Set your default time zone:
	// Settings.defaultLocale = "tr";
	// Settings.defaultZone = "Europe/Istanbul";
	const jsDate = (a) => DateTime.fromJSDate(a);
	cfg.addFilter("dateInRFC2822", (obj) => {
		return jsDate(obj).toRFC2822(); //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
	});
	cfg.addFilter("dateInISO", (obj) => {
		return jsDate(obj).toISO({ format: 'extended' }); //=> '20170422T204705.335-0400'
	});
	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	cfg.addFilter("localDateMed", (obj) => {
		return jsDate(obj).toLocaleString(DateTime.DATE_MED); //=> 'Oct 14, 1983'
	});
	cfg.addFilter("localDateFull", (obj) => {
		return jsDate(obj).toLocaleString(DateTime.DATE_FULL); //=> 'October 14, 1983'
	});
	cfg.addFilter("localDateHuge", (obj) => {
		return jsDate(obj).toLocaleString(DateTime.DATE_HUGE); //=> 'Tuesday, October 14, 1983'
	});
	cfg.addFilter("localDateTimeHuge", (obj) => {
		return jsDate(obj).toLocaleString(DateTime.DATETIME_HUGE); //=> 'Tuesday, October 14, 1983'
	});
	cfg.addFilter('yearMonthDay', (obj) => {
		return jsDate(obj).toISODate(); //=> '1982-05-25'
	});
	// {{ array | where: key,value }}
	cfg.addFilter('where', (array, key, value) => {
		return array.filter(item => {
			const keys = key.split('.');
			const reducedKey = keys.reduce((object, key) => {
				return object[key];
			}, item);
			return reducedKey === value ? item : false;
		});
	});

// 🧩 Plugins
	
	cfg.addPlugin(pluginSyntaxHighlight); // Adds Prism.js syntax highlighter to code blocks
	
	if (process.env.NODE_ENV === "production" ) {
		cfg.addPlugin(pluginTargetSafe); // Adds rel=noopener attr to target=_blank anchors
		// https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/

		cfg.addPlugin(pluginRSS); // Provides shortcodes to include valid timestamps for Atom/RSS XMLs.

		cfg.addPlugin(pluginCacheBuster({ // Adds a unique query parameter to CSS/JS resources
			createResourceHash(outputDirectoy, url, target) {
				return Date.now();
			}
		}));
	}
	cfg.addPlugin(eleventyImageTransformPlugin, { // Eleventy Transform method (for 11ty v3.0.0-alpha.5 or more)
		extensions: 'html',
		widths:
			process.env.NODE_ENV === "production" ? [384, 768, 1536] : [768],
		formats:
			process.env.NODE_ENV === "production" ? ["webp", "svg"] : ["auto"],
		sharpOptions: {
			animated: true
		},
		// formats: "webp",
		urlPath: '/media/',
		outputDir: './tmp/view/media/',
		svgShortCircuit: "size", // Transform and rasterize SVG only if rasterized version is smaller than vector file.
		defaultAttributes: {
			sizes: '100vw',
			loading: 'lazy',
			decoding: 'async'
		},
		filenameFormat: (id, src, width, format, options) => {
			const extension = path.extname(src);
			const name = path.basename(src, extension);

			return `${name}-${width}w.${format}`;
		},
		resolvePath: (filepath, env) => {
			const isPostImage = filepath.startsWith('./');
			if (isPostImage) {
				// Resolve path to post-relative images
				return path.join(path.dirname(env.page.inputPath), filepath);
			}
			// Resolve path to global images
			return path.join('tmp/view', filepath);
		}
	});

	cfg.setLibrary('md', markdownIt); // Set default Markdown library (Markdown It) and its plugins

// 📄 Template Language Options
	cfg.setLiquidOptions({
		cache: true,
		root: ['view/_include/', 'view/_layout/'],
		strictFilters: true,
		greedy: false,
		dynamicPartials: true
	});

// 🗃️ Collections
	cfg.addCollection('homepage', collection => {
		return collection.getFilteredByGlob(['**/blog/+(article|link|note)/**/*.md', '**/photo/**/*.md']).reverse();
	});
	cfg.addCollection('article', collection => {
		return collection.getFilteredByGlob("**/blog/article/**/*.md").reverse();
	});
	cfg.addCollection('photo', collection => {
		return collection.getFilteredByGlob("**/photo/**/*.md").reverse();
	});
	cfg.addCollection('sitemap', collection => {
		return collection.getFilteredByGlob('**/*.md');
	});
	// cfg.addCollection('post', collection => {
	// 	let postsProcessed = 0
	// 	// let posts = collection.getAllSorted().filter(item => {
	// 	// let posts = collection.getFilteredByGlob('src/**/+(yazi|tavsiye|not|is|epeski)/**/*.md').filter(item => {
	// 	let posts = collection.getFilteredByGlob('src/**/+(yazi|tavsiye|not|is)/**/*.md').filter(item => {
	// 		const {data} = item
	// 		if (!data.tags || data.queued) {
	// 			return false
	// 		}
	// 		if (!data.tags.includes('blog')) {
	// 			return false
	// 		}
	// 		let basename = item.inputPath.split('/').pop().split('.').shift()
	// 		let comments = []
	// 		try {
	// 			let path = `comments/${basename}`
	// 			let files = fs.readdirSync(path)
	// 			files.forEach(file => {
	// 			let raw = fs.readFileSync(`${path}/${file}`, 'utf8')
	// 			let data = yaml.safeLoad(raw)
	// 			comments.push(data)
	// 			})
	// 		} catch (err) {}
	// 		if (comments.length) {
	// 			data.comments = comments
	// 		}
	// 		postsProcessed++
	// 		return true
	// 	}).reverse()
	// 	return posts
	// });

// 🙅 Ignores
	// if (process.env.NODE_ENV === "production") {
	// 	eleventyConfig.ignores.add("src/admin.md");
	// } else {
	// 	eleventyConfig.ignores.add("src/api/*");
	// 	eleventyConfig.ignores.add("src/firehose.11ty.js");
	// 	eleventyConfig.ignores.add("src/firehose-feed.11ty.js");
	// }

// 🪛 Dev Server (eleventy --serve, not "eleventy-dev-server")
	cfg.setServerPassthroughCopyBehavior("passthrough");
	// Changes to passthrough file copies will not trigger an Eleventy build
	// but will live reload appropriately in the dev server.

	// cfg.setWatchThrottleWaitTime(200); // in milliseconds
	// A hardcoded amount of time Eleventy will wait before triggering a new build
	// when files have changes during --watch or --serve modes.
	// Should be useful when using with other task runners.

	cfg.setServerOptions({
		port: 3000,
		showAllHosts: true,
		watch: ["dist/**/*"]
	});

// 📁 Paths/Passthroughs
	// cfg.addPassthroughCopy("./img");
	// cfg.addPassthroughCopy("./asset");
	cfg.addPassthroughCopy("view/media/**/*.{mp3,mp4,m4a,wav,flac,ogg,apng,webm}");
	// cfg.addPassthroughCopy("view/media/**/*.!{jpg,jpeg,png,gif,tif,svg,webp,avif,jxl}");
	// cfg.addPassthroughCopy("view/media");
	return {
		// templateFormats: ["liquid","md","jpg","png","gif","svg","webp"],
		// templateFormats: ["liquid", "md"],
		templateFormats: templateFormats,
		// pathPrefix: "/",
		passthroughFileCopy: true,
		dir: {
			input: "view",
			output: "tmp/view",
			includes: "_include",
			layouts: "_layout",
			data: "_data"
		}
	};
	// return cfg;
};
