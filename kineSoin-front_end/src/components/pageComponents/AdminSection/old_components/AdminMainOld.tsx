import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../@types/standardInterfaces';
import {
  fetchDetailsData,
  fetchTableData,
} from '../../../../utils/pageUtils/AdminSection/AdminMainUtils/adminMainUtils';
import DNALoader from '../../../../utils/DNALoader';
import SideNav from '../../../standaloneComponents/generalComponents/SideNav/old_components/SideNav';
import AdminTable from '../../../standaloneComponents/AdminSection/AdminTable/old_components/AdminTable';
import AdminProfileDetails from '../../../standaloneComponents/AdminSection/AdminProfileDetails/old_components/modals/AdminProfileDetails';

interface AdminMainProps {
  isAdminTherapistsMain?: boolean;
  isAdminTherapistMain?: boolean;
  isAdminPatientsMain?: boolean;
  isAdminPatientMain?: boolean;
  isAdminAfflictionsMain?: boolean;
  isAdminAfflictionMain?: boolean;
  isAdminMedicsMain?: boolean;
  isAdminMedicMain?: boolean;
  isAdminInsurancesMain?: boolean;
  isAdminInsuranceMain?: boolean;
}

export default function AdminMainOld({
  isAdminTherapistsMain,
  isAdminTherapistMain,
  isAdminPatientsMain,
  isAdminPatientMain,
  isAdminAfflictionsMain,
  isAdminAfflictionMain,
  isAdminMedicsMain,
  isAdminMedicMain,
  isAdminInsurancesMain,
  isAdminInsuranceMain,
}: AdminMainProps) {
  //  Get the id from the URL
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [allTherapists, setAllTherapists] = useState<ITherapist[]>([]);
  const [therapist, setTherapist] = useState<ITherapist | null>(null);
  const [therapistId, setTherapistId] = useState<number | null>(null);

  const [allPatients, setAllPatients] = useState<IPatient[]>([]);
  const [patient, setPatient] = useState<IPatient | null>(null);
  const [patientId, setPatientId] = useState<number | null>(null);

  const [allAfflictions, setAllAfflictions] = useState<IAffliction[]>([]);
  const [afflictionId, setAfflictionId] = useState<number | null>(null);
  const [affliction, setAffliction] = useState<IAffliction | null>(null);

  const [allMedics, setAllMedics] = useState<IMedic[]>([]);
  const [medicId, setMedicId] = useState<number | null>(null);
  const [medic, setMedic] = useState<IMedic | null>(null);

  const [allInsurances, setAllInsurances] = useState<IInsurance[]>([]);
  const [insuranceId, setInsuranceId] = useState<number | null>(null);
  const [insurance, setInsurance] = useState<IInsurance | null>(null);

  // Set the id of the entity to be displayed
  const entityId = id ? parseInt(id, 10) : null;

  // Fetch the data of the entity to be displayed
  useEffect(() => {
    {
      isAdminTherapistMain && setTherapistId(id ? entityId : null);
      isAdminPatientMain && setPatientId(id ? entityId : null);
      isAdminAfflictionMain && setAfflictionId(id ? entityId : null);
      isAdminMedicMain && setMedicId(id ? entityId : null);
      isAdminInsuranceMain && setInsuranceId(id ? entityId : null);
    }
  }, [id]);

  // Fetch the data of the entity to be displayed
  useEffect(() => {
    fetchDetailsData({
      setIsLoading,
      isAdminTherapistMain,
      therapistId,
      setTherapist,
      isAdminPatientMain,
      patientId,
      setPatient,
      isAdminAfflictionMain,
      afflictionId,
      setAffliction,
      isAdminMedicMain,
      medicId,
      setMedic,
      isAdminInsuranceMain,
      insuranceId,
      setInsurance,
    });
  }, [patientId, therapistId, afflictionId, medicId, insuranceId]);

  // Fetch all the data to be displayed in the table
  useEffect(() => {
    fetchTableData({
      setIsLoading,
      isAdminTherapistsMain,
      setAllTherapists,
      isAdminPatientsMain,
      setAllPatients,
      isAdminAfflictionsMain,
      setAllAfflictions,
      isAdminMedicsMain,
      setAllMedics,
      isAdminInsurancesMain,
      setAllInsurances,
    });
  }, [
    isAdminTherapistsMain,
    isAdminPatientsMain,
    isAdminAfflictionsMain,
    isAdminMedicsMain,
    isAdminInsurancesMain,
  ]);

  if (isLoading) {
    return DNALoader();
  }

  return (
    <main className="w-full h-fit bg-gradient-to-r from-white to-gray-200 pb-2 flex p-4">
      {/* <div className=" md:flex-row md:justify-normal"> */}
      <div className="w-1/4 h-screen hidden md:block">
        <SideNav isAdminSideNav />
      </div>

      <div className="w-full md:border-l-2 md:border-solid ">
        {(isAdminTherapistsMain ||
          isAdminPatientsMain ||
          isAdminAfflictionsMain ||
          isAdminMedicsMain ||
          isAdminInsurancesMain) && (
          <AdminTable
            allTherapists={isAdminTherapistsMain ? allTherapists : undefined}
            allPatients={isAdminPatientsMain ? allPatients : undefined}
            allAfflictions={isAdminAfflictionsMain ? allAfflictions : undefined}
            allMedics={isAdminMedicsMain ? allMedics : undefined}
            allInsurances={isAdminInsurancesMain ? allInsurances : undefined}
          />
        )}

        {(isAdminTherapistMain ||
          isAdminPatientMain ||
          isAdminAfflictionMain ||
          isAdminMedicMain ||
          isAdminInsuranceMain) && (
          <AdminProfileDetails
            therapist={
              isAdminTherapistMain && therapist ? therapist : undefined
            }
            patient={isAdminPatientMain && patient ? patient : undefined}
            affliction={
              isAdminAfflictionMain && affliction ? affliction : undefined
            }
            medic={isAdminMedicMain && medic ? medic : undefined}
            insurance={
              isAdminInsuranceMain && insurance ? insurance : undefined
            }
          />
        )}
      </div>
      {/* </div> */}
    </main>
  );
}
