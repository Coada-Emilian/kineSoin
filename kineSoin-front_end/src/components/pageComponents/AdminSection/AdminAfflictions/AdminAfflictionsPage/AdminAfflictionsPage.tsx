/**
 * @file AdminAfflictionsPage.tsx
 * @description A React component that displays a list of afflictions in an admin
 * panel. It fetches affliction data from an API and provides a responsive layout
 * that adapts based on the window width. The component renders a different layout
 * for mobile and desktop views, utilizing separate navigation components.
 *
 * @param {Object} props - The component props.
 * @param {number} props.windowWidth - The current width of the window, used to
 * determine the layout of the component (mobile vs desktop).
 *
 * @returns {JSX.Element} The rendered AdminAfflictionsPage component, which displays
 * the table of afflictions and appropriate navigation elements.
 */

import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminTable from '../../../standaloneComponents/AdminTable/AdminTable.tsx';
import { useEffect, useState } from 'react';
import AdminMobileNav from '../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
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
          <AdminMobileNav />
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
