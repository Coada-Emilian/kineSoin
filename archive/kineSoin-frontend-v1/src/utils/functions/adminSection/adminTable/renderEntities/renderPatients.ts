/**
 * @function renderPatients
 *
 * Filters and sets the list of patients to be rendered based on their status.
 *
 * @param {IPatient[]} allPatients - Array of all patients to filter from.
 * @param {React.Dispatch<React.SetStateAction<IPatient[]>>} setRenderedPatients - State setter function to update the rendered patients list.
 * @param {string} patientStatus - Status filter to apply; expected values: 'all', 'active', 'inactive', 'banned', or 'pending'.
 *
 * @returns {void} This function updates the rendered patients state via the setter; does not return a value.
 *
 * @example
 * renderPatients(allPatients, setRenderedPatients, 'active');
 *
 * @details
 * - If `patientStatus` is 'all', sets the full list.
 * - If 'active', filters patients where `status` is 'active'.
 * - If 'inactive', filters patients where `status` is 'inactive'.
 * - If 'banned', filters patients where `status` is 'banned'.
 * - If 'pending', filters patients where `status` is 'pending'.
 * - Defaults to empty array if `allPatients` is undefined or null.
 */

import { IPatient } from '../../../../../@types/interfaces/modelInterfaces';

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
