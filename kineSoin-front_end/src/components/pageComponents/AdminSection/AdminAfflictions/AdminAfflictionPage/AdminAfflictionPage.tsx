/**
 * @fileoverview This component displays the details of a specific affliction
 * in the admin panel. It fetches the affliction data based on the ID from the
 * URL parameters and presents it to the user. The layout is responsive,
 * adjusting based on the window width to accommodate mobile and desktop views.
 *
 * @module AdminAfflictionPage
 *
 * @requires react-router-dom
 * @requires react
 * @requires ../../../../../utils/apiUtils.ts
 * @requires ../../../../../@types/IAffliction
 * @requires react-loader-spinner
 * @requires ../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx
 * @requires ../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx
 * @requires ../../../standaloneComponents/AdminProfileDetails/AdminProfileDetails.tsx
 *
 * @typedef {Object} AdminAfflictionPageProps
 * @property {number} windowWidth - The width of the window to determine
 *                                   layout responsiveness.
 *
 * @param {AdminAfflictionPageProps} props - The props for the component.
 *
 * @returns {JSX.Element} The rendered component displaying the affliction details.
 *
 * @example
 * // Using the AdminAfflictionPage component
 * import AdminAfflictionPage from './AdminAfflictionPage';
 *
 * const MyApp = () => {
 *   const windowWidth = window.innerWidth; // get window width dynamically
 *   return <AdminAfflictionPage windowWidth={windowWidth} />;
 * };
 */

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAffliction } from '../../../../../utils/apiUtils.ts';
import { IAffliction } from '../../../../../@types/IAffliction';
import AdminMobileNav from '../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminProfileDetails from '../../../standaloneComponents/AdminProfileDetails/AdminProfileDetails.tsx';
import DNALoader from '../../../../../utils/DNALoader.tsx';

interface AdminAfflictionPageProps {
  windowWidth: number;
}

const AdminAfflictionPage = ({ windowWidth }: AdminAfflictionPageProps) => {
  const [affliction, setAffliction] = useState<IAffliction | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const afflictionId = id ? parseInt(id, 10) : NaN;

  useEffect(() => {
    fetchAffliction(afflictionId)
      .then((affliction) => {
        setAffliction(affliction);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [afflictionId]);

  if (loading) {
    return DNALoader();
  }

  if (!affliction) {
    return <div>No affliction found.</div>;
  }

  return (
    <main className="w-full h-fit">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminProfileDetails affliction={affliction} />
          <AdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav />
          </div>

          <div className="w-3/4">
            <AdminProfileDetails affliction={affliction} />
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminAfflictionPage;
