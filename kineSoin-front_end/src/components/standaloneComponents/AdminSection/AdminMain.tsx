import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideNav from '../generalComponents/SideNav/SideNav';
import AdminTable from './AdminTable/AdminTable';
import AdminProfileDetails from './AdminProfileDetails/AdminProfileDetails';
import DNALoader from '../../../utils/DNALoader';
import {
  fetchAffliction,
  fetchAfflictions,
  fetchInsuranceOrganism,
  fetchInsuranceOrganisms,
  fetchMedic,
  fetchMedics,
  fetchPatient,
  fetchPatients,
  fetchTherapist,
  fetchTherapists,
} from '../../../utils/apiUtils';
import {
  ITherapist,
  IPatient,
  IAffliction,
  IMedic,
  IInsurance,
} from '../../../@types/types';
import { AdminMainProps } from '../../../@types/props';

export default function AdminMain({
  windowWidth,
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

  // States
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
  }, []);

  // Fetch the data of the entity to be displayed
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchPromises = [];

      if (isAdminTherapistMain && therapistId) {
        fetchPromises.push(fetchTherapist(therapistId).then(setTherapist));
      }

      if (isAdminPatientMain && patientId) {
        fetchPromises.push(fetchPatient(patientId).then(setPatient));
      }

      if (isAdminAfflictionMain && afflictionId) {
        fetchPromises.push(fetchAffliction(afflictionId).then(setAffliction));
      }

      if (isAdminMedicMain && medicId) {
        fetchPromises.push(fetchMedic(medicId).then(setMedic));
      }

      if (isAdminInsuranceMain && insuranceId) {
        fetchPromises.push(
          fetchInsuranceOrganism(insuranceId).then(setInsurance)
        );
      }

      await Promise.all(fetchPromises);
      setIsLoading(false);
    };

    fetchData();
  }, [patientId, therapistId, afflictionId, medicId, insuranceId]);

  // Fetch all the data to be displayed in the table
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const fetchPromises = [];

      if (isAdminTherapistsMain) {
        fetchPromises.push(fetchTherapists().then(setAllTherapists));
      }

      if (isAdminPatientsMain) {
        fetchPromises.push(fetchPatients().then(setAllPatients));
      }

      if (isAdminAfflictionsMain) {
        fetchPromises.push(fetchAfflictions().then(setAllAfflictions));
      }

      if (isAdminMedicsMain) {
        fetchPromises.push(fetchMedics().then(setAllMedics));
      }

      if (isAdminInsurancesMain) {
        fetchPromises.push(fetchInsuranceOrganisms().then(setAllInsurances));
      }

      await Promise.all(fetchPromises);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return DNALoader();
  }

  return (
    <main className="w-full h-fit bg-gradient-to-r from-white to-gray-200 pb-2">
      <div
        className={`${windowWidth < 768 ? 'flex flex-col justify-between h-full p-4' : 'flex'}`}
      >
        {windowWidth > 768 && (
          <div className="w-1/4 h-screen ">
            <SideNav isAdminSideNav />
          </div>
        )}
        <div
          className={windowWidth > 768 ? 'w-3/4 border-l-2 border-solid' : ''}
        >
          {(isAdminTherapistsMain ||
            isAdminPatientsMain ||
            isAdminAfflictionsMain ||
            isAdminMedicsMain ||
            isAdminInsurancesMain) && (
            <AdminTable
              allTherapists={isAdminTherapistsMain ? allTherapists : undefined}
              allPatients={isAdminPatientsMain ? allPatients : undefined}
              allAfflictions={
                isAdminAfflictionsMain ? allAfflictions : undefined
              }
              allMedics={isAdminMedicsMain ? allMedics : undefined}
              allInsurances={isAdminInsurancesMain ? allInsurances : undefined}
              windowWidth={windowWidth}
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
      </div>
    </main>
  );
}
