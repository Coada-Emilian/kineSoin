// Purpose: The purpose of this component is to render the admin therapists page.

import AdminSideNav from '../../../../standaloneComponents/SideNav/SideNav.tsx';
import AdminTable from '../../../standaloneComponents/AdminTable/AdminTable.tsx';
import MobileNav from '../../../standaloneComponents/MobileNav/MobileNav.tsx';
import { useEffect, useState } from 'react';
import { fetchTherapists } from '../../../../../utils/apiUtils.ts';
import { ITherapist } from '../../../../../@types/ITherapist';
import DNALoader from '../../../../../utils/DNALoader.tsx';

interface AdminTherapistsPageProps {
  windowWidth: number;
}

export default function AdminTherapistsPage({
  windowWidth,
}: AdminTherapistsPageProps) {
  // State to store all therapists fetched
  const [allTherapists, setAllTherapists] = useState<ITherapist[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTherapists()
      .then((allTherapists) => {
        setAllTherapists(allTherapists);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return DNALoader();
  }

  return (
    <main className="w-full h-screen">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminTable allTherapists={allTherapists} windowWidth={windowWidth} />

          <MobileNav isAdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav isAdminSideNav />
          </div>

          <div className="w-3/4">
            <AdminTable
              allTherapists={allTherapists}
              windowWidth={windowWidth}
            />
          </div>
        </div>
      )}
    </main>
  );
}
