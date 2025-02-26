// Purpose: Display the body of the table based on the data being displayed.

import RegionTableBody from '../Region/RegionTableBody';
import AfflictionTableBody from '../Affliction/AfflictionTableBody';
import InsuranceTableBody from '../Insurance/InsuranceTableBody';
import MedicTableBody from '../Medic/MedicTableBody';
import PatientTableBody from '../Patient/PatientTableBody';
import TherapistTableBody from '../Therapist/TherapistTableBody';
import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardTypes';

interface TableBodyProps {
  allTherapists?: ITherapist[];
  allPatients?: IPatient[];
  allAfflictions?: IAffliction[];
  allMedics?: IMedic[];
  allInsurances?: IInsurance[];
  renderedTherapists: ITherapist[];
  renderedPatients: IPatient[];
  renderedAfflictions: IAffliction[];
  openDeleteModal: (
    therapist?: ITherapist,
    patient?: IPatient,
    affliction?: IAffliction,
    medic?: IMedic,
    insurance?: IInsurance,
    body_region?: IBodyRegion
  ) => void;
  allBodyRegions?: IBodyRegion[];
}

export default function TableBody({
  allTherapists,
  allPatients,
  allAfflictions,
  allMedics,
  allInsurances,
  renderedTherapists,
  renderedPatients,
  renderedAfflictions,
  openDeleteModal,
  allBodyRegions,
}: TableBodyProps) {
  return (
    <tbody className="xxs:text-xs xs:text-xs md:text-sm">
      {allTherapists && (
        <TherapistTableBody
          renderedTherapists={renderedTherapists}
          openDeleteModal={openDeleteModal}
        />
      )}

      {allPatients && (
        <PatientTableBody
          renderedPatients={renderedPatients}
          openDeleteModal={openDeleteModal}
        />
      )}

      {allAfflictions && (
        <AfflictionTableBody
          renderedAfflictions={renderedAfflictions}
          openDeleteModal={openDeleteModal}
        />
      )}

      {allMedics && (
        <MedicTableBody
          openDeleteModal={openDeleteModal}
          allMedics={allMedics}
        />
      )}

      {allInsurances && (
        <InsuranceTableBody
          allInsurances={allInsurances}
          openDeleteModal={openDeleteModal}
        />
      )}

      {allBodyRegions && (
       
      )}
    </tbody>
  );
}
