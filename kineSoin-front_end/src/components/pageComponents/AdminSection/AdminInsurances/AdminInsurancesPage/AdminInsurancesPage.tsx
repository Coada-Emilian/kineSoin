/**
 * @fileoverview This component displays a list of all insurance organisms
 * in the admin panel. It fetches the insurance data and presents it in a
 * responsive layout that adjusts based on the window width.
 *
 * @module AdminInsurancesPage
 *
 * @requires ../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx
 * @requires ../../../standaloneComponents/AdminTable/AdminTable.tsx
 * @requires react
 * @requires ../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx
 * @requires ../../../../../utils/apiUtils.ts
 * @requires ../../../../../@types/IInsurance
 *
 * @typedef {Object} AdminInsurancesPageProps
 * @property {number} windowWidth - The width of the window to determine
 *                                   layout responsiveness.
 *
 * @param {AdminInsurancesPageProps} props - The props for the component.
 *
 * @returns {JSX.Element} The rendered component displaying the list of
 *                        insurance organisms or a loading state.
 *
 * @example
 * // Using the AdminInsurancesPage component
 * import AdminInsurancesPage from './AdminInsurancesPage';
 *
 * const MyApp = () => {
 *   const windowWidth = window.innerWidth; // get window width dynamically
 *   return <AdminInsurancesPage windowWidth={windowWidth} />;
 * };
 */

import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminTable from '../../../standaloneComponents/AdminTable/AdminTable.tsx';
import { useEffect, useState } from 'react';
import AdminMobileNav from '../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
import { fetchInsuranceOrganisms } from '../../../../../utils/apiUtils.ts';
import { IInsurance } from '../../../../../@types/IInsurance';

interface AdminInsurancesPageProps {
  windowWidth: number;
}

export default function AdminInsurancesPage({
  windowWidth,
}: AdminInsurancesPageProps) {
  const [allInsurances, setAllInsurances] = useState<IInsurance[]>([]);
  useEffect(() => {
    fetchInsuranceOrganisms().then((allInsuranceOrganisms) => {
      setAllInsurances(allInsuranceOrganisms);
    });
  }, []);

  return (
    <main className="w-full">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminTable allInsurances={allInsurances} windowWidth={windowWidth} />
          <AdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav />
          </div>
          <div className="w-3/4">
            <AdminTable
              allInsurances={allInsurances}
              windowWidth={windowWidth}
            />
          </div>
        </div>
      )}
    </main>
  );
}
