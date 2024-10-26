/**
 * @fileoverview This component renders the admin page for viewing and managing
 * details of a specific patient. It fetches the patient's information based on
 * the provided ID in the URL and displays it, adjusting the layout based on
 * the window width for responsiveness.
 *
 * @module AdminPatientPage
 *
 * @requires react
 * @requires react-router-dom
 * @requires ../../../../../@types/IPatient
 * @requires ../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx
 * @requires ../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx
 * @requires ../../../standaloneComponents/AdminProfileDetails/AdminProfileDetails.tsx
 * @requires ../../../../../utils/apiUtils.ts
 *
 * @typedef {Object} AdminPatientPageProps
 * @property {number} windowWidth - The current width of the window, used for
 * responsive layout.
 *
 * @param {AdminPatientPageProps} props - The props for the component.
 *
 * @returns {JSX.Element} The rendered admin patient page, displaying the
 * patient's profile details.
 *
 * @example
 * // Using the AdminPatientPage component
 * import AdminPatientPage from './AdminPatientPage';
 *
 * const App = () => {
 *   const windowWidth = window.innerWidth; // Example width, should be derived from state
 *   return <AdminPatientPage windowWidth={windowWidth} />;
 * };
 */

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IPatient } from '../../../../../@types/IPatient';
import AdminMobileNav from '../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminProfileDetails from '../../../standaloneComponents/AdminProfileDetails/AdminProfileDetails.tsx';
import { fetchPatient } from '../../../../../utils/apiUtils.ts';

interface AdminPatientPageProps {
  windowWidth: number;
}

const AdminPatientPage = ({ windowWidth }: AdminPatientPageProps) => {
  const { id } = useParams();
  const patientId = id ? parseInt(id, 10) : NaN;
  const [patient, setPatient] = useState<IPatient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatient(patientId)
      .then((patient) => {
        setPatient(patient);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    return <div>No patient found.</div>;
  }

  return (
    <main className="w-full h-fit">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminProfileDetails patient={patient} />
          <AdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav />
          </div>
          <div className="w-3/4">
            <AdminProfileDetails patient={patient} />
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminPatientPage;
