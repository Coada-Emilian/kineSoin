import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../../../axios.ts';
import { ITherapist } from '../../../../@types/ITherapist';
import AdminMobileNav from '../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
import AdminSideNav from '../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminProfileDetails from '../../standaloneComponents/AdminProfileDetails/AdminProfileDetails.tsx';

interface AdminTherapistPageProps {
  windowWidth: number;
}

const AdminTherapistPage = ({ windowWidth }: AdminTherapistPageProps) => {
  const { id } = useParams();
  const therapistId = id ? parseInt(id, 10) : NaN;
  const [therapist, setTherapist] = useState<ITherapist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const response = await axios.get(`/admin/therapists/${therapistId}`);
        setTherapist(response.data);
      } catch (error) {
        console.error('Error fetching therapist data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTherapist();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!therapist) {
    return <div>No therapist found.</div>;
  }

  return (
    <main className="w-full h-fit">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminProfileDetails therapist={therapist} />
          <AdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav />
          </div>
          <div className="w-3/4">
            <AdminProfileDetails therapist={therapist} />
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminTherapistPage;
