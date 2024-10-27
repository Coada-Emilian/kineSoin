/**
 * @file AdminMedicsPage.tsx
 * @description A React component that displays a list of medical professionals
 * (medics) in the admin interface. It fetches medic data from the server and presents
 * it in a table format. The layout adapts based on the window width, using
 * mobile navigation for smaller screens and side navigation for larger screens.
 *
 * @param {Object} props - The component props.
 * @param {number} props.windowWidth - The current width of the window, used to determine
 * the layout (mobile or desktop).
 *
 * @returns {JSX.Element} The rendered AdminMedicsPage component, which includes
 * a table of all medics and navigation elements.
 */

import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
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
