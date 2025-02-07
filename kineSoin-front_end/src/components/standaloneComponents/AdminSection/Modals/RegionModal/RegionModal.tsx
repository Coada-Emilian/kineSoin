// Purpose: The purpose of this component is to render the admin therapists page.

import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import deleteIcon from '/icons/delete.png';
import {
  fetchBodyRegions,
  handleRegionDelete,
} from '../../../../../utils/apiUtils';
import { IBodyRegion } from '../../../../../@types/IBodyRegion';
import { Link } from 'react-router-dom';
import CustomButton from '../../../../standaloneComponents/Button/CustomButton';
import AddRegionModal from './AddRegionModal';
import AdminTable from '../../AdminTable/AdminTable';

interface RegionModalProps {
  isRegionModalOpen: boolean;
  setIsRegionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  windowWidth?: number;
}

export default function RegionModal({
  windowWidth,
  isRegionModalOpen,
  setIsRegionModalOpen,
}: RegionModalProps) {
  // State to store all body regions fetched
  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);
  const [isAddRegionModalOpen, setIsAddRegionModalOpen] = useState(false);

  useEffect(() => {
    fetchBodyRegions().then((bodyRegions) => {
      setBodyRegions(bodyRegions);
    });
  }, []);

  const deleteRegion = async (id: number) => {
    const response = await handleRegionDelete(id);
    if (response) {
      window.location.reload();
    } else {
      console.error('Failed to delete region');
    }
  };

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

        {/* <table className="border-collapse border border-gray-300 w-full mx-auto md:w-11/12 md:my-auto mb-6">
          <thead className="bg-gray-100 text-xs md:text-sm">
            <tr className="h-fit">
              <>
                <th className="border border-gray-300 px-4 py-1 text-center">
                  #id
                </th>

                <th className="border border-gray-300 px-4 py-1 text-center">
                  Nom region
                </th>

                <th className="border border-gray-300 px-4 py-1 text-center">
                  Suppression
                </th>
              </>
            </tr>
          </thead>

          <tbody
            className={(windowWidth ?? 0) < 450 ? 'text-xs' : 'text-xs md:text-sm'}
          >
            {bodyRegions.map((region: IBodyRegion) => (
              <tr
                key={region.id}
                className="odd:bg-white even:bg-gray-50 text-xs md:text-md h-fit"
              >
                <td className="border border-gray-300 px-4 py-1 text-center">
                  {region.id}
                </td>

                <td className="border border-gray-300 px-4 py-1 text-center">
                  {region.name}
                </td>

                <td className="border border-gray-300 px-4 py-1 text-center">
                  <Link to="#" className="w-12">
                    <img
                      src={deleteIcon}
                      alt="delete"
                      className="w-4 h-4 mx-auto md:w-6 md:h-6"
                      onClick={() => deleteRegion(region.id)}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <AdminTable allBodyRegions={bodyRegions} />
      </div>
    </ReactModal>
  );
}
