import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideNav from '../../standaloneComponents/generalComponents/SideNav/SideNav';
import AdminTable from '../../standaloneComponents/AdminSection/AdminTable/AdminTable';
import AdminProfileDetails from '../../standaloneComponents/AdminSection/AdminProfileDetails/AdminProfileDetails';
import DNALoader from '../../../utils/DNALoader';
import {
  ITherapist,
  IPatient,
  IAffliction,
  IMedic,
  IInsurance,
} from '../../../@types/standardTypes';
import {
  fetchDetailsData,
  fetchTableData,
} from '../../../utils/pageUtils/AdminSection/AdminMainUtils/adminMainUtils';

interface AdminMain2Props {
  entities: T[];
  setEntities: React.Dispatch<React.SetStateAction<T[]>>;
  entity: T;
  setEntity: React.Dispatch<React.SetStateAction<T>>;
  entityId: number | null;
  setEntityId: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function AdminMain2({
  entities,
  setEntities,
  entity,
  setEntity,
  entityId,
  setEntityId,
}: AdminMain2Props) {
  //  Get the id from the URL
  const { id } = useParams();
  const entity_id = parseInt(id, 10);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Set the id of the entity to be displayed

  // Fetch the data of the entity to be displayed
  useEffect(() => {
    {
      setEntityId(id ? entity_id : null);
    }
  }, [id]);

  useEffect(() => {
    console.log(entityId);
  }, [entityId]);

  //   Fetch the data of the entity to be displayed
  //   useEffect(() => {
  //     fetchDetailsData({
  //       setIsLoading,
  //       isAdminTherapistMain,
  //       therapistId,
  //       setTherapist,
  //       isAdminPatientMain,
  //       patientId,
  //       setPatient,
  //       isAdminAfflictionMain,
  //       afflictionId,
  //       setAffliction,
  //       isAdminMedicMain,
  //       medicId,
  //       setMedic,
  //       isAdminInsuranceMain,
  //       insuranceId,
  //       setInsurance,
  //     });
  //   }, [patientId, therapistId, afflictionId, medicId, insuranceId]);

  //   // Fetch all the data to be displayed in the table
  //   useEffect(() => {
  //     fetchTableData({
  //       setIsLoading,
  //       isAdminTherapistsMain,
  //       setAllTherapists,
  //       isAdminPatientsMain,
  //       setAllPatients,
  //       isAdminAfflictionsMain,
  //       setAllAfflictions,
  //       isAdminMedicsMain,
  //       setAllMedics,
  //       isAdminInsurancesMain,
  //       setAllInsurances,
  //     });
  //   }, [
  //     isAdminTherapistsMain,
  //     isAdminPatientsMain,
  //     isAdminAfflictionsMain,
  //     isAdminMedicsMain,
  //     isAdminInsurancesMain,
  //   ]);

  if (isLoading) {
    return DNALoader();
  }

  return (
    <main className="w-full h-fit bg-gradient-to-r from-white to-gray-200 pb-2 flex p-4">
      {/* <div className=" md:flex-row md:justify-normal"> */}
      <div className="w-1/4 h-screen hidden md:block">
        <SideNav isAdminSideNav />
      </div>

      {/* <div className="w-full md:border-l-2 md:border-solid ">
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
      </div> */}
    </main>
  );
}
