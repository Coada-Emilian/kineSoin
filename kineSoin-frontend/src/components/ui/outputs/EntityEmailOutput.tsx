import type { EntityEmailOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityEmailOutput({
  email,
  isVertical,
}: EntityEmailOutputProps) {
  const details = outputDetails.find((detail) => detail.type === 'email');
  return (
    <>
      <BaseEntityOutputContainer
        icon={details?.icon || ''}
        iconAlt={details?.iconAlt || ''}
        label={details?.label || ''}
        value={email as string}
        isVertical={isVertical}
      ></BaseEntityOutputContainer>
    </>
  );
}
