import { ITherapist } from '../../../../@types/ITherapist';

interface AdminTableProps {
  allTherapists: ITherapist[];
}

export default function AdminTable({ allTherapists }: AdminTableProps) {
  return (
    <div>
      <table className="w-10/12 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-center">
              #id
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Nom kinésithérapeute
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
          </tr>
        </thead>
        <tbody>
          {allTherapists.map((therapist) => (
            <tr key={therapist.id} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">
                {therapist.id}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {therapist.fullName}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {therapist.status.toUpperCase()}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button className="text-blue-500 hover:underline">
                  Modifier
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button className="text-red-500 hover:underline">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
