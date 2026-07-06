import type { EntityStudiesOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityStudiesOutput({
  diploma,
  experience,
  specialty,
}: EntityStudiesOutputProps) {
  const details = outputDetails.find(
    (detail) =>
      (diploma && detail.type === 'diploma') ||
      (experience && detail.type === 'experience') ||
      (specialty && detail.type === 'specialty')
  );
  return (
    <BaseEntityOutputContainer
      icon={details?.icon || ''}
      iconAlt={details?.iconAlt || ''}
      label={details?.label || ''}
      value={
        diploma
          ? (diploma as string)
          : experience
            ? (experience as string)
            : (specialty as string)
      }
    ></BaseEntityOutputContainer>
  );
}
