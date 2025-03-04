import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardInterfaces';
import AfflictionTableBodyRefactor from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/pageComponents/Affliction/new_components/AfflictionTableBodyRefactor';
import InsuranceTableBodyRefactor from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/pageComponents/Insurances/new_components/InsuranceTableBodyRefactor';
import MedicTableBodyRefactor from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/pageComponents/Medics/new_components/MedicTableBodyRefactor';
import PatientTableBodyRefactor from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/pageComponents/Patients/new_components/PatientTableBodyRefactor';
import TherapistTableBodyRefactor from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/pageComponents/Therapists/new_components/TherapistTableBodyRefactor';

interface FunctionProps {
  renderedEntities:
    | ITherapist[]
    | IPatient[]
    | IAffliction[]
    | IMedic[]
    | IInsurance[];
}
export const getAdminEntityTableBodies = ({
  renderedEntities,
  // openDeleteModal,
}: FunctionProps) => [
  {
    entityType: 'therapist',
    component: (
      <TherapistTableBodyRefactor
        renderedTherapists={renderedEntities as ITherapist[]}
      />
    ),
  },
  {
    entityType: 'patient',
    component: (
      <PatientTableBodyRefactor
        renderedPatients={renderedEntities as IPatient[]}
      />
    ),
  },
  {
    entityType: 'affliction',
    component: (
      <AfflictionTableBodyRefactor
        renderedAfflictions={renderedEntities as IAffliction[]}
      />
    ),
  },
  {
    entityType: 'medic',
    component: (
      <MedicTableBodyRefactor renderedMedics={renderedEntities as IMedic[]} />
    ),
  },
  {
    entityType: 'insurance',
    component: (
      <InsuranceTableBodyRefactor
        renderedInsurances={renderedEntities as IInsurance[]}
      />
    ),
  },
];
