import inquirer from 'inquirer';

export async function inquireOption() {
  try {
    const { option } = await inquirer.prompt([
      {
        type: 'list',
        message: 'Options:',
        default: 0,
        name: 'option',
        choices: ['Open', 'Exit'],
      },
    ]);
    return option;
  } catch (error) {
    throw new Error('Invalid Option');
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
    throw new Error(`The index should between ${start}~${end}`);
  }
}
