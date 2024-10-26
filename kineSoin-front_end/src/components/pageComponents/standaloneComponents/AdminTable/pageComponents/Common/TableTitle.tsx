/**
 * @file TableTitle.tsx
 * @description A React functional component that renders the title of a table based on the type of entities (therapists, patients, afflictions, medics, insurances) and their respective statuses. The title adjusts dynamically to reflect the current selection of entities.
 *
 * @param {Object} props - The props for the TableTitle component.
 * @param {ITherapist[]} [props.allTherapists] - An optional array of all therapists. If present, the title will include therapist-related text based on their status.
 * @param {IPatient[]} [props.allPatients] - An optional array of all patients. If present, the title will include patient-related text based on their status.
 * @param {IAffliction[]} [props.allAfflictions] - An optional array of all afflictions. If present, the title will include affliction-related text based on their status.
 * @param {IMedic[]} [props.allMedics] - An optional array of all medics. If present, the title will state "Tous les médecins."
 * @param {IInsurance[]} [props.allInsurances] - An optional array of all insurances. If present, the title will state "Tous les organismes d'assurance."
 * @param {string} [props.therapistStatus] - An optional status for therapists, which can determine the title text.
 * @param {string} [props.patientStatus] - An optional status for patients, which can determine the title text.
 * @param {string} [props.afflictionStatus] - An optional status for afflictions, which can determine the title text.
 *
 * @returns {JSX.Element} The rendered table title displaying relevant information based on the props provided.
 */

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

      {allInsurances && "Tous les organismes d'assurance"}
    </h2>
  );
}
