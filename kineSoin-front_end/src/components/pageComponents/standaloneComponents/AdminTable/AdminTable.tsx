import { ITherapist } from '../../../../@types/ITherapist';
import editIcon from '/icons/edit.png';
import deleteIcon from '/icons/delete.png';
import { Link } from 'react-router-dom';

interface AdminTableProps {
  allTherapists: ITherapist[];
  windowWidth: number;
}

export default function AdminTable({
  allTherapists,
  windowWidth,
}: AdminTableProps) {
  return (
    <table className="border-collapse border border-gray-300 w-full mx-auto">
      <thead className="bg-gray-100 text-xs">
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-center">#id</th>
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
      <tbody className="text-xs">
        {allTherapists.map(({ id, fullName, status }) => (
          <tr key={id} className="odd:bg-white even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 text-center">
              {id}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {fullName}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {status.toUpperCase()}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {windowWidth < 768 ? (
                <Link to="*">
                  <img src={editIcon} alt="edit" className="w-10" />
                </Link>
              ) : (
                <Link to="*">
                  <img src={editIcon} alt="edit" />
                  <p>Modifier</p>
                </Link>
              )}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {windowWidth < 768 ? (
                <Link to="*" className="w-12">
                  <img src={deleteIcon} alt="delete" className="w-10" />
                </Link>
              ) : (
                <Link to="*">
                  <img src={editIcon} alt="edit" />
                  <p>Supprimer</p>
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
