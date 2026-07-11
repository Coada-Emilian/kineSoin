import { outputDetails } from '../../../utils/config/outputDetails';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityNameOutput({
  name,
  surname,
}: {
  name: string;
  surname: string;
}) {
  const details = outputDetails.find((detail) => detail.type === 'name');
  return (
    <BaseEntityOutputContainer
      icon={details?.icon ?? ''}
      iconAlt={details?.iconAlt ?? ''}
      label={details?.label ?? ''}
      value={name && surname ? `${name} ${surname}` : `${name}`}
    ></BaseEntityOutputContainer>
  );
}
