import type { ITherapistPatientDetails } from '../../../../../@types/interfaces/therapistInterfaces';
import EntityAgeOutput from '../../../outputs/EntityAgeOutput';
import EntityGenderOutput from '../../../outputs/EntityGenderOutput';
import EntityIdOutput from '../../../outputs/EntityIdOutput';
import EntityStatusOutput from '../../../outputs/EntityStatusOutput';

export default function PatientDetailsHeader({
  patient,
}: {
  patient: ITherapistPatientDetails | undefined;
}) {
  return (
    <div className="grid grid-cols-4 divide-x divide-slate-100 items-center">
      <div className="px-4 flex items-center justify-center">
        <EntityIdOutput id={patient?.id ?? null} />
      </div>

      <div className="px-4 flex items-center justify-center">
        <EntityGenderOutput gender={patient?.gender} isLabelMissing />
      </div>

      <div className="px-4 flex items-center justify-center">
        <EntityAgeOutput age={patient?.age.toString()} isLabelMissing />
      </div>

      <div className="px-4 flex items-center justify-center">
        <EntityStatusOutput status={patient?.status} isLabelMissing />
      </div>
    </div>
  );
}
