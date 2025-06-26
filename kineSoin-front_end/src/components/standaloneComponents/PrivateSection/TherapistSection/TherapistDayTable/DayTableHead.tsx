export default function DayTableHead() {
  return (
    <thead className="bg-gray-100 xs:text-xs md:text-base">
      <tr className="text-xxs md:text-base ">
        <>
          <th className="border border-gray-300  p-1 md:p-2 text-center w-2/12 rounded-tl-2xl">
            Heure
          </th>

          <th className="border border-gray-300  p-1 md:p-2 text-center">
            Patient
          </th>

          <th className="border border-gray-300  p-1 md:p-2 text-center ">
            Affliction
          </th>

          <th className="border border-gray-300 text-center p-1 md:p-2 w-fit">
            <span className="block md:hidden">Message</span>
            <span className="hidden md:block">Envoyer un message</span>
          </th>

          <th className="border border-gray-300  text-center p-1 md:p-2 rounded-tr-2xl">
            <span className="block md:hidden">Annuler</span>
            <span className="hidden md:block">Annuler RDV</span>
          </th>
        </>
      </tr>
    </thead>
  );
}
