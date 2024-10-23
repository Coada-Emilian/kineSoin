import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import editIcon from '/icons/edit.png';
import deleteIcon from '/icons/delete.png';
import { fetchBodyRegions } from '../../../../../utils/apiUtils';
import { IBodyRegion } from '../../../../../@types/IBodyRegion';
import { Link } from 'react-router-dom';

interface RegionModalProps {
  isRegionModalOpen: boolean;
  setIsRegionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  windowWidth: number;
}

export default function RegionModal({
  windowWidth,
  isRegionModalOpen,
  setIsRegionModalOpen,
}: RegionModalProps) {
  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);
  useEffect(() => {
    fetchBodyRegions().then((bodyRegions) => {
      setBodyRegions(bodyRegions);
    });
  }, []);

  return (
    <ReactModal
      isOpen={isRegionModalOpen}
      onRequestClose={() => setIsRegionModalOpen(false)}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="space-y-4">
        <h2 className="text-sm md:text-base font-bold mb-2 md:mb-4">Regions</h2>
        <table className="border-collapse border border-gray-300 w-full mx-auto md:w-11/12 md:my-auto mb-6">
          <thead className="bg-gray-100 text-xs md:text-sm">
            <tr className="h-fit">
              <>
                <th className="border border-gray-300 px-4 py-1 text-center">
                  #id
                </th>
                <th className="border border-gray-300 px-4 py-1 text-center">
                  Nom region
                </th>
                <th
                  className="border border-gray-300 px-4 py-1 text-center"
                  colSpan={2}
                >
                  Action
                </th>
              </>
            </tr>
          </thead>
          <tbody
            className={windowWidth < 450 ? 'text-xxs' : 'text-xs md:text-sm'}
          >
            {bodyRegions.map((region: IBodyRegion) => (
              <tr
                key={region.id}
                className="odd:bg-white even:bg-gray-50 text-xs h-fit"
              >
                <td className="border border-gray-300 px-4 py-1 text-center">
                  {region.id}
                </td>
                <td className="border border-gray-300 px-4 py-1 text-center">
                  {region.name}
                </td>
                <td className="border border-gray-300 px-4 py-1 text-center">
                  {windowWidth < 768 ? (
                    <Link to={`/admin/therapists/${region.id}`}>
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
                      to={`/admin/therapists/${region.id}`}
                      className="w-25 flex items-center justify-center"
                    >
                      <img src={editIcon} alt="edit" className="w-3 mx-1" />
                      <p className="text-blue-300 font-semibold">Inspecter</p>
                    </Link>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-1 text-center">
                  {windowWidth < 768 ? (
                    <Link to="#" className="w-12">
                      <img
                        src={deleteIcon}
                        alt="delete"
                        className={
                          windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'
                        }
                      />
                    </Link>
                  ) : (
                    <Link
                      to="#"
                      className="w-25 flex justify-center items-center"
                    >
                      <img
                        src={deleteIcon}
                        alt="supprimer"
                        className="w-3 mx-1"
                      />
                      <p className="text-red-600 font-semibold">Supprimer</p>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReactModal>
  );
}
