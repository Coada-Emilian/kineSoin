// Purpose: The purpose of this component is to render the table title of the admin table.

import {
  IAffliction,
  IBodyRegion,
  IMedic,
  IInsurance,
  IPatient,
  ITherapist,
} from '../../../../../../@types/types';

interface TableHeadProps {
  windowWidth: number;
  allTherapists?: ITherapist[];
  allPatients?: IPatient[];
  allAfflictions?: IAffliction[];
  allMedics?: IMedic[];
  allInsurances?: IInsurance[];
  allBodyRegions?: IBodyRegion[];
}

export default function TableHead({
  windowWidth,
  allTherapists,
  allPatients,
  allAfflictions,
  allMedics,
  allInsurances,
  allBodyRegions,
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
            {allBodyRegions && 'Nom région'}
          </th>

          {(allTherapists ||
            allPatients ||
            allAfflictions ||
            allMedics ||
            allInsurances) && (
            <th className="border border-gray-300 px-4 py-2 text-center">
              {allTherapists ? 'Statut' : allPatients && 'Statut'}
              {allAfflictions && 'Region concernée'}
              {allMedics && 'Code ADELI'}
              {allInsurances && 'Code AMC'}
            </th>
          )}

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
