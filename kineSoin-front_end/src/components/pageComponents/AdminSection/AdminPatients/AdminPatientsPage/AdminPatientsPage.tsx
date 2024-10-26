/**
 * @fileoverview This component displays the admin page for managing and viewing
 * details of all patients. It fetches the list of patients and renders it in a
 * table format, adjusting the layout based on the current window width for
 * responsive design.
 *
 * @module AdminPatientsPage
 *
 * @requires react
 * @requires react-router-dom
 * @requires ../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx
 * @requires ../../../standaloneComponents/AdminTable/AdminTable.tsx
 * @requires ../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx
 * @requires ../../../../../utils/apiUtils.ts
 * @requires ../../../../../@types/IPatient
 *
 * @typedef {Object} AdminPatientsPageProps
 * @property {number} windowWidth - The current width of the window, used for
 * responsive layout.
 *
 * @param {AdminPatientsPageProps} props - The props for the component.
 *
 * @returns {JSX.Element} The rendered admin patients page, displaying a table
 * of all patients.
 *
 * @example
 * // Using the AdminPatientsPage component
 * import AdminPatientsPage from './AdminPatientsPage';
 *
 * const App = () => {
 *   const windowWidth = window.innerWidth; // Example width, should be derived from state
 *   return <AdminPatientsPage windowWidth={windowWidth} />;
 * };
 */

import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminTable from '../../../standaloneComponents/AdminTable/AdminTable.tsx';
import { useEffect, useState } from 'react';
import AdminMobileNav from '../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
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
