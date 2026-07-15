import type { BaseEntityOutputContainerProps } from '../../../@types/props/componentProps';
import BaseEntityProfileOutput from './BaseEntityProfileOutput';
import BaseVerticalEntityProfileOutput from './BaseVerticalEntityProfileOutput';

const BaseEntityOutputContainer = ({
  icon,
  iconAlt,
  label,
  value,
  isVertical,
}: BaseEntityOutputContainerProps) => {
  return (
    <div
      className={
        isVertical ? 'flex gap-3 mb-2' : 'flex items-center gap-2 mb-2'
      }
    >
      <img src={icon} alt={iconAlt} className="h-4 w-4 md:h-6 md:w-6" />

      {isVertical ? (
        <BaseVerticalEntityProfileOutput
          label={label ?? ''}
          value={value}
          isAgeOutput={iconAlt === 'age'}
        />
      ) : (
        <BaseEntityProfileOutput
          label={label ?? ''}
          value={value}
          isAgeOutput={iconAlt === 'age'}
        />
      )}
    </div>
  );
};

export default BaseEntityOutputContainer;
