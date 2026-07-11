import { useFetchAdminBodyRegionsQuery } from '../../../../../../hooks/admin/queries/useFetchAdminBodyRegionsQuery';
import DNALoader from '../../../../DNALoader';
import BodyRegionsTableBody from './BodyRegionsTableBody';

export default function BodyRegionsTableModal() {
  const {
    data: bodyRegions = [],
    isPending: bodyRegionsFetchIsPending,
    error: bodyRegionFetchError,
  } = useFetchAdminBodyRegionsQuery(true);

  if (bodyRegionsFetchIsPending) {
    return DNALoader();
  }

  return (
    <div className="w-full flex flex-col gap-6 items-end overflow-x-auto mx-auto max-h-122.5 md:max-h-150">
      {bodyRegionFetchError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 w-full">
          <p className="text-center text-red-600 text-sm">
            {bodyRegionFetchError.message}
          </p>
        </div>
      )}

      <table className="w-full md:w-11/12 mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <thead className="bg-gray-50 border-b border-gray-200 text-center uppercase text-xxs md:text-xs">
          <tr>
            <th className="px-5 py-3  font-semibold text-gray-600  tracking-wide ">
              #id
            </th>

            <th className="px-5 py-3  font-semibold text-gray-600  tracking-wide ">
              Région
            </th>

            <th className="px-5 py-3  font-semibold text-gray-600  tracking-wide ">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="bg-gray-50 text-gray-700 font-medium">
          <BodyRegionsTableBody bodyRegions={bodyRegions} />
        </tbody>
      </table>
    </div>
  );
}
