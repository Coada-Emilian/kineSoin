export default function PatientsTableHead() {
  return (
    <thead className="bg-gray-100 xxs:text-xs text-sm md:text-base">
      <tr>
        <>
          <th className="border border-gray-300 px-4 py-2 rounded-tl-2xl text-center">
            #
          </th>

          <th className="border border-gray-300 px-4 py-2 text-center">
            Nom patient
          </th>

          <th className="border border-gray-300 px-4 py-2 text-center">
            Statut
          </th>

          <th className="border border-gray-300 px-4 py-2 text-center">
            Thérapeute
          </th>

          <th
            className="border border-gray-300 px-4 py-2 text-center rounded-tr-2xl"
            colSpan={2}
          >
            Action
          </th>
        </>
      </tr>
    </thead>
  );
}
