import { useEffect } from 'react';
import type { AdminTableProps } from '../../../../@types/props/customProps';
import { useAdminContext } from '../../../../contexts/AdminContext/useAdminContext';
import { getAdminTableDetails } from '../../../../utils/functions/admin/adminTable/getAdminTableDetails';
import { renderAfflictions } from '../../../../utils/functions/admin/adminTable/renderAfflictions';
import { renderPatients } from '../../../../utils/functions/admin/adminTable/renderPatients';
import { renderTherapists } from '../../../../utils/functions/admin/adminTable/renderTherapists';
import CustomButton from '../../../ui/buttons/CustomButton';
import TableBodyRefactor from './body/TableBody';
import TableHead from './head/TableHead';
import TableTitle from './title/TableTitle';

export default function AdminTable({ entities, entityType }: AdminTableProps) {
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
  } = useAdminContext();

  useEffect(() => {
    setRenderedEntities(entities);
    console.log(entities, entityType);
  }, [entityType, entities]);

  useEffect(() => {
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
  const tableElements = getAdminTableDetails({
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
                <CustomButton
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
                  <CustomButton
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
          <TableTitle
            tableTitle={activeEntity?.tableTitle || ''}
            entityStatus={activeEntity?.entityStatus || ''}
          />
        </div>

        <table className="border border-gray-300 border-separate w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-2xl shadow-2xl">
          <TableHead
            secondHeaderContent={activeEntity?.secondTableHeadContent || ''}
            thirdHeaderContent={activeEntity?.thirdTableHeadContent || ''}
            fourthHeaderContent={activeEntity?.fourthTableHeadContent || ''}
          />

          <TableBodyRefactor
            renderedEntities={renderedEntities}
            entityType={entityType}
          />
        </table>

        {/* <ConfirmDeleteModal
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
        /> */}
      </div>
    </>
  );
}
