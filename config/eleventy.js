//---- Dependencies
const { DateTime } = require("luxon");
const fs = require('fs');
const truncate = require('truncate-html');
// const yaml = require('js-yaml');
const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster');
const pluginTypeset = require('eleventy-plugin-typeset');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
// const pluginImg = require('@11ty/eleventy-img');
// const pluginFetch = require('@11ty/eleventy-fetch');

//---- Filters
//
module.exports = elevenCfg => {
	elevenCfg.addFilter('hostname', require('../view/lib/filter/hostname.js'));

	elevenCfg.addFilter('includes', require('../view/lib/filter/includes.js'));
	elevenCfg.addFilter('reject', require('../view/lib/filter/reject.js'));
	elevenCfg.addFilter('select', require('../view/lib/filter/select.js'));

	elevenCfg.addFilter('jsonify', require('../view/lib/filter/jsonify.js'));
	elevenCfg.addFilter('markdownify', require('../view/lib/filter/markdownify.js'));
	elevenCfg.addFilter('clearindex', require('../view/lib/filter/clearindex.js'));

	elevenCfg.addFilter('sort_by', require('../view/lib/filter/sort-by.js'));
	elevenCfg.addFilter('tokenize', require('../view/lib/filter/tokenize.js'));

	elevenCfg.addFilter('webmentions_for_url', require('../view/lib/filter/webmentions-for-url.js'));
	elevenCfg.addFilter('zeropad', require('../view/lib/filter/zeropad.js'));
	elevenCfg.addFilter('paginator_link', require('../view/lib/filter/paginator_link.js'));

	elevenCfg.addFilter("localDateFull", dateObj => {
		return DateTime.fromJSDate(dateObj, {zone: 'UTC+3'}).toFormat("ffff", {locale: "tr"});
	});
	elevenCfg.addFilter("localDayMonth", dateObj => {
		return DateTime.fromJSDate(dateObj, {zone: 'UTC+3'}).toFormat("d LLLL", {locale: "tr"});
	});
	elevenCfg.addFilter("localDMY", dateObj => {
		return DateTime.fromJSDate(dateObj, {zone: 'UTC+3'}).toFormat("d LLL yyyy", {locale: "tr"});
	});
	elevenCfg.addFilter("localDayOfWeek", dateObj => {
		return DateTime.fromJSDate(dateObj, {zone: 'UTC+3'}).toFormat("cccc", {locale: "tr"});
	});
	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	elevenCfg.addFilter('htmlDateString', (dateObj) => {
		return DateTime.fromJSDate(dateObj, {zone: 'UTC+3'}).toFormat('yyyy-LL-dd');
	});

	// {{ array | where: key,value }}
	elevenCfg.addFilter('where', (array, key, value) => {
		return array.filter(item => {
			const keys = key.split('.');
			const reducedKey = keys.reduce((object, key) => {
			return object[key];
			}, item);

			return reducedKey === value ? item : false;
		});
	});


//---- Transforms

	// Universal Shortcodes
	elevenCfg.addShortcode("truncate_content", post => trnct(post));
	function trnct(doc) {
		if (!doc.hasOwnProperty('templateContent')) {
			console.warn('❌ Failed to extract image: Document has no property `templateContent`.');
			return;
		}
		const content = doc.templateContent;
		truncate.setup({
			length: 40,
			byWords: true,
			ellipsis: `<a href='${doc.url}' title='Read more…'>⇢</a>`,
			reserveLastWord: true,
			excludes: 'img'
		});
		return truncate(content);
	}

	// Get first image of a post {{ first_image post }}
	elevenCfg.addShortcode('first_image', post => extractFirstImage(post));

	/**
	* @param {*} doc A real big object full of all sorts of information about a document.
	* @returns {String} the markup of the first image.
	*/
	function extractFirstImage(doc) {
		if (!doc.hasOwnProperty('templateContent')) {
			console.warn('❌ Failed to extract image: Document has no property `templateContent`.');
			return;
		}

		const content = doc.templateContent;

		if (content.includes('<img')) {
			const imgTagBegin = content.indexOf('<img');
			const imgTagEnd = content.indexOf('>', imgTagBegin);

			return content.substring(imgTagBegin, imgTagEnd + 1);
		}

		return '';
	}

//---- Plugins

	// Eleventy Plugins
	elevenCfg.addPlugin(pluginSyntaxHighlight);
	elevenCfg.addPlugin(pluginRss);
	elevenCfg.addPlugin(pluginTypeset);
	// elevenCfg.addPlugin(pluginFetch);
	// See examples for Eleventy Fetch:
	// https://www.11ty.dev/docs/plugins/fetch/#usage
	// elevenCfg.addPlugin(pluginImg);
	const cacheBusterOptions = {
		createResourceHash(outputDirectoy, url, target) {
			return Date.now();
		}
	};
	elevenCfg.addPlugin(cacheBuster(cacheBusterOptions));

	// Markdown-It Plugins
	elevenCfg.setLibrary('md', require('../view/lib/markdown-it.config.js'));

//---- Template Language Options

	elevenCfg.setLiquidOptions({
		cache: true,
		root: ['view/_include/', 'view/_layout/'],
		strictFilters: true,
		greedy: false,
		dynamicPartials: true
	});


//---- Collections
	elevenCfg.addCollection('homepage', collection => {
		return collection.getFilteredByGlob(['**/blog/+(article|recommendation|note)/**/*.md', '**/photo/**/*.md']).reverse();
	});
	elevenCfg.addCollection('article', collection => {
		return collection.getFilteredByGlob("**/blog/article/**/*.md").reverse();
	});
	elevenCfg.addCollection('photo', collection => {
		return collection.getFilteredByGlob("**/photo/**/*.md").reverse();
	});
	elevenCfg.addCollection('sitemap', collection => {
		return collection.getFilteredByGlob('**/*.md');
	});

	// elevenCfg.addCollection('post', collection => {
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

//---- Dev Server (eleventy --serve, not eleventy-dev-server)
	elevenCfg.setWatchThrottleWaitTime(200); // in milliseconds
	elevenCfg.setServerOptions({
		port: 3000,
		showAllHosts: true,
		watch: ["dist/**/*"]
	})

//---- Paths
	// elevenCfg.addPassthroughCopy("./img");
	// elevenCfg.addPassthroughCopy("./asset");
	elevenCfg.addPassthroughCopy("view/media/");
	return {
		// templateFormats: ["liquid","md","jpg","png","gif","svg","webp"],
		templateFormats: ["liquid","md"],
		// pathPrefix: "/",
		passthroughFileCopy: true,
		dir: {
			input: "view/",
			output: "tmp/view/",
			includes: "_include",
			layouts: "_layout",
			data: "_data"
		}
	};
};
