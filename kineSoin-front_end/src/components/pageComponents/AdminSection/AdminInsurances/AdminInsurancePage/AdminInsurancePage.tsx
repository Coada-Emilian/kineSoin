import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminMobileNav from '../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminProfileDetails from '../../../standaloneComponents/AdminProfileDetails/AdminProfileDetails.tsx';
import { fetchInsuranceOrganism } from '../../../../../utils/apiUtils.ts';
import { DNA } from 'react-loader-spinner';
import { IInsurance } from '../../../../../@types/IInsurance';

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
    return (
      <div className="flex justify-center items-center h-screen">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
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
