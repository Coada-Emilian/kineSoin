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
import { useAdminTableGlobalContext } from '../../../../../utils/contexts/AdminTableGlobalContext';
import { AdminAddTherapistFormGlobalProvider } from '../../../../../utils/contexts/AdminAddTherapistFormGlobalContext';
import CustomBtn from '../../../generalComponents/CustomButton/CustomButtonRefactor';
import PrefixesContext, {
  PrefixesContextProvider,
} from '../../../../../utils/contexts/PrefixesContext';

interface AdminTableRefactorProps {
  entities: IEntitiesInterfaces;
  entityType: IEntityTypes;
}

export default function AdminTableRefactor({
  entities,
  entityType,
}: AdminTableRefactorProps) {
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
      therapist: entityStatus,
      affliction: entityStatus,
      patient: entityStatus,
    };

    const renderFunction = renderFunctions[entityType];
    if (renderFunction) {
      renderFunction(entities, setRenderedEntities, statusMap[entityType]);
    }
  }, [entityType, entityStatus]);

  const tableElements = getAdminTableElements({
    entityStatus,
    setEntityStatus,
  });

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
                    btnType: 'addBtn',
                    btnText: 'Voir les regions',
                    isStatusBtn: true,
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
                      btnType: 'addBtn',
                      btnText: activeEntity.customBtnText,
                      isStatusBtn: true,
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
