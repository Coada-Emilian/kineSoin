import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminMobileNav from '../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminProfileDetails from '../../../standaloneComponents/AdminProfileDetails/AdminProfileDetails.tsx';
import { fetchMedic } from '../../../../../utils/apiUtils.ts';
import { IMedic } from '../../../../../@types/IMedic';
import { DNA } from 'react-loader-spinner';

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
