// Script for testing/tweaking purposes.

//--- Global Variables
const docHTML = document.documentElement;

// var debugMode = false;

//--- Breakpoints
const mqPalmOrGT = "screen and (min-width:40em)";
const mqLapOrGT = "screen and (min-width:60em)";
const mqDeskOrGT = "screen and (min-width:80em)";
// bpWall  = "screen and (min-width:100em)",
// bpMall  = "screen and (min-width:120em)",
// bpTitan = "screen and (min-width:150em)";

//--- Get average color of favicons from all anchor links to color those
// document.addEventListener("DOMContentLoaded", () => {
// 	document.querySelectorAll("a").forEach((link) => {
// 		// Get the favicon URL
//
// 		// var faviconUrl = 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=16&url=' + new URL(link.href).hostname;
// 		var faviconUrl = `https://icons.duckduckgo.com/ip3/${encodeURIComponent(
// 			link.hostname,
// 		)}.ico`;
//
// 		// Create an image element to load the favicon
// 		var img = new Image();
// 		img.crossOrigin = "anonymous";
// 		img.src = faviconUrl;
//
// 		// Once the image is loaded, analyze the colors
// 		img.onload = () => {
// 			var canvas = document.createElement("canvas");
// 			var context = canvas.getContext("2d");
// 			context.drawImage(img, 0, 0, 16, 16); // You can adjust the dimensions as needed
//
// 			// Get the average color
// 			var data = context.getImageData(0, 0, 16, 16).data;
// 			var averageColor = getAverageColor(data);
//
// 			// Apply the average color to the link's text color
// 			link.style.color = `rgb(${averageColor.join(",")})`;
// 		};
// 	});
//
// 	// Function to calculate average color from image data
// 	function getAverageColor(data) {
// 		var sum = [0, 0, 0];
// 		var count = 0;
//
// 		for (var i = 0; i < data.length; i += 4) {
// 			sum[0] += data[i];
// 			sum[1] += data[i + 1];
// 			sum[2] += data[i + 2];
// 			count++;
// 		}
//
// 		var average = [
// 			Math.round(sum[0] / count),
// 			Math.round(sum[1] / count),
// 			Math.round(sum[2] / count),
// 		];
//
// 		return average;
// 	}
// });
