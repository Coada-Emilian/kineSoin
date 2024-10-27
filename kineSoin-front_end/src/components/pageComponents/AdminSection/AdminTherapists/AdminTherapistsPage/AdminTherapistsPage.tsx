/**
 * @file AdminTherapistsPage.tsx
 * @description A React component that displays the admin page for managing therapists.
 * It fetches and renders a list of therapists in a table format. The layout adapts based
 * on the window width, displaying a side navigation for larger screens and a mobile navigation
 * for smaller screens.
 *
 * @param {Object} props - The component props.
 * @param {number} props.windowWidth - The current width of the window, used to determine
 * the layout (mobile or desktop).
 *
 * @returns {JSX.Element} The rendered AdminTherapistsPage component, including the
 * therapist management table and navigation elements.
 */

import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminTable from '../../../standaloneComponents/AdminTable/AdminTable.tsx';
import MobileNav from '../../../standaloneComponents/MobileNav/MobileNav.tsx';
import { useEffect, useState } from 'react';
import { fetchTherapists } from '../../../../../utils/apiUtils.ts';
import { ITherapist } from '../../../../../@types/ITherapist';

interface AdminTherapistsPageProps {
  windowWidth: number;
}

export default function AdminTherapistsPage({
  windowWidth,
}: AdminTherapistsPageProps) {
  // State to store all therapists fetched
  const [allTherapists, setAllTherapists] = useState<ITherapist[]>([]);

  useEffect(() => {
    fetchTherapists().then((allTherapists) => {
      setAllTherapists(allTherapists);
    });
  }, []);

  return (
    <main className="w-full h-screen">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminTable allTherapists={allTherapists} windowWidth={windowWidth} />

          <MobileNav isAdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav />
          </div>

          <div className="w-3/4">
            <AdminTable
              allTherapists={allTherapists}
              windowWidth={windowWidth}
            />
          </div>
        </div>
      )}
    </main>
  );
}
