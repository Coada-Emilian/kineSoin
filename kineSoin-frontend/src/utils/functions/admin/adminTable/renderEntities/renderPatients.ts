import type { IPatient } from '../../../../../@types/interfaces/modelInterfaces';

export const renderPatients = (
  allPatients: IPatient[],
  patientStatus: string
): IPatient[] => {
  if (patientStatus === 'all') {
    return allPatients ?? [];
  }

  if (patientStatus === 'active') {
    return (allPatients ?? []).filter((patient) => patient.status === 'active');
  }

  if (patientStatus === 'inactive') {
    return (allPatients ?? []).filter(
      (patient) => patient.status === 'inactive'
    );
  }

  if (patientStatus === 'banned') {
    return (allPatients ?? []).filter((patient) => patient.status === 'banned');
  }

  if (patientStatus === 'pending') {
    return (allPatients ?? []).filter(
      (patient) => patient.status === 'pending'
    );
  }

  return [];
};
