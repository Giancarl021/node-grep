const fs = require('fs');
const { execSync: exec } = require('child_process');
const chalk = require('chalk');
const [,, search, target, ...commands] = process.argv;

let content;

if (target === '@') {
    let command = commands
        .map(e => /\s/.test(e) ? `"${e}"` : e)
        .join(' ');
    try {
        content = exec(command, { encoding: 'utf8' });
    } catch (err) {
        console.error(`Error executing command ${command}:\n` + err.stdout);
        return;
    }
} else if (!fs.existsSync(target)) {
    return;
}
else {
    content = fs.readFileSync(target, 'utf8');
}

content.split(/\r?\n/g).forEach(line => {
    const regex = new RegExp(search, 'g');
    if (regex.test(line)) console.log(line.replace(regex, item => chalk.redBright(item)));
});