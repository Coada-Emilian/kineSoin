import { useEffect, useState } from 'react';
import ConfirmDeleteModal from '../../Modals/ConfirmDeleteModal';
import CustomButton from '../../../generalComponents/CustomButton/CustomButton';
import RegionModal from '../pageComponents/Modals/RegionModal';
import AddRegionModal from '../pageComponents/Modals/AddRegionModal';
import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../@types/standardTypes';
import {
  renderTherapists,
  renderPatients,
  renderAfflictions,
} from '../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/adminTableRenderFunctions';
import { IAddForm } from '../../../../../@types/formTypes';
import TherapistsStatusButtons from '../pageComponents/Therapists/new_components/TherapistsStatusButtons';
import PatientsStatusButtons from '../pageComponents/Patients/new_components/PatientsStatusButtons';
import AfflictionsStatusButtons from '../pageComponents/Affliction/new_components/AfflictionsStatusButtons';
import TableTitleRefactor from '../pageComponents/Common/new_components/TableTitleRefactor';
import TableHeadRefactor from '../pageComponents/Common/new_components/TableHeadRefactor';
import TableBodyRefactor from '../pageComponents/Common/new_components/TableBodyRefactor';
import FirstAddTherapistModal from '../pageComponents/Modals/adminModal/variations/FirstAddTherapistModal';
import SecondAddTherapistModal from '../pageComponents/Modals/adminModal/variations/SecondAddTherapistModal';
import ThirdAddTherapistModal from '../pageComponents/Modals/adminModal/variations/ThirdAddTherapistModal';
import AddAfflictionModal from '../pageComponents/Modals/adminModal/variations/AddAfflictionModal';
import AddMedicModal from '../pageComponents/Modals/adminModal/variations/AddMedicModal';
import AddInsuranceModal from '../pageComponents/Modals/adminModal/variations/AddInsuranceModal';
import { getAdminTableElements } from '../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/getAdminTableElements';

interface AdminTableRefactorProps {
  entities: ITherapist[] | IPatient[] | IAffliction[] | IMedic[] | IInsurance[];
  entityType: string;
}

export default function AdminTableRefactor({
  entities,
  entityType,
}: AdminTableRefactorProps) {
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
  const [therapistStatus, setTherapistStatus] = useState<string>('all');
  const [patientStatus, setPatientStatus] = useState<string>('all');
  const [afflictionStatus, setAfflictionStatus] = useState<string>('all');

  // States for rendered entities
  const [renderedEntities, setRenderedEntities] = useState<
    ITherapist[] | IPatient[] | IAffliction[] | IMedic[] | IInsurance[]
  >(entities || []);

  const [selectedEntity, setSelectedEntity] = useState<
    | ITherapist
    | IPatient
    | IAffliction
    | IMedic
    | IInsurance
    | null
    | IBodyRegion
  >(null);

  //   // State for the add form
  const [addForm, setAddForm] = useState<IAddForm>({
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
    photo: undefined,
    prefix: '',
    phone_number: '',
    full_phone_number: '',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  // useEffects to set rendered therapists, patients, afflictions
  useEffect(() => {
    setRenderedEntities(entities);
  }, [entityType]);

  // useEffects to render therapists, patients, afflictions
  useEffect(() => {
    if (entityType === 'therapist') {
      renderTherapists(
        entities as ITherapist[],
        setRenderedEntities as React.Dispatch<
          React.SetStateAction<ITherapist[]>
        >,
        therapistStatus
      );
    } else if (entityType === 'affliction') {
      renderAfflictions(
        entities as IAffliction[],
        setRenderedEntities as React.Dispatch<
          React.SetStateAction<IAffliction[]>
        >,
        afflictionStatus
      );
    } else if (entityType === 'patient') {
      renderPatients(
        entities as IPatient[],
        setRenderedEntities as React.Dispatch<React.SetStateAction<IPatient[]>>,
        patientStatus
      );
    }
  }, [entityType, therapistStatus, patientStatus, afflictionStatus]);

  // Function to open delete modal
  const openDeleteModal = (
    entity:
      | ITherapist
      | IPatient
      | IAffliction
      | IMedic
      | IInsurance
      | IBodyRegion
  ) => {
    setSelectedEntity(entity);
    setIsDeleteModalOpen(true);
  };

  const tableElements = getAdminTableElements({
    setTherapistStatus,
    setPatientStatus,
    setAfflictionStatus,
    setIsAddTherapistModalP1Open,
    setIsAddAfflictionModalOpen,
    setIsAddMedicModalOpen,
    setIsAddInsuranceModalOpen,
    setIsAddRegionModalOpen,
    setIsRegionModalOpen,
    therapistStatus,
    patientStatus,
    afflictionStatus,
  });

  const activeEntity = Object.values(tableElements).find(
    (group) => entityType === group.entityType
  );

  return (
    <>
      <div className="min-h-screen">
        <div
          className={`${activeEntity && !activeEntity.statusButtons ? 'justify-end' : 'justify-between'} mb-6 flex flex-row md:ml-10 md:mr-10`}
        >
          <>
            {activeEntity?.statusButtons}

            <div className="flex gap-2">
              {activeEntity?.regionButton && (
                <CustomButton
                  btnText="Voir les regions"
                  addButton
                  onClick={() => activeEntity.setRegionModalOpen(true)}
                />
              )}

              {activeEntity?.customBtnText && (
                <CustomButton
                  btnText={activeEntity.customBtnText}
                  addButton
                  onClick={() => activeEntity.setModalOpen(true)}
                />
              )}
            </div>
          </>
        </div>

        <div>
          <TableTitleRefactor
            tableTitle={activeEntity?.tableTitle || ''}
            entityStatus={activeEntity?.entityStatus || ''}
          />
        </div>

        <table className="border-separate border border-gray-300 w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-2xl shadow-2xl">
          <TableHeadRefactor
            secondHeaderContent={activeEntity?.secondTableHeadContent || ''}
            thirdHeaderContent={activeEntity?.thirdTableHeadContent || ''}
            fourthHeaderContent={activeEntity?.fourthTableHeadContent || ''}
          />

          <TableBodyRefactor
            renderedEntities={renderedEntities}
            entityType={entityType}
            openDeleteModal={openDeleteModal}
          />
        </table>

        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            entity={
              selectedEntity as
                | ITherapist
                | IPatient
                | IAffliction
                | IMedic
                | IInsurance
                | IBodyRegion
            }
            entityType={entityType}
          />
        )}

        {isAddTherapistModalP1Open && (
          <FirstAddTherapistModal
            setAddForm={setAddForm}
            onClose={() => setIsAddTherapistModalP1Open(false)}
            isOpen={isAddTherapistModalP1Open}
            setIsAddTherapistModalP2Open={setIsAddTherapistModalP2Open}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        )}

        {isAddTherapistModalP2Open && (
          <SecondAddTherapistModal
            setAddForm={setAddForm}
            isOpen={isAddTherapistModalP2Open}
            onClose={() => setIsAddTherapistModalP2Open(false)}
            setIsAddTherapistModalP3Open={setIsAddTherapistModalP3Open}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        )}

        {isAddTherapistModalP3Open && (
          <ThirdAddTherapistModal
            addForm={addForm}
            setAddForm={setAddForm}
            isOpen={isAddTherapistModalP3Open}
            onClose={() => setIsAddTherapistModalP3Open(false)}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        )}

        {isAddAfflictionModalOpen && (
          <AddAfflictionModal
            isOpen={isAddAfflictionModalOpen}
            onClose={() => setIsAddAfflictionModalOpen(false)}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        )}

        {isAddMedicModalOpen && (
          <AddMedicModal
            isOpen={isAddMedicModalOpen}
            onClose={() => setIsAddMedicModalOpen(false)}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        )}

        {isAddInsuranceModalOpen && (
          <AddInsuranceModal
            isOpen={isAddInsuranceModalOpen}
            onClose={() => setIsAddInsuranceModalOpen(false)}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        )}

        {isRegionModalOpen && (
          <RegionModal
            isOpen={isRegionModalOpen}
            onClose={() => setIsRegionModalOpen(false)}
            setIsAddRegionModalOpen={setIsAddRegionModalOpen}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            openDeleteModal={openDeleteModal}
          />
        )}

        {isAddRegionModalOpen && (
          <AddRegionModal
            isOpen={isAddRegionModalOpen}
            onClose={() => setIsAddRegionModalOpen(false)}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        )}
      </div>
    </>
  );
}
