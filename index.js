const fs = require('fs');
const chalk = require('chalk');
const [,,search,target] = process.argv;

if(!fs.existsSync(target)) return;
const content = fs.readFileSync(target, 'utf8');

content.split(/\r?\n/g).forEach(line => {
	const regex = new RegExp(search, 'g');
	if(regex.test(line)) console.log(line.replace(regex, item => chalk.redBright(item)));
});