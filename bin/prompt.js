import inquirer from 'inquirer';

export async function inquireOption(start, end) {
  try {
    const { option } = await inquirer.prompt([
      {
        type: 'list',
        message: 'Options:',
        default: 0,
        name: 'option',
        choices: getOptionArr(start, end),
      },
    ]);
    return option;
  } catch (error) {
    throw new Error('Invalid Option');
  }
}

function getOptionArr(start, end) {
  const perPage = end - start;
  if (end + perPage > 500) {
    return ['Open', 'Prev Page', 'Exit'];
  } else if (start - perPage < 0) {
    return ['Open', 'Next Page', 'Exit'];
  } else {
    return ['Open', 'Next Page', 'Prev Page', 'Exit'];
  }
}

export async function inquireIndex(start, end) {
  const { index } = await inquirer.prompt([
    {
      type: 'number',
      name: 'index',
      message: 'Enter the index:',
      default: 0,
      validate: (index) => indexValidator(index, start, end),
    },
  ]);
  return index;
}

function indexValidator(index, start, end) {
  if (index >= start && index <= end) {
    return true;
  } else {
    throw new Error(`The index should between ${start}~${end - 1}`);
  }
}
