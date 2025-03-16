/**
 * @function AdminTableRefactor
 *
 * A refactored admin table component that dynamically displays entities (therapists, patients, afflictions)
 * based on the selected entity type. It handles the rendering of a table, modals for entity actions,
 * and buttons for specific entity functionalities like region viewing and adding new items.
 *
 * @param entities - A list of entities to render in the table (therapists, patients, or afflictions).
 * @param entityType - The type of entity to be displayed ('therapist', 'patient', 'affliction').
 *
 * @returns JSX.Element - The component that renders the table, modals, and entity actions.
 *
 * @example
 * <AdminTableRefactor entities={entities} entityType="therapist" />
 *
 * @remarks
 * - Handles dynamic rendering of rows based on entity type.
 * - Includes modal management for creating, updating, and deleting entities.
 * - The component uses context to manage the state and actions like opening modals and setting selected entities.
 */

import { useEffect } from 'react';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';
import RegionModal from './modals/RegionModal';
import AddRegionModal from './modals/add_modals/AddRegionModal';
import {
  renderTherapists,
  renderPatients,
  renderAfflictions,
} from '../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/adminTableRenderFunctions';
import TableTitleRefactor from './page_components/common/TableTitleRefactor';
import TableHeadRefactor from './page_components/common/TableHeadRefactor';
import TableBodyRefactor from './page_components/common/TableBodyRefactor';
import FirstAddTherapistModal from './modals/add_modals/FirstAddTherapistModal';
import SecondAddTherapistModal from './modals/add_modals/SecondAddTherapistModal';
import ThirdAddTherapistModal from './modals/add_modals/ThirdAddTherapistModal';
import AddAfflictionModal from './modals/add_modals/AddAfflictionModal';
import AddMedicModal from './modals/add_modals/AddMedicModal';
import AddInsuranceModal from './modals/add_modals/AddInsuranceModal';
import { getAdminTableElements } from '../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/getAdminTableElements';
import {
  IEntitiesInterfaces,
  IEntityInterface,
  IEntityTypes,
} from '../../../../../@types/componentTypes';
import { useAdminTableGlobalContext } from '../../../../../utils/contexts/AdminTableGlobalContext';
import { AdminAddTherapistFormGlobalProvider } from '../../../../../utils/contexts/AdminAddTherapistFormGlobalContext';
import CustomBtn from '../../../generalComponents/CustomButton/CustomButtonRefactor';
import { PrefixesContextProvider } from '../../../../../utils/contexts/PrefixesContext';

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
  }, [entityType]);

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

        <PrefixesContextProvider>
          <AdminAddTherapistFormGlobalProvider>
            <FirstAddTherapistModal
              onClose={closeModal}
              isOpen={openModal === 'addTherapistP1'}
              setIsAddTherapistModalP2Open={() =>
                setOpenModal('addTherapistP2')
              }
            />

            <SecondAddTherapistModal
              isOpen={openModal === 'addTherapistP2'}
              onClose={closeModal}
              setIsAddTherapistModalP3Open={() =>
                setOpenModal('addTherapistP3')
              }
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

          <AddMedicModal
            isOpen={openModal === 'addMedic'}
            onClose={closeModal}
          />

          <AddInsuranceModal
            isOpen={openModal === 'addInsurance'}
            onClose={closeModal}
          />
        </PrefixesContextProvider>

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
