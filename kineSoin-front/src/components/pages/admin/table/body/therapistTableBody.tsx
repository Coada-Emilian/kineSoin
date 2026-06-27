import type { ITherapist } from '../../../../../@types/interfaces/modelInterfaces';
import type { AdminTherapistTableBodyProps } from '../../../../../@types/props/adminProps';
import { useAdminContext } from '../../../../../utils/functions/contextUtils/useAdminContext';
import { useTherapistStatusChangeAsAdminMutation } from '../../../../../utils/hooks/admin/useTherapistStatusChangeAsAdminMutation';
import AdminDeleteButton from '../ui/AdminDeleteButton';
import AdminEditButton from '../ui/AdminEditButton';
import AdminStatusButton from '../ui/AdminStatusButton';
import TableCell from '../ui/TableCell';

export default function TherapistTableBody({
  renderedTherapists,
}: AdminTherapistTableBodyProps) {
  const { openDeleteModal } = useAdminContext();

  const handleTherapistStatusChange = useTherapistStatusChangeAsAdminMutation();

  return renderedTherapists.map((therapist: ITherapist) => {
    const handleTherapistStatusClick = () => {
      const changedStatus =
        therapist.status === 'active' ? 'inactive' : 'active';
      handleTherapistStatusChange.mutate({
        id: therapist.id,
        status: changedStatus,
      });
    };

    return (
      <tr
        key={therapist.id}
        className="odd:bg-white even:bg-gray-100 text-xxs xs:text-xs md:text-sm"
      >
        <TableCell>{therapist.id}</TableCell>

        <TableCell>{therapist.fullName}</TableCell>

        <td className="border border-gray-300 text-center p-0">
          <AdminStatusButton
            status={therapist.status}
            onStatusChange={handleTherapistStatusClick}
          />
        </td>

        <TableCell>
          <AdminEditButton link={`/admin/therapists/${therapist.id}`} />
        </TableCell>

        <TableCell>
          <AdminDeleteButton onDelete={() => openDeleteModal(therapist)} />
        </TableCell>
      </tr>
    );
  });
}
