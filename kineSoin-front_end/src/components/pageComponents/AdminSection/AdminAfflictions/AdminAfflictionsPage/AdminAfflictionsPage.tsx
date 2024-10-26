/**
 * @fileoverview This component displays a list of all afflictions in the
 * admin panel. It fetches the afflictions data from an API and presents
 * it in a table format. The layout is responsive, adjusting based on
 * the window width to provide an optimal user experience on both mobile
 * and desktop devices.
 *
 * @module AdminAfflictionsPage
 *
 * @requires ../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx
 * @requires ../../../standaloneComponents/AdminTable/AdminTable.tsx
 * @requires react
 * @requires ../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx
 * @requires ../../../../../utils/apiUtils.ts
 * @requires ../../../../../@types/IAffliction
 *
 * @typedef {Object} AdminAfflictionsPageProps
 * @property {number} windowWidth - The width of the window to determine
 *                                   layout responsiveness.
 *
 * @param {AdminAfflictionsPageProps} props - The props for the component.
 *
 * @returns {JSX.Element} The rendered component displaying the list of
 *                        afflictions.
 *
 * @example
 * // Using the AdminAfflictionsPage component
 * import AdminAfflictionsPage from './AdminAfflictionsPage';
 *
 * const MyApp = () => {
 *   const windowWidth = window.innerWidth; // get window width dynamically
 *   return <AdminAfflictionsPage windowWidth={windowWidth} />;
 * };
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
