import type { AdminEntityAgeAndGenderProps } from '../../../../../@types/props/adminProps';
import { getEntityFrenchGender } from '../../../../../utils/functions/admin/adminEntityProfile/getEntityFrenchGender';
import AdminEntityProfileOutput from '../AdminEntityProfileOutput';

export default function AdminEntityAgeAndGender({
  age,
  gender,
}: AdminEntityAgeAndGenderProps) {
  // Function to get the French gender

  return (
    <div className="flex flex-row justify-between">
      <AdminEntityProfileOutput value={age} label="Age" isOneThirdWidth />

      {gender && (
        <AdminEntityProfileOutput
          value={getEntityFrenchGender(gender)}
          label="Genre"
          isOneThirdWidth
        />
      )}
    </div>
  );
}
