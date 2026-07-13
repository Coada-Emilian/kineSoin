export default function PatientsTableHead() {
  const baseClassName =
    'border-b border-slate-200 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-600 md:text-sm';

  return (
    <thead>
      <tr className="bg-linear-to-r from-teal-50 to-white">
        <>
          <th className={`${baseClassName} md:p-2 w-fit`}>
            <span className="block">Patient</span>
          </th>

          <th className={`${baseClassName}`}>Statut</th>

          <th className={`${baseClassName}`}>Thérapeute</th>

          <th className={`${baseClassName}`}>Dernier rendez-vous</th>

          <th className={`${baseClassName} col-span-4`}>Actions</th>
        </>
      </tr>
    </thead>
  );
}
