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
    <table className="border-collapse border border-gray-300 w-full mx-auto md:w-11/12 md:my-auto">
      <thead
        className={
          windowWidth < 450
            ? 'bg-gray-100 text-xs'
            : 'bg-gray-100 text-sm md:text-base'
        }
      >
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-center">#id</th>
          <th className="border border-gray-300 px-4 py-2 text-center">
            Nom kiné
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
      <tbody className={windowWidth < 450 ? 'text-xxs' : 'text-xs md:text-sm'}>
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
                  <img
                    src={editIcon}
                    alt="edit"
                    className={
                      windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'
                    }
                  />
                </Link>
              ) : (
                <Link to="*" className="w-25 flex items-center justify-center">
                  <img src={editIcon} alt="edit" className="w-5 h-5 mr-2" />{' '}
                  <p className="text-blue-300 font-semibold">Modifier</p>
                </Link>
              )}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {windowWidth < 768 ? (
                <Link to="*" className="w-12 ">
                  <img
                    src={deleteIcon}
                    alt="delete"
                    className={
                      windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'
                    }
                  />
                </Link>
              ) : (
                <Link to="*" className="w-25 flex items-center justify-center">
                  <img
                    src={deleteIcon}
                    alt="supprimer"
                    className="w-5 mx-auto"
                  />
                  <p className="text-red-600 font-semibold">Supprimer</p>
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
