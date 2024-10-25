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
    <h2 className="text-center text-2xl font-semibold mb-4 md:text-left mb: ml-10">
      {allTherapists &&
        (therapistStatus === 'all'
          ? 'Tous les kinésithérapeutes'
          : therapistStatus === 'active'
            ? 'Kinésithérapeutes actifs'
            : therapistStatus === 'inactive'
              ? 'Kinésithérapeutes inactifs'
              : '')}
      {allPatients &&
        (patientStatus === 'all'
          ? 'Tous les patients'
          : patientStatus === 'active'
            ? 'Patients actifs'
            : patientStatus === 'inactive'
              ? 'Patients inactifs'
              : patientStatus === 'banned'
                ? 'Patients bannis'
                : patientStatus === 'pending'
                  ? 'Patients en attente'
                  : '')}
      {allAfflictions &&
        (afflictionStatus === 'all'
          ? 'Toutes les afflictions'
          : afflictionStatus === 'operated'
            ? 'Afflictions opérées'
            : afflictionStatus === 'non-operated'
              ? 'Afflictions non opérées'
              : '')}
      {allMedics && 'Tous les médecins'}
      {allInsurances && "Toutes les organismes d'assurance"}
    </h2>
  );
}
