import chalk from 'chalk';

const emoji_fire = String.fromCodePoint(0x1f525);

export function clear() {
  process.stdout.write('\x1b[2J');
  process.stdout.write('\x1b[0f');
}

export function printNews({ title, type, score }) {
  console.log(
    `${chalk.bold(title)} ${chalk.italic.yellowBright(
      `[${type}]`
    )} ${emoji_fire}${score}`
  );
}
