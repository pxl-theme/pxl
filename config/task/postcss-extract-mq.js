import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import postcss from 'postcss';
import extractMedia from 'postcss-extract-media-query';

// Input and output directories
const inputDir = path.resolve('tmp/static/style/');
const outputDir = path.resolve('tmp/static/style/');

// Process all CSS files in the input directory
// const inputFiles = glob.sync(path.join(inputDir, '**/*.css'));
// const inputFiles = glob.sync(path.join(inputDir, '**/!(*.mq-*)*.css'));
const inputFiles = glob.sync(`${inputDir.replace(/\\/g, '/')}/**/!(*.mq-*)*.css`);

// Function to process CSS files
async function processCSS(filePath) {
	const cssContent = fs.readFileSync(filePath, 'utf8');

	// PostCSS plugins
	const plugins = [
		extractMedia({
			output: {
				path: outputDir,
				name: '[name].mq-[query].[ext]'
			},
			stats: false,
			extractAll: false,

			queries: {
				// make sure it's synchronized with the media queries from css/abstract/00-media.css
				// "screen and (max-width:2in)": "s", // for wrist or smaller
				// "screen and (max-width:calc(calc(640/16)*1em)-1px)": "s", // for palm or smaller
				"screen and (width >= 40em)": "m", // for palm or bigger
				"screen and (width >= 60em)": "l", // for lap or bigger
				"screen and (width >= 80em)": "l", // for desk or bigger
				"screen and (width >= 100em)": "xl", // for wall or bigger
				"screen and (width >= 120em)": "xl", // for mall or bigger
				"screen and (width >= 150em)": "xl", // for titan or bigger
				"(pointer: fine)": "cur", // inputs with cursor
				"(prefers-color-scheme: dark)": "dark" // dark color scheme
			}
		})
	];
	// Process CSS using PostCSS
	const result = await postcss(plugins).process(cssContent, { from: filePath })
		.catch(err => console.error('PostCSS Error:', err));

	// Write processed CSS to the output directory with the same subdirectory structure
	const relativePath = path.relative(inputDir, filePath);
	const outputPath = path.join(outputDir, relativePath);

	// Ensure the output directory exists
	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, result.css);
}

console.log('Resolved Input Directory:', inputDir);
console.log('Resolved Output Directory:', outputDir);
console.log('Found Files:', inputFiles);

for (const filePath of inputFiles) {
	await processCSS(filePath);
}

console.log('Media query extraction complete.');
