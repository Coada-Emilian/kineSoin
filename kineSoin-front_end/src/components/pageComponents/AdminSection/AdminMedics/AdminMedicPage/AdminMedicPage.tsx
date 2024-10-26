/**
 * @fileoverview This component renders the admin page for viewing and managing
 * details of a specific medic. It fetches the medic's information based on
 * the ID from the URL parameters and displays it in the appropriate layout
 * based on the window width.
 *
 * @module AdminMedicPage
 *
 * @requires react-router-dom
 * @requires react
 * @requires ../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx
 * @requires ../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx
 * @requires ../../../standaloneComponents/AdminProfileDetails/AdminProfileDetails.tsx
 * @requires ../../../../../utils/apiUtils.ts
 * @requires ../../../../../@types/IMedic
 * @requires ../../../../../utils/DNALoader.tsx
 *
 * @typedef {Object} AdminMedicPageProps
 * @property {number} windowWidth - The current width of the window, used for
 * responsive layout.
 *
 * @param {AdminMedicPageProps} props - The props for the component.
 *
 * @returns {JSX.Element} The rendered admin medic page, displaying medic details.
 *
 * @example
 * // Using the AdminMedicPage component
 * import AdminMedicPage from './AdminMedicPage';
 *
 * const App = () => {
 *   const windowWidth = window.innerWidth; // Example width, should be derived from state
 *   return <AdminMedicPage windowWidth={windowWidth} />;
 * };
 */

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminMobileNav from '../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminProfileDetails from '../../../standaloneComponents/AdminProfileDetails/AdminProfileDetails.tsx';
import { fetchMedic } from '../../../../../utils/apiUtils.ts';
import { IMedic } from '../../../../../@types/IMedic';
import DNALoader from '../../../../../utils/DNALoader.tsx';

interface AdminMedicPageProps {
  windowWidth: number;
}

const AdminMedicPage = ({ windowWidth }: AdminMedicPageProps) => {
  const { id } = useParams();
  const medicId = id ? parseInt(id, 10) : NaN;
  const [medic, setMedic] = useState<IMedic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedic(medicId)
      .then((medic) => {
        setMedic(medic);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [medicId]);

  if (loading) {
    return DNALoader();
  }

  if (!medic) {
    return <div>No medic found.</div>;
  }

  return (
    <main className="w-full h-full">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminProfileDetails medic={medic} />
          <AdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav />
          </div>
          <div className="w-3/4">
            <AdminProfileDetails medic={medic} />
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminMedicPage;
