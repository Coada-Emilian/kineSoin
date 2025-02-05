import { useEffect, useState } from 'react';
import SideNav from '../../../standaloneComponents/SideNav/SideNav';
import AdminTable from '../AdminTable/AdminTable';
import { ITherapist } from '../../../../@types/ITherapist';
import {
  fetchAfflictions,
  fetchPatient,
  fetchPatients,
  fetchTherapist,
  fetchTherapists,
} from '../../../../utils/apiUtils';
import DNALoader from '../../../../utils/DNALoader';
import { useParams } from 'react-router-dom';
import AdminProfileDetails from '../AdminProfileDetails/AdminProfileDetails';
import { IPatient } from '../../../../@types/IPatient';
import { IAffliction } from '../../../../@types/IAffliction';

interface AdminMain2Props {
  windowWidth: number;
  isAdminTherapistsMain?: boolean;
  isAdminTherapistMain?: boolean;
  isAdminPatientsMain?: boolean;
  isAdminPatientMain?: boolean;
  isAdminAfflictionsMain?: boolean;
}

export default function AdminMain2({
  windowWidth,
  isAdminTherapistsMain,
  isAdminTherapistMain,
  isAdminPatientsMain,
  isAdminPatientMain,
  isAdminAfflictionsMain,
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

  const { id } = useParams();

  useEffect(() => {
    {
      isAdminTherapistMain && setTherapistId(id ? parseInt(id, 10) : null);
      isAdminPatientMain && setPatientId(id ? parseInt(id, 10) : null);
    }
  }, []);

  useEffect(() => {
    if (isAdminTherapistMain && therapistId) {
      fetchTherapist(therapistId)
        .then((therapist) => {
          setTherapist(therapist);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (isAdminPatientMain && patientId) {
      fetchPatient(patientId)
        .then((patient) => {
          setPatient(patient);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [patientId, therapistId]);

  useEffect(() => {
    if (isAdminTherapistsMain) {
      fetchTherapists()
        .then((allTherapists) => {
          setAllTherapists(allTherapists);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (isAdminPatientsMain) {
      fetchPatients()
        .then((allPatients) => {
          setAllPatients(allPatients);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (isAdminAfflictionsMain) {
      fetchAfflictions()
        .then((allAfflictions) => {
          setAllAfflictions(allAfflictions);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return DNALoader();
  }

  return (
    <main className="w-full h-fit bg-gradient-to-r from-white to-gray-300 pb-2">
      {windowWidth < 768 ? (
        <div className="flex flex-col justify-between h-full p-4">
          {(isAdminTherapistsMain ||
            isAdminPatientsMain ||
            isAdminAfflictionsMain) && (
            <AdminTable
              allTherapists={isAdminTherapistsMain ? allTherapists : undefined}
              allPatients={isAdminPatientsMain ? allPatients : undefined}
              allAfflictions={
                isAdminAfflictionsMain ? allAfflictions : undefined
              }
              windowWidth={windowWidth}
            />
          )}
          {(isAdminTherapistMain || isAdminPatientMain) && (
            <AdminProfileDetails
              therapist={
                isAdminTherapistMain && therapist ? therapist : undefined
              }
              patient={isAdminPatientMain && patient ? patient : undefined}
            />
          )}
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/4 h-screen ">
            <SideNav isAdminSideNav />
          </div>

          <div className="w-3/4 border-l-2 border-solid">
            {(isAdminTherapistsMain ||
              isAdminPatientsMain ||
              isAdminAfflictionsMain) && (
              <AdminTable
                allTherapists={
                  isAdminTherapistsMain ? allTherapists : undefined
                }
                allPatients={isAdminPatientsMain ? allPatients : undefined}
                allAfflictions={
                  isAdminAfflictionsMain ? allAfflictions : undefined
                }
                windowWidth={windowWidth}
              />
            )}
            {(isAdminTherapistMain || isAdminPatientMain) && (
              <AdminProfileDetails
                therapist={
                  isAdminTherapistMain && therapist ? therapist : undefined
                }
                patient={isAdminPatientMain && patient ? patient : undefined}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
