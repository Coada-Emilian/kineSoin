/**
 * @file TableBody.tsx
 * @description A component that renders the body of a table dynamically based on the
 * provided therapist, patient, affliction, medic, and insurance data. It displays
 * corresponding rows for each entity based on the available data and handles status
 * changes and deletion of entities.
 *
 * @interface TableBodyProps
 * @param {number} windowWidth - The current width of the window, used to adjust
 * the styling and font size of the table body.
 * @param {ITherapist[]} [allTherapists] - An optional array of therapists that
 * determines whether to render therapist-related rows.
 * @param {IPatient[]} [allPatients] - An optional array of patients that determines
 * whether to render patient-related rows.
 * @param {IAffliction[]} [allAfflictions] - An optional array of afflictions that
 * determines whether to render affliction-related rows.
 * @param {IMedic[]} [allMedics] - An optional array of medics that determines whether
 * to render medic-related rows.
 * @param {IInsurance[]} [allInsurances] - An optional array of insurances that
 * determines whether to render insurance-related rows.
 * @param {ITherapist[]} renderedTherapists - An array of therapists to render in the
 * table body.
 * @param {IPatient[]} renderedPatients - An array of patients to render in the
 * table body.
 * @param {IAffliction[]} renderedAfflictions - An array of afflictions to render in
 * the table body.
 * @param {(id: number) => void} handleStatusChange - A function that handles the
 * status change of a given entity identified by its ID.
 * @param {(
 *   therapist?: ITherapist,
 *   patient?: IPatient,
 *   affliction?: IAffliction,
 *   medic?: IMedic,
 *   insurance?: IInsurance
 * ) => void} openDeleteModal - A function that opens the delete modal for a specific
 * entity based on the provided parameters.
 *
 * @returns {JSX.Element} The rendered TableBody component displaying rows for the
 * relevant entities based on the provided props.
 */

import { IAffliction } from '../../../../../../@types/IAffliction';
import { IInsurance } from '../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../@types/IMedic';
import { IPatient } from '../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../@types/ITherapist';
import AfflictionTableBody from '../Affliction/AfflictionTableBody';
import InsuranceTableBody from '../Insurance/InsuranceTableBody';
import MedicTableBody from '../Medic/MedicTableBody';
import PatientTableBody from '../Patient/PatientTableBody';
import TherapistTableBody from '../Therapist/TherapistTableBody';

interface TableBodyProps {
  windowWidth: number;
  allTherapists?: ITherapist[];
  allPatients?: IPatient[];
  allAfflictions?: IAffliction[];
  allMedics?: IMedic[];
  allInsurances?: IInsurance[];
  renderedTherapists: ITherapist[];
  renderedPatients: IPatient[];
  renderedAfflictions: IAffliction[];
  handleStatusChange: (id: number) => void;
  openDeleteModal: (
    therapist?: ITherapist,
    patient?: IPatient,
    affliction?: IAffliction,
    medic?: IMedic,
    insurance?: IInsurance
  ) => void;
}

export default function TableBody({
  windowWidth,
  allTherapists,
  allPatients,
  allAfflictions,
  allMedics,
  allInsurances,
  renderedTherapists,
  renderedPatients,
  renderedAfflictions,
  handleStatusChange,
  openDeleteModal,
}: TableBodyProps) {
  return (
    <tbody className={windowWidth < 450 ? 'text-xxs' : 'text-xs md:text-sm'}>
      {allTherapists && (
        <TherapistTableBody
          renderedTherapists={renderedTherapists}
          windowWidth={windowWidth}
          handleStatusChange={handleStatusChange}
          openDeleteModal={openDeleteModal}
        />
      )}

      {allPatients && (
        <PatientTableBody
          renderedPatients={renderedPatients}
          windowWidth={windowWidth}
          openDeleteModal={openDeleteModal}
        />
      )}

      {allAfflictions && (
        <AfflictionTableBody
          renderedAfflictions={renderedAfflictions}
          windowWidth={windowWidth}
          openDeleteModal={openDeleteModal}
        />
      )}

      {allMedics && (
        <MedicTableBody
          windowWidth={windowWidth}
          openDeleteModal={openDeleteModal}
          allMedics={allMedics}
        />
      )}

      {allInsurances && (
        <InsuranceTableBody
          windowWidth={windowWidth}
          allInsurances={allInsurances}
          openDeleteModal={openDeleteModal}
        />
      )}
    </tbody>
  );
}
