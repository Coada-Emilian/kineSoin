import type { PatientsLinkButtonsProps } from '../../../../@types/props/componentProps';
import type { IButtonType } from '../../../../@types/types/buttonTypes';
import therapistPatientsQuickNavFilters from '../../../../utils/config/therapist/therapistPatientsQuickNavFilters';
import CustomButton from '../../../ui/buttons/CustomButton';

export default function PatientsLinkButtons({
  counts,
  selectedFilter,
  onSelect,
}: PatientsLinkButtonsProps) {
  return (
    <div className="w-11/12 flex gap-2 mb-2">
      {therapistPatientsQuickNavFilters.map((filter) => (
        <CustomButton
          key={filter.key}
          btn={{
            type: filter.buttonType as IButtonType,
            text: `${filter.label} (${counts[filter.key] ?? 0})`,
            style: 'status',
            onClick: () => onSelect(filter.key),
          }}
        />
      ))}
    </div>
  );
}
