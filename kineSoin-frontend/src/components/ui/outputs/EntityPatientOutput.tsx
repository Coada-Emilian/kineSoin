import type { EntityPatientOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityPatientOutput({
  patient,
}: EntityPatientOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'patient');
  return (
    <BaseEntityOutputContainer
      icon={details?.icon || ''}
      iconAlt={details?.iconAlt || ''}
      label={details?.label || ''}
      value={`${patient.surname} ${patient.name}`}
    ></BaseEntityOutputContainer>
  );
}
