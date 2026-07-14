import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import type { PatientsTableHeadProps } from '../../../../../@types/props/therapistProps';

export default function PatientsTableHead({
  onSort,
  sortBy,
  sortOrder,
}: PatientsTableHeadProps) {
  const baseClassName =
    'border-b border-slate-200 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-600 md:text-sm ';

  const buttonClassName =
    'flex items-center gap-2 transition hover:text-teal-600 text-center justify-center cursor-pointer uppercase tracking-wide text-slate-600 font-semibold text-sm w-full';

  const getSortIcon = (column: 'patient' | 'status' | 'therapist') => {
    if (sortBy !== column) {
      return <ChevronsUpDown className="h-4 w-4 opacity-60" />;
    }

    return sortOrder === 'asc' ? (
      <ChevronUp className="h-4 w-4 " />
    ) : (
      <ChevronDown className="h-4 w-4 " />
    );
  };

  return (
    <thead>
      <tr className="bg-linear-to-r from-teal-50 to-white">
        <>
          <th className={`${baseClassName}`}>
            <button
              onClick={() => onSort('patient')}
              className={`${buttonClassName}`}
            >
              Patient
              {getSortIcon('patient')}
            </button>
          </th>

          <th className={`${baseClassName}`}>
            {' '}
            <button
              onClick={() => onSort('status')}
              className={`${buttonClassName}`}
            >
              Statut
              {getSortIcon('status')}
            </button>
          </th>

          <th className={`${baseClassName}`}>
            {' '}
            <button
              onClick={() => onSort('therapist')}
              className={`${buttonClassName}`}
            >
              Thérapeute
              {getSortIcon('therapist')}
            </button>
          </th>

          <th className={`${baseClassName}`}>Dernier rendez-vous</th>

          <th className={`${baseClassName} col-span-4`}>Actions</th>
        </>
      </tr>
    </thead>
  );
}
