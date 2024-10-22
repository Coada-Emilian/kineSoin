import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminMobileNav from '../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
import AdminSideNav from '../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminProfileDetails from '../../standaloneComponents/AdminProfileDetails/AdminProfileDetails.tsx';
import { fetchAffliction, fetchPatient } from '../../../../utils/apiUtils.ts';
import { IAffliction } from '../../../../@types/IAffliction';

interface AdminAfflictionPageProps {
  windowWidth: number;
}

const AdminAfflictionPage = ({ windowWidth }: AdminAfflictionPageProps) => {
  const { id } = useParams();
  const afflictionId = id ? parseInt(id, 10) : NaN;
  const [affliction, setAffliction] = useState<IAffliction | null>(null);
  const [loading, setLoading] = useState(true);

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
    return <div>Loading...</div>;
  }

  if (!affliction) {
    return <div>No patient found.</div>;
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
