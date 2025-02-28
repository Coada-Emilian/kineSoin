import AfflictionsStatusButtons from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/pageComponents/Affliction/new_components/AfflictionsStatusButtons';
import PatientsStatusButtons from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/pageComponents/Patients/new_components/PatientsStatusButtons';
import TherapistsStatusButtons from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/pageComponents/Therapists/new_components/TherapistsStatusButtons';

interface FunctionProps {
  setTherapistStatus: React.Dispatch<React.SetStateAction<string>>;
  setPatientStatus: React.Dispatch<React.SetStateAction<string>>;
  setAfflictionStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsAddTherapistModalP1Open: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddAfflictionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddMedicModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddInsuranceModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddRegionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRegionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  therapistStatus: string;
  patientStatus: string;
  afflictionStatus: string;
}

export const getAdminTableElements = ({
  setTherapistStatus,
  setPatientStatus,
  setAfflictionStatus,
  setIsAddTherapistModalP1Open,
  setIsAddAfflictionModalOpen,
  setIsAddMedicModalOpen,
  setIsAddInsuranceModalOpen,
  setIsAddRegionModalOpen,
  setIsRegionModalOpen,
  therapistStatus,
  patientStatus,
  afflictionStatus,
}: FunctionProps) => [
  {
    entityType: 'therapist',
    statusButtons: <TherapistsStatusButtons setStatus={setTherapistStatus} />,
    customBtnText: 'Ajouter un kiné',
    setModalOpen: setIsAddTherapistModalP1Open,
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
    setModalOpen: setIsAddAfflictionModalOpen,
    regionButton: true,
    setRegionModalOpen: setIsRegionModalOpen,
    tableTitle: 'Toutes les afflictions',
    entityStatus: afflictionStatus,
    secondTableHeadContent: 'Nom affliction',
    thirdTableHeadContent: 'Region concernée',
    fourthTableHeadContent: 'Cotation',
  },
  {
    entityType: 'medic',
    customBtnText: 'Ajouter un médecin',
    setModalOpen: setIsAddMedicModalOpen,
    tableTitle: 'Tous les médecins',
    secondTableHeadContent: 'Nom médecin',
    thirdTableHeadContent: 'Code ADELI',
  },
  {
    entityType: 'insurance',
    customBtnText: 'Ajouter une assurance',
    setModalOpen: setIsAddInsuranceModalOpen,
    tableTitle: 'Toutes les assurances',
    secondTableHeadContent: 'Nom organisme',
    thirdTableHeadContent: 'Code AMC',
  },
  {
    entityType: 'region',
    customBtnText: 'Ajouter une region',
    setModalOpen: setIsAddRegionModalOpen,
    tableTitle: 'Toutes les regions',
    secondTableHeadContent: 'Nom region',
  },
];
