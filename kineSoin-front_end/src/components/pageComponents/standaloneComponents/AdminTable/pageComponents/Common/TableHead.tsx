/**
 * @file TableHead.tsx
 * @description A React functional component that renders the header of a table displaying various entities such as therapists, patients, afflictions, medics, and insurances. It adjusts the header content and styles based on the provided data and the current window width.
 *
 * @param {Object} props - The props for the TableHead component.
 * @param {number} props.windowWidth - The current window width, used to adjust styles and layout.
 * @param {ITherapist[]} [props.allTherapists] - An optional array of all therapists. If present, the header will include a column for "Nom kiné."
 * @param {IPatient[]} [props.allPatients] - An optional array of all patients. If present, the header will include a column for "Nom patient."
 * @param {IAffliction[]} [props.allAfflictions] - An optional array of all afflictions. If present, the header will include a column for "Nom affliction" and "Region concernée."
 * @param {IMedic[]} [props.allMedics] - An optional array of all medics. If present, the header will include a column for "Nom médecin" and "Code ADELI."
 * @param {IInsurance[]} [props.allInsurances] - An optional array of all insurances. If present, the header will include a column for "Nom organisme" and "Code AMC."
 *
 * @returns {JSX.Element} The rendered table head containing the column headers based on the available data.
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
