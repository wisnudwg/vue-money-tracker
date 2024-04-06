const generateValueLabelPairs = (options: String[]) => options.map(option => ({ value: option, label: option }));

export const categoryOptions = {
  expense: generateValueLabelPairs([
    'Food',
    'Social Life',
    'Pets',
    'Transport',
    'Culture',
    'Household',
    'Apparel',
    'Beauty',
    'Health',
    'Education',
    'Gift',
    'Other',
  ]),
  income: generateValueLabelPairs([
    'Allowance',
    'Salary',
    'Petty Cash',
    'Bonus',
    'Other',
  ]),
};

export const noteOptions = generateValueLabelPairs([
  'Geprek',
  'Tai',
  'Babi',
]);

export const sourceOptions = generateValueLabelPairs([
  'Account',
  'Cash',
  'Card',
]);