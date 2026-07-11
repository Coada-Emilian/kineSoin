import type { IPatientsTableRowData } from '../../../../@types/interfaces/therapistInterfaces';
import PatientsTableBody from './table/PatientsTableBody';
import PatientsTableHead from './table/PatientsTableHead';

export default function PatientsTable({
  allPatients,
}: {
  allPatients: IPatientsTableRowData[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 text-xxs md:text-base">
        <PatientsTableHead />

        <PatientsTableBody patients={allPatients} />
      </table>
    </div>
  );
}
