import type { IPatientDetailsDto } from '../../../../../@types/interfaces/therapistInterfaces';
import EntityAddressOutput from '../../../outputs/EntityAddressOutput';
import EntityEmailOutput from '../../../outputs/EntityEmailOutput';
import EntityTelephoneNumberOutput from '../../../outputs/EntityTelephoneNumberOutput';

export default function PatientCoordinatesSection({
  patient,
}: {
  patient: IPatientDetailsDto | undefined;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-100 p-6">
      <div className="font-semibold text-teal-400 text-xl flex px-2">
        <p>Coordonnées</p>
      </div>

      <div className="flex flex-1 flex-col divide-y divide-slate-100">
        <div className="py-4">
          <EntityAddressOutput
            city={patient?.city}
            postal_code={patient?.postal_code}
            street_name={patient?.street_name}
            street_number={patient?.street_number}
            isVertical
          />
        </div>

        <div className="py-4">
          <EntityTelephoneNumberOutput
            prefix={patient?.prefix}
            phone_number={patient?.phone_number}
            isVertical
          />
        </div>

        <div className="py-4">
          <EntityEmailOutput email={patient?.email} isVertical />
        </div>
      </div>
    </div>
  );
}
