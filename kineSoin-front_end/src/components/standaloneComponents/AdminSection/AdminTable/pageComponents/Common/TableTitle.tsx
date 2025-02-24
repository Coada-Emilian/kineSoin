// Purpose: The purpose of this component is to render the title of the table in the admin section.

import {
  ITherapist,
  IPatient,
  IAffliction,
  IMedic,
  IInsurance,
} from '../../../../../../@types/types';

interface TableTitleProps {
  allTherapists?: ITherapist[];
  allPatients?: IPatient[];
  allAfflictions?: IAffliction[];
  allMedics?: IMedic[];
  allInsurances?: IInsurance[];
  therapistStatus?: string;
  patientStatus?: string;
  afflictionStatus?: string;
}

export default function TableTitle({
  allTherapists,
  allPatients,
  allAfflictions,
  allMedics,
  allInsurances,
  therapistStatus,
  patientStatus,
  afflictionStatus,
}: TableTitleProps) {
  const getContent = () => {
    if (allTherapists) {
      return therapistStatus === 'all'
        ? 'Tous les kinésithérapeutes'
        : therapistStatus === 'active'
          ? 'Tous les kinésithérapeutes actifs'
          : therapistStatus === 'inactive'
            ? 'Tous les kinésithérapeutes inactifs'
            : '';
    }

    if (allPatients) {
      return patientStatus === 'all'
        ? 'Tous les patients'
        : patientStatus === 'active'
          ? 'Tous les patients actifs'
          : patientStatus === 'inactive'
            ? 'Tous les patients inactifs'
            : patientStatus === 'banned'
              ? 'Tous les patients bannis'
              : patientStatus === 'pending'
                ? 'Tous les patients en attente'
                : '';
    }

    if (allAfflictions) {
      return afflictionStatus === 'all'
        ? 'Toutes les afflictions'
        : afflictionStatus === 'operated'
          ? 'Toutes les afflictions opérées'
          : afflictionStatus === 'non-operated'
            ? 'Toutes les afflictions non-opérées'
            : '';
    }

    if (allMedics) {
      return 'Tous les médecins';
    }

    if (allInsurances) {
      return "Tous les organismes d'assurance";
    }

    return '';
  };

  return (
    <h2 className="text-center md:text-2xl font-semibold mb-4 md:text-left ml-10">
      {getContent()}
    </h2>
  );
}
