/**
 * @fileoverview This component displays detailed information about a specific
 * insurance organism in the admin panel. It retrieves the insurance data
 * based on the ID obtained from the URL parameters and presents it in a
 * responsive layout suitable for both mobile and desktop views.
 *
 * @module AdminInsurancePage
 *
 * @requires react-router-dom
 * @requires react
 * @requires ../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx
 * @requires ../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx
 * @requires ../../../standaloneComponents/AdminProfileDetails/AdminProfileDetails.tsx
 * @requires ../../../../../utils/apiUtils.ts
 * @requires ../../../../../@types/IInsurance
 * @requires ../../../../../utils/DNALoader.tsx
 *
 * @typedef {Object} AdminInsurancePageProps
 * @property {number} windowWidth - The width of the window to determine
 *                                   layout responsiveness.
 *
 * @param {AdminInsurancePageProps} props - The props for the component.
 *
 * @returns {JSX.Element} The rendered component displaying the insurance
 *                        details or a loading state.
 *
 * @example
 * // Using the AdminInsurancePage component
 * import AdminInsurancePage from './AdminInsurancePage';
 *
 * const MyApp = () => {
 *   const windowWidth = window.innerWidth; // get window width dynamically
 *   return <AdminInsurancePage windowWidth={windowWidth} />;
 * };
 */

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminMobileNav from '../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminProfileDetails from '../../../standaloneComponents/AdminProfileDetails/AdminProfileDetails.tsx';
import { fetchInsuranceOrganism } from '../../../../../utils/apiUtils.ts';
import { IInsurance } from '../../../../../@types/IInsurance';
import DNALoader from '../../../../../utils/DNALoader.tsx';

interface AdminInsurancePageProps {
  windowWidth: number;
}

const AdminInsurancePage = ({ windowWidth }: AdminInsurancePageProps) => {
  const { id } = useParams();
  const insuranceId = id ? parseInt(id, 10) : NaN;
  const [insurance, setInsurance] = useState<IInsurance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsuranceOrganism(insuranceId)
      .then((insurance) => {
        setInsurance(insurance);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [insuranceId]);

  if (loading) {
    return DNALoader();
  }

  if (!insurance) {
    return <div>No insurance found.</div>;
  }

  return (
    <main className="w-full h-full">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminProfileDetails insurance={insurance} />
          <AdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav />
          </div>
          <div className="w-3/4">
            <AdminProfileDetails insurance={insurance} />
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminInsurancePage;
