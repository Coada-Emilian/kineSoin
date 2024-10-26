/**
 * @file TableBody.tsx
 * @description A React functional component that renders a table body for displaying various entities such as therapists, patients, afflictions, medics, and insurances. It conditionally renders the corresponding table bodies based on the available data.
 *
 * @param {Object} props - The props for the TableBody component.
 * @param {number} props.windowWidth - The current window width, used to adjust styles and layout.
 * @param {ITherapist[]} [props.allTherapists] - An optional array of all therapists.
 * @param {IPatient[]} [props.allPatients] - An optional array of all patients.
 * @param {IAffliction[]} [props.allAfflictions] - An optional array of all afflictions.
 * @param {IMedic[]} [props.allMedics] - An optional array of all medics.
 * @param {IInsurance[]} [props.allInsurances] - An optional array of all insurances.
 * @param {ITherapist[]} props.renderedTherapists - An array of therapists to render in the table.
 * @param {IPatient[]} props.renderedPatients - An array of patients to render in the table.
 * @param {IAffliction[]} props.renderedAfflictions - An array of afflictions to render in the table.
 * @param {function(number): void} props.handleStatusChange - A function to handle status changes for a specific entity by ID.
 * @param {function(ITherapist | IPatient | IAffliction | IMedic | IInsurance): void} props.openDeleteModal - A function to open a delete modal for the specified entity.
 *
 * @returns {JSX.Element} The rendered table body containing rows for therapists, patients, afflictions, medics, and insurances as applicable.
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
