// Purpose: Provide the main content for the Admin Afflictions Page.

import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminTable from '../../../standaloneComponents/AdminTable/AdminTable.tsx';
import { useEffect, useState } from 'react';
import MobileNav from '../../../standaloneComponents/MobileNav/MobileNav.tsx';
import { fetchAfflictions } from '../../../../../utils/apiUtils.ts';
import { IAffliction } from '../../../../../@types/IAffliction';

interface AdminAfflictionsPageProps {
  windowWidth: number;
}

export default function AdminAfflictionsPage({
  windowWidth,
}: AdminAfflictionsPageProps) {
  const [allAfflictions, setAllAfflictions] = useState<IAffliction[]>([]);
  useEffect(() => {
    fetchAfflictions().then((allAfflictions) => {
      setAllAfflictions(allAfflictions);
    });
  }, []);

  return (
    <main className="w-full md:mb-6">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminTable
            allAfflictions={allAfflictions}
            windowWidth={windowWidth}
          />

          <MobileNav isAdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav />
          </div>

          <div className="w-3/4">
            <AdminTable
              allAfflictions={allAfflictions}
              windowWidth={windowWidth}
            />
          </div>
        </div>
      )}
    </main>
  );
}
