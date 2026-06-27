import type { GetAdminTableDetailsFunctionProps } from '../../../../@types/props/functionProps';
import AfflictionsStatusButtons from '../../../../components/pages/admin/table/statusButtons/AfflictionStatusButtons';
import PatientsStatusButtons from '../../../../components/pages/admin/table/statusButtons/PatientStatusButtons';
import TherapistsStatusButtons from '../../../../components/pages/admin/table/statusButtons/TherapistStatusButtons';

export const getAdminTableDetails = ({
  entityStatus,
  setEntityStatus,
}: GetAdminTableDetailsFunctionProps) => [
  {
    entityType: 'therapist',
    statusButtons: <TherapistsStatusButtons setStatus={setEntityStatus} />,
    customBtnText: 'Ajouter kiné',
    modalName: 'addTherapistP1',
    tableTitle: 'Tous les kinésithérapeutes',
    entityStatus: entityStatus,
    secondTableHeadContent: 'Nom kiné',
    thirdTableHeadContent: 'Statut',
  },
  {
    entityType: 'patient',
    statusButtons: <PatientsStatusButtons setStatus={setEntityStatus} />,
    tableTitle: 'Tous les patients',
    entityStatus: entityStatus,
    secondTableHeadContent: 'Nom patient',
    thirdTableHeadContent: 'Statut',
  },
  {
    entityType: 'affliction',
    statusButtons: <AfflictionsStatusButtons setStatus={setEntityStatus} />,
    customBtnText: 'Ajouter affliction',
    modalName: 'addAffliction',
    regionButton: true,
    tableTitle: 'Toutes les afflictions',
    entityStatus: entityStatus,
    secondTableHeadContent: 'Nom affliction',
    thirdTableHeadContent: 'Region concernée',
    fourthTableHeadContent: 'Cotation',
  },
  {
    entityType: 'medic',
    customBtnText: 'Ajouter médecin',
    modalName: 'addMedic',
    tableTitle: 'Tous les médecins',
    secondTableHeadContent: 'Nom médecin',
    thirdTableHeadContent: 'Code ADELI',
  },
  {
    entityType: 'insurance',
    customBtnText: 'Ajouter assurance',
    modalName: 'addInsurance',
    tableTitle: 'Toutes les assurances',
    secondTableHeadContent: 'Nom organisme',
    thirdTableHeadContent: 'Code AMC',
  },
  {
    entityType: 'region',
    customBtnText: 'Ajouter region',
    modalName: 'addRegion',
    tableTitle: 'Toutes les regions',
    secondTableHeadContent: 'Nom region',
  },
];
