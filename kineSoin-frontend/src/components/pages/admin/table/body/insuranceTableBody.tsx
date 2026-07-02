import type { IInsurance } from '../../../../../@types/interfaces/modelInterfaces';
import type { AdminInsuranceTableBodyProps } from '../../../../../@types/props/adminProps';
import { useAdminContext } from '../../../../../hooks/context/useAdminContext';
import AdminDeleteButton from '../ui/AdminDeleteButton';
import AdminEditButton from '../ui/AdminEditButton';
import TableCell from '../ui/TableCell';

export default function InsuranceTableBody({
  renderedInsurances,
}: AdminInsuranceTableBodyProps) {
  const { openDeleteModal } = useAdminContext();

  return renderedInsurances.map((insurance: IInsurance) => {
    return (
      <tr key={insurance.id} className="odd:bg-white even:bg-gray-50">
        <TableCell> {insurance.id}</TableCell>

        <TableCell> {insurance.name}</TableCell>

        <TableCell> {insurance.amc_code}</TableCell>

        <TableCell>
          <AdminEditButton link={`/admin/insurances/${insurance.id}`} />
        </TableCell>

        <TableCell>
          <AdminDeleteButton onDelete={() => openDeleteModal(insurance)} />
        </TableCell>
      </tr>
    );
  });
}
