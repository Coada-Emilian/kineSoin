export default function TherapistPatientsTable() {
  const windowWidth = window.innerWidth;
  return (
    <table className="border-collapse border border-gray-300 w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-lg">
      <thead
        className={
          windowWidth < 450
            ? 'bg-gray-100 text-xs'
            : 'bg-gray-100 text-sm md:text-base'
        }
      >
        <tr>
          <>
            <th className="border border-gray-300 px-4 py-2 text-center">#</th>

            <th className="border border-gray-300 px-4 py-2 text-center">
              Nom patient
            </th>

            <th className="border border-gray-300 px-4 py-2 text-center">
              Statut
            </th>

            <th
              className="border border-gray-300 px-4 py-2 text-center"
              colSpan={2}
            >
              Action
            </th>
          </>
        </tr>
      </thead>

      <tbody
        className={windowWidth < 450 ? 'text-xxs' : 'text-xs md:text-sm'}
      ></tbody>
    </table>
  );
}
