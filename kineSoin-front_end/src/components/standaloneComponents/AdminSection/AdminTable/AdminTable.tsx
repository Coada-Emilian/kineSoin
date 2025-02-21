// Purpose: The purpose of this component is to render the admin table.

import { useEffect, useState } from 'react';
import AfflictionUtilityButtons from './pageComponents/Affliction/AfflictionUtilityButtons';
import ConfirmDeleteModal from '../Modals/ConfirmDeleteModal';
import CustomButton from '../../generalComponents/CustomButton/CustomButton';
import TableTitle from './pageComponents/Common/TableTitle';
import TableHead from './pageComponents/Common/TableHead';
import TableBody from './pageComponents/Common/TableBody';
import StatusButtons from './pageComponents/Common/StatusButtons';
import AdminModal from './pageComponents/Modals/AdminModal';
import RegionModal from './pageComponents/Modals/RegionModal';
import AddRegionModal from './pageComponents/Modals/AddRegionModal';
import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../@types/types';
import {
  renderTherapists,
  renderPatients,
  renderAfflictions,
} from './utils/renderFunctions';

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
    name: '' as string,
    surname: '' as string,
    email: '' as string,
    password: '' as string,
    repeated_password: '' as string,
    description: '' as string,
    diploma: '' as string,
    experience: '' as string,
    specialty: '' as string,
    licence_code: '' as string,
    status: '' as string,
    photo: '' as File | unknown,
    prefix: '' as string,
    phone_number: '' as string,
    full_phone_number: '' as string,
  });

  // useEffects to set rendered therapists, patients, afflictions
  useEffect(() => {
    allTherapists && setRenderedTherapists(allTherapists || []);
    allPatients && setRenderedPatients(allPatients || []);
    allAfflictions && setRenderedAfflictions(allAfflictions || []);
  }, [allTherapists, allPatients, allAfflictions]);

  // useEffects to render therapists, patients, afflictions
  useEffect(() => {
    renderTherapists(allTherapists, setRenderedTherapists, therapistStatus);
    renderPatients(allPatients, setRenderedPatients, patientStatus);
    renderAfflictions(allAfflictions, setRenderedAfflictions, afflictionStatus);
  }, [therapistStatus, patientStatus, afflictionStatus]);

  // Function to open delete modal
  const openDeleteModal = (
    therapist?: ITherapist,
    patient?: IPatient,
    affliction?: IAffliction,
    medic?: IMedic,
    insurance?: IInsurance,
    body_region?: IBodyRegion
  ) => {
    therapist
      ? setSelectedTherapist(therapist)
      : patient
        ? setSelectedPatient(patient)
        : affliction
          ? setSelectedAffliction(affliction)
          : medic
            ? setSelectedMedic(medic)
            : insurance
              ? setSelectedInsurance(insurance)
              : body_region
                ? setSelectedBodyRegion(body_region)
                : null;
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <div
        className={`${allMedics || allInsurances || allBodyRegions ? 'justify-end' : 'justify-between'} buttons mb-6 flex flex-row md:ml-10 md:mr-10`}
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
          openDeleteModal={openDeleteModal}
          allBodyRegions={allBodyRegions}
        />
      </table>

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
        <AdminModal
          isAdminAddInsuranceModal
          isAddInsuranceModalOpen={isAddInsuranceModalOpen}
          setIsAddInsuranceModalOpen={setIsAddInsuranceModalOpen}
        />
      )}
    </div>
  );
}
