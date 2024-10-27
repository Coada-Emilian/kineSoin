/**
 * @file AdminInsurancePage.tsx
 * @description A React component that displays detailed information about a specific
 * insurance organism in an admin panel. It fetches insurance data from an API based
 * on the provided insurance ID in the URL parameters. The layout adapts based on the
 * window width, providing a responsive design with separate navigation for mobile and
 * desktop views. It also includes a loading indicator while fetching data.
 *
 * @param {Object} props - The component props.
 * @param {number} props.windowWidth - The current width of the window, used to
 * determine the layout of the component (mobile vs desktop).
 *
 * @returns {JSX.Element} The rendered AdminInsurancePage component, which displays
 * the details of the insurance organism and navigation elements.
 */

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MobileNav from '../../../standaloneComponents/MobileNav/MobileNav.tsx';
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
          <MobileNav isAdminMobileNav/>
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
