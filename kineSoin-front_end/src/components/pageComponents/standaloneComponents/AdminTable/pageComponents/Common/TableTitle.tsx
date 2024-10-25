/**
 * @file TableTitle.tsx
 * @description A component that renders a dynamic table title based on the provided
 * therapist, patient, affliction, medic, and insurance data. The title reflects the
 * current status of the selected entities, such as active or inactive therapists or patients.
 *
 * @interface TableTitleProps
 * @param {ITherapist[]} [allTherapists] - An optional array of therapists.
 * @param {IPatient[]} [allPatients] - An optional array of patients.
 * @param {IAffliction[]} [allAfflictions] - An optional array of afflictions.
 * @param {IMedic[]} [allMedics] - An optional array of medics.
 * @param {IInsurance[]} [allInsurances] - An optional array of insurances.
 * @param {string} [therapistStatus] - An optional string representing the status of therapists
 * ('all', 'active', 'inactive').
 * @param {string} [patientStatus] - An optional string representing the status of patients
 * ('all', 'active', 'inactive', 'banned', 'pending').
 * @param {string} [afflictionStatus] - An optional string representing the status of afflictions
 * ('all', 'operated', 'non-operated').
 *
 * @returns {JSX.Element} The rendered TableTitle component displaying a title based
 * on the current status of the therapists, patients, afflictions, medics,
 * and insurances.
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
