import type { EntityGenderOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import { getEntityFrenchGender } from '../../../utils/functions/admin/adminEntityProfile/getEntityFrenchGender';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityGenderOutput({
  gender,
  isLabelMissing,
}: EntityGenderOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'gender');

  return (
    <BaseEntityOutputContainer
      icon={details?.icon || ''}
      iconAlt={details?.iconAlt || ''}
      label={isLabelMissing ? '' : details?.label || ''}
      value={getEntityFrenchGender(gender)}
    ></BaseEntityOutputContainer>
  );
}
