import type { PatientsTableProps } from '../../../../@types/props/therapistProps';
import PatientsTableBody from './table/PatientsTableBody';
import PatientsTableHead from './table/PatientsTableHead';

export default function PatientsTable({
  allPatients,
  sortBy,
  sortOrder,
  onSort,
}: PatientsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 text-xxs md:text-base">
        <PatientsTableHead
          onSort={onSort}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />

        <PatientsTableBody patients={allPatients} />
      </table>
    </div>
  );
}
