import fs from 'fs';
import * as cheerio from 'cheerio';
const input = 'dist/pi.svg';
const output = 'dist/pi.svg';
fs.readFile(input, 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading the file:', err);
		return;
	}
	// Load the SVG content into Cheerio
	const $ = cheerio.load(data, { xmlMode: true });
	$('g,defs,symbol')
		.find('[stroke]')
		.attr({
			stroke: 'var(--iconColor, #000)',
			'stroke-width': 'var(--iconWeight, 2px)'
		});
	// Save the modified SVG content back to the file
	fs.writeFile(output, $.xml(), (err) => {
		if (err) {
			console.error('Error writing to the file:', err);
		} else {
			console.log('SVG file successfully edited!');
		}
	});
});
