const fs = require('fs');
const path = require('path');
const glob = require('glob');
const postcss = require('postcss');
const lightningcss = require('postcss-lightningcss');

// Input and output directories
const inputDir = 'tmp/static/style/';
const outputDir = 'dist/static/style/';

// Function to process CSS files
async function processCSS(filePath) {

	const cssContent = fs.readFileSync(filePath, 'utf8');

	// PostCSS plugins
	const plugins = [
		lightningcss({
			lightningcssOptions: {
				minify: true,
				sourceMap: true,
				drafts: {
					customMedia: false,
					nesting: false
				}
			}
			// Add lightningcss options here
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
const inputFiles = glob.sync(path.join(inputDir, '**/*.css'));

inputFiles.forEach(async (filePath) => {
	await processCSS(filePath);
});

console.log('CSS minification complete.');
