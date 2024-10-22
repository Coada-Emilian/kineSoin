import AdminSideNav from '../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminTable from '../../standaloneComponents/AdminTable/AdminTable.tsx';
import { useEffect, useState } from 'react';
import AdminMobileNav from '../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
import { fetchTherapists } from '../../../../utils/apiUtils.ts';
import { ITherapist } from '../../../../@types/ITherapist';

interface AdminTherapistsPageProps {
  windowWidth: number;
}

export default function AdminTherapistsPage({
  windowWidth,
}: AdminTherapistsPageProps) {
  const [allTherapists, setAllTherapists] = useState<ITherapist[]>([]);
  useEffect(() => {
    fetchTherapists().then((allTherapists) => {
      setAllTherapists(allTherapists);
    });
  }, []);

  return (
    <main className="w-full h-screen">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminTable allTherapists={allTherapists} windowWidth={windowWidth} />
          <AdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav />
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
