/**
 * AdminTableRefactor component renders a dynamic, reusable admin data table
 * for various entity types (therapists, patients, afflictions, etc.).
 *
 * Responsibilities:
 * - Manage and render filtered entities based on the current entity type and status.
 * - Integrate with the global admin table context for modal control and entity selection.
 * - Render table headers, body, and title dynamically based on the active entity type.
 * - Provide buttons to open modals for adding or viewing entities and regions.
 * - Include modals for adding therapists (multi-step), afflictions, medics, insurance organisms, and regions.
 * - Confirm deletion modals with context-aware handling.
 *
 * Uses:
 * - React hooks for side effects and state synchronization.
 * - Context for centralized state management.
 * - Utility functions for entity rendering and table configuration.
 * - Tailwind CSS for responsive and styled UI components.
 *
 * @param {IEntitiesInterfaces} entities - Array of entities to display in the table.
 * @param {IEntityTypes} entityType - The type of entities to be rendered (e.g., therapist, patient).
 */

import { useEffect } from 'react';
import {
  IEntitiesInterfaces,
  IEntityInterface,
  IEntityTypes,
} from '../../../../../@types/types/componentTypes';
import { AdminAddTherapistFormGlobalProvider } from '../../../../../utils/contexts/AdminAddTherapistFormGlobalContext';
import { useAdminTableGlobalContext } from '../../../../../utils/contexts/AdminTableGlobalContext';
import { getAdminTableElements } from '../../../../../utils/functions/adminSection/adminTable/getAdminTableElements';
import {
  renderAfflictions,
  renderPatients,
  renderTherapists,
} from '../../../../../utils/functions/adminSection/adminTable/renderEntities/index';

import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import {
  AddAfflictionModal,
  AddInsuranceModal,
  AddMedicModal,
  AddRegionModal,
  ConfirmDeleteModal,
  FirstAddTherapistModal,
  RegionModalRefactor,
  SecondAddTherapistModal,
  ThirdAddTherapistModal,
} from './modals';
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
          className={`flex flex-row ${
            !activeEntity?.statusButtons ? 'justify-end' : 'justify-between'
          } mb-6 md:ml-10 md:mr-10`}
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

        <table className="border border-gray-300 border-separate w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-2xl shadow-2xl">
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
