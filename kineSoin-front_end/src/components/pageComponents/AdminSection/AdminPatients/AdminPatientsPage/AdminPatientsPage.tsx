// Purpose: The purpose of this component is to render the admin patients page.

import AdminSideNav from '../../../../standaloneComponents/SideNav/SideNav.tsx';
import AdminTable from '../../../standaloneComponents/AdminTable/AdminTable.tsx';
import { useEffect, useState } from 'react';
import MobileNav from '../../../standaloneComponents/MobileNav/MobileNav.tsx';
import { fetchPatients } from '../../../../../utils/apiUtils.ts';
import { IPatient } from '../../../../../@types/IPatient';
import DNALoader from '../../../../../utils/DNALoader.tsx';

interface AdminPatientsPageProps {
  windowWidth: number;
}

export default function AdminPatientsPage({
  windowWidth,
}: AdminPatientsPageProps) {
  const [allPatients, setAllPatients] = useState<IPatient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPatients()
      .then((allPatients) => {
        setAllPatients(allPatients);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return DNALoader();
  }

  return (
    <main className="w-full md:mb-6">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminTable allPatients={allPatients} windowWidth={windowWidth} />
          <MobileNav isAdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav isAdminSideNav />
          </div>
          <div className="w-3/4">
            <AdminTable allPatients={allPatients} windowWidth={windowWidth} />
          </div>
        </div>
      )}
    </main>
  );
}
