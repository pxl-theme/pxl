// Authored with the assist of ChatGPT 3.5 LLM model.
//
// Detects all image files inside input directory (including subdirectories)
// to decrease qulity to 80% and convert to WebP for files above 256KB,
// oherwise it only converts to WebP with unchanged quality.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { glob } from 'glob';

const inputDir = 'static/asset/';
const outputDir = 'dist/static/asset/';

// Allowed file extensions
const supportedExtensions = ['jpg', 'jpeg', 'png', 'tif', 'gif', 'webp'];

// Function to check if file size is below 256KB
function isFileSizeBelowLimit(filePath) {
	const stats = fs.statSync(filePath);
	const fileSizeInBytes = stats.size;
	const fileSizeInKB = fileSizeInBytes / 1024;
	return fileSizeInKB < 256;
}

// Function to process images
(async () => {
	const files = glob.sync(`${inputDir}/**/*.{${supportedExtensions.join(',')}}`, {
		nodir: true,
		absolute: true
	});
	for (const file of files) {
		const relativePath = path.relative(inputDir, file);
		const outputPath = path.join(outputDir, relativePath);

		// Create directory if it doesn't exist
		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
		if (isFileSizeBelowLimit(file)) {
			// Convert to webp with original quality
			await sharp(file).webp({ quality: 100 }).toFile(outputPath.replace(/\.(jpg|jpeg|png|tif|gif)$/, '.webp'));
			console.log(`Processed with original quality: ${file}`);
		} else {
			// Convert to webp with quality 80
			await sharp(file).webp({ quality: 80 }).toFile(outputPath.replace(/\.(jpg|jpeg|png|tif|gif)$/, '.webp'));
			console.log(`Processed with 80 quality: ${file}`);
		}
		console.log(`Processed: ${relativePath}`);
	}
})().catch(console.error);
