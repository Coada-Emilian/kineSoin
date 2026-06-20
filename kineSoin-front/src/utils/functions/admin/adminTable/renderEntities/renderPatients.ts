import type { IPatient } from '../../../../../@types/interfaces/modelInterfaces';

export const renderPatients = (
  allPatients: IPatient[],
  setRenderedPatients: React.Dispatch<React.SetStateAction<IPatient[]>>,
  patientStatus: string
) => {
  if (patientStatus === 'all') {
    setRenderedPatients(allPatients ?? []);
  } else if (patientStatus === 'active') {
    const activePatients = (allPatients ?? []).filter(
      (patient) => patient.status === 'active'
    );
    setRenderedPatients(activePatients);
  } else if (patientStatus === 'inactive') {
    const inactivePatients = (allPatients ?? []).filter(
      (patient) => patient.status === 'inactive'
    );
    setRenderedPatients(inactivePatients);
  } else if (patientStatus === 'banned') {
    const bannedPatients = (allPatients ?? []).filter(
      (patient) => patient.status === 'banned'
    );
    setRenderedPatients(bannedPatients);
  } else if (patientStatus === 'pending') {
    const pendingPatients = (allPatients ?? []).filter(
      (patient) => patient.status === 'pending'
    );
    setRenderedPatients(pendingPatients);
  }
};
