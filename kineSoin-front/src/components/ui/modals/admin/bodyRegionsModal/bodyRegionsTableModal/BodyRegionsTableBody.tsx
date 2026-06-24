import type { IBodyRegion } from '../../../../../../@types/interfaces/modelInterfaces';
import type { BodyRegionsTableBodyProps } from '../../../../../../@types/props/componentProps';
import { useAdminContext } from '../../../../../../utils/functions/contextUtils/useAdminContext';
import AdminDeleteButton from '../../../../../pages/admin/table/ui/AdminDeleteButton';
import TableCell from '../../../../../pages/admin/table/ui/TableCell';

export default function BodyRegionsTableBody({
  bodyRegions,
}: BodyRegionsTableBodyProps) {
  const { openDeleteModal } = useAdminContext();

  return bodyRegions.map((region: IBodyRegion) => {
    return (
      <tr
        key={region.id}
        className="odd:bg-white even:bg-gray-50 text-xs md:text-md h-fit"
      >
        <TableCell> {region.id}</TableCell>
        <TableCell> {region.name}</TableCell>
        <TableCell>
          <AdminDeleteButton onDelete={() => openDeleteModal(region)} />
        </TableCell>
      </tr>
    );
  });
}
