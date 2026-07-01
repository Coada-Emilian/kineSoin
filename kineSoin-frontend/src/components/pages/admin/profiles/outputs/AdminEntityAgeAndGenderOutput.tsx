import type { AdminEntityAgeAndGenderOutputProps } from '../../../../../@types/props/adminProps';
import { getEntityFrenchGender } from '../../../../../utils/functions/admin/adminEntityProfile/getEntityFrenchGender';
import AdminEntityProfileOutput from '../AdminEntityProfileOutput';

export default function AdminEntityAgeAndGenderOutput({
  age,
  gender,
}: AdminEntityAgeAndGenderOutputProps) {
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
