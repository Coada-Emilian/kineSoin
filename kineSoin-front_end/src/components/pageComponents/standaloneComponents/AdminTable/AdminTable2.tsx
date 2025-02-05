// Purpose: The purpose of this component is to render the admin table.

import { ITherapist } from '../../../../@types/ITherapist';
import { useEffect, useState } from 'react';
import { IPatient } from '../../../../@types/IPatient';
import { IAffliction } from '../../../../@types/IAffliction';
import {
  fetchTherapists,
  handleTherapistStatusChange,
} from '../../../../utils/apiUtils';
import { IMedic } from '../../../../@types/IMedic';
import { IInsurance } from '../../../../@types/IInsurance';
import AddAfflictionModal from '../../AdminSection/Modals/AddAfflictionModals/AddAfflictionModal';
import RegionModal from '../../AdminSection/Modals/RegionModal/RegionModal';
import TherapistStatusButtons from './pageComponents/Therapist/TherapistStatusButtons';
import PatientStatusButtons from './pageComponents/Patient/PatientStatusButtons';
import AfflictionStatusButtons from './pageComponents/Affliction/AfflictionStatusButtons';
import AfflictionUtilityButtons from './pageComponents/Affliction/AfflictionUtilityButtons';
import ConfirmDeleteModal from '../../AdminSection/Modals/ConfirmDeleteModal';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import AddTherapistModalP1 from '../../AdminSection/Modals/AddTherapistModals/AddTherapistModalP1';
import AddTherapistModalP2 from '../../AdminSection/Modals/AddTherapistModals/AddTherapistModalP2';
import AddTherapistModalP3 from '../../AdminSection/Modals/AddTherapistModals/AddTherapistModalP3';
import TableTitle from './pageComponents/Common/TableTitle';
import TableHead from './pageComponents/Common/TableHead';
import TableBody from './pageComponents/Common/TableBody';
import AddMedicModal from '../../AdminSection/Modals/AddMedicModals/AddMedicModal';
import AddInsuranceModal from '../../AdminSection/Modals/AddInsuranceModals/AddInsuranceModal';
import DNALoader from '../../../../utils/DNALoader';

interface AdminTable2Props {
  allPatients?: IPatient[];
  allAfflictions?: IAffliction[];
  allMedics?: IMedic[];
  allInsurances?: IInsurance[];
  windowWidth: number;
  isAdminTherapistsTable?: boolean;
}

export default function AdminTable2({
  allPatients,
  allAfflictions,
  allMedics,
  allInsurances,
  windowWidth,
  isAdminTherapistsTable,
}: AdminTable2Props) {
  // State to store all therapists fetched
  const [allTherapists, setAllTherapists] = useState<ITherapist[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTherapists()
      .then((allTherapists) => {
        setAllTherapists(allTherapists);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(allTherapists);
  }, [allTherapists]);

  if (isLoading) {
    return DNALoader();
  }
//   // States for selected therapist, patient, affliction, medic, insurance
//   const [selectedTherapist, setSelectedTherapist] = useState<ITherapist | null>(
//     null
//   );
//   const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
//   const [selectedAffliction, setSelectedAffliction] =
//     useState<IAffliction | null>(null);
//   const [selectedMedic, setSelectedMedic] = useState<IMedic | null>(null);
//   const [selectedInsurance, setSelectedInsurance] = useState<IInsurance | null>(
//     null
//   );

//   // States for modal opening
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isAddAfflictionModalOpen, setIsAddAfflictionModalOpen] =
//     useState(false);
//   const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
//   const [isAddTherapistModalP1Open, setIsAddTherapistModalP1Open] =
//     useState(false);
//   const [isAddTherapistModalP2Open, setIsAddTherapistModalP2Open] =
//     useState(false);
//   const [isAddTherapistModalP3Open, setIsAddTherapistModalP3Open] =
//     useState(false);
//   const [isAddMedicModalOpen, setIsAddMedicModalOpen] = useState(false);
//   const [isAddInsuranceModalOpen, setIsAddInsuranceModalOpen] = useState(false);

//   // States for status changes
//   const [therapistStatus, setTherapistStatus] = useState('all');
//   const [patientStatus, setPatientStatus] = useState('all');
//   const [afflictionStatus, setAfflictionStatus] = useState('all');

//   // States for rendered therapists, patients, afflictions
//   const [renderedTherapists, setRenderedTherapists] = useState<ITherapist[]>(
//     allTherapists || []
//   );
//   const [renderedPatients, setRenderedPatients] = useState<IPatient[]>(
//     allPatients || []
//   );
//   const [renderedAfflictions, setRenderedAfflictions] = useState<IAffliction[]>(
//     allAfflictions || []
//   );

//   // State for the add form
//   const [addForm, setAddForm] = useState({
//     name: '',
//     surname: '',
//     email: '',
//     password: '',
//     repeated_password: '',
//     description: '',
//     diploma: '',
//     experience: '',
//     specialty: '',
//     licence_code: '',
//     status: '',
//     photo: '' as File | unknown,
//   });

//   // useEffects to set rendered therapists, patients, afflictions
//   useEffect(() => {
//     setRenderedTherapists(allTherapists || []);
//   }, [allTherapists]);
//   useEffect(() => {
//     setRenderedPatients(allPatients || []);
//   }, [allPatients]);
//   useEffect(() => {
//     setRenderedAfflictions(allAfflictions || []);
//   }, [allAfflictions]);

//   // useEffects to render therapists, patients, afflictions
//   useEffect(() => {
//     renderTherapists();
//   }, [therapistStatus]);
//   useEffect(() => {
//     renderPatients();
//   }, [patientStatus]);
//   useEffect(() => {
//     renderAfflictions();
//   }, [afflictionStatus]);

//   // Function to render therapists based on status
//   const renderTherapists = () => {
//     if (therapistStatus === 'all') {
//       setRenderedTherapists(allTherapists ?? []);
//     } else if (therapistStatus === 'active') {
//       const activeTherapists = (allTherapists ?? []).filter(
//         (therapist) => therapist.status === 'active'
//       );
//       setRenderedTherapists(activeTherapists);
//     } else if (therapistStatus === 'inactive') {
//       const inactiveTherapists = (allTherapists ?? []).filter(
//         (therapist) => therapist.status === 'inactive'
//       );
//       setRenderedTherapists(inactiveTherapists);
//     }
//   };

//   // Function to render patients
//   const renderPatients = () => {
//     if (patientStatus === 'all') {
//       setRenderedPatients(allPatients ?? []);
//     } else if (patientStatus === 'active') {
//       const activePatients = (allPatients ?? []).filter(
//         (patient) => patient.status === 'active'
//       );
//       setRenderedPatients(activePatients);
//     } else if (patientStatus === 'inactive') {
//       const inactivePatients = (allPatients ?? []).filter(
//         (patient) => patient.status === 'inactive'
//       );
//       setRenderedPatients(inactivePatients);
//     } else if (patientStatus === 'banned') {
//       const bannedPatients = (allPatients ?? []).filter(
//         (patient) => patient.status === 'banned'
//       );
//       setRenderedPatients(bannedPatients);
//     } else if (patientStatus === 'pending') {
//       const pendingPatients = (allPatients ?? []).filter(
//         (patient) => patient.status === 'pending'
//       );
//       setRenderedPatients(pendingPatients);
//     }
//   };

//   // Function to render afflictions
//   const renderAfflictions = () => {
//     if (afflictionStatus === 'all') {
//       setRenderedAfflictions(allAfflictions ?? []);
//     } else if (afflictionStatus === 'operated') {
//       const operatedAfflictions = (allAfflictions ?? []).filter(
//         (affliction) => affliction.is_operated === true
//       );
//       setRenderedAfflictions(operatedAfflictions);
//     } else if (afflictionStatus === 'non-operated') {
//       const nonOperatedAfflictions = (allAfflictions ?? []).filter(
//         (affliction) => affliction.is_operated === false
//       );
//       setRenderedAfflictions(nonOperatedAfflictions);
//     }
//   };

//   // Function to open delete modal
//   const openDeleteModal = (
//     therapist?: ITherapist,
//     patient?: IPatient,
//     affliction?: IAffliction,
//     medic?: IMedic,
//     insurance?: IInsurance
//   ) => {
//     if (therapist) {
//       setSelectedTherapist(therapist);
//     }
//     if (patient) {
//       setSelectedPatient(patient);
//     }
//     if (affliction) {
//       setSelectedAffliction(affliction);
//     }
//     if (medic) {
//       setSelectedMedic(medic);
//     }
//     if (insurance) {
//       setSelectedInsurance(insurance);
//     }
//     setIsDeleteModalOpen(true);
//   };

//   // Function to handle therapist status change
//   const handleStatusChange = async (therapistId: number) => {
//     const response = await handleTherapistStatusChange(therapistId);
//     if (response) {
//       window.location.reload();
//     } else {
//       console.error('Failed to change therapist status');
//     }
//   };

  return (
    <>
      <div>
        <div
          className={`buttons mb-6 flex flex-row  ${allMedics || allInsurances ? 'justify-end' : 'justify-between'} md:ml-10 md:mr-10`}
        >
          {allTherapists && (
            <>
              <TherapistStatusButtons setTherapistStatus={setTherapistStatus} />

              <div>
                <CustomButton
                  btnText="Ajouter un kiné"
                  addButton
                  onClick={() => setIsAddTherapistModalP1Open(true)}
                />
              </div>
            </>
          )}

          {allPatients && (
            <PatientStatusButtons setPatientStatus={setPatientStatus} />
          )}

          {allAfflictions && (
            <>
              <AfflictionStatusButtons
                setAfflictionStatus={setAfflictionStatus}
              />

              <AfflictionUtilityButtons
                setIsRegionModalOpen={setIsRegionModalOpen}
                setIsAddAfflictionModalOpen={setIsAddAfflictionModalOpen}
              />
            </>
          )}

          {allMedics && (
            <div className="flex ">
              <CustomButton
                btnText="Ajouter un médecin"
                addButton
                onClick={() => setIsAddMedicModalOpen(true)}
              />
            </div>
          )}

          {allInsurances && (
            <div className="flex ">
              <CustomButton
                btnText="Ajouter une assurance"
                addButton
                onClick={() => setIsAddInsuranceModalOpen(true)}
              />
            </div>
          )}
        </div>

        <div>
          <TableTitle
            allTherapists={allTherapists}
            allPatients={allPatients}
            allAfflictions={allAfflictions}
            allInsurances={allInsurances}
            therapistStatus={therapistStatus}
            patientStatus={patientStatus}
            afflictionStatus={afflictionStatus}
            allMedics={allMedics}
          />
        </div>

        <table className="border-collapse border border-gray-300 w-full mx-auto md:w-11/12 md:my-auto mb-6">
          <TableHead
            windowWidth={windowWidth}
            allTherapists={allTherapists}
            allPatients={allPatients}
            allAfflictions={allAfflictions}
            allMedics={allMedics}
            allInsurances={allInsurances}
          />

          <TableBody
            windowWidth={windowWidth}
            allTherapists={allTherapists}
            allPatients={allPatients}
            allMedics={allMedics}
            allAfflictions={allAfflictions}
            allInsurances={allInsurances}
            renderedAfflictions={renderedAfflictions}
            renderedPatients={renderedPatients}
            renderedTherapists={renderedTherapists}
            handleStatusChange={handleStatusChange}
            openDeleteModal={openDeleteModal}
          />
        </table>
      </div>

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          therapist={selectedTherapist}
          patient={selectedPatient}
          affliction={selectedAffliction}
          medic={selectedMedic}
          insurance={selectedInsurance}
        />
      )}

      {isAddTherapistModalP1Open && (
        <AddTherapistModalP1
          setAddForm={setAddForm}
          setIsAddTherapistModalP1Open={setIsAddTherapistModalP1Open}
          setIsAddTherapistModalP2Open={setIsAddTherapistModalP2Open}
          isAddTherapistModalP1Open={isAddTherapistModalP1Open}
        />
      )}

      {isAddTherapistModalP2Open && (
        <AddTherapistModalP2
          setAddForm={setAddForm}
          setIsAddTherapistModalP2Open={setIsAddTherapistModalP2Open}
          setIsAddTherapistModalP3Open={setIsAddTherapistModalP3Open}
          isAddTherapistModalP2Open={isAddTherapistModalP2Open}
        />
      )}

      {isAddTherapistModalP3Open && (
        <AddTherapistModalP3
          addForm={addForm}
          setIsAddTherapistModalP3Open={setIsAddTherapistModalP3Open}
          isAddTherapistModalP3Open={isAddTherapistModalP3Open}
        />
      )}

      {isAddAfflictionModalOpen && (
        <AddAfflictionModal
          isAddAfflictionModalOpen={isAddAfflictionModalOpen}
          setIsAddAfflictionModalOpen={setIsAddAfflictionModalOpen}
        />
      )}

      {isRegionModalOpen && (
        <RegionModal
          windowWidth={windowWidth}
          isRegionModalOpen={isRegionModalOpen}
          setIsRegionModalOpen={setIsRegionModalOpen}
        />
      )}

      {isAddMedicModalOpen && (
        <AddMedicModal
          isAddMedicModalOpen={isAddMedicModalOpen}
          setIsAddMedicModalOpen={setIsAddMedicModalOpen}
        />
      )}

      {isAddInsuranceModalOpen && (
        <AddInsuranceModal
          isAddInsuranceModalOpen={isAddInsuranceModalOpen}
          setIsAddInsuranceModalOpen={setIsAddInsuranceModalOpen}
        />
      )}
    </>
  );
}
