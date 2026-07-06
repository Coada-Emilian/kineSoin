import type { BaseEntityOutputContainerProps } from '../../../@types/props/componentProps';
import BaseEntityProfileOutput from './BaseEntityProfileOutput';

const BaseEntityOutputContainer = ({
  icon,
  iconAlt,
  label,
  value,
}: BaseEntityOutputContainerProps) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <img src={icon} alt={iconAlt} className="h-4 w-4 md:h-6 md:w-6" />
      <BaseEntityProfileOutput label={label} value={value} />
    </div>
  );
};

export default BaseEntityOutputContainer;
