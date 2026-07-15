import type { ISameDayAppointment } from '../../../../../@types/interfaces/therapistInterfaces';
import EntityAfflictionOutput from '../../../outputs/EntityAfflictionOutput';
import EntityBodyRegionOutput from '../../../outputs/EntityBodyRegionOutput';
import EntityDateOutput from '../../../outputs/EntityDateOutput';
import EntityHomeCareOutput from '../../../outputs/EntityHomeCareOutput';
import EntityMedicOutput from '../../../outputs/EntityMedicOutput';
import EntityPatientOutput from '../../../outputs/EntityPatientOutput';

export default function PrescriptionDetailsOutputs({
  prescription,
}: {
  prescription: ISameDayAppointment['prescription'];
}) {
  return (
    <>
      <EntityDateOutput date={prescription.date} />

      <EntityPatientOutput patient={prescription.patient} />

      <EntityMedicOutput medic={prescription.medic} />

      <EntityAfflictionOutput affliction={prescription.affliction} />

      <EntityBodyRegionOutput
        bodyRegionName={prescription.affliction.body_region?.name}
      />

      <EntityHomeCareOutput at_home_care={prescription.at_home_care} />
    </>
  );
}
