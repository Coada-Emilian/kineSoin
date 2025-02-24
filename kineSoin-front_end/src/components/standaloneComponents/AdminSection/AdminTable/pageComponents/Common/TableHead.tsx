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
  const getSecondTableHeadContent = () => {
    if (allTherapists) return 'Nom kiné';
    if (allPatients) return 'Nom patient';
    if (allAfflictions) return 'Nom affliction';
    if (allMedics) return 'Nom médecin';
    if (allInsurances) return 'Nom organisme';
    if (allBodyRegions) return 'Nom région';
    return null;
  };

  const getThirdTableHeadContent = () => {
    if (allTherapists || allPatients) return 'Statut';
    if (allAfflictions) return 'Region concernée';
    if (allMedics) return 'Code ADELI';
    if (allInsurances) return 'Code AMC';
    return null;
  };

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
            {getSecondTableHeadContent()}
          </th>

          {!allBodyRegions && (
            <th className="border border-gray-300 px-4 py-2 text-center">
              {getThirdTableHeadContent()}
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
