import { IAffliction } from '../../../../../../@types/IAffliction';
import { IMedic } from '../../../../../../@types/IMedic';
import { IPatient } from '../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../@types/ITherapist';

interface TableHeadProps {
  windowWidth: number;
  allTherapists?: ITherapist[];
  allPatients?: IPatient[];
  allAfflictions?: IAffliction[];
  allMedics?: IMedic[];
}

export default function TableHead({
  windowWidth,
  allTherapists,
  allPatients,
  allAfflictions,
  allMedics,
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
          </th>
          <th className="border border-gray-300 px-4 py-2 text-center">
            {allTherapists ? 'Statut' : allPatients && 'Statut'}
            {allAfflictions && 'Region concernée'}
            {allMedics && 'Code ADELI'}
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
