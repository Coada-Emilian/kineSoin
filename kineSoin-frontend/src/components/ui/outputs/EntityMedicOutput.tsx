import type { EntityMedicOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityMedicOutput({ medic }: EntityMedicOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'medic');
  return (
    <div>
      <BaseEntityOutputContainer
        icon={details?.icon || ''}
        iconAlt={details?.iconAlt || ''}
        label={details?.label || ''}
        value={`${medic.surname} ${medic.name}`}
      ></BaseEntityOutputContainer>
    </div>
  );
}
