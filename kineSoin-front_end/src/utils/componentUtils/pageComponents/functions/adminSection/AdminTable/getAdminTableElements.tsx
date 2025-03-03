import AfflictionsStatusButtons from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/pageComponents/Affliction/new_components/AfflictionsStatusButtons';
import PatientsStatusButtons from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/pageComponents/Patients/new_components/PatientsStatusButtons';
import TherapistsStatusButtons from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/pageComponents/Therapists/new_components/TherapistsStatusButtons';

interface FunctionProps {
  setTherapistStatus: React.Dispatch<React.SetStateAction<string>>;
  setPatientStatus: React.Dispatch<React.SetStateAction<string>>;
  setAfflictionStatus: React.Dispatch<React.SetStateAction<string>>;
  therapistStatus: string;
  patientStatus: string;
  afflictionStatus: string;
}

export const getAdminTableElements = ({
  setTherapistStatus,
  setPatientStatus,
  setAfflictionStatus,
  therapistStatus,
  patientStatus,
  afflictionStatus,
}: FunctionProps) => [
  {
    entityType: 'therapist',
    statusButtons: <TherapistsStatusButtons setStatus={setTherapistStatus} />,
    customBtnText: 'Ajouter un kiné',
    modalName: 'addTherapistP1',
    tableTitle: 'Tous les kinésithérapeutes',
    entityStatus: therapistStatus,
    secondTableHeadContent: 'Nom kiné',
    thirdTableHeadContent: 'Statut',
  },
  {
    entityType: 'patient',
    statusButtons: <PatientsStatusButtons setStatus={setPatientStatus} />,
    tableTitle: 'Tous les patients',
    entityStatus: patientStatus,
    secondTableHeadContent: 'Nom patient',
    thirdTableHeadContent: 'Statut',
  },
  {
    entityType: 'affliction',
    statusButtons: <AfflictionsStatusButtons setStatus={setAfflictionStatus} />,
    customBtnText: 'Ajouter une affliction',
    BaseModalName: 'region',
    regionButton: true,
    tableTitle: 'Toutes les afflictions',
    entityStatus: afflictionStatus,
    secondTableHeadContent: 'Nom affliction',
    thirdTableHeadContent: 'Region concernée',
    fourthTableHeadContent: 'Cotation',
  },
  {
    entityType: 'medic',
    customBtnText: 'Ajouter un médecin',
    modalName: 'addMedic',
    tableTitle: 'Tous les médecins',
    secondTableHeadContent: 'Nom médecin',
    thirdTableHeadContent: 'Code ADELI',
  },
  {
    entityType: 'insurance',
    customBtnText: 'Ajouter une assurance',
    modalName: 'addInsurance',
    tableTitle: 'Toutes les assurances',
    secondTableHeadContent: 'Nom organisme',
    thirdTableHeadContent: 'Code AMC',
  },
  {
    entityType: 'region',
    customBtnText: 'Ajouter une region',
    modalName: 'addRegion',
    tableTitle: 'Toutes les regions',
    secondTableHeadContent: 'Nom region',
  },
];
