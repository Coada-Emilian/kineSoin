import { useEffect, useState } from 'react';
import SideNav from '../../../standaloneComponents/SideNav/SideNav';
import AdminTable from '../AdminTable/AdminTable';
import { ITherapist } from '../../../../@types/ITherapist';
import { fetchTherapists } from '../../../../utils/apiUtils';
import DNALoader from '../../../../utils/DNALoader';

interface AdminMain2Props {
  windowWidth: number;
  isAdminTherapistsMain?: boolean;
}

export default function AdminMain2({
  windowWidth,
  isAdminTherapistsMain,
}: AdminMain2Props) {
  // State to store all therapists fetched
  const [allTherapists, setAllTherapists] = useState<ITherapist[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  {
    isAdminTherapistsMain &&
      useEffect(() => {
        fetchTherapists()
          .then((allTherapists) => {
            setAllTherapists(allTherapists);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, []);
  }

  if (isLoading) {
    return DNALoader();
  }

  return (
    <main className="w-full h-screen bg-gradient-to-r from-white to-gray-300">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminTable
            windowWidth={windowWidth}
            allTherapists={isAdminTherapistsMain ? allTherapists : []}
          />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <SideNav isAdminSideNav />
          </div>

          <div className="w-3/4">
            <AdminTable
              windowWidth={windowWidth}
              allTherapists={isAdminTherapistsMain ? allTherapists : []}
            />
          </div>
        </div>
      )}
    </main>
  );
}
