import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

function findSVGFiles(directory) {
    let svgFiles = [];
    // Read the directory
    const items = fs.readdirSync(directory);
    for (const item of items) {
        const fullPath = path.join(directory, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            // Recursively search directories
            svgFiles = svgFiles.concat(findSVGFiles(fullPath));
        }
        else if (item.endsWith('.svg')) {
            // Add SVG files to the list
            svgFiles.push(fullPath);
        }
    }
    return svgFiles;
}

function executeCommandWithSVGFiles(svgFiles, command) {
    const commandProcess = child_process.spawn(command[0], command.slice(1), {
        stdio: ['pipe', process.stdout, process.stderr]
    });
    commandProcess.stdin.write(svgFiles.join('\n'));
    commandProcess.stdin.end();
}

const directory = 'static/asset/';
// const command = ['svgo', '-f static/asset/', '-r', '-o dist/static/asset/'];
const command = ['svgo', '-f', 'static/asset/', '-r', '-o', 'dist/static/asset/'];
// const command = ['pnpm exec svgo -f static/asset/ -r -o dist/static/asset/ --config config/svgo.js'];
// pnpm exec svgo -f static/asset/ -r -o dist/static/asset/ --config config/svgo.js
const svgFiles = findSVGFiles(directory);
if (svgFiles.length === 0) {
    console.log('No SVG files found.');
    process.exit(0);
}
else {
    executeCommandWithSVGFiles(svgFiles, command);
}
