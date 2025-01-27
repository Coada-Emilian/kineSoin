// Purpose: Provide the main content for the Admin Afflictions Page.

import AdminSideNav from '../../../../standaloneComponents/SideNav/SideNav.tsx';
import AdminTable from '../../../standaloneComponents/AdminTable/AdminTable.tsx';
import { useEffect, useState } from 'react';
import MobileNav from '../../../standaloneComponents/MobileNav/MobileNav.tsx';
import { fetchMedics } from '../../../../../utils/apiUtils.ts';
import { IMedic } from '../../../../../@types/IMedic';

interface AdminMedicsPageProps {
  windowWidth: number;
}

export default function AdminMedicsPage({ windowWidth }: AdminMedicsPageProps) {
  const [allMedics, setAllMedics] = useState<IMedic[]>([]);
  useEffect(() => {
    fetchMedics().then((allMedics) => {
      setAllMedics(allMedics);
    });
  }, []);

  return (
    <main className="w-full">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminTable allMedics={allMedics} windowWidth={windowWidth} />

          <MobileNav isAdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav isAdminSideNav />
          </div>

          <div className="w-3/4">
            <AdminTable allMedics={allMedics} windowWidth={windowWidth} />
          </div>
        </div>
      )}
    </main>
  );
}
