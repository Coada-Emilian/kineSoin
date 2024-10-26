/**
 * @file AdminInsurancesPage.tsx
 * @description A React component that displays a list of insurance organisms in an
 * admin panel. It fetches insurance data from an API and renders it in a table format,
 * adapting its layout based on the window width for responsive design.
 * The component also includes navigation elements for mobile and desktop views.
 *
 * @param {Object} props - The component props.
 * @param {number} props.windowWidth - The current width of the window, used to
 * determine the layout of the component (mobile vs desktop).
 *
 * @returns {JSX.Element} The rendered AdminInsurancesPage component,
 * which includes a table of insurance organisms and navigation elements.
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
