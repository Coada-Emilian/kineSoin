import type { IAffliction } from '../../../../../@types/interfaces/modelInterfaces';
import type { AdminAfflictionTableBodyProps } from '../../../../../@types/props/adminProps';
import { useAdminContext } from '../../../../../hooks/context/useAdminContext';
import AdminDeleteButton from '../ui/AdminDeleteButton';
import AdminEditButton from '../ui/AdminEditButton';
import TableCell from '../ui/TableCell';

export default function AfflictionTableBody({
  renderedAfflictions,
}: AdminAfflictionTableBodyProps) {
  // Get the openDeleteModal function from the context
  const { openDeleteModal } = useAdminContext();

  return renderedAfflictions.map((affliction: IAffliction) => {
    return (
      <tr
        key={affliction.id}
        className="odd:bg-white even:bg-gray-100 text-xxs xs:text-xs md:text-sm"
      >
        <TableCell> {affliction.id}</TableCell>

        <TableCell> {affliction.name}</TableCell>

        <TableCell>{affliction.body_region?.name ?? 'N/A'}</TableCell>

        <TableCell> {affliction.insurance_code}</TableCell>

        <TableCell>
          <AdminEditButton
            link={`/admin/afflictions/${affliction.id}`}
          ></AdminEditButton>
        </TableCell>

        <TableCell>
          <AdminDeleteButton onDelete={() => openDeleteModal(affliction)} />
        </TableCell>
      </tr>
    );
  });
}
