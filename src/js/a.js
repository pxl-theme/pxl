//a.js

//Script for distribution only.

//--- Global Variables
var html = document.documentElement,
	body = document.body;

// var debugMode = false;

var respoNav = document.querySelector(".c-nav.-responsive"),
	toggleExpand = document.querySelector(".c-nav.-responsive .c-toggleExpand"),
	respoGrid = document.querySelector(".o-rustygrid.-responsive");

//--- Media Queries

// Note: Make sure these media queries are synced with 1-abstract/00-media.css
//
var mqPalmOrGT = "screen and (min-width:40em)",
	mqLapOrGT  = "screen and (min-width:60em)",
	mqDeskOrGT = "screen and (min-width:80em)";
// bpWall  = "screen and (min-width:100em)",
// bpMall  = "screen and (min-width:120em)",
// bpTitan = "screen and (min-width:150em)";

//--- If JavaScript is enabled, hide navigation initially.
respoNav.classList.remove("js-visible");

//--- Hide transition artifacts on page load
// When you add a delay to closing transition, it appears on the page every
// time it loads. This function makes it disappear that.
setTimeout(()=>{
	body.classList.remove("js-preload");
	// body.classList.remove("u-transitionNone");
},1000)
//1000 = 1 sec

// Skip history when clicking on hash URL
// Issue: hash URL always appends the URL.
// history.replaceState(undefined, undefined, "#");
// history.replaceState(undefined, undefined, "#!");

//--- Adds height transition for elements that are expands horizontally
function heightTransition(el) {
	if (el) {
		var height = el.scrollHeight;
		el.style.setProperty("--maxHeight-h-expand", height + "px");
	}
}
var navMobile = document.querySelector(".c-nav.-expandFromBlockStart");
// heightTransition(navMobile);

//--- Stop animation while resizing window
// https://css-tricks.com/stop-animations-during-window-resizing/

let resizeTimer;
window.addEventListener("resize", () => {
	document.body.classList.add("u-transitionNone");
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		document.body.classList.remove("u-transitionNone");
	}, 400);
});


//--- Unselectable Elements

function makeUnselectable() {
	var cl = "u-unselectable";
	var els = document.querySelectorAll("." + cl);
	if (els) {
		for (var i = 0; i < els.length; i++) {
			var el = els[i];
			el.setAttribute("draggable", "false");
		}
		// if (debugMode) {
		// 	console.log("[makeUnselectable]: Added to " + els.length + " element(s).");
		// }
	}
}

//--- Add 'lazyload' class to all img and iframe elements

// function detectElements() {
// 	if (debugMode) {
// 		var imgs = document.querySelectorAll("main img:not(.noLazy)");
// 		var iframes = document.querySelectorAll("main iframe");
// 		console.log(" ");
// 		console.log(" ----------------------------------------------------");
// 		console.log("| Total " + imgs.length + " image(s) detected.");
// 		console.log("| Total " + iframes.length + " iframe(s) detected.");
// 		console.log(" ----------------------------------------------------");
// 		console.log(" ");
// 	} else {
// 		console.warn("Debug mode disabled, passing function...");
// 	}
// }

//--- Just adds "lazyload" class to the given element
function addLLClass(elements) {
	if (elements) {
		var cl = "lazyload";
		for (var i = 0; i < elements.length; i++) {
			var el = elements[i];
			if (el.classlist)
				if (!el.classList.contains(cl) | !el.classList.contains("lazyloaded"))
					el.classList.add(cl);
				else
					return 0;
			else
				el.className += " " + cl;
		}
		// if (debugMode) {
		// 	console.log("[addLLClass]: Added to " + elements.length + " " + elements[0] + " element(s).");
		// }
	} else {
		return 0;
	}
}
//--- Add Intrinsic Container for responsive and fixed-ratio video embeds
function addIntrinsicContainer() {
	var elements = document.querySelectorAll("main :not(.intrinsicContainer) > iframe");
	if (elements) {
		for (var i = 0; i < elements.length; i++) {
			var el = elements[i];
			var parent = el.parentNode;
			var wrapper = document.createElement("div");
			wrapper.className = "intrinsicContainer ratio16-9";
			parent.replaceChild(wrapper, el);
			wrapper.appendChild(el);
		}
		// if (debugMode) {
		// 	console.log("[addIntrinsicContainer]: Added to " + elements.length + " element(s).");
		// }
	}
}

//--- Add srcset and sizes attributes to all images inside CMS content.
function addResponsiveAttr() {
	var imgsInMasonry = document.querySelectorAll("main.s-cmsContent img[data-srcset]");
	var imgsInMain = document.querySelectorAll("main:not(.s-cmsContent) img[data-srcset]");
	if (imgsInMasonry) {
		for (var i = 0; i < imgsInMasonry.length; i++) {
			// For Masonry Layout
			imgsInMasonry[i].setAttribute("data-sizes", "(min-width: 120em) 480px, (min-width: 100em) 25vw, (min-width: 80em) 33.3vw, (min-width:60em) 50vw, (min-width:40em) 66.6vw, 100vw");

		}
	}
	if (imgsInMain) {
		for (var j = 0; j < imgsInMain.length; j++) {
			// For Single Column Layout
			imgsInMain[i].setAttribute("data-sizes", "(min-width: 60em) 800px, (min-width: 40em) 66.6vw, 100vw");
		}
	}

}

//--- Responsive Layout

// Masonry Grid Layout with Colcade.js
var colc;
if (respoGrid) {
	enquire.register(mqLapOrGT, {
		// Change location from side to top if min-width is 80em
		// setup: function () {
		// },
		match: function () {
			respoGrid.classList.add("-viewMasonry");
			colc = new Colcade(document.querySelector(".o-rustygrid.-viewMasonry"), {
				columns: ".o-rustygrid__masonryCol",
				// items: ".o-rustygrid.-viewMasonry > .o-rustygrid__item"
				// items: ".js-posts > .js-post"
				items: ".js-posts > .js-post, .o-rustygrid.-viewMasonry > .o-rustygrid__item"
			});
		},
		unmatch: function () {
			respoGrid.classList.remove("-viewMasonry");
		}
	});
}

// Refresh all necessary functions
function reloadThings() {
	addLLClass(document.querySelectorAll("main img:not(.noLazy)"));
	addLLClass(document.querySelectorAll("main iframe"));
	addIntrinsicContainer();
	addResponsiveAttr();
	makeUnselectable();
}

//--- Toggle Navigation

function toggleClass(e, c) {
	if (!e.classList.contains(c)) {
		e.classList.add(c);
	} else {
		e.classList.remove(c);
	}
}

//
// If navigation with special responsive class exists…
if (respoNav) {
	// // Toggle Navigation
	// if (toggleExpand) {
	// 	// When it's clicked on "toggleClass", add .js-visible class to the "respoNav"
	// 	toggleExpand.addEventListener("click", function () {
	// 		// console.log("Test");
	// 		toggleClass(respoNav, "js-visible");
	// 	});
	// }
	// Change navigation type to Fly-out
	// if average window size inside any device is suitable for palms or bigger
	enquire.register(mqPalmOrGT, {
		match: function () {
			// toggleExpand.classList.add("-viewIcon");
			// respoNav.classList.remove("-positionSticky");
			respoNav.classList.remove("-typeTree");
			respoNav.classList.remove("-layoutHorizontal");
			respoNav.classList.remove("-expandFromBlockStart");
			respoNav.classList.add("-typeFlyout");
			respoNav.classList.add("-layoutVertical");
			respoNav.classList.add("-expandFromStartStart");
		},
		unmatch: function () {
			// toggleExpand.classList.remove("-viewIcon");
			respoNav.classList.remove("-typeFlyout");
			respoNav.classList.remove("-layoutVertical");
			respoNav.classList.remove("-expandFromStartStart");
			// respoNav.classList.add("-positionSticky");
			respoNav.classList.add("-typeTree");
			respoNav.classList.add("-layoutHorizontal");
			respoNav.classList.add("-expandFromBlockStart");
		}
	});
	// Change navigation layout, alignment and remove expandability
	// if average window size inside any device is suitable for laps or bigger.
	enquire.register(mqLapOrGT, {
		match: function () {
			respoNav.classList.remove("-layoutVertical");
			respoNav.classList.remove("-alignStart");
			respoNav.classList.remove("-expandFromStartStart");
			respoNav.classList.add("-typeFlyout");
			respoNav.classList.add("-layoutHorizontal");
			respoNav.classList.add("-alignCenter");
			// respoNav.classList.add("-positionSticky");
		},
		unmatch: function () {
			respoNav.classList.remove("-layoutHorizontal");
			respoNav.classList.remove("-alignCenter");
			// respoNav.classList.remove("-positionSticky");
			respoNav.classList.add("-layoutVertical");
			respoNav.classList.add("-alignStart");
			respoNav.classList.add("-expandFromStartStart");
		}
	});
	//  if min-width is 80em
	// Change align from Center to Left
	// if average window size inside any device is suitable for desks or bigger
	enquire.register(mqDeskOrGT, {
		match: function () {
			respoNav.classList.remove("-layoutVertical");
			respoNav.classList.remove("-expandFromStartStart");
			// respoNav.classList.add("-typeFlyout");
			respoNav.classList.add("-layoutHorizontal");
			// respoNav.classList.add("-alignStart");
			// respoNav.classList.add("-positionSticky");
		},
		unmatch: function () {
			// respoNav.classList.remove("-alignCenter");
			// 	respoNav.classList.remove("-layoutHorizontal");
			// 	respoNav.classList.add("-layoutVertical");
			// 	respoNav.classList.add("-expandFromStartStart");
			// 	// respoNav.classList.remove("-positionSticky");
		}
	});
}

//--- Add submenu indicator to all parent of submenus

// document.querySelector(".c-nav__submenu").parentNode.classList.add("-hasSubmenu");
var submenus = document.querySelectorAll(".c-nav__submenu"), i = submenus.length;
while (i--) {
	submenus[i].parentNode.classList.add("-hasSubmenu");
}

//--- Pagination (for Eleventy)

function bindUIEvents() {
	// $(window).on('load', function () {


	// 	// Loading content from previous pages
	// 	if ($(".js-main").data('paginator-current') > 1) {
	// 		var $firstPost = $('.js-post').eq(0);
	// 		var initialOffset = $firstPost.offset().top;

	// 		loadPosts(function () {
	// 			var diff = $firstPost.offset().top - initialOffset;

	// 			if (document.querySelector(".o-rustygrid.-viewMasonry")) {
	// 				colc.reload( document.querySelector(".o-rustygrid.-viewMasonry") );
	// 			}
	// 			reloadThings();
	// 			$(document).scrollTop(diff);
	// 		}, true);
	// 	}
	// });
	var currentPage = parseInt($(".js-main").attr('data-paginator-current'));
	var totalPages = parseInt($(".js-main").attr('data-paginator-total'));
	if (currentPage === totalPages) {
		$('.js-paginator').remove();
	}
	$('.js-load-more-articles').click(function () {
		$(this).append("<div class='_spinner'></div>");
		loadPosts((function () {
			if (document.querySelector(".o-rustygrid.-viewMasonry")) {
				colc.reload( document.querySelector(".o-rustygrid.-viewMasonry") );
			}
			reloadThings();
			$("._spinner").remove();
		}).bind(this));

		// sendGAEvent('Articles', 'Load more');

		return false;
	});
}
function fetchPages(pageNumbers, callback) {
	var pages = [];

	$.each(pageNumbers, function (index, pageNumber) {
		var pagePath = $(".js-main").attr('data-path');
		var endpoint = (pageNumber === 1) ? pagePath : pagePath + 'syf/' + pageNumber + '.html';

		$.get(endpoint, function (response) {
			var html = $.parseHTML(response);

			pages[index] = $(html);

			if (pages.length === pageNumbers.length) {
				var output = pages[0];

				if (!output) return;

				for (var i = 1; i < pageNumbers.length; i++) {
					output = output.add(pages[i]);
				}
				callback(output);
			}
		});
	});
}
function getRangeArray(from, to) {
	var range = [];

	for (var i = from; i <= to; i++) {
		range.push(i);
	}

	return range;
}
function loadPosts(callback, previousPages) {
	var currentPage = parseInt($(".js-main").attr('data-paginator-current'));
	var totalPages = parseInt($(".js-main").attr('data-paginator-total'));
	var $existingPosts = $(".js-main").find(".js-posts");
	var pageNumbers;

	if (currentPage === totalPages) {
		$('.js-paginator').remove();
	}

	if (previousPages) {
		pageNumbers = getRangeArray(1, currentPage - 1);
	} else {
		var nextPage = currentPage + 1;

		if (nextPage > totalPages) {
			return;
		}

		if (nextPage === totalPages) {
			$('.js-paginator').remove();
		}

		pageNumbers = [nextPage];

		if (typeof window.history !== 'undefined') {
			var pagePath = $(".js-main").attr('data-path');
			window.history.pushState({}, '', pagePath + 'syf/' + nextPage);
		}
	}

	fetchPages(pageNumbers, function ($pages) {
		var $posts = $pages.find('.js-post');

		if (previousPages) {
			$existingPosts.prepend($posts);
			if (document.querySelector(".o-rustygrid.-viewMasonry")) {
				colc.reload(document.querySelector(".o-rustygrid.-viewMasonry"));
			}
			reloadThings();
		} else {
			$existingPosts.append($posts);
			if (document.querySelector(".o-rustygrid.-viewMasonry")) {
				colc.reload(document.querySelector(".o-rustygrid.-viewMasonry"));
			}
			reloadThings();
			$(".js-main").attr('data-paginator-current', currentPage + 1);

			if (typeof callback === 'function') {
				callback();
			}
		}
	});
}

bindUIEvents();

reloadThings();

function nothingImportant() {
	document.documentElement.style.setProperty("--chosenFonts", "Comic Sans MS, ChalkboardSE-Regular, Marker Felt, Papyrus, Arial, serif");
	// if (debugMode) {
	// 	console.log("Oh my god, what have you done...");
	// }
}

//--- Dark Mode Toggle: github.com/BetaHuhn/drkmd.js
//
// new Darkmode().attach();
const darkModeToggleImg = {
	dark: "/pi.svg#sun",
	light: "/pi.svg#moon"
}
window.addEventListener('theme-change', e => {
	const theme = e.detail.to
	document.getElementById('darkModeToggle').href = darkModeToggleImg[theme]
})
