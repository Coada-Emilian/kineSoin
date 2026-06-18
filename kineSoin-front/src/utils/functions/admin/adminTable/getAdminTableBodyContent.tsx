import type {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../@types/interfaces/modelInterfaces';
import type { TableBodyProps } from '../../../../@types/props/customProps';
import AfflictionTableBody from '../../../../components/pages/admin/table/body/afflictionTableBody';
import InsuranceTableBody from '../../../../components/pages/admin/table/body/insuranceTableBody';
import MedicTableBody from '../../../../components/pages/admin/table/body/medicTableBody';
import PatientTableBody from '../../../../components/pages/admin/table/body/patientTableBody';
import TherapistTableBody from '../../../../components/pages/admin/table/body/therapistTableBody';

export const getAdminTableBodyContent = ({
  renderedEntities,
}: TableBodyProps) => [
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
