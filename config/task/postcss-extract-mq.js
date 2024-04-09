import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import postcss from 'postcss';
import extractMedia from 'postcss-extract-media-query';

// Input and output directories
const inputDir = 'tmp/static/style/';
const outputDir = 'tmp/static/style/';

// Function to process CSS files
async function processCSS(filePath) {
	const cssContent = fs.readFileSync(filePath, 'utf8');

	// PostCSS plugins
	const plugins = [
		extractMedia({
			output: {
				path: 'tmp/static/style/',
				name: '[name].mq-[query].[ext]'
			},
			stats: false,
			extractAll: false,
			queries: {
				// make sure it's synchronized with the media queries from css/abstract/00-media.css

				// for wrist or smaller
				// "screen and (max-width:2in)": "s",

				// for palm or smaller
				// "screen and (max-width:calc(calc(640/16)*1em)-1px)": "s",

				// for palm or bigger
				// "screen and (min-width:calc((640/16)*1em))": "m",
				"screen and (min-width: 40em)": "m",

				// for lap or bigger
				// "screen and (min-width:calc((960/16)*1em))": "l",
				"screen and (min-width: 60em)": "l",

				// for desk or bigger
				// "screen and (min-width:calc((1280/16)*1em))": "l",
				"screen and (min-width: 80em)": "l",

				// for wall or bigger
				// "screen and (min-width:calc((1600/16)*1em))": "xl",
				"screen and (min-width: 100em)": "xl",

				// for mall or bigger
				// "screen and (min-width:calc((1920/16)*1em))": "xl",
				"screen and (min-width: 120em)": "xl",

				// for titan or bigger
				// "screen and (min-width:calc((2400/16)*1em))": "xl",
				"screen and (min-width: 150em)": "xl",

				// inputs with cursor
				"(any-hover: hover)": "cur",
				"(any-pointer: fine)": "cur",
				"(any-hover: hover) and (any-pointer:fine)": "cur",

				// dark color scheme
				"(prefers-color-scheme: dark)": "dark"
			}
		})
	];
	// Process CSS using PostCSS
	const result = await postcss(plugins).process(cssContent, { from: filePath });

	// Write processed CSS to the output directory with the same subdirectory structure
	const relativePath = path.relative(inputDir, filePath);
	const outputPath = path.join(outputDir, relativePath);

	// Ensure the output directory exists
	fs.mkdirSync(path.dirname(outputPath), { recursive: true });

	fs.writeFileSync(outputPath, result.css);
}

// Process all CSS files in the input directory
// const inputFiles = glob.sync(path.join(inputDir, '**/*.css'));
const inputFiles = glob.sync(path.join(inputDir, '**/!(*.mq-*)*.css'));

inputFiles.forEach(async (filePath) => {
	await processCSS(filePath);
});
console.log('Media query extraction complete.');
