/**
 * @fileoverview This component renders the admin page for viewing and managing
 * a list of medics. It fetches all medics' information and displays it in a
 * table format, adjusting the layout based on the window width for
 * responsiveness.
 *
 * @module AdminMedicsPage
 *
 * @requires react
 * @requires ../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx
 * @requires ../../../standaloneComponents/AdminTable/AdminTable.tsx
 * @requires ../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx
 * @requires ../../../../../utils/apiUtils.ts
 * @requires ../../../../../@types/IMedic
 *
 * @typedef {Object} AdminMedicsPageProps
 * @property {number} windowWidth - The current width of the window, used for
 * responsive layout.
 *
 * @param {AdminMedicsPageProps} props - The props for the component.
 *
 * @returns {JSX.Element} The rendered admin medics page, displaying a table
 * of medics.
 *
 * @example
 * // Using the AdminMedicsPage component
 * import AdminMedicsPage from './AdminMedicsPage';
 *
 * const App = () => {
 *   const windowWidth = window.innerWidth; // Example width, should be derived from state
 *   return <AdminMedicsPage windowWidth={windowWidth} />;
 * };
 */

import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminTable from '../../../standaloneComponents/AdminTable/AdminTable.tsx';
import { useEffect, useState } from 'react';
import AdminMobileNav from '../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
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
          <AdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav />
          </div>
          <div className="w-3/4">
            <AdminTable allMedics={allMedics} windowWidth={windowWidth} />
          </div>
        </div>
      )}
    </main>
  );
}
