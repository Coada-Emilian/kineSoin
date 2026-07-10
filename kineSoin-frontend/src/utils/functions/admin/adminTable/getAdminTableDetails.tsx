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
    tableSubtitle: 'Gérez les praticiens de votre cabinet.',
    entityStatus: entityStatus,
    secondTableHeadContent: 'Nom kiné',
    thirdTableHeadContent: 'Statut',
  },
  {
    entityType: 'patient',
    statusButtons: <PatientsStatusButtons setStatus={setEntityStatus} />,
    tableTitle: 'Tous les patients',
    tableSubtitle: 'Gérez les patients de votre cabinet.',
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
    tableSubtitle: 'Gérez les afflictions de votre cabinet.',
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
    tableSubtitle: 'Gérez les médecins de votre cabinet.',
    secondTableHeadContent: 'Nom médecin',
    thirdTableHeadContent: 'Code ADELI',
  },
  {
    entityType: 'insurance',
    customBtnText: 'Ajouter assurance',
    modalName: 'addInsurance',
    tableTitle: 'Toutes les assurances',
    tableSubtitle: 'Gérez les assurances de votre cabinet.',
    secondTableHeadContent: 'Nom organisme',
    thirdTableHeadContent: 'Code AMC',
  },
  {
    entityType: 'region',
    customBtnText: 'Ajouter region',
    modalName: 'addRegion',
    tableTitle: 'Toutes les regions',
    tableSubtitle: 'Gérez les regions de votre cabinet.',
    secondTableHeadContent: 'Nom region',
  },
];
