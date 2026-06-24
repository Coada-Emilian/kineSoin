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
    <div className=" flex flex-col gap-6 items-end md:mx-2 md:py-5 overflow-x-auto mx-auto max-h-[450px] md:max-h-[600px">
      {bodyRegionFetchError && (
        <p className="text-red-500 text-xs text-center">
          {bodyRegionFetchError.message}
        </p>
      )}

      <table className="border-separate border border-gray-300 w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-2xl shadow-2xl">
        <thead className="bg-gray-100 xxs:text-xs text-sm md:text-base">
          <tr>
            <>
              <th className="border border-gray-300 px-4 py-2 text-center rounded-tl-2xl w-1/12">
                #id
              </th>

              <th className="border border-gray-300 px-4 py-2 text-center">
                Nom région
              </th>

              <th
                className="border border-gray-300 px-4 py-2 text-center rounded-tr-2xl"
                colSpan={2}
              >
                Action
              </th>
            </>
          </tr>
        </thead>
        <tbody>
          <BodyRegionsTableBody bodyRegions={bodyRegions} />
        </tbody>
      </table>
    </div>
  );
}
