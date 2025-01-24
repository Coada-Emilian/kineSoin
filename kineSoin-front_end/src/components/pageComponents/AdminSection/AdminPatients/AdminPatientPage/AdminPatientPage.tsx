// Purpose: Provide the AdminPatientPage component which displays the patient's profile details.

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IPatient } from '../../../../../@types/IPatient';
import MobileNav from '../../../standaloneComponents/MobileNav/MobileNav.tsx';
import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminProfileDetails from '../../../standaloneComponents/AdminProfileDetails/AdminProfileDetails.tsx';
import { fetchPatient } from '../../../../../utils/apiUtils.ts';
import DNALoader from '../../../../../utils/DNALoader.tsx';

interface AdminPatientPageProps {
  windowWidth: number;
}

const AdminPatientPage = ({ windowWidth }: AdminPatientPageProps) => {
  const { id } = useParams();
  const patientId = id ? parseInt(id, 10) : NaN;
  const [patient, setPatient] = useState<IPatient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPatient(patientId)
      .then((patient) => {
        setPatient(patient);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [patientId]);

  if (isLoading) {
    return DNALoader();
  }

  if (!patient) {
    return <div>No patient found.</div>;
  }

  return (
    <main className="w-full h-fit">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminProfileDetails patient={patient} />

          <MobileNav isAdminMobileNav />
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
