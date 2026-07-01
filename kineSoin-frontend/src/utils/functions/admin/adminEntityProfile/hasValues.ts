import type { IBodyRegion } from '../../../../@types/interfaces/modelInterfaces';

export const hasValues = (
  ...values: (string | undefined | IBodyRegion | null | boolean)[]
) =>
  values.every(
    (value) => value !== '' && value !== undefined && value !== null
  );
