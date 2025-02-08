import { useEffect, useState } from 'react';
import SideNav from '../generalComponents/SideNav/SideNav';
import AdminTable from './AdminTable/AdminTable';
import { ITherapist } from '../../../@types/ITherapist';
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
import DNALoader from '../../../utils/DNALoader';
import { useParams } from 'react-router-dom';
import AdminProfileDetails from './AdminProfileDetails/AdminProfileDetails';
import { IPatient } from '../../../@types/IPatient';
import { IAffliction } from '../../../@types/IAffliction';
import { IMedic } from '../../../@types/IMedic';
import { IInsurance } from '../../../@types/IInsurance';
import { getAdminTokenAndDataFromLocalStorage } from '../../../localStorage/adminLocalStorage';

interface AdminMain2Props {
  windowWidth: number;
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
}: AdminMain2Props) {
  // State to store all therapists fetched
  const [allTherapists, setAllTherapists] = useState<ITherapist[]>([]);
  const [therapist, setTherapist] = useState<ITherapist | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allPatients, setAllPatients] = useState<IPatient[]>([]);
  const [therapistId, setTherapistId] = useState<number | null>(null);
  const [patientId, setPatientId] = useState<number | null>(null);
  const [patient, setPatient] = useState<IPatient | null>(null);
  const [allAfflictions, setAllAfflictions] = useState<IAffliction[]>([]);
  const [afflictionId, setAfflictionId] = useState<number | null>(null);
  const [affliction, setAffliction] = useState<IAffliction | null>(null);
  const [allMedics, setAllMedics] = useState<IMedic[]>([]);
  const [medicId, setMedicId] = useState<number | null>(null);
  const [medic, setMedic] = useState<IMedic | null>(null);
  const [allInsurances, setAllInsurances] = useState<IInsurance[]>([]);
  const [insuranceId, setInsuranceId] = useState<number | null>(null);
  const [insurance, setInsurance] = useState<IInsurance | null>(null);

  const { id } = useParams();

  useEffect(() => {
    {
      isAdminTherapistMain && setTherapistId(id ? parseInt(id, 10) : null);
      isAdminPatientMain && setPatientId(id ? parseInt(id, 10) : null);
      isAdminAfflictionMain && setAfflictionId(id ? parseInt(id, 10) : null);
      isAdminMedicMain && setMedicId(id ? parseInt(id, 10) : null);
      isAdminInsuranceMain && setInsuranceId(id ? parseInt(id, 10) : null);
    }
  }, []);

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
