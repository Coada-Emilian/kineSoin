import AdminSideNav from '../../../standaloneComponents/AdminSideNav/AdminSideNav.tsx';
import AdminTable from '../../../standaloneComponents/AdminTable/AdminTable.tsx';
import { useEffect, useState } from 'react';
import AdminMobileNav from '../../../standaloneComponents/AdminMobileNav/AdminMobileNav.tsx';
import {
  fetchInsuranceOrganisms,
  fetchMedics,
} from '../../../../../utils/apiUtils.ts';
import { IMedic } from '../../../../../@types/IMedic';
import { IInsurance } from '../../../../../@types/IInsurance';

interface AdminInsurancesPageProps {
  windowWidth: number;
}

export default function AdminInsurancesPage({
  windowWidth,
}: AdminInsurancesPageProps) {
  const [allInsurances, setAllInsurances] = useState<IInsurance[]>([]);
  useEffect(() => {
    fetchInsuranceOrganisms().then((allInsuranceOrganisms) => {
      setAllInsurances(allInsuranceOrganisms);
    });
  }, []);

  return (
    <main className="w-full">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          <AdminTable allInsurances={allInsurances} windowWidth={windowWidth} />
          <AdminMobileNav />
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 border-r-2 border-r-lightGrey h-screen border-solid">
            <AdminSideNav />
          </div>
          <div className="w-3/4">
            <AdminTable
              allInsurances={allInsurances}
              windowWidth={windowWidth}
            />
          </div>
        </div>
      )}
    </main>
  );
}
