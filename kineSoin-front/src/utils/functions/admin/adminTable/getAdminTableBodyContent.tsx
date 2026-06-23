import type {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../@types/interfaces/modelInterfaces';
import type { AdminTableBodyProps } from '../../../../@types/props/adminProps';
import AfflictionTableBody from '../../../../components/pages/admin/table/body/AfflictionTableBody';
import InsuranceTableBody from '../../../../components/pages/admin/table/body/InsuranceTableBody';
import MedicTableBody from '../../../../components/pages/admin/table/body/MedicTableBody';
import PatientTableBody from '../../../../components/pages/admin/table/body/PatientTableBody';
import TherapistTableBody from '../../../../components/pages/admin/table/body/TherapistTableBody';

export const getAdminTableBodyContent = ({
  renderedEntities,
}: AdminTableBodyProps) => [
  {
    entityType: 'therapist',
    component: (
      <TherapistTableBody
        renderedTherapists={renderedEntities as ITherapist[]}
      />
    ),
  },
  {
    entityType: 'patient',
    component: (
      <PatientTableBody renderedPatients={renderedEntities as IPatient[]} />
    ),
  },
  {
    entityType: 'affliction',
    component: (
      <AfflictionTableBody
        renderedAfflictions={renderedEntities as IAffliction[]}
      />
    ),
  },
  {
    entityType: 'medic',
    component: <MedicTableBody renderedMedics={renderedEntities as IMedic[]} />,
  },
  {
    entityType: 'insurance',
    component: (
      <InsuranceTableBody
        renderedInsurances={renderedEntities as IInsurance[]}
      />
    ),
  },
];
