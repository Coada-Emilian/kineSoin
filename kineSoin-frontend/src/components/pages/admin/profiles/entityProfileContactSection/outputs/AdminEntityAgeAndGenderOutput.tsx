import type { AdminEntityAgeAndGenderOutputProps } from '../../../../../../@types/props/adminProps';
import { getEntityFrenchGender } from '../../../../../../utils/functions/admin/adminEntityProfile/getEntityFrenchGender';
import AdminEntityProfileInfoOutput from './AdminOutputContainer';
import cakeIcon from '/icons/cake.png';
import genderIcon from '/icons/equality.png';

export default function AdminEntityAgeAndGenderOutput({
  age,
  gender,
}: AdminEntityAgeAndGenderOutputProps) {
  return (
    <div className="flex justify-between">
      <AdminEntityProfileInfoOutput
        icon={cakeIcon}
        iconAlt="age"
        label="Age"
        value={age as string}
      ></AdminEntityProfileInfoOutput>

      {gender && (
        <>
          <AdminEntityProfileInfoOutput
            icon={genderIcon}
            iconAlt="genre"
            label="Genre"
            value={getEntityFrenchGender(gender)}
          ></AdminEntityProfileInfoOutput>
        </>
      )}
    </div>
  );
}
