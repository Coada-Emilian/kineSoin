import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

export default function PatientsTableHead({
  onSort,
  sortBy,
  sortOrder,
}: {
  onSort: (sortBy: 'patient' | 'status' | 'therapist') => void;
  sortBy: 'patient' | 'status' | 'therapist';
  sortOrder: 'asc' | 'desc';
}) {
  const baseClassName =
    'border-b border-slate-200 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-600 md:text-sm ';
  const buttonClassName =
    'flex items-center gap-2 transition hover:text-teal-600 text-center justify-center cursor-pointer uppercase tracking-wide text-slate-600 font-semibold text-sm w-full';
  const getSortIcon = (column: 'patient' | 'status' | 'therapist') => {
    if (sortBy !== column) {
      return <ArrowUpDown className="h-4 w-4 opacity-60" />;
    }

    return sortOrder === 'asc' ? (
      <ArrowUp className="h-4 w-4 text-teal-600" />
    ) : (
      <ArrowDown className="h-4 w-4 text-teal-600" />
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
