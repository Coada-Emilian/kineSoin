import type { EntityAgeAndGenderOutputProps } from '../../../@types/props/componentProps';
import EntityAgeOutput from './EntityAgeOutput';
import EntityGenderOutput from './EntityGenderOutput';

export default function EntityAgeAndGenderOutput({
  age,
  gender,
}: EntityAgeAndGenderOutputProps) {
  return (
    <div className="flex justify-between mb-0">
      <EntityAgeOutput age={age} />

      {gender && (
        <>
          <EntityGenderOutput gender={gender} />
        </>
      )}
    </div>
  );
}
