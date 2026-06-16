export default function DayTableHead() {
  const baseClassName = 'border border-gray-300 p-1 md:p-2 text-center';
  return (
    <thead className="bg-gray-100 ">
      <tr>
        <>
          <th className={`${baseClassName} w-1/12 rounded-tl-2xl`}>Heure</th>

          <th className={`${baseClassName}`}>Patient</th>

          <th className={`${baseClassName}`}>Affliction</th>

          <th className={`${baseClassName} md:p-2 w-fit`}>
            <span className="block md:hidden">Message</span>
            <span className="hidden md:block">Envoyer un message</span>
          </th>

          <th className={`${baseClassName} md:p-2 rounded-tr-2xl`}>
            <span className="block md:hidden">Annuler</span>
            <span className="hidden md:block">Annuler RDV</span>
          </th>
        </>
      </tr>
    </thead>
  );
}
