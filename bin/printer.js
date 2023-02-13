import chalk from 'chalk';

const emoji_fire = String.fromCodePoint(0x1f525);

export function clear() {
  process.stdout.write('\x1b[2J');
  process.stdout.write('\x1b[0f');
}

export function printNews({ title, type, score }, index) {
  console.log(
    `${index}. ${chalk.bold(title)} ${chalk.italic.blueBright(
      `[${type}]`
    )} ${emoji_fire}${score}`
  );
}

export function printLoading() {
  console.log(chalk.underline('Requesting to Hacker News Server...\n'));
  console.log(chalk.dim('\t> If get stuck, kill the program and try again.'));
}
