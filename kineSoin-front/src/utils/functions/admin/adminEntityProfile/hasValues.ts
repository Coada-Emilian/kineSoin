export const hasValues = (...values: (string | undefined | null)[]) =>
  values.every(
    (value) => value !== '' && value !== undefined && value !== null
  );
