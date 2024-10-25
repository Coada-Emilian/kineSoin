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
