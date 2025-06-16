import { useEffect } from 'react';
import {
  IEntitiesInterfaces,
  IEntityInterface,
  IEntityTypes,
} from '../../../../../@types/types/componentTypes';
import { AdminAddTherapistFormGlobalProvider } from '../../../../../utils/contexts/AdminAddTherapistFormGlobalContext';
import { useAdminTableGlobalContext } from '../../../../../utils/contexts/AdminTableGlobalContext';
import { getAdminTableElements } from '../../../../../utils/functions/component_utils/page_components/admin_table/getAdminTableElements';
import {
  renderAfflictions,
  renderPatients,
  renderTherapists,
} from '../../../../../utils/functions/component_utils/page_components/admin_table/render_entities/index';
import AddAfflictionModal from '../../../adminSection/adminTable/newComponents/modals/addModals/AddAfflictionModal';
import AddInsuranceModal from '../../../adminSection/adminTable/newComponents/modals/addModals/AddInsuranceModal';
import AddMedicModal from '../../../adminSection/adminTable/newComponents/modals/addModals/AddMedicModal';
import AddRegionModal from '../../../adminSection/adminTable/newComponents/modals/addModals/AddRegionModal';
import FirstAddTherapistModal from '../../../adminSection/adminTable/newComponents/modals/addModals/FirstAddTherapistModal';
import SecondAddTherapistModal from '../../../adminSection/adminTable/newComponents/modals/addModals/SecondAddTherapistModal';
import ThirdAddTherapistModal from '../../../adminSection/adminTable/newComponents/modals/addModals/ThirdAddTherapistModal';
import ConfirmDeleteModal from '../../../adminSection/adminTable/newComponents/modals/ConfirmDeleteModal';
import RegionModalRefactor from '../../../adminSection/adminTable/newComponents/modals/RegionModalRefactor';
import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import TableBodyRefactor from './pageComponents/commonComponents/TableBodyRefactor';
import TableHeadRefactor from './pageComponents/commonComponents/TableHeadRefactor';
import TableTitleRefactor from './pageComponents/commonComponents/TableTitleRefactor';

interface AdminTableRefactorProps {
  entities: IEntitiesInterfaces;
  entityType: IEntityTypes;
}

export default function AdminTableRefactor({
  entities,
  entityType,
}: AdminTableRefactorProps) {
  // Get required context values
  const {
    openModal,
    setOpenModal,
    selectedEntity,
    closeModal,
    entityStatus,
    setEntityStatus,
    renderedEntities,
    setRenderedEntities,
  } = useAdminTableGlobalContext();

  // useEffect to set rendered therapists, patients, afflictions
  useEffect(() => {
    setRenderedEntities(entities);
  }, [entityType, entities]);

  // useEffect to render therapists, patients, afflictions
  useEffect(() => {
    // Render functions for therapists, patients, afflictions
    const renderFunctions: Record<string, Function> = {
      therapist: renderTherapists,
      affliction: renderAfflictions,
      patient: renderPatients,
    };

    // Status map for therapists, patients, afflictions
    const statusMap: Record<string, string> = {
      therapist: entityStatus,
      affliction: entityStatus,
      patient: entityStatus,
    };

    // Get the render function for the entity type
    const renderFunction = renderFunctions[entityType];

    // If the render function exists, render the entities
    if (renderFunction) {
      renderFunction(entities, setRenderedEntities, statusMap[entityType]);
    }
  }, [entityType, entityStatus]);

  // Get the table elements for therapists, patients, afflictions
  const tableElements = getAdminTableElements({
    entityStatus,
    setEntityStatus,
  });

  // Get the active entity
  const activeEntity = Object.values(tableElements).find(
    (group) => entityType === group.entityType
  );

  return (
    <>
      <div className="min-h-screen">
        <div
          className={`${!activeEntity?.statusButtons ? 'justify-end' : 'justify-between'} mb-6 flex flex-row md:ml-10 md:mr-10`}
        >
          <>
            {activeEntity?.statusButtons}

            <div className="flex gap-2">
              {activeEntity?.regionButton && (
                <CustomBtn
                  btn={{
                    type: 'add',
                    text: 'Voir les regions',
                    style: 'nav',
                    onClick: () => {
                      setOpenModal('region');
                    },
                  }}
                />
              )}

              {activeEntity?.customBtnText && (
                <>
                  <CustomBtn
                    btn={{
                      type: 'add',
                      text: activeEntity.customBtnText,
                      style: 'nav',
                      onClick: () => {
                        setOpenModal(activeEntity.modalName);
                      },
                    }}
                  />
                </>
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

        {/* <PrefixesContextProvider> */}
        <AdminAddTherapistFormGlobalProvider>
          <FirstAddTherapistModal
            onClose={closeModal}
            isOpen={openModal === 'addTherapistP1'}
            setIsAddTherapistModalP2Open={() => setOpenModal('addTherapistP2')}
          />

          <SecondAddTherapistModal
            isOpen={openModal === 'addTherapistP2'}
            onClose={closeModal}
            setIsAddTherapistModalP3Open={() => setOpenModal('addTherapistP3')}
          />

          <ThirdAddTherapistModal
            isOpen={openModal === 'addTherapistP3'}
            onClose={closeModal}
          />
        </AdminAddTherapistFormGlobalProvider>

        <AddAfflictionModal
          isOpen={openModal === 'addAffliction'}
          onClose={closeModal}
        />

        <AddMedicModal isOpen={openModal === 'addMedic'} onClose={closeModal} />

        <AddInsuranceModal
          isOpen={openModal === 'addInsurance'}
          onClose={closeModal}
        />
        {/* </PrefixesContextProvider> */}

        <RegionModalRefactor
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
