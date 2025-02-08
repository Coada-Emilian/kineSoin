// Purpose: The purpose of this component is to render the admin therapists page.

import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { fetchBodyRegions } from '../../../../../../utils/apiUtils';
import { IBodyRegion } from '../../../../../../@types/IBodyRegion';
import AdminTable from '../../AdminTable';

interface RegionModalProps {
  isRegionModalOpen: boolean;
  setIsRegionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  windowWidth?: number;
}

export default function RegionModal({
  isRegionModalOpen,
  setIsRegionModalOpen,
}: RegionModalProps) {
  // State to store all body regions fetched
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
          top: '10%',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="space-y-4">
        <h2 className="text-sm md:text-base font-bold mb-2 md:mb-4">Regions</h2>

        <AdminTable allBodyRegions={bodyRegions} />
      </div>
    </ReactModal>
  );
}
