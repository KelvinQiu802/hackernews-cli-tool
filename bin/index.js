#! /usr/bin/env node

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { getTopN, storyCategorys } = require('./hn');

const argv = yargs(hideBin(process.argv)).option('category', {
  alias: 'c',
  describe: 'News category',
  type: 'string',
  default: 'top',
  choices: ['top', 'new', 'best'],
}).argv;

async function getNews() {
  return await getTopN(5, storyCategorys[argv.category]);
}

getNews().then((data) => {
  data.forEach((data) => console.log(data.title));
});
