export const getInputChange = [
  {
    state: 'entityName',
    value: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
    setState: (value: string) => setEntityName(value),
  },
];
