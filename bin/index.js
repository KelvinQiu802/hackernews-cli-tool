#! /usr/bin/env node

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { getTopN, storyCategorys } = require('./hn');

const argv = yargs(hideBin(process.argv))
  .option('category', {
    alias: 'c',
    describe: 'News category',
    type: 'string',
    default: 'top',
    choices: ['top', 'new', 'best'],
  })
  .option('number', {
    alias: 'n',
    describe: 'The number of news (1-500)',
    type: 'number',
    default: 10,
  })
  .check((args) => {
    if (args.number < 0 || args.number > 500) {
      throw new Error('The number must between 1~500');
    } else return true;
  }).argv;

async function getNews() {
  return await getTopN(argv.number, storyCategorys[argv.category]);
}

getNews().then((data) => {
  data.forEach((data) => console.log(data.title));
});
