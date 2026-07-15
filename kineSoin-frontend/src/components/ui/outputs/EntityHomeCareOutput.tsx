import type { EntityHomeCareOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import { formatHomeCare } from '../../../utils/functions/formatHomeCare';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityHomeCareOutput({
  at_home_care,
}: EntityHomeCareOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'home');

  return (
    <BaseEntityOutputContainer
      icon={details?.icon || ''}
      iconAlt={details?.iconAlt || ''}
      label={details?.label || ''}
      value={formatHomeCare(at_home_care)}
    ></BaseEntityOutputContainer>
  );
}
