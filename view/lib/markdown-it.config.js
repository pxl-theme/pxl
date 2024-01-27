const markdown = require('markdown-it');

module.exports = (() => {
	const opts = Object.assign({
		html: true,
		breaks: true,
		linkify: true,
		typographer: true
	});
	const plugins = [
		require('markdown-it-attrs'), // Loaded this before anchor plugin for reusing IDs
		[require('markdown-it-anchor'), {
			permalink: require('markdown-it-anchor').permalink.linkInsideHeader({
				class: 'u-headingAnchor',
				symbol: `
				<span class="u-visuallyHidden">Jump to heading</span>
				<span aria-hidden="true">🔗</span>
				`,
				placement: 'after'
			}),
			// permalink: true,
			// permalinkClass: "u-headingAnchor",
			// permalinkSymbol: "<span></span>",
		}],
		require('markdown-it-abbr'),
		require("markdown-it-container"),
		// require("markdown-it-collapsible"),
		require('markdown-it-deflist'),
		// require("markdown-it-eleventy-img"),
		require('markdown-it-footnote'),
		// require('markdown-it-html5-media'), // Having error: TypeError: plugin.apply is not a function
		require('markdown-it-implicit-figures'), // Surrounds standalone images with <figure> element.
		require('markdown-it-ins'),
		require("markdown-it-kbd"),
		require('markdown-it-mark'),
		require('markdown-it-multimd-table'),
		require("markdown-it-named-code-blocks"),
		require("markdown-it-spoiler"),
		// require("markdown-it-emoji"), // plugin.apply error…
		require('markdown-it-sub'),
		require('markdown-it-sup'),
		require('markdown-it-task-lists'),
		[require('markdown-it-toc-done-right'), {
			listType: 'ul',
			listClass: 'c-nav -typeTree',
			itemClass: 'c-nav__item',
			linkClass: 'c-nav__anchor',
		}]

		// Not included but recommended depending on usage
		// (Need to install as dev dependency)
		// require("markdown-it-fancy-lists")
		// require("markvis")
		// require("markdown-it-bibliography")
	];

	const parser = markdown(opts);

	if (plugins) {
		for (const plugin of plugins) {
			if (Array.isArray(plugin)) {
				// Allow array of options to be passed.
				parser.use(...plugin);
			} else {
				parser.use(plugin);
			}
		};
	}
	return parser;
})();
