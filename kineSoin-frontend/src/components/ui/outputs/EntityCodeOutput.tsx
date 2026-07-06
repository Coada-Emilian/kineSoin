import type { EntityCodeOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityCodeOutput({
  amc_code,
  insurance_code,
  licence_code,
}: EntityCodeOutputProps) {
  const details = outputDetails.find(
    (detail) =>
      (amc_code && detail.type === 'amc_code') ||
      (insurance_code && detail.type === 'insurance_code') ||
      (licence_code && detail.type === 'licence_code')
  );
  return (
    <BaseEntityOutputContainer
      icon={details?.icon || ''}
      iconAlt={details?.iconAlt || ''}
      label={details?.label || ''}
      value={
        amc_code
          ? (amc_code as string)
          : insurance_code
            ? (insurance_code as string)
            : (licence_code as string)
      }
    ></BaseEntityOutputContainer>
  );
}
