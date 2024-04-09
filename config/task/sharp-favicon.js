// import fs from 'fs';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import ico from 'sharp-ico';
import getGravatar from 'get-gravatar';

// Favicon maker: https://www.favicon.cc/
	//
// Order of input favicon files to check inside inputDir 
const inputDir = 'static/';
// const gravatarEmail = 'info@example.com';
const favIn = [
		'favicon.svg',
		'favicon.jxl',
		'favicon.jxl',
		'favicon.webp',
		'favicon.png',
		'favicon.jpg',
		'favicon.gif',
		'favicon.ico'
	];
// const favIn = process.env.NODE_ENV === "production"
// 	? [
// 		'favicon.svg',
// 		'favicon.jxl',
// 		'favicon.jxl',
// 		'favicon.webp',
// 		'favicon.png',
// 		'favicon.jpg',
// 		'favicon.gif',
// 		'favicon.ico'
// 	]
// 	:  ['favicon-dev.ico'];

// Set output favicon names to be exported inside outputDir
const outputDir = 'dist/';
const favOut = {
    ico32: "favicon.ico",
    webp180: "apple-touch-icon.webp",
    webp192: "icon-192.webp",
    webp512: "icon-512.webp"
};

// const roundedCorners = Buffer.from(
//   '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
// );
// const roundedCornerResizer =
//   sharp()
//     .resize(200, 200)
//     .composite([{
//       input: roundedCorners,
//       blend: 'dest-in'
//     }])
//     .png();
//
// readableStream
//   .pipe(roundedCornerResizer)
//   .pipe(writableStream);
let inputFile;
let image;
// Default resize options
let defaultFit = 'cover';
let defaultInterpolation = 'lanczos3';
(async () => {
    // Check for existing favicon files in order of preference
    for (const favicon of favIn) {
        if (fs.existsSync(path.join(inputDir, favicon))) {
            inputFile = path.join(inputDir, favicon);
            break;
        }
    }
    if (!inputFile && gravatarEmail) {
        // If no input found, use Gravatar instead.
        console.log('No input favicon found, fetching Gravatar from specified email…');
        // Fetch Gravatar profile picture for the specified email
        const buffer = await getGravatar(gravatarEmail, { size: 512, default: "identicon" });
        // fs.writeFileSync(path.join(inputDir, 'gravatar.png'), buffer);
        image = sharp(buffer);
        console.log('Successfully fetched Gravatar as new input favicon, resuming task…');
    }
    // If input file is .ico convert to .png and set "image" variable
    else if (inputFile.endsWith('.ico')) {
        console.log('.ico found, extracting 16x16 .png…');
        const buffer = fs.readFileSync(inputFile);
        const imgsInsideIco = ico.decode(buffer);
        // save as png
        imgsInsideIco.forEach((img) => {
            if (img.width <= 32) {
                const finalImg = img.type === "png"
                    ? sharp(img.data)
                    : sharp(img.data, {
                        raw: {
                            width: img.width,
                            height: img.height,
                            channels: 4,
                        },
                    });
                // set png buffer for sharp
                // image = sharp(Buffer.from(img.buffer));
                image = finalImg;
            }
        });
        console.log('16x16 .png extraction successful, resuming task…');
    }
    else if (inputFile !== "") {
        // If selected favicon is none of them above, take the input as it is..
        console.log('Valid input favicon found, resuming task…');
        image = sharp(inputFile);
    }
    else {
        console.error('No valid input favicon found, exiting task.');
        return;
    }
    const metadata = await image.metadata();
    // Create output dir if there isn't any
    if (!fs.existsSync(outputDir)) {
        console.log('Output dir not found, creating one…');
        fs.mkdirSync(outputDir);
    }
    // If input is not square, crop to the center
    if (metadata.width !== metadata.height) {
        if (inputFile.endsWith('.svg')) {
            defaultFit = 'contain';
        }
    }
    // If input has smaller width than 32, upscale with
    // Nearest Neighbor interpolation
    if (metadata.width <= 32) {
        defaultInterpolation = 'nearest';
        console.log('Input favicon is smaller than 32x, upscaling method will be Nearest Neighbor');
        console.log('for generating various sizes…');
    }
    console.log('Generating various sizes…');
    image.resize({
        fit: defaultFit,
        kernel: defaultInterpolation,
        background: "#0000" // For transparent letterbox
        // }).webp({ quality: 95 });
    });
    image.resize(192, 192).toFile(path.join(outputDir, favOut.webp192));
    image.resize(512, 512).toFile(path.join(outputDir, favOut.webp512));
    image.resize(180, 180).toFile(path.join(outputDir, favOut.webp180));
    // Convert PNG images to ICO
    ico.sharpsToIco([image], path.join(outputDir, favOut.ico32), { sizes: [32, 16] });
})().catch(console.error);
// TODO: Take a few notes from this package: https://github.com/NJAldwin/eleventy-plugin-gen-favicons/blob/master/favicon-gen.js
