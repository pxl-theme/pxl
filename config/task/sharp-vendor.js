import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const inputFiles = [
    'node_modules/colcade/colcade.js',
    'node_modules/drkmd-js/dist/drkmd-js.min.js',
    'node_modules/@zachleat/webcare-webshare/webcare-webshare.js',
    'node_modules/@github/relative-time-element/dist/bundle.js'
];
const outputDir = 'dist/static/script/_vendor';

// Ensure output directory exists
fs.mkdirSync(outputDir, { recursive: true });

// Minify each file and concatenate
for (const file of inputFiles) {
    let outputName;
    if (file.endsWith("bundle.js")) {
        outputName = "relative-time-element-bundle.js";
    }
    else {
        outputName = path.basename(file);
    }
    const minifiedFile = path.join(outputDir, `${outputName}`);
    execSync(`swc ${file} -o ${minifiedFile} --config-file config/swc.json`);
}
;
console.log('Vendor scripts minified successfully.');
