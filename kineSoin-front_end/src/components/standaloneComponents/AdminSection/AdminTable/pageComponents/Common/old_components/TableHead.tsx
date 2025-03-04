import {
  IAffliction,
  IBodyRegion,
  IMedic,
  IInsurance,
  IPatient,
  ITherapist,
} from '../../../../../../../@types/standardInterfaces';

interface TableHeadProps {
  allTherapists?: ITherapist[];
  allPatients?: IPatient[];
  allAfflictions?: IAffliction[];
  allMedics?: IMedic[];
  allInsurances?: IInsurance[];
  allBodyRegions?: IBodyRegion[];
}

export default function TableHead({
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
  };

  const getThirdTableHeadContent = () => {
    if (allTherapists || allPatients) return 'Statut';
    if (allAfflictions) return 'Region concernée';
    if (allMedics) return 'Code ADELI';
    if (allInsurances) return 'Code AMC';
  };

  return (
    <thead className="bg-gray-100 xxs:text-xs text-sm md:text-base ">
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

          {allAfflictions && (
            <th className="border border-gray-300 px-4 py-2 text-center hidden md:table-cell  ">
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
