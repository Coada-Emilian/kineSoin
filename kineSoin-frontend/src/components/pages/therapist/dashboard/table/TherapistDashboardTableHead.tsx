export default function TherapistDashboardTableHead() {
  const baseClassName =
    'border-b border-slate-200 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-600 md:text-sm';
  return (
    <thead>
      <tr className="bg-linear-to-r from-teal-50 to-white">
        <>
          <th className={`${baseClassName} w-1/12`}>Heure</th>

          <th className={`${baseClassName}`}>Patient</th>

          <th className={`${baseClassName} `}>Affliction</th>

          <th className={`${baseClassName} md:p-2 w-fit`}>
            <span className="block md:hidden">Message</span>
            <span className="hidden md:block">Envoyer un message</span>
          </th>

          <th className={`${baseClassName} md:p-2`}>
            <span className="block md:hidden">Annuler</span>
            <span className="hidden md:block">Annuler RDV</span>
          </th>
        </>
      </tr>
    </thead>
  );
}
