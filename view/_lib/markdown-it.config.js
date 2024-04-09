// vim: set ts=4 sw=4 tw=0 noet foldenable foldlevelstart=3 :
import markdown from "markdown-it";
import anchor from "markdown-it-anchor";
import { full as emoji } from "markdown-it-emoji";

// 🧩 Imports from Markdown It Plugins
	import markdownItAbbr             from "markdown-it-abbr";
	// HTML (...) \n *[HTML]: Hyper Text Markup Language
	import markdownItAttrs            from "markdown-it-attrs";
	// Test{attr}
	import markdownItContainer        from "markdown-it-container";
	// ::: warning \n *here be dragons* \n :::
	// https://github.com/markdown-it/markdown-it-container#example
	import markdownItCollapsible      from "markdown-it-collapsible";
	// +++ expand \n hidden text \n +++
	import markdownItDeflist          from "markdown-it-deflist";
	// Term 1 \n \t ~ Definition 1
	import markdownItFootnote         from "markdown-it-footnote";
	// Footnote 1 Link[^first] (...) [^first]: Footnote description
	// import markdownItImageLazyLoading from "markdown-it-image-lazy-loading";
	// (Automatically adds loading=lazy attribute to images inside content scope)
	import markdownItImplicitFigures  from "markdown-it-implicit-figures";
	// (Automatically surrounds standalone images with <figure> element.)
	// import markdownItImageSize fromm "markdown-it-image-size";
	// (As an alternative, adds width/height attr)
	import markdownItIns              from "markdown-it-ins";
	// ++inserted text++
	import markdownItKbd              from "markdown-it-kbd";
	// [[kbd]]
	import markdownItMark             from "markdown-it-mark";
	// ==marked text==
	import markdownItMultimdTable     from "markdown-it-multimd-table";

	import markdownItNamedCodeBlocks  from "markdown-it-named-code-blocks";
	// ```js:hello.js \n (...) \n ```
	import markdownItSpoiler          from "@traptitech/markdown-it-spoiler";
	// !!spoiler!!
	import markdownItSub              from "markdown-it-sub";
	// 19^th^
	import markdownItSup              from "markdown-it-sup";
	// H~2~O
	import markdownItTaskLists        from "markdown-it-task-lists";
	// - [ ] Unchecked list item \n - [x] Checked list item
	import markdownItTocDoneRight     from "markdown-it-toc-done-right";
	// [toc]
	import markdownItVideo            from "@vrcd-community/markdown-it-video";

// Not included but recommended depending on usage
	// import markdownItFancyLists from 'markdown-it-fancy-lists'
	// import markVis from 'markvis'
	// import markdownItBibliography from 'markdown-it-bibliography'


// Wishlist/Wontfix:
	// import markdownItShikiTwoSlash from 'markdown-it-shiki-twoslash';
	// Follow this: https://github.com/shikijs/twoslash/tree/main/packages/markdown-it-shiki-twoslash
	// and this: https://www.olets.dev/posts/numbered-code-block-lines-in-eleventy-with-shiki-twoslash/
	//
	// import markdownItHTML5EmbedFix from 'markdown-it-html5-embed-fix';
	// // Having TypeError .apply error
	// https://github.com/hanshilei/markdown-it-html5-embed-fix

export default (() => {
	const opts = Object.assign({
		html: true,
		breaks: true,
		linkify: true,
		typographer: true
	});
	const plugins = [
		markdownItAbbr,
		[anchor, {
				permalink: anchor.permalink.headerLink()
			}],
		markdownItAttrs,
		[markdownItContainer, "warning"],
		markdownItCollapsible,
		markdownItDeflist,
		emoji,
		markdownItFootnote,
		// markdownItImageLazyLoading,
		markdownItImplicitFigures,
		markdownItIns,
		markdownItKbd,
		markdownItMark,
		[markdownItMultimdTable, {
				// https://github.com/redbug312/markdown-it-multimd-table
				multiline: true,
				rowspan: true,
				headerless: true,
				multibody: true,
				autolabel: true,
			}],
		markdownItNamedCodeBlocks,
		markdownItSpoiler,
		markdownItSub,
		markdownItSup,
		markdownItTaskLists,
		[markdownItTocDoneRight, {
				listType: 'ul',
				listClass: 'c-nav -typeTree c-nav__submenu',
				itemClass: 'c-nav__item',
				linkClass: 'c-nav__anchor',
				containerClass: 'c-nav__wrapper table-of-contents',
				containerId: 'toc',
				level: [1, 2, 3] // First 3 levels (h1,h2,h3) will be included in ToC
			}],
		markdownItVideo
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
		}
		;
	}
	return parser;
})();
