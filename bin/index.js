#! /usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getTopN, storyCategorys } from './hn.js';
import { printNews, clear } from './printer.js';
import { inquireOption, inquireIndex } from './prompt.js';
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

clear();

(async () => {
  const news = await getNews();
  news.forEach((data, index) => printNews(data, index));

  let start = 0;
  let end = argv.number - 1;

  while (true) {
    const option = await inquireOption();
    switch (option) {
      case 'Exit':
        return;
      case 'Open':
        const index = await inquireIndex(start, end);
        open(news[index].url);
        continue;
      default:
        throw new Error('Invalid Option');
    }
  }
})();
