// Add arrow indicator to nested menus
//
// document.querySelector(".c-nav__submenu").parentNode.classList.add("-hasChildren");
var submenus = document.querySelectorAll(".c-nav__submenu"), i = submenus.length;
while (i--) {
	submenus[i].parentNode.classList.add("-hasChildren");
}

$( ".c-nav__item.-hasChildren" ).doubleTapToGo();

// Prevent zooming in iOS
// document.addEventListener("gesturestart", function (e) {
// 	e.preventDefault();
// });

//------ Elements
var mainNav = document.getElementById("mainNav");
var mainContent = document.getElementById("mainContent");

//------ Breakpoints
var palm = "screen and (min-width:40em)",
	lap = "screen and (min-width:60em)",
	desk = "screen and (min-width:80em)";
	// wall = "screen and (min-width:100em)",
	// mall = "screen and (min-width:120em)",
	// titan = "screen and (min-width:150em)";

//------ Responsive Layout
if (mainContent) {
	enquire.register(lap, {
		// Change location from side to top if min-width is 80em
		match : function() {
			mainContent.classList.add("o-masonry");
			mainContent.classList.remove("o-grid12");
		},
		unmatch : function() {
			mainContent.classList.remove("o-masonry");
			mainContent.classList.add("o-grid12");
		}
	});
}

//------ Responsive Main Navigation
if (mainNav) {
	enquire.register(palm, {
		// Change view to dropdown if min-width is 40em
		match : function() {
			mainNav.classList.add("-viewDropdown");
			mainNav.classList.add("-positionSide");
			mainNav.classList.remove("-positionTop");
			mainNav.classList.remove("-viewTree");
		},
		unmatch : function() {
			mainNav.classList.remove("-viewDropdown");
			mainNav.classList.remove("-positionSide");
			mainNav.classList.add("-positionTop");
			mainNav.classList.add("-viewTree");
		}
	});
	enquire.register(desk, {
		// Change location from side to top if min-width is 80em
		match : function() {
			mainNav.classList.add("-viewDropdown");
			mainNav.classList.add("-justified");
			mainNav.classList.add("-positionTop");
			mainNav.classList.add("u-clearFix");
			mainNav.classList.remove("-positionSide");
			mainNav.classList.remove("-collapsible");
		},
		unmatch : function() {
			mainNav.classList.remove("-justified");
			mainNav.classList.remove("-positionTop");
			mainNav.classList.remove("u-clearFix");
			mainNav.classList.add("-positionSide");
			mainNav.classList.add("-collapsible");
		}
	});
}

//------ Masonry Item Content Height

window.addEventListener("load", resize);
window.addEventListener("resize", resize);

function resize() {
	var grid = document.querySelector(".o-masonry");
	var rowHeight = getStyleValue(grid, "grid-auto-rows");
	var rowGap = getStyleValue(grid, "grid-row-gap");
	grid.style.gridAutoRows = "auto";
	grid.style.alignItems = "self-start";
	grid.querySelectorAll(".o-masonry__item").forEach(item => {
		item.style.gridRowEnd = `span ${Math.ceil(
			(item.clientHeight + rowGap) / (rowHeight + rowGap)
		)}`;
	});
	grid.removeAttribute("style");
}

function getStyleValue(element, style) {
	return parseInt(window.getComputedStyle(element).getPropertyValue(style));
}
// allItems = document.getElementsByClassName(".o-masonry__item");
// for(x=0;x<allItems.length;x++){
//    imagesLoaded( allItems[x], resizeInstance);
// }

// function resizeInstance(instance){
//    item = instance.elements[0];
//    resizeGridItem(item);
// }


