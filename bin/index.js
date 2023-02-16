#! /usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getTopByRange, storyCategorys } from './hn.js';
import { printNews, clear, printLoading } from './printer.js';
import { inquireOption, inquireIndex } from './prompt.js';
import open from 'open';
import getUrlByIndex from './helper.js';

const argv = yargs(hideBin(process.argv))
  .option('category', {
    alias: 'c',
    describe: 'News category',
    type: 'string',
    default: 'best',
    choices: ['top', 'new', 'best'],
  })
  .option('number', {
    alias: 'n',
    describe: 'The number of news for each page (1-500)',
    type: 'number',
    default: 10,
  })
  .check((args) => {
    if (args.number < 0 || args.number > 500) {
      throw new Error('The number must between 1~500');
    } else return true;
  }).argv;

async function getNewsByRnage(start, end) {
  return await getTopByRange(start, end, storyCategorys[argv.category]);
}

(async () => {
  let page = 0;
  let start = argv.number * page;
  let end = argv.number * (page + 1);
  let render = true;
  let news = [];

  while (true) {
    if (render) {
      clear();
      start = argv.number * page;
      end = argv.number * (page + 1);
      printLoading();
      news = await getNewsByRnage(start, end);
      clear();
      news.forEach((data, index) =>
        printNews(data, index + page * argv.number)
      );
      render = false;
    }

    const option = await inquireOption(start, end);
    switch (option) {
      case 'Exit':
        return;
      case 'Open in Browser':
        const index = await inquireIndex(start, end);
        open(getUrlByIndex(news, index - page * argv.number));
        continue;
      case 'Next Page':
        page += 1;
        render = true;
        continue;
      case 'Prev Page':
        page -= 1;
        render = true;
        continue;
      default:
        throw new Error('Invalid Option');
    }
  }
})();
