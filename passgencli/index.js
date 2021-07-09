#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const createPassword = require('./utils/createPassword');
const savePassword = require('./utils/savePassword');

//console.log(process.argv); //array of local, and added command on cli

program.version('1.0.0').description('Password Generator in Cli')
// program
//   .command('generate')
//   .action(() => {
//   console.log('Generated')
// })

//open node index -h to see all option
program
  .option('-l, --length <number>', 'length of password', '8')
  .option('-s, --save', 'save password to passwords.txt') 
  .option('-nn, --no-numbers', 'remove numbers') 
  .option('-ns, --no-symbols', 'remove symbols') 
  .parse();

console.log(program.opts()); //show selecting option in object

const { length, save, numbers, symbols } = program.opts();

// Get generated password
const generatedPassword = createPassword(length, numbers, symbols);

//Save to file
if(save) {
  savePassword(generatedPassword);
}

//Copy to clipboard
clipboardy.writeSync(generatedPassword);

console.log(chalk.blue('Password: ') + chalk.bold(generatedPassword));
console.log(chalk.yellow('Password copied to clipboard'));


