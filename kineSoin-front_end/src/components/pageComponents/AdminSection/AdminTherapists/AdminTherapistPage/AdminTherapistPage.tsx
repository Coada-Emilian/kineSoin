/**
 * @file AdminTherapistPage.tsx
 * @description A React component that displays the details of a specific therapist
 * in the admin interface. It fetches therapist data based on the therapist's ID
 * from the URL parameters and displays it in a profile detail format. The layout
 * adapts based on the window width, showing a side navigation for larger screens
 * and a mobile navigation for smaller screens.
 *
 * @param {Object} props - The component props.
 * @param {number} props.windowWidth - The current width of the window, used to determine
 * the layout (mobile or desktop).
 *
 * @returns {JSX.Element} The rendered AdminTherapistPage component, which includes the
 * therapist's profile details and navigation elements.
 */

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ITherapist } from '../../../../../@types/ITherapist';
import AdminMobileNav from '../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminProfileDetails from '../../../standaloneComponents/AdminProfileDetails/AdminProfileDetails.tsx';
import { fetchTherapist } from '../../../../../utils/apiUtils.ts';

interface AdminTherapistPageProps {
  windowWidth: number;
}

const AdminTherapistPage = ({ windowWidth }: AdminTherapistPageProps) => {
  const { id } = useParams();
  const therapistId = id ? parseInt(id, 10) : NaN;
  const [therapist, setTherapist] = useState<ITherapist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTherapist(therapistId)
      .then((therapist) => {
        setTherapist(therapist);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [therapistId]);

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
