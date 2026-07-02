import type { IPatient } from '../../../../../@types/interfaces/modelInterfaces';
import type { AdminPatientTableBodyProps } from '../../../../../@types/props/adminProps';
import { useAdminContext } from '../../../../../hooks/context/useAdminContext';
import AdminDeleteButton from '../ui/AdminDeleteButton';
import AdminEditButton from '../ui/AdminEditButton';
import AdminStatusButton from '../ui/AdminStatusButton';
import TableCell from '../ui/TableCell';

export default function PatientTableBody({
  renderedPatients,
}: AdminPatientTableBodyProps) {
  // Get the openDeleteModal function from the context
  const { openDeleteModal } = useAdminContext();

  return renderedPatients.map((patient: IPatient) => {
    return (
      <tr key={patient.id} className="odd:bg-white even:bg-gray-50">
        <TableCell> {patient.id}</TableCell>

        <TableCell>{patient.fullName}</TableCell>

        <td className="border border-gray-300 text-center p-0">
          <AdminStatusButton status={patient.status}></AdminStatusButton>
        </td>

        <TableCell>
          <AdminEditButton
            link={`/admin/patients/${patient.id}`}
          ></AdminEditButton>
        </TableCell>

        <TableCell>
          <AdminDeleteButton onDelete={() => openDeleteModal(patient)} />
        </TableCell>
      </tr>
    );
  });
}
