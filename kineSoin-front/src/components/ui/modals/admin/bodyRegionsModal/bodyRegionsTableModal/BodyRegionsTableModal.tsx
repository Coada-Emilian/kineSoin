import { useFetchAdminBodyRegionsQuery } from '../../../../../../utils/hooks/admin/fetch/useFetchAdminBodyRegionsQuery';
import DNALoader from '../../../../DNALoader';
import BodyRegionsTableBody from './BodyRegionsTableBody';

export default function BodyRegionsTableModal() {
  const {
    data: bodyRegions = [],
    isPending: bodyRegionsFetchIsPending,
    error: bodyRegionFetchError,
  } = useFetchAdminBodyRegionsQuery();

  if (bodyRegionsFetchIsPending) {
    return DNALoader();
  }

  return (
    <div className="w-full flex flex-col gap-6 items-end overflow-x-auto mx-auto max-h-[450px] md:max-h-[600px]">
      {bodyRegionFetchError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 w-full">
          <p className="text-center text-red-600 text-sm">
            {bodyRegionFetchError.message}
          </p>
        </div>
      )}

      <table className="w-full md:w-11/12 mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-5 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs md:text-sm">
              #id
            </th>

            <th className="px-5 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs md:text-sm">
              Nom région
            </th>

            <th className="px-5 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs md:text-sm">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="xxs:text-xs xs:text-xs md:text-sm bg-gray-50 text-gray-700 text-sm font-medium">
          <BodyRegionsTableBody bodyRegions={bodyRegions}  />
        </tbody>
      </table>
    </div>
  );
}
