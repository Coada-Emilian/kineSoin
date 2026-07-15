import type { EntityAdherentNumberOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityAdherentNumberOutput({
  adherentNumber,
}: EntityAdherentNumberOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'adherent');
  return (
    <BaseEntityOutputContainer
      icon={details?.icon || ''}
      iconAlt={details?.iconAlt || ''}
      label={details?.label || ''}
      value={adherentNumber as string}
    ></BaseEntityOutputContainer>
  );
}
