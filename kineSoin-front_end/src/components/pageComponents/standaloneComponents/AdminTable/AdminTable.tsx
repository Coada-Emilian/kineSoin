import { ITherapist } from '../../../../@types/ITherapist';
import editIcon from '/icons/edit.png';
import deleteIcon from '/icons/delete.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConfirmDeleteModal from '../../AdminSection/Modals/ConfirmDeleteModal';

interface AdminTableProps {
  allTherapists: ITherapist[];
  windowWidth: number;
}

export default function AdminTable({
  allTherapists,
  windowWidth,
}: AdminTableProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<ITherapist | null>(
    null
  );

  // Function to handle opening the delete confirmation modal
  const openDeleteModal = (therapist: ITherapist) => {
    setSelectedTherapist(therapist);
    setIsDeleteModalOpen(true);
  };

  // Function to handle closing the delete confirmation modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTherapist(null);
  };

  return (
    <>
      <table className="border-collapse border border-gray-300 w-full mx-auto md:w-11/12 md:my-auto">
        <thead
          className={
            windowWidth < 450
              ? 'bg-gray-100 text-xs'
              : 'bg-gray-100 text-sm md:text-base'
          }
        >
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-center">
              #id
            </th>
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
        <tbody
          className={windowWidth < 450 ? 'text-xxs' : 'text-xs md:text-sm'}
        >
          {allTherapists.map((therapist: ITherapist) => {
            return (
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
                  {windowWidth < 768 ? (
                    <Link to={`/admin/therapists/${therapist.id}`}>
                      <img
                        src={editIcon}
                        alt="edit"
                        className={
                          windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'
                        }
                      />
                    </Link>
                  ) : (
                    <Link
                      to={`/admin/therapists/${therapist.id}`}
                      className="w-25 flex items-center justify-center"
                    >
                      <img src={editIcon} alt="edit" className="w-5 h-5 mx-1" />{' '}
                      <p className="text-blue-300 font-semibold">Inspecter</p>
                    </Link>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {windowWidth < 768 ? (
                    <button
                      className="w-12"
                      onClick={() => openDeleteModal(therapist)}
                    >
                      <img
                        src={deleteIcon}
                        alt="delete"
                        className={
                          windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'
                        }
                      />
                    </button>
                  ) : (
                    <button
                      className="w-25 flex items-center justify-center"
                      onClick={() => openDeleteModal(therapist)}
                    >
                      <img
                        src={deleteIcon}
                        alt="supprimer"
                        className="w-5 mx-1"
                      />
                      <p className="text-red-600 font-semibold">Supprimer</p>
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isDeleteModalOpen && selectedTherapist && (
        <ConfirmDeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          therapist={selectedTherapist}
        />
      )}
    </>
  );
}
