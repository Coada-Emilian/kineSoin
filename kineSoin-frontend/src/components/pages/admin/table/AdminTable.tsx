import { useEffect } from 'react';
import type { AdminTableProps } from '../../../../@types/props/adminProps';
import type { IAdminEntity } from '../../../../@types/types/adminTypes';
import { AdminAddTherapistContextProvider } from '../../../../contexts/admin/AdminAddTherapistContext';
import { getAdminTableDetails } from '../../../../utils/functions/admin/adminTable/getAdminTableDetails';
import { renderAdminEntities } from '../../../../utils/functions/admin/adminTable/renderEntities/renderAdminEntities';
import CustomButton from '../../../ui/buttons/CustomButton';
import AddAfflictionModal from '../../../ui/modals/admin/AddAfflictionModal';
import AddBodyRegionModal from '../../../ui/modals/admin/AddBodyRegionModal';
import AddInsuranceModal from '../../../ui/modals/admin/AddInsuranceModal';
import AddMedicModal from '../../../ui/modals/admin/AddMedicModal';
import FirstAddTherapistModal from '../../../ui/modals/admin/addTherapist/FirstAddTherapistModal';
import SecondAddTherapistModal from '../../../ui/modals/admin/addTherapist/SecondAddTherapistModal';
import ThirdAddTherapistModal from '../../../ui/modals/admin/addTherapist/ThirdAddTherapistModal';
import BodyRegionsModal from '../../../ui/modals/admin/bodyRegionsModal/BodyRegionsModal';
import ConfirmDeleteModal from '../../../ui/modals/ConfirmDeleteModal';
import TableBody from './body/TableBody';
import TableHead from './head/TableHead';
import TableTitle from './title/TableTitle';
import { useAdminContext } from '../../../../hooks/context/useAdminContext';

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

        <AdminAddTherapistContextProvider>
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
        </AdminAddTherapistContextProvider>

        <AddAfflictionModal
          isOpen={openModal === 'addAffliction'}
          onClose={closeModal}
        />

        <AddMedicModal isOpen={openModal === 'addMedic'} onClose={closeModal} />

        <AddInsuranceModal
          isOpen={openModal === 'addInsurance'}
          onClose={closeModal}
        />

        <BodyRegionsModal
          isOpen={openModal === 'region'}
          onClose={closeModal}
          setIsAddRegionModalOpen={() => setOpenModal('addRegion')}
        />

        <AddBodyRegionModal
          isOpen={openModal === 'addRegion'}
          onClose={closeModal}
          setIsRegionModalOpen={() => setOpenModal('region')}
        />

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
