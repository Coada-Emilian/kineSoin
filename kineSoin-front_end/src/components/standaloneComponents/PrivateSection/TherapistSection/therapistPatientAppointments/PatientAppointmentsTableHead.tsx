export default function PatientAppointmentsTableHead() {
  return (
    <thead className="bg-gray-100 xs:text-xs md:text-base">
      <tr className="text-xxs md:text-base">
        <th className="border border-gray-300 p-1 md:p-2 text-center rounded-tl-2xl">
          ID
        </th>

        <th className="border border-gray-300 p-1 md:p-2 text-center">Date</th>

        <th className="border border-gray-300 p-1 md:p-2 text-center">Heure</th>

        <th className="border border-gray-300 p-1 md:p-2 text-center">
          Thérapeute
        </th>

        <th
          className="border border-gray-300 px-4 py-2 text-center rounded-tr-2xl"
          colSpan={2}
        >
          Action
        </th>
      </tr>
    </thead>
  );
}
