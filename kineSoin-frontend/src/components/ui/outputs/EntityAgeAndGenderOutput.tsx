import type { EntityAgeAndGenderOutputProps } from '../../../@types/props/componentProps';
import { outputDetails } from '../../../utils/config/outputDetails';
import { getEntityFrenchGender } from '../../../utils/functions/admin/adminEntityProfile/getEntityFrenchGender';
import BaseEntityOutputContainer from './BaseEntityOutputContainer';

export default function EntityAgeAndGenderOutput({
  age,
  gender,
}: EntityAgeAndGenderOutputProps) {
  const ageDetails = outputDetails.find((detail) => detail.type === 'age');
  const genderDetails = outputDetails.find(
    (detail) => detail.type === 'gender'
  );

  return (
    <div className="flex justify-between mb-0">
      <BaseEntityOutputContainer
        icon={ageDetails?.icon || ''}
        iconAlt={ageDetails?.iconAlt || ''}
        label={ageDetails?.label || ''}
        value={age as string}
      ></BaseEntityOutputContainer>

      {gender && (
        <>
          <BaseEntityOutputContainer
            icon={genderDetails?.icon || ''}
            iconAlt={genderDetails?.iconAlt || ''}
            label={genderDetails?.label || ''}
            value={getEntityFrenchGender(gender)}
          ></BaseEntityOutputContainer>
        </>
      )}
    </div>
  );
}
