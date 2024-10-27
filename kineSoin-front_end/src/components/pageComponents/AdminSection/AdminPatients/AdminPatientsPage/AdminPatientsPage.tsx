/**
 * @file AdminPatientsPage.tsx
 * @description A React component that displays a list of patients in the admin interface.
 * It fetches patient data from the server and presents it in a table format. The layout
 * adjusts based on the window width, displaying a side navigation for larger screens
 * and a mobile navigation for smaller screens.
 *
 * @param {Object} props - The component props.
 * @param {number} props.windowWidth - The current width of the window, used to determine
 * the layout (mobile or desktop).
 *
 * @returns {JSX.Element} The rendered AdminPatientsPage component, which includes a
 * table of patients and navigation elements.
 */

import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminTable from '../../../standaloneComponents/AdminTable/AdminTable.tsx';
import { useEffect, useState } from 'react';
import MobileNav from '../../../standaloneComponents/MobileNav/MobileNav.tsx';
import { fetchPatients } from '../../../../../utils/apiUtils.ts';
import { IPatient } from '../../../../../@types/IPatient';

interface AdminPatientsPageProps {
  windowWidth: number;
}

export default function AdminPatientsPage({
  windowWidth,
}: AdminPatientsPageProps) {
  const [allPatients, setAllPatients] = useState<IPatient[]>([]);
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
          <MobileNav isAdminMobileNav />
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
