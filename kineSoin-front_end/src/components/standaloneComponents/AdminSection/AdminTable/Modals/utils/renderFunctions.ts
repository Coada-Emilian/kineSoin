// renderFunctions.ts
import {
  ITherapist,
  IPatient,
  IAffliction,
} from '../../../../../@types/standardTypes';

// Function to render therapists based on status
export const renderTherapists = (
  allTherapists: ITherapist[],
  setRenderedTherapists: React.Dispatch<React.SetStateAction<ITherapist[]>>,
  therapistStatus: string
) => {
  if (therapistStatus === 'all') {
    setRenderedTherapists(allTherapists ?? []);
  } else if (therapistStatus === 'active') {
    const activeTherapists = (allTherapists ?? []).filter(
      (therapist) => therapist.status === 'active'
    );
    setRenderedTherapists(activeTherapists);
  } else if (therapistStatus === 'inactive') {
    const inactiveTherapists = (allTherapists ?? []).filter(
      (therapist) => therapist.status === 'inactive'
    );
    setRenderedTherapists(inactiveTherapists);
  }
};

// Function to render patients
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

// Function to render afflictions
export const renderAfflictions = (
  allAfflictions: IAffliction[],
  setRenderedAfflictions: React.Dispatch<React.SetStateAction<IAffliction[]>>,
  afflictionStatus: string
) => {
  if (afflictionStatus === 'all') {
    setRenderedAfflictions(allAfflictions ?? []);
  } else if (afflictionStatus === 'operated') {
    const operatedAfflictions = (allAfflictions ?? []).filter(
      (affliction) => affliction.is_operated === true
    );
    setRenderedAfflictions(operatedAfflictions);
  } else if (afflictionStatus === 'non-operated') {
    const nonOperatedAfflictions = (allAfflictions ?? []).filter(
      (affliction) => affliction.is_operated === false
    );
    setRenderedAfflictions(nonOperatedAfflictions);
  }
};
