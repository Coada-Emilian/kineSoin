/**
 * @file TableHead.tsx
 * @description A component that renders the header of a table dynamically based on the
 * provided therapist, patient, affliction, medic, and insurance data. The header adjusts
 * its columns based on the entities present and the window width for responsive design.
 *
 * @interface TableHeadProps
 * @param {number} windowWidth - The current width of the window, used to adjust the
 * styling and font size of the table header.
 * @param {ITherapist[]} [allTherapists] - An optional array of therapists to determine
 * the presence of therapist-related columns in the table.
 * @param {IPatient[]} [allPatients] - An optional array of patients to determine the
 * presence of patient-related columns in the table.
 * @param {IAffliction[]} [allAfflictions] - An optional array of afflictions to determine
 * the presence of affliction-related columns in the table.
 * @param {IMedic[]} [allMedics] - An optional array of medics to determine the presence
 * of medic-related columns in the table.
 * @param {IInsurance[]} [allInsurances] - An optional array of insurances to determine
 * the presence of insurance-related columns in the table.
 *
 * @returns {JSX.Element} The rendered TableHead component displaying a dynamic header
 * for the table based on the provided props.
 */

import { IAffliction } from '../../../../../../@types/IAffliction';
import { IInsurance } from '../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../@types/IMedic';
import { IPatient } from '../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../@types/ITherapist';

interface TableHeadProps {
  windowWidth: number;
  allTherapists?: ITherapist[];
  allPatients?: IPatient[];
  allAfflictions?: IAffliction[];
  allMedics?: IMedic[];
  allInsurances?: IInsurance[];
}

export default function TableHead({
  windowWidth,
  allTherapists,
  allPatients,
  allAfflictions,
  allMedics,
  allInsurances,
}: TableHeadProps) {
  return (
    <thead
      className={
        windowWidth < 450
          ? 'bg-gray-100 text-xs'
          : 'bg-gray-100 text-sm md:text-base'
      }
    >
      <tr>
        <>
          <th className="border border-gray-300 px-4 py-2 text-center">#id</th>

          <th className="border border-gray-300 px-4 py-2 text-center">
            {allTherapists && 'Nom kiné'}
            {allPatients && 'Nom patient'}
            {allAfflictions && 'Nom affliction'}
            {allMedics && 'Nom médecin'}
            {allInsurances && 'Nom organisme'}
          </th>

          <th className="border border-gray-300 px-4 py-2 text-center">
            {allTherapists ? 'Statut' : allPatients && 'Statut'}
            {allAfflictions && 'Region concernée'}
            {allMedics && 'Code ADELI'}
            {allInsurances && 'Code AMC'}
          </th>

          {allAfflictions && windowWidth > 768 && (
            <th className="border border-gray-300 px-4 py-2 text-center">
              Cotation
            </th>
          )}

          <th
            className="border border-gray-300 px-4 py-2 text-center"
            colSpan={2}
          >
            Action
          </th>
        </>
      </tr>
    </thead>
  );
}
