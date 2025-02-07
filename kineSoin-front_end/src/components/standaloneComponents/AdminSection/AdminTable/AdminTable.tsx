// Purpose: The purpose of this component is to render the admin table.

import { ITherapist } from '../../../../@types/ITherapist';
import { useEffect, useState } from 'react';
import { IPatient } from '../../../../@types/IPatient';
import { IAffliction } from '../../../../@types/IAffliction';
import { handleTherapistStatusChange } from '../../../../utils/apiUtils';
import { IMedic } from '../../../../@types/IMedic';
import { IInsurance } from '../../../../@types/IInsurance';
import AfflictionUtilityButtons from './pageComponents/Affliction/AfflictionUtilityButtons';
import ConfirmDeleteModal from '../../AdminSection/Modals/ConfirmDeleteModal';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import TableTitle from './pageComponents/Common/TableTitle';
import TableHead from './pageComponents/Common/TableHead';
import TableBody from './pageComponents/Common/TableBody';
import AddMedicModal from '../../AdminSection/Modals/AddMedicModals/AddMedicModal';
import AddInsuranceModal from '../../AdminSection/Modals/AddInsuranceModals/AddInsuranceModal';
import StatusButtons from './StatusButtons';
import AdminModal from './AdminModal';
import { IBodyRegion } from '../../../../@types/IBodyRegion';
import RegionModal from './RegionModal';
import AddRegionModal from './AddRegionModal';

interface AdminTableProps {
  allPatients?: IPatient[];
  allAfflictions?: IAffliction[];
  allMedics?: IMedic[];
  allInsurances?: IInsurance[];
  windowWidth?: number;
  allTherapists?: ITherapist[];
  allBodyRegions?: IBodyRegion[];
}

export default function AdminTable({
  allPatients,
  allAfflictions,
  allMedics,
  allInsurances,
  windowWidth,
  allTherapists,
  allBodyRegions,
}: AdminTableProps) {
  // States for selected therapist, patient, affliction, medic, insurance
  const [selectedTherapist, setSelectedTherapist] = useState<ITherapist | null>(
    null
  );
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const [selectedAffliction, setSelectedAffliction] =
    useState<IAffliction | null>(null);
  const [selectedMedic, setSelectedMedic] = useState<IMedic | null>(null);
  const [selectedInsurance, setSelectedInsurance] = useState<IInsurance | null>(
    null
  );
  const [selectedBodyRegion, setSelectedBodyRegion] =
    useState<IBodyRegion | null>(null);

  // States for modal opening
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddAfflictionModalOpen, setIsAddAfflictionModalOpen] =
    useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [isAddTherapistModalP1Open, setIsAddTherapistModalP1Open] =
    useState(false);
  const [isAddTherapistModalP2Open, setIsAddTherapistModalP2Open] =
    useState(false);
  const [isAddTherapistModalP3Open, setIsAddTherapistModalP3Open] =
    useState(false);
  const [isAddMedicModalOpen, setIsAddMedicModalOpen] = useState(false);
  const [isAddInsuranceModalOpen, setIsAddInsuranceModalOpen] = useState(false);
  const [isAddRegionModalOpen, setIsAddRegionModalOpen] = useState(false);

  // States for status changes
  const [therapistStatus, setTherapistStatus] = useState('all');
  const [patientStatus, setPatientStatus] = useState('all');
  const [afflictionStatus, setAfflictionStatus] = useState('all');

  // States for rendered therapists, patients, afflictions
  const [renderedTherapists, setRenderedTherapists] = useState<ITherapist[]>(
    allTherapists || []
  );
  const [renderedPatients, setRenderedPatients] = useState<IPatient[]>(
    allPatients || []
  );
  const [renderedAfflictions, setRenderedAfflictions] = useState<IAffliction[]>(
    allAfflictions || []
  );

  // State for the add form
  const [addForm, setAddForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    repeated_password: '',
    description: '',
    diploma: '',
    experience: '',
    specialty: '',
    licence_code: '',
    status: '',
    photo: '' as File | unknown,
  });

  // useEffects to set rendered therapists, patients, afflictions
  useEffect(() => {
    setRenderedTherapists(allTherapists || []);
  }, [allTherapists]);
  useEffect(() => {
    setRenderedPatients(allPatients || []);
  }, [allPatients]);
  useEffect(() => {
    setRenderedAfflictions(allAfflictions || []);
  }, [allAfflictions]);

  // useEffects to render therapists, patients, afflictions
  useEffect(() => {
    renderTherapists();
  }, [therapistStatus]);
  useEffect(() => {
    renderPatients();
  }, [patientStatus]);
  useEffect(() => {
    renderAfflictions();
  }, [afflictionStatus]);

  // Function to render therapists based on status
  const renderTherapists = () => {
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
  const renderPatients = () => {
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
  const renderAfflictions = () => {
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

  // Function to open delete modal
  const openDeleteModal = (
    therapist?: ITherapist,
    patient?: IPatient,
    affliction?: IAffliction,
    medic?: IMedic,
    insurance?: IInsurance,
    body_region?: IBodyRegion
  ) => {
    if (therapist) {
      setSelectedTherapist(therapist);
    }
    if (patient) {
      setSelectedPatient(patient);
    }
    if (affliction) {
      setSelectedAffliction(affliction);
    }
    if (medic) {
      setSelectedMedic(medic);
    }
    if (insurance) {
      setSelectedInsurance(insurance);
    }
    if (body_region) {
      setSelectedBodyRegion(body_region);
    }
    setIsDeleteModalOpen(true);
  };

  // Function to handle therapist status change
  const handleStatusChange = async (therapistId: number) => {
    const response = await handleTherapistStatusChange(therapistId);
    if (response) {
      window.location.reload();
    } else {
      console.error('Failed to change therapist status');
    }
  };

  return (
    <>
      <div>
        <div
          className={`buttons mb-6 flex flex-row  ${allMedics || allInsurances || allBodyRegions ? 'justify-end' : 'justify-between'} md:ml-10 md:mr-10`}
        >
          {allTherapists && (
            <>
              <StatusButtons
                isTherapistStatusButtons
                setTherapistStatus={setTherapistStatus}
              />

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
            <StatusButtons
              isPatientStatusButtons
              setPatientStatus={setPatientStatus}
            />
          )}

          {allAfflictions && (
            <>
              <StatusButtons
                isAfflictionStatusButtons
                setAfflictionStatus={setAfflictionStatus}
              />

              <AfflictionUtilityButtons
                setIsRegionModalOpen={setIsRegionModalOpen}
                setIsAddAfflictionModalOpen={setIsAddAfflictionModalOpen}
              />
            </>
          )}

          {(allMedics || allInsurances) && (
            <div className="flex">
              <CustomButton
                btnText={
                  allMedics ? 'Ajouter un médecin' : 'Ajouter une assurance'
                }
                addButton
                onClick={() => {
                  if (allMedics) setIsAddMedicModalOpen(true);
                  if (allInsurances) setIsAddInsuranceModalOpen(true);
                }}
              />
            </div>
          )}

          {allBodyRegions && (
            <CustomButton
              btnText="Ajouter une region"
              addButton
              onClick={() => {
                setIsRegionModalOpen(false);
                setIsAddRegionModalOpen(true);
              }}
            />
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

        <table className="border-collapse border border-gray-300 w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-lg">
          <TableHead
            windowWidth={windowWidth ?? 0}
            allTherapists={allTherapists}
            allPatients={allPatients}
            allAfflictions={allAfflictions}
            allMedics={allMedics}
            allInsurances={allInsurances}
            allBodyRegions={allBodyRegions}
          />

          <TableBody
            windowWidth={windowWidth ?? 0}
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
            allBodyRegions={allBodyRegions}
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
          region={selectedBodyRegion}
        />
      )}

      {isAddTherapistModalP1Open && (
        <AdminModal
          isFirstAddTherapistModal
          setAddForm={setAddForm}
          setIsAddTherapistModalP1Open={setIsAddTherapistModalP1Open}
          setIsAddTherapistModalP2Open={setIsAddTherapistModalP2Open}
          isAddTherapistModalP1Open={isAddTherapistModalP1Open}
        />
      )}

      {isAddTherapistModalP2Open && (
        <AdminModal
          isSecondAddTherapistModal
          setAddForm={setAddForm}
          setIsAddTherapistModalP2Open={setIsAddTherapistModalP2Open}
          setIsAddTherapistModalP3Open={setIsAddTherapistModalP3Open}
          isAddTherapistModalP2Open={isAddTherapistModalP2Open}
        />
      )}

      {isAddTherapistModalP3Open && (
        <AdminModal
          isThirdAddTherapistModal
          addForm={addForm}
          setAddForm={setAddForm}
          setIsAddTherapistModalP3Open={setIsAddTherapistModalP3Open}
          isAddTherapistModalP3Open={isAddTherapistModalP3Open}
        />
      )}

      {isAddAfflictionModalOpen && (
        <AdminModal
          isAdminAfflictionAddModal
          isAddAfflictionModalOpen={isAddAfflictionModalOpen}
          setIsAddAfflictionModalOpen={setIsAddAfflictionModalOpen}
        />
      )}

      {isRegionModalOpen && (
        <RegionModal
          isRegionModalOpen={isRegionModalOpen}
          setIsRegionModalOpen={setIsRegionModalOpen}
        />
      )}

      {isAddRegionModalOpen && (
        <AddRegionModal
          isAddRegionModalOpen={isAddRegionModalOpen}
          setIsAddRegionModalOpen={setIsAddRegionModalOpen}
        />
      )}

      {isAddMedicModalOpen && (
        <AdminModal
          isAdminAddMedicModal
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
