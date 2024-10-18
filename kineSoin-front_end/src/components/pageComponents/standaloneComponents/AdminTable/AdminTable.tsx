export default function AdminTable() {
  return (
    <div>
      <table className="w-10/12 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">#id</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Nom kinésithérapeute
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Statut
            </th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-white even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">Row 1, Cell 1</td>
            <td className="border border-gray-300 px-4 py-2">Row 1, Cell 2</td>
            <td className="border border-gray-300 px-4 py-2">Row 1, Cell 3</td>
          </tr>
          <tr className="odd:bg-white even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">Row 2, Cell 1</td>
            <td className="border border-gray-300 px-4 py-2">Row 2, Cell 2</td>
            <td className="border border-gray-300 px-4 py-2">Row 2, Cell 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
