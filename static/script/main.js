const debugMode = true;
debugMode && console.log("[pxl] Beginning of script");

//--- Global Variables
const docHTML = document.documentElement;
const docBody = document.body;

const navRespo = document.querySelector(".c-nav.-responsive");
const rsgridRespo = document.querySelector(".o-rustygrid.-responsive");
const rsgridMasonry = document.querySelector(".o-rustygrid.-viewMasonry");

const loopContainer = document.getElementById("js-loop");
// .js-loop > .js-loop > .js-loop__item

const loadMoreButton = document.getElementById("js-loop__loadButton");
// const toggleExpand = document.querySelector(
// 	".c-nav.-responsive .c-toggleExpand",
// );

//--- Media Queries

// Note: Make sure these media queries are synced with 1-abstract/00-media.css
//
const mqPalmOrGT = window.matchMedia("screen and (min-width:40em)");
const mqLapOrGT = window.matchMedia("screen and (min-width:60em)");
const mqDeskOrGT = window.matchMedia("screen and (min-width:80em)");
// bpWall  = "screen and (min-width:100em)",
// bpMall  = "screen and (min-width:120em)",
// bpTitan = "screen and (min-width:150em)"

setTimeout(() => {
	debugMode &&
		console.log("[pxl] Set .js-preload class for a second in <body>");
	document.querySelector(".js-preload") &&
		docBody.classList.remove("js-preload");
}, 1e3);
// 1e3 = 1000 = 1 sec

// Skip history when clicking on hash URL
// Issue: hash URL always appends the URL.
// history.replaceState(undefined, undefined, "#")
// history.replaceState(undefined, undefined, "#!")

//--- Adds height transition for elements that are expands horizontally
// function heightTransition(el) {
// 	if (el) {
// 		const height = el.scrollHeight;
// 		el.style.setProperty("--maxHeight-h-expand", `${height}px`);
// 	}
// }
// const navMobile = document.querySelector(".c-nav.-expandFromBlockStart");
// heightTransition(navMobile)

//--- Stop animation while resizing window
// https://css-tricks.com/stop-animations-during-window-resizing/

//--- Hide transition artifacts on page load
// When you add a delay to closing transition, it appears on the page every
// time it loads. This function makes it disappear that.
let resizeTimer;
window.addEventListener("resize", () => {
	docBody.classList.add("u-transitionNone");
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		docBody.classList.remove("u-transitionNone");
	}, 400);
});

//--- Unselectable Elements

function makeUnselectable() {
	const cl = "u-unselectable";
	const els = document.querySelectorAll(`.${cl}`);
	if (els) {
		for (let i = 0; i < els.length; i++) {
			const el = els[i];
			el.setAttribute("draggable", "false");
		}
	}
}

//--- Just adds "lazyload" class to the given element
function addLLClass(elements) {
	if (elements) {
		const cl = "lazyload";
		for (let i = 0; i < elements.length; i++) {
			const el = elements[i];
			if (el.classlist)
				if (
					!el.classList.contains(cl) |
					!el.classList.contains("lazyloaded")
				)
					el.classList.add(cl);
				else return 0;
			else el.className += ` ${cl}`;
		}
	} else {
		return 0;
	}
}
//--- Make youtube and vimeo video embeds intrinsically responsive.
// Source: https://codepen.io/davatron5000/details/JjwzMWm
const videoSources = [
	'iframe[src*="youtube-nocookie.com"]',
	'iframe[src*="youtube.com"]',
	'iframe[src*="vimeo"]',
];

for (const video of document.querySelectorAll(videoSources.join(","))) {
	video.style.maxWidth = "100%";
	video.style.height = "auto";
	video.style.aspectRatio = `${video.getAttribute(
		"width",
	)} / ${video.getAttribute("height")}`;
}

//--- Add srcset and sizes attributes to all images inside CMS content.
function addResponsiveAttr() {
	const imgsInMasonry = rsgridMasonry?.querySelectorAll("img[data-srcset]");
	const imgsInMain = document.querySelectorAll(
		"main:not(.s-cmsContent) img[data-srcset]",
	);
	if (imgsInMasonry) {
		for (let i = 0; i < imgsInMasonry.length; i++) {
			// For Masonry Layout
			imgsInMasonry[i].setAttribute(
				"data-sizes",
				"(min-width: 120em) 480px, (min-width: 100em) 25vw, (min-width: 80em) 33.3vw, (min-width:60em) 50vw, (min-width:40em) 66.6vw, 100vw",
			);
			debugMode &&
				console.log(
					"[pxl] Added data-sizes attribute to an image inside masonry view rustygrid",
				);
		}
	} else if (imgsInMain) {
		for (let j = 0; j < imgsInMain.length; j++) {
			// For Single Column Layout
			imgsInMain[i].setAttribute(
				"data-sizes",
				"(min-width: 60em) 800px, (min-width: 40em) 66.6vw, 100vw",
			);
			debugMode &&
				console.log(
					"[pxl] Added data-sizes attribute to an image inside main container.",
				);
		}
	}
}

//--- Responsive Layout

//--- Masonry Grid Implementation
/*
	Method #1: Experimental Grid Masonry Polyfill
	https://css-tricks.com/a-lightweight-masonry-solution/
	+ Respects existing masonry grid proposal, works as polyfill.
	+ Truly lightweight, zero dependency
	+ Has fallback up to IE9 (not visually perfect but does serve content) (Not included in this script)
	+ Future-proof markup in HTML and CSS
	- Item order does not match with intended order.
*/

let grids = [...document.querySelectorAll(".o-grid.-viewMasonry")];

function layout() {
	// grids.forEach((grid) => {
	for (const grid of grids) {
		// grid.items.forEach((c) => {
		for (const c of grid.items) {
			const new_h = c.getBoundingClientRect().height;

			if (new_h !== +c.dataset.h) {
				c.dataset.h = new_h;
				grid.mod++;
			}
		}

		/* get the post-resize/ load number of columns */
		const ncol = getComputedStyle(grid._el).gridTemplateColumns.split(
			" ",
		).length;
		// console.log(`grid items: ${grid.items.length}; row gap: ${grid.gap}px`)
		//
		/* if the number of columns has changed */
		if (grid.ncol !== ncol || grid.mod) {
			/* update number of columns */
			grid.ncol = ncol;
			// console.log('rearrange grid items')

			/* revert to initial positioning, no margin */
			// grid.items.forEach((c) => c.style.removeProperty("margin-top"))
			for (const c of grid.items) c.style.removeProperty("margin-top");

			/* if we have more than one column */
			if (grid.ncol > 1) {
				// grid.items.slice(ncol).forEach((c, i) => {
				for (const [i, c] of grid.items.slice(ncol).entries()) {
					const prev_fin =
						grid.items[i].getBoundingClientRect()
							.bottom; /* bottom edge of item above */
					const curr_ini =
						c.getBoundingClientRect()
							.top; /* top edge of current item */

					c.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`;
				}
			}
			grid.mod = 0;
		}
	}
}

// if(grids.length && getComputedStyle(grids[0]).gridTemplateRows !== 'masonry') {
if (grids.length && !CSS.supports("grid-template-rows: masonry")) {
	const o = new ResizeObserver((entries) => {
		// entries.forEach((entry) => {
		for (const entry of entries) {
			grids.find((grid) => grid._el === entry.target.parentElement).mod =
				1;
		}
	});
	console.log(
		"WARN: Browser does not support masonry grid, using experimental polyfill…",
	);
	grids = grids.map((grid) => ({
		_el: grid,
		// gap: parseFloat(getComputedStyle(grid).gridRowGap),
		gap: parseFloat(getComputedStyle(grid).rowGap),
		items: [...grid.childNodes].filter((c) => c.nodeType === 1),
		ncol: 0,
	}));

	addEventListener(
		"load",
		() => {
			layout(); /* initial load */
			addEventListener("resize", layout, false);
			// grids.forEach((grid) => {
			for (const grid of grids) {
				// grid.items.forEach((c) => o.observe(c))
				for (const c of grid.items) o.observe(c);
			}
		},
		false,
	);
}
// else console.log("INFO: Browser supports masonry grid, skipping experimental polyfill…")

/*
	* Method #2: Colcade.js by David DeSandro
	+ Lightweight
	+ Compatible with most browsers
	+ Bulletproof
	- Depends on JavaScript, no built-in fallback
	- Really old project
	- Doesn't respect future CSS masonry grid proposal
	- Requires bloated markup in HTML
*/

// Find rustygrid object with masonry view and initialize Colcade.js plugin.
function masonry(a) {
	const value = new Colcade(a, {
		columns: ".o-rustygrid__masonryCol",
		items: ".js-loop__item",
	});
	return value;
}
// If masonry exists in the DOM, initialize Colcade.js plugin.
// If rustygrid with responsive modifier exists in the DOM and viewport size is
// greater than "lap" media breakpoint, initialize Colcade.js plugin.

// const colcade = new Colcade(loopContainer, {
// 	columns: ".o-rustygrid__masonryCol",
// 	items: ".js-loop__item",
// });

// let colcade;
if (rsgridRespo) {
	// colcade = new Colcade(loopContainer, {
	// 	columns: ".o-rustygrid__masonryCol",
	// 	items: ".js-loop__item",
	// });
	function handleLapMatch() {
		rsgridRespo.classList.add("-viewMasonry");
		loopContainer && masonry(loopContainer);
		debugMode &&
			console.log(
				"[pxl] Enabled masonry layout in main responsive rustygrid",
			);
		// loopContainer && masonry(loopContainer);
	}
	function handleLapUnmatch() {
		rsgridRespo.classList.remove("-viewMasonry");
		loopContainer && masonry(loopContainer).destroy();
		debugMode &&
			console.log(
				"[pxl] Disabled masonry layout in main responsive rustygrid",
			);
	}

	// Apply functions in matching media queries
	mqLapOrGT.addEventListener("change", (e) => {
		e.matches ? handleLapMatch() : handleLapUnmatch();
	});
	// Initial setup
	mqLapOrGT.matches ? handleLapMatch() : handleLapUnmatch();
} else if (rsgridMasonry) {
	masonry(loopContainer);
	debugMode &&
		console.log("[pxl] Enabled masonry layout in masonry view rustygrid");
}

// Refresh all necessary functions
function reloadThings() {
	addLLClass(
		document.querySelectorAll("main img:not(.noLazy)"),
	); /* opinionated */
	addResponsiveAttr();
	makeUnselectable();
	// if (loopContainer) colcade;
}
function toggleClass(e, c) {
	if (!e.classList.contains(c)) {
		e.classList.add(c);
		debugMode && console.log(`[pxl] Added ${c} class to ${e} element`);
	} else {
		e.classList.remove(c);
		debugMode && console.log(`[pxl] Removed ${c} class from ${e} element`);
	}
}

// Make page navigation component responsive
if (navRespo) {
	// Change navigation type to Fly-out
	// if average window size inside any device is suitable for palms or bigger
	function handlePalmMatchForNav() {
		navRespo.className = navRespo.className.replace(
			/(^|\s)-type\S+/g,
			"$1-typeFlyout",
		);
		navRespo.className = navRespo.className.replace(
			/(^|\s)-layout\S+/g,
			"$1-layoutVertical",
		);
		navRespo.className = navRespo.className.replace(
			/(^|\s)-expandFrom\S+/g,
			"$1-expandFromStartStart",
		);
		debugMode &&
			console.log(
				"[pxl] Applied classes to main responsive nav as viewport enters palm breakpoint",
			);
	}

	function handlePalmUnmatchForNav() {
		navRespo.className = navRespo.className.replace(
			/(^|\s)-type\S+/g,
			"$1-typeTree",
		);
		navRespo.className = navRespo.className.replace(
			/(^|\s)-layout\S+/g,
			"$1-layoutHorizontal",
		);
		navRespo.className = navRespo.className.replace(
			/(^|\s)-expandFrom\S+/g,
			"$1-expandFromBlockStart",
		);
		debugMode &&
			console.log(
				"[pxl] Discarded classes from main responsive nav as viewport exits palm breakpoint",
			);
	}

	// Change navigation layout, alignment and remove expandability
	// if average window size inside any device is suitable for laps or bigger.
	function handleLapMatchForNav() {
		navRespo.className = navRespo.className.replace(
			/(^|\s)-layout\S+/g,
			"$1-layoutHorizontal",
		);
		navRespo.classList.remove("-expandFromStartStart");
		navRespo.classList.add("-typeFlyout");
		debugMode &&
			console.log(
				"[pxl] Applied classes to main responsive nav as viewport enters lap breakpoint",
			);
	}

	function handleLapUnmatchForNav() {
		navRespo.className = navRespo.className.replace(
			/(^|\s)-layout\S+/g,
			"$1-layoutVertical",
		);
		navRespo.classList.add("-expandFromStartStart");
		debugMode &&
			console.log(
				"[pxl] Discarded classes from main responsive nav as viewport exits lap breakpoint",
			);
	}

	// Change navigation layout
	// if average window size inside any device is suitable for desks or bigger
	function handleDeskMatchForNav() {
		navRespo.className = navRespo.className.replace(
			/(^|\s)-layout\S+/g,
			"$1-layoutHorizontal",
		);
		navRespo.classList.remove("-expandFromStartStart");
		debugMode &&
			console.log(
				"[pxl] Applied classes to main responsive nav as viewport enters desk breakpoint",
			);
	}

	function handleDeskUnmatchForNav() {
		// Handle unmatch for desk breakpoint if needed
	}

	// Apply functions in matching media queries
	mqPalmOrGT.addEventListener("change", (e) => {
		e.matches ? handlePalmMatchForNav() : handlePalmUnmatchForNav();
	});

	mqLapOrGT.addEventListener("change", (e) => {
		e.matches ? handleLapMatchForNav() : handleLapUnmatchForNav();
	});

	mqDeskOrGT.addEventListener("change", (e) => {
		e.matches ? handleDeskMatchForNav() : handleDeskUnmatchForNav();
	});

	// Initial setup
	mqPalmOrGT.matches && handlePalmMatchForNav();
	mqLapOrGT.matches && handleLapMatchForNav();
	mqDeskOrGT.matches && handleDeskMatchForNav();
}

//--- .o-reel Just an Immediately Invoked Function Expression (IIFE):
(() => {
	const className = "o-reel";
	const reels = Array.from(document.querySelectorAll(`.${className}`));
	const toggleOverflowClass = (elem) => {
		elem.classList.toggle(
			"-overflowing",
			elem.scrollWidth > elem.clientWidth,
		);
	};
	for (const reel of reels) {
		if ("ResizeObserver" in window) {
			new ResizeObserver((entries) => {
				for (const entry of entries) {
					toggleOverflowClass(entry.target);
				}
			}).observe(reel);
		}
		if ("MutationObserver" in window) {
			new MutationObserver((entries) => {
				for (const entry of entries) {
					toggleOverflowClass(entry.target);
				}
			}).observe(reel, {
				childList: true,
			});
		}
	}
})();

//--- Pagination (for Eleventy)
// Source:
// https://github.com/eduardoboucas/buildtimes/blob/master/assets/js/main.js

// --------------------------------------------------------------
// UI events
// --------------------------------------------------------------

function bindUIEvents() {
	window.addEventListener("load", () => {
		// Loading content from previous pages
		if (loopContainer?.dataset.paginatorCurrent > 1) {
			const firstPost = document.querySelector(".js-loop__item");
			const initialOffset = firstPost.offsetTop;

			loadPosts(() => {
				const diff = firstPost.offsetTop - initialOffset;

				reloadThings();

				document.documentElement.scrollTop = diff;
			}, true);
		}
	});

	loadMoreButton?.addEventListener("click", () => {
		// this.classList.add("._spinner");
		loadMoreButton.insertAdjacentHTML(
			"beforeend",
			"<div class='_spinner'></div>",
		);
		loadPosts(() => {
			reloadThings();
			if (loadMoreButton.querySelector("._spinner"))
				loadMoreButton.querySelector("._spinner").remove();
		});
		debugMode && console.log("[pxl] Posts loaded");
		// sendGAEvent("Posts", "Load more");
		return false;
	});

	// document.querySelector(".js-loop__item-navigation-arrow").addEventListener("click", () => {
	//     sendGAEvent("Posts", "Post navigation");
	// });
}

function fetchPages(pageNumbers, callback) {
	const pages = [];

	// pageNumbers.forEach((pageNumber, index) => {
	for (const [index, pageNumber] of pageNumbers.entries()) {
		const pagePath = loopContainer.getAttribute("data-path");
		// const endpoint = pageNumber === 1 ? "/" : `/p/${pageNumber}`;
		const endpoint =
			pageNumber === 1 ? pagePath : `${pagePath}p/${pageNumber}.html`;

		fetch(endpoint)
			.then((response) => response.text())
			.then((html) => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, "text/html");
				pages[index] = doc.body;

				if (pages.length === pageNumbers.length) {
					const output = pages[0];

					if (!output) return;

					for (let i = 1; i < pageNumbers.length; i++) {
						output.appendChild(pages[i]);
					}

					callback(output);
				}
			});
		debugMode && console.log("[pxl] Fetched an entry");
	}
	// });
}

function getRangeArray(from, to) {
	return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

function loadPosts(callback, previousPages) {
	// Set variables for required data attributes and container target
	const currentPage = parseInt(
		loopContainer.getAttribute("data-paginator-current"),
	);
	const totalPages = parseInt(
		loopContainer.getAttribute("data-paginator-total"),
	);
	// const existingPosts = loopContainer;
	const existingPosts = loopContainer.querySelector("#js-loop__inner");

	// let pageNumbers;
	// if (previousPages) {
	// 	// Get an array of previous page number(s)
	// 	pageNumbers = getRangeArray(1, currentPage - 1);
	// } else {
	// Set the number of next page based on current page
	const nextPage = currentPage + 1;

	if (nextPage > totalPages) {
		return;
	}

	// If there's no multiple pages to paginate, remove paginator element
	if (nextPage === totalPages) {
		document.querySelector(".js-paginator").remove();
	}

	// Get an array of next page number(s)
	pageNumbers = [nextPage];

	// Get URL of paginator subpath (from data-path attr) and update the address.
	if (typeof window.history !== "undefined") {
		const pagePath = loopContainer.getAttribute("data-path");
		window.history.pushState({}, "", `${pagePath}p/${nextPage}`);
	}
	// }

	fetchPages(pageNumbers, (pages) => {
		// Select all posts
		const posts = pages.querySelectorAll(".js-loop__item");

		// if (previousPages) {
		// 	// Add posts from previous page if there's any
		// 	for (const post of posts) {
		// 		existingPosts.insertBefore(post, existingPosts.firstChild);
		// 		debugMode && console.log( "[pxl] Insert a post from previous page as first child of container");
		// 	}
		// 	// Refresh masonry layout
		// 	if (loopContainer) colcade.prepend(posts);
		// 	debugMode && console.log( "[pxl] Prepended fetched posts from previous page to the masonry layout");
		// 	// Callback when it's done
		// 	// document.addEventListener("layoutComplete", callback, {
		// 	// 	once: true,
		// 	// });
		// } else {
		// Add posts from next page
		for (const post of posts) {
			existingPosts.appendChild(post);
			debugMode && console.log("[pxl] Insert a post from next page");
		}
		// Refresh masonry layout
		if (loopContainer) colcade.append(posts);
		debugMode &&
			console.log(
				"[pxl] Appended fetched posts from next page to the masonry layout",
			);

		// Update data attribute to the value of current page
		loopContainer.setAttribute("data-paginator-current", currentPage + 1);

		// Callback
		if (typeof callback === "function") {
			callback();
		}
		// }
	});
}
// function sendGAEvent(primary, secondary) {
// 	if (window.ga !== undefined) {
// 	if (secondary !== undefined) {
// 		ga("send", "event", primary, secondary);
// 	} else {
// 		ga("send", "event", primary);
// 	}
// 	}
// }

// --------------------------------------------------------------
// Initialisation
// --------------------------------------------------------------

bindUIEvents();
reloadThings();
debugMode && console.log("[pxl] End of script");
