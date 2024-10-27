/**
 * @file AdminAfflictionPage.tsx
 * @description A React component that displays the details of a specific affliction
 * in an admin panel. It fetches affliction data from an API based on the affliction ID
 * extracted from the URL parameters and provides a responsive layout that adapts
 * based on the window width. The component renders a different layout for mobile
 * and desktop views, utilizing separate navigation components.
 *
 * @param {Object} props - The component props.
 * @param {number} props.windowWidth - The current width of the window, used to
 * determine the layout of the component (mobile vs desktop).
 *
 * @returns {JSX.Element} The rendered AdminAfflictionPage component, which displays
 * the details of the affliction and appropriate navigation elements.
 */

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAffliction } from '../../../../../utils/apiUtils.ts';
import { IAffliction } from '../../../../../@types/IAffliction';
import MobileNav from '../../../standaloneComponents/MobileNav/MobileNav.tsx';
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
          <MobileNav isAdminMobileNav/>
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
