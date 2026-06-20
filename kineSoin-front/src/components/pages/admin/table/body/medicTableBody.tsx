import type { IMedic } from '../../../../../@types/interfaces/modelInterfaces';
import type { MedicTableBodyProps } from '../../../../../@types/props/customProps';
import { useAdminContext } from '../../../../../contexts/AdminContext/useAdminContext';
import AdminDeleteButton from '../ui/AdminDeleteButton';
import AdminEditButton from '../ui/AdminEditButton';
import TableCell from '../ui/TableCell';

export default function MedicTableBodyRefactor({
  renderedMedics,
}: MedicTableBodyProps) {
  // Get the openDeleteModal function from the context
  const { openDeleteModal } = useAdminContext();

  return renderedMedics.map((medic: IMedic) => {
    return (
      <tr key={medic.id} className="odd:bg-white even:bg-gray-50">
        <TableCell> {medic.id}</TableCell>

        <TableCell> {medic.fullName}</TableCell>

        <TableCell> {medic.licence_code}</TableCell>

        <TableCell>
          <AdminEditButton link={`/admin/medics/${medic.id}`} />
        </TableCell>

        <TableCell>
          <AdminDeleteButton onDelete={() => openDeleteModal(medic)} />
        </TableCell>
      </tr>
    );
  });
}
