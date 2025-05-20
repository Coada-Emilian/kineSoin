/**
 * @function RegionTableBody
 *
 * A component that renders a list of body regions in a table.
 * Each row represents a body region and contains information about the region's ID and name.
 * The last row of the table has rounded corners.
 * A delete button is included in each row, allowing the user to trigger a deletion action for that specific region.
 * The delete button opens a modal for confirming the deletion.
 *
 * @param allBodyRegions - A list of body regions to be displayed in the table.
 *
 * @returns {JSX.Element} - A table row for each body region with its information and a delete button.
 *
 * @example
 * <RegionTableBody allBodyRegions={regions} />
 *
 * @remarks
 * - Uses `useAdminTableGlobalContext` to access the `openDeleteModal` function for handling delete actions.
 * - The delete button icon triggers the modal with the selected region data.
 * - The table rows alternate background colors for better readability.
 */

import { Button } from '@headlessui/react';
import { IBodyRegion } from '../../../../../../../@types/interfaces/modelInterfaces';
import { useAdminTableGlobalContext } from '../../../../../../../utils/contexts/AdminTableGlobalContext';
import deleteIcon from '/icons/delete.png';

interface RegionTableBodyProps {
  allBodyRegions: IBodyRegion[];
}

export default function RegionTableBody({
  allBodyRegions,
}: RegionTableBodyProps) {
  // Get the openDeleteModal function from the context
  const { openDeleteModal } = useAdminTableGlobalContext();

  // Map over all the body regions and render them in a table row
  return allBodyRegions.map((region: IBodyRegion, index: number) => {
    const isLastRow = index === allBodyRegions.length - 1;
    return (
      <tr
        key={region.id}
        className="odd:bg-white even:bg-gray-50 text-xs md:text-md h-fit"
      >
        <td
          className={`border border-gray-300 p-2 text-center ${
            isLastRow ? 'rounded-bl-2xl' : ''
          }`}
        >
          {region.id}
        </td>

        <td className="border border-gray-300 px-4 py-1 text-center">
          {region.name}
        </td>

        <td
          className={`border border-gray-300 px-4 py-1 text-center ${
            isLastRow ? 'rounded-br-2xl' : ''
          }`}
        >
          <Button className="w-12">
            <img
              src={deleteIcon}
              alt="delete"
              className="w-4 h-4 mx-auto md:w-6 md:h-6"
              onClick={() => {
                openDeleteModal(region, true);
              }}
            />
          </Button>
        </td>
      </tr>
    );
  });
}
