// Purpose: The purpose of this component is to render the title of the table in the admin section.

import { IAffliction } from '../../../../../../@types/IAffliction';
import { IInsurance } from '../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../@types/IMedic';
import { IPatient } from '../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../@types/ITherapist';

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
  return (
    <h2 className="text-center text-2xl font-semibold mb-4 md:text-left ml-10">
      {allTherapists &&
        (therapistStatus === 'all'
          ? 'Tous les kinésithérapeutes'
          : therapistStatus === 'active'
            ? 'Tous les kinésithérapeutes actifs'
            : therapistStatus === 'inactive'
              ? 'Tous les kinésithérapeutes inactifs'
              : '')}

      {allPatients &&
        (patientStatus === 'all'
          ? 'Tous les patients'
          : patientStatus === 'active'
            ? 'Tous les patients actifs'
            : patientStatus === 'inactive'
              ? 'Tous les patients inactifs'
              : patientStatus === 'banned'
                ? 'Tous les patients bannis'
                : patientStatus === 'pending'
                  ? 'Tous les patients en attente'
                  : '')}

      {allAfflictions &&
        (afflictionStatus === 'all'
          ? 'Toutes les afflictions'
          : afflictionStatus === 'operated'
            ? 'Toutes les afflictions opérées'
            : afflictionStatus === 'non-operated'
              ? 'Toutes les afflictions non opérées'
              : '')}

      {allMedics && 'Tous les médecins'}

      {allInsurances && "Tous les organismes d'assurance"}
    </h2>
  );
}
