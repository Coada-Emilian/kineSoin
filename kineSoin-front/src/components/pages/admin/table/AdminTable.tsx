import { useEffect } from 'react';
import type { IAdminEntity } from '../../../../@types/interfaces/customInterfaces';
import type { AdminTableProps } from '../../../../@types/props/customProps';
import { useAdminContext } from '../../../../contexts/AdminContext/useAdminContext';
import { getAdminTableDetails } from '../../../../utils/functions/admin/adminTable/getAdminTableDetails';
import { renderAdminEntities } from '../../../../utils/functions/admin/adminTable/renderEntities/renderAdminEntities';
import CustomButton from '../../../ui/buttons/CustomButton';
import ConfirmDeleteModal from '../../../ui/modals/ConfirmDeleteModal';
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
    renderAdminEntities({
      entityType,
      entities,
      setRenderedEntities,
      entityStatus,
    });
  }, [entityType, entityStatus, entities]);

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

        <ConfirmDeleteModal
          isOpen={openModal === 'delete'}
          onClose={closeModal}
          entity={selectedEntity ? (selectedEntity as IAdminEntity) : undefined}
          entityType={entityType}
        />

        {/* <AdminAddTherapistFormGlobalProvider>
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
