import type { IPatientsTableRowData } from '../../../../@types/interfaces/therapistInterfaces';
import PatientsTableBody from './table/PatientsTableBody';
import PatientsTableHead from './table/PatientsTableHead';

export default function PatientsTable({
  allPatients,
  sortBy,
  sortOrder,
  onSort,
}: {
  allPatients: IPatientsTableRowData[];
  sortBy: 'patient' | 'status' | 'therapist';
  sortOrder: 'asc' | 'desc';
  onSort: (sortBy: 'patient' | 'status' | 'therapist') => void;
}) {
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
