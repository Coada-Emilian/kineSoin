import { useEffect } from 'react';
import type { AdminTableProps } from '../../../../@types/props/adminProps';
import type { IAdminEntity } from '../../../../@types/types/adminTypes';
import { AdminAddTherapistContextProvider } from '../../../../contexts/admin/AdminAddTherapistContext';
import { useAdminContext } from '../../../../hooks/context/admin/useAdminContext';
import { getAdminTableDetails } from '../../../../utils/functions/admin/adminTable/getAdminTableDetails';
import { renderAdminEntities } from '../../../../utils/functions/admin/adminTable/renderEntities/renderAdminEntities';
import CustomButton from '../../../ui/buttons/CustomButton';
import ConfirmDeleteModal from '../../../ui/modals/ConfirmDeleteModal';
import AdminAddModals from './AdminAddModals';
import AdminAddTherapistModals from './AdminAddTHerapistModals';
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
      <div className="w-full px-4 md:px-8 py-6">
        <div className="mb-4 md:mb-8">
          <TableTitle
            tableTitle={activeEntity?.tableTitle || ''}
            tableSubtitle={activeEntity?.tableSubtitle || ''}
            entityStatus={activeEntity?.entityStatus || ''}
          />
        </div>

        <div
          className={`flex flex-wrap items-center ${!activeEntity?.statusButtons ? 'justify-end mb-4' : 'justify-between gap-4 mb-4'}`}
        >
          <div className="flex w-full md:w-fit justify-center">
            {activeEntity?.statusButtons}
          </div>

          <div className="flex gap-3 w-full md:w-fit justify-center">
            {activeEntity?.regionButton && (
              <CustomButton
                btn={{
                  type: 'add',
                  text: 'Voir regions',
                  style: 'status',
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
                    style: 'status',
                    onClick: () => {
                      setOpenModal(activeEntity.modalName);
                    },
                  }}
                />
              </>
            )}
          </div>
        </div>

        <div className="w-full md:w-11/12 mx-auto bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
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

        <AdminAddTherapistContextProvider>
          <AdminAddTherapistModals />
        </AdminAddTherapistContextProvider>

        <AdminAddModals />

        <ConfirmDeleteModal
          isOpen={openModal === 'delete'}
          onClose={closeModal}
          entity={selectedEntity ? (selectedEntity as IAdminEntity) : undefined}
          entityType={entityType}
        />
      </div>
    </>
  );
}
