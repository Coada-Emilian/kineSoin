import { useEffect } from 'react';
import type { AdminTableProps } from '../../../../@types/props/customProps';
import { useAdminContext } from '../../../../contexts/AdminContext/useAdminContext';
import { getAdminTableDetails } from '../../../../utils/functions/admin/adminTable/getAdminTableDetails';
import { renderAfflictions } from '../../../../utils/functions/admin/adminTable/renderAfflictions';
import { renderPatients } from '../../../../utils/functions/admin/adminTable/renderPatients';
import { renderTherapists } from '../../../../utils/functions/admin/adminTable/renderTherapists';
import CustomButton from '../../../ui/buttons/CustomButton';
import TableBody from './body/TableBody';
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
      <div className="w-full px-4">
        <div
          className={`flex items-center mb-6 ${!activeEntity?.statusButtons ? 'justify-end' : 'justify-between'}`}
        >
          <>
            {activeEntity?.statusButtons}

            <div className="flex gap-3">
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

        <div className="mb-4 md:px-10">
          <TableTitle
            tableTitle={activeEntity?.tableTitle || ''}
            entityStatus={activeEntity?.entityStatus || ''}
          />
        </div>

        <div className="w-full md:w-11/12 mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <TableHead
              secondHeaderContent={activeEntity?.secondTableHeadContent || ''}
              thirdHeaderContent={activeEntity?.thirdTableHeadContent || ''}
              fourthHeaderContent={activeEntity?.fourthTableHeadContent || ''}
            />

            <TableBody
              renderedEntities={renderedEntities}
              entityType={entityType}
            />
          </table>
        </div>

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
