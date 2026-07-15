import type { EntityContractNumberOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityContractNumberOutput({
  contractNumber,
}: EntityContractNumberOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'contract');
  return (
    <BaseEntityOutputContainer
      icon={details?.icon || ''}
      iconAlt={details?.iconAlt || ''}
      label={details?.label || ''}
      value={contractNumber as string}
    ></BaseEntityOutputContainer>
  );
}
