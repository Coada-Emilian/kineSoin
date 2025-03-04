import { useEffect, useState } from 'react';
import ConfirmDeleteModal from '../../Modals/ConfirmDeleteModal';
import CustomButton from '../../../generalComponents/CustomButton/CustomButton';
import RegionModal from '../pageComponents/Modals/RegionModal';
import AddRegionModal from '../pageComponents/Modals/AddRegionModal';
import {
  renderTherapists,
  renderPatients,
  renderAfflictions,
} from '../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/adminTableRenderFunctions';
import { IAddForm } from '../../../../../@types/formInterfaces';
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
import {
  IEntitiesInterfaces,
  IEntityInterface,
  IEntityTypes,
  IModalTypes,
} from '../../../../../@types/componentTypes';
import { useAdminTableGlobalContext } from '../../../../../contexts/AdminTableGlobalContext';

interface AdminTableRefactorProps {
  entities: IEntitiesInterfaces;
  entityType: IEntityTypes;
}

export default function AdminTableRefactor({
  entities,
  entityType,
}: AdminTableRefactorProps) {
  // const [openModal, setOpenModal] = useState<IModalTypes | null>(null); // State for modal opening
  // const closeModal = () => {
  //   setOpenModal(null);
  // };

  const {
    openModal,
    setOpenModal,
    selectedEntity,
    setSelectedEntity,
    setRegionDeleteModal,
    closeModal,
  } = useAdminTableGlobalContext();

  // States for status changes
  const [therapistStatus, setTherapistStatus] = useState<string>('all');
  const [patientStatus, setPatientStatus] = useState<string>('all');
  const [afflictionStatus, setAfflictionStatus] = useState<string>('all');

  // States for rendered entities
  const [renderedEntities, setRenderedEntities] = useState<IEntitiesInterfaces>(
    entities || []
  );

  // const [selectedEntity, setSelectedEntity] = useState<IEntityInterface>(null);

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

  // useEffects to set rendered therapists, patients, afflictions
  useEffect(() => {
    setRenderedEntities(entities);
  }, [entityType]);

  // useEffects to render therapists, patients, afflictions
  useEffect(() => {
    const renderFunctions: Record<string, Function> = {
      therapist: renderTherapists,
      affliction: renderAfflictions,
      patient: renderPatients,
    };

    const statusMap: Record<string, string> = {
      therapist: therapistStatus,
      affliction: afflictionStatus,
      patient: patientStatus,
    };

    const renderFunction = renderFunctions[entityType];
    if (renderFunction) {
      renderFunction(entities, setRenderedEntities, statusMap[entityType]);
    }
  }, [entityType, therapistStatus, patientStatus, afflictionStatus]);

  // const [regionDeleteModal, setRegionDeleteModal] = useState(false);

  // Function to open delete modal
  const openDeleteModal = (
    entity: IEntityInterface,
    isRegionModal?: boolean
  ) => {
    setSelectedEntity(entity);
    isRegionModal && setRegionDeleteModal(true);
  };

  useEffect(() => {
    if (selectedEntity) {
      setOpenModal('delete');
    }
  }, [selectedEntity]);

  const tableElements = getAdminTableElements({
    setTherapistStatus,
    setPatientStatus,
    setAfflictionStatus,
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
                  onClick={() => setOpenModal('region')}
                />
              )}

              {activeEntity?.customBtnText && (
                <CustomButton
                  btnText={activeEntity.customBtnText}
                  addButton
                  // FIXME: le as ModalType est à éviter car il casse le typage
                  onClick={() =>
                    setOpenModal(activeEntity.modalName as IModalTypes)
                  }
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
          />
        </table>

        <ConfirmDeleteModal
          isOpen={openModal === 'delete'}
          onClose={closeModal}
          entity={
            selectedEntity ? (selectedEntity as IEntityInterface) : undefined
          }
          entityType={entityType}
        />

        <FirstAddTherapistModal
          setAddForm={setAddForm}
          onClose={closeModal}
          isOpen={openModal === 'addTherapistP1'}
          setIsAddTherapistModalP2Open={() => setOpenModal('addTherapistP2')}
        />

        <SecondAddTherapistModal
          setAddForm={setAddForm}
          isOpen={openModal === 'addTherapistP2'}
          onClose={closeModal}
          setIsAddTherapistModalP3Open={() => setOpenModal('addTherapistP3')}
        />

        <ThirdAddTherapistModal
          addForm={addForm}
          setAddForm={setAddForm}
          isOpen={openModal === 'addTherapistP3'}
          onClose={closeModal}
        />

        <AddAfflictionModal
          isOpen={openModal === 'addAffliction'}
          onClose={closeModal}
        />

        <AddMedicModal isOpen={openModal === 'addMedic'} onClose={closeModal} />

        <AddInsuranceModal
          isOpen={openModal === 'addInsurance'}
          onClose={closeModal}
        />

        <RegionModal
          isOpen={openModal === 'region'}
          onClose={closeModal}
          setIsAddRegionModalOpen={() => setOpenModal('addRegion')}
        />

        <AddRegionModal
          isOpen={openModal === 'addRegion'}
          onClose={closeModal}
        />
      </div>
    </>
  );
}
