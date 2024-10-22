import AdminSideNav from '../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminTable from '../../standaloneComponents/AdminTable/AdminTable.tsx';
import { useEffect, useState } from 'react';
import AdminMobileNav from '../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
import { fetchPatients } from '../../../../utils/apiUtils.ts';

interface AdminPatientsPageProps {
  windowWidth: number;
}

export default function AdminPatientsPage({
  windowWidth,
}: AdminPatientsPageProps) {
  const [allPatients, setAllPatients] = useState([]);
  useEffect(() => {
    fetchPatients().then((allPatients) => {
      setAllPatients(allPatients);
    });
  }, []);

  return (
    <main className="w-full md:mb-6">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminTable allPatients={allPatients} windowWidth={windowWidth} />
          <AdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav />
          </div>
          <div className="w-3/4">
            <AdminTable allPatients={allPatients} windowWidth={windowWidth} />
          </div>
        </div>
      )}
    </main>
  );
}
