// vim: set noet foldenable :

// 📦 Imports from Packages
	import path from 'node:path'

  // import { createHash } from "node:crypto";
  // import { readFileSync } from "node:fs";
  // import path from "node:path";

  import { execSync } from 'child_process'

	// import { Liquid } from "liquidjs";

	import { InputPathToUrlTransformPlugin, EleventyI18nPlugin } from "@11ty/eleventy"
	import { eleventyImageTransformPlugin } from "@11ty/eleventy-img"

	import pluginCacheBuster     from "@mightyplow/eleventy-plugin-cache-buster"
  import pluginFeed, {
  	dateToRfc3339,
  	dateToRfc822,
  	getNewestCollectionItemDate,
	} from "@11ty/eleventy-plugin-rss"
	import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"
	import pluginTime2Read       from "eleventy-plugin-time-to-read"

	// TODO: Replace 11ty syntax highlighter plugin with Shiki Twoslash highlighter (as Markdown It Plugin) later.
	import nbspFilter            from "eleventy-nbsp-filter"
	import pluginTargetSafe      from "eleventy-plugin-target-safe"
	import { DateTime, Settings }          from "luxon"
	// import yaml                  from "js-yaml"
	// import pluginSchema          from "@quasibit/eleventy-plugin-schema"

	const templateFormats = ["md", "liquid"]
	// import pluginReadingTime     from 'eleventy-plugin-reading-time'
  	// Unfortunately reading time plugin doesn't support any template languages other than Nunjucks.

	import EleventyFetch from "@11ty/eleventy-fetch";

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
 	import markdownify       from "../view/lib/markdownify.js"
 	import clearIndex        from "../view/lib/clearIndex.js"
 	import sortBy            from "../view/lib/sortBy.js"
 	import tokenize          from "../view/lib/tokenize.js"
 	import ExcerptGenerator  from "../view/lib/excerptGenerator.js"
 	import truncateContent   from "../view/lib/truncateContent.js"
 	import getFirstImage     from "../view/lib/getFirstImage.js"
 	import paginatorLink     from "../view/lib/paginatorLink.js"
 	import markdownIt        from "../view/lib/markdown-it.config.js"
    import slugify           from "../view/lib/slugify.js"

/** @param {import("@11ty/eleventy").UserConfig} cfg */
export default async (cfg) => {
// 🩳 Filters/Shortcodes
	cfg.addFilter('markdownify', markdownify);
	cfg.addFilter('clearIndex', clearIndex);
	cfg.addFilter('sortBy', sortBy);
	cfg.addFilter('tokenize', tokenize);
	cfg.addFilter('paginatorLink', paginatorLink);
	// Get first image of a content {{ getFirstImage content }}
 	cfg.addShortcode('getFirstImage', (content) => getFirstImage(content));
 	cfg.addFilter('jsonify', (str) => {
		return JSON.stringify(str);
 	});
  cfg.addFilter('excerptGenerator', (content) => {
		return new ExcerptGenerator().getExcerpt(content, 500);
	});
  cfg.addFilter('truncateContent', content => truncateContent(content, 40));
 	/* getRandom Filter from https://www.raymondcamden.com/2020/10/26/selecting-random-posts-in-eleventy */
 	cfg.addFilter('getRandom', (items) => {
		var selected = items[Math.floor(Math.random() * items.length)];
		return selected;
 	});
 	// Return the keys used in an object
 	cfg.addFilter("getKeys", target => {
		return Object.keys(target);
 	});
 	cfg.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
 	});

	const numberOfWordsToJoin = 2;
	const maxLength = 10;
	cfg.addFilter('nbsp', nbspFilter(numberOfWordsToJoin, maxLength));

// 📆 Date/Time Filters
	// Add (non-Liquid to Liquid) filters of unique date formats that is compatible to
	// RSS templates (via Eleventy RSS Plugin)
	cfg.addLiquidFilter("dateToRfc3339", dateToRfc3339); // for Atom feeds => 2024-01-08T12:30:00Z
	cfg.addLiquidFilter("dateToRfc822", dateToRfc822); // for RSS feeds => Mon, 08 Jan 2024 15:30:00 +0000
	cfg.addLiquidFilter("getNewestCollectionItemDate", getNewestCollectionItemDate);

	// Changing locale imports an access to the Intl APIs and the *full* ICU data.
	// In case of having problems, check these links:
	// https://moment.github.io/luxon/#/install?id=nodejs
	// https://nodejs.org/api/intl.html#embed-the-entire-icu-full-icu

	// Set your default time zone:
	Settings.defaultLocale = "en";
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

// Preprocessors
	// Drafts (posts that has draft: true) won't be included in the build
	// but while watching/serving files to preview it.
	cfg.addPreprocessor("drafts", "*", (data) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

// 🧩 Plugins
	cfg.addPlugin(pluginSyntaxHighlight); // Adds Prism.js syntax highlighter to code blocks

	// if (process.env.NODE_ENV === "production" ) {
		// cfg.addPlugin(pluginTargetSafe); // Adds rel=noopener attr to target=_blank anchors
		// https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/

		cfg.addPlugin(pluginFeed); // Provides shortcodes to include valid timestamps for Atom/RSS XMLs.

		// Adds a unique query parameter to CSS/JS resources


		const gitHash = execSync("git rev-parse --short HEAD")
			.toString()
			.trim();

		cfg.addPlugin(pluginCacheBuster({
			createResourceHash() {
				return gitHash;
			}
		}));
		// cfg.addPlugin(pluginCacheBuster({
		// 	createResourceHash(outputDirectoy, url, target) {
		// 		return Date.now();
		// 	}
		// }));

  // 	cfg.addPlugin(pluginCacheBuster({
		// 	createResourceHash(outputDirectory, url) {
		// 		const file = path.join(outputDirectory, url);

		// 		return createHash("sha256")
  //     		.update(readFileSync(file))
  //       	.digest("hex")
  //        	.slice(0, 8);
		// 	}
		// }));

	// }
	cfg.addPlugin(InputPathToUrlTransformPlugin);
	cfg.addPlugin(EleventyI18nPlugin, {
		defaultLanguage: "en",
		// errorMode: "strict"
		errorMode: "never"
	});

	cfg.addPlugin(eleventyImageTransformPlugin, { // Eleventy Transform method (for 11ty v3.0.0-alpha.5 or more)
		extensions: 'html',
		widths:
			// process.env.NODE_ENV === "production" ? [384, 768, 1536] : [768],
			[384, 768, 1536],
		formats:
			// process.env.NODE_ENV === "production" ? ["webp", "svg"] : ["auto"],
			["webp", "svg"],
		sharpOptions: {
			animated: true
		},
		// formats: "webp",
		urlPath: '/media/',
		outputDir: './tmp/view/media/',
		// transformOnRequest: false,
		svgShortCircuit: "size", // Transform and rasterize SVG only if rasterized version is smaller than vector file.
		defaultAttributes: {
			sizes: '100vw',
			loading: 'lazy',
			decoding: 'async'
		},
		filenameFormat: (id, src, width, format, options) => {
			const extension = path.extname(src);
			const name = path.basename(src, extension);
			return `${name}-${width}.${format}`;
		},
		// dryRun: true
	});

	cfg.addPlugin(pluginTime2Read, {
		speed: '1000 characters per minute',
		// language: 'en',
		// style: 'narrow',
		style: 'short',
		type: 'unit',
		hours: 'auto',
		minutes: true,
		seconds: false,
		digits: 1,
		output: (data) => {
			return data.timing;
		}
	});

	cfg.setLibrary('md', markdownIt); // Set default Markdown library (Markdown It) and its plugins

// 📄 Template Language Options
	cfg.setLiquidOptions({
		cache: true,
		root: 'view/include/',
		strictFilters: true,
		greedy: false,
		dynamicPartials: true,
		// jekyllWhere: true
	});

	// cfg.setFrontMatterParsingOptions({
 // 	excerpt: true,
 // 	excerpt_separator: "<!--more-->",
 // })

// 🗃️ Collections
	cfg.addCollection('homepage', collection => {
		return collection.getFilteredByGlob(['**/blog/+(article|link|note)/**/*.md', '**/photo/**/*.md']).reverse();
	});
	cfg.addCollection('post', collection => {
		return collection.getFilteredByGlob("view/_en/blog/post/**/*.md").reverse();
	});
	cfg.addCollection('gönderi', collection => {
  	return collection.getFilteredByGlob("view/_tr/blog/post/**/*.md").reverse();
 	});
	cfg.addCollection('work', collection => {
 		return collection.getFilteredByGlob("view/_en/work/**/*.md").reverse();
 	});
	cfg.addCollection('iş', collection => {
		return collection.getFilteredByGlob("view/_tr/work/**/*.md").reverse();
	});
	cfg.addCollection('blog', collection => {
		return collection.getFilteredByGlob([
			'view/_en/blog/+(post|article|link|note)/**/*.md',
			'view/_en/+(photo|video)/**/*.md',
			'view/_imported/+(youtube|bluesky)/**/*.md'
		]).reverse().filter(post => {
			return !post.data.tags?.includes("now");
		});
	});
	cfg.addCollection('günlük', collection => {
		return collection.getFilteredByGlob([
			'view/_tr/blog/+(post|article|link|note)/**/*.md',
			'view/_imported/+(youtube|bluesky)/**/*.md'
		]).reverse().filter(post => {
			return !post.data.tags?.includes("şimdi");
		});
	});

	cfg.addCollection('bluesky', collection => {
 		return collection.getFilteredByGlob("view/imported/from-bluesky/**/*.md").reverse();
  });
	cfg.addCollection('video', collection => {
		return collection.getFilteredByGlob(["view/imported/from-youtube/**/*.md","view/_content/video/**/*.md"]).reverse();
	});
  // Compilations
  cfg.addCollection('sitemap', collection => {
  	return collection.getFilteredByGlob('view/**/*.md');
  });
  cfg.addCollection('tagList', collections => {
  	const tags = collections
  		.getAll()
  		.reduce((tags, item) => tags.concat(item.data.tags), [])
  		.filter(tag => !!tag && !["posts", "all"].includes(tag))
  		.sort()
  	return Array.from(new Set(tags)).map(tag => ({
  		title: tag,
  		slug: slugify(tag),
  		count: collections.getFilteredByTag(tag).length,
  		log: Math.log(collections.getFilteredByTag(tag).length)
  	// There are more ways to provide tag properties:
  	// https://github.com/nhoizey/nicolas-hoizey.com/blob/main/src/_11ty/getTags.js
  	}))
	})
  // Multilingual
  cfg.addCollection('page', collection => {
  	return collection.getFilteredByGlob([
  		"view/**/*.(md|liquid)",
  	]).reverse().filter(post => {
  		// return !post.data.layout?.includes("page");
  		return post.data.tags?.includes("page");
  	});
  });
  // cfg.addCollection('import', collection => {
  // 	return collection.getFilteredByGlob("imported/**/*.md").reverse();
  // });
  //
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

	// English-only
	// cfg.addCollection('photo', collection => {
	// 	return collection.getFilteredByGlob("view/_en/photo/**/*.md").reverse();
	// });

// 🙅 Ignores
	// if (process.env.NODE_ENV === "production") {
	// 	cfg.ignores.add("src/admin.md");
	// } else {
	// 	cfg.ignores.add("src/api/*");
	// 	cfg.ignores.add("src/firehose.11ty.js");
	// 	cfg.ignores.add("src/firehose-feed.11ty.js");
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
		// watch: ["dist/**/*"]
		watch: ["dist/static/**/*", "dist/media/passthrough/**/*", "dist/**/*.{xml,xsl,txt,json,webmanifest}"]
	});

// 📁 Paths/Passthroughs
	// cfg.addPassthroughCopy("./img");
	// cfg.addPassthroughCopy("./asset");
	cfg.addPassthroughCopy("view/media/**/*.{mp3,mp4,m4a,wav,flac,ogg,apng,webm}");
	cfg.addPassthroughCopy("view/media/passthrough");
	cfg.addPassthroughCopy("view/media/video");
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
			includes: "include",
			layouts: "include/layout",
			data: "data"
		}
	};
	// return cfg;

//⤵️  After Eleventy
	// cfg.on('eleventy.after', () => {
	// })
};
