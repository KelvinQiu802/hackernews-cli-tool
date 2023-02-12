#! /usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getTopN, storyCategorys } from './hn.js';
import { printNews, clear } from './printer.js';
import inquirer from 'inquirer';
import open from 'open';

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

function indexValidator(index) {
  if (index >= 0 && index <= argv.number - 1) {
    return true;
  } else {
    throw new Error(`The index should between 0~${argv.number - 1}`);
  }
}

clear();

(async () => {
  const news = await getNews();

  news.forEach((data, index) => printNews(data, index));

  inquirer
    .prompt([
      {
        type: 'number',
        message: '想看哪个',
        default: 0,
        name: 'index',
        validate: indexValidator,
      },
    ])
    .then(async ({ index }) => {
      await open(news[index].url);
    });
})();
