// Purpose: Provide the page for the admin to view the details of a specific insurance.

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

          <MobileNav isAdminMobileNav />
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
