import { useNavigate } from 'react-router-dom';
import DNALoader from '../../../../utils/DNALoader';
import BaseModal from '../../PrivateSection/TherapistSection/Modals/BaseModal';
import { handleBodyRegionDeleteAsAdmin } from '../../../../utils/apiUtils/adminApiUtils/adminBodyRegionApiUtils';
import { getDeleteModalEntityDetails } from '../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/getDeleteModalEntityDetails';
import { IEntityInterface } from '../../../../@types/componentTypes';
import { useGlobalContext } from '../../../../utils/contexts/GlobalContext';
import { useEffect, useState } from 'react';
import { useAdminTableGlobalContext } from '../../../../utils/contexts/AdminTableGlobalContext';
import CustomBtn from '../../generalComponents/CustomButton/CustomButtonRefactor';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  entity: IEntityInterface;
  entityType: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  entity,
  entityType,
}: ConfirmDeleteModalProps) {
  const navigate = useNavigate();
  const { isLoading, setLoading } = useGlobalContext();

  const [activeEntity, setActiveEntity] = useState<IEntityInterface>(null);

  const { regionDeleteModal, setRegionDeleteModal } =
    useAdminTableGlobalContext();

  useEffect(() => {
    if (entity) {
      const modalEntityDetails = getDeleteModalEntityDetails(entity);
      const activeEntity = modalEntityDetails.find(
        (entityDetails) => entityDetails.entityType === entityType
      );
      if (activeEntity) {
        setActiveEntity(activeEntity);
      }
    }
  }, [entity]);

  if (isLoading) return DNALoader();

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center mx-auto text-center gap-3 w-fit p-6 text:xxs xs:text-xs md:text-sm lg:text-base xl:text-lg">
        {regionDeleteModal ? (
          <>
            <p>
              Êtes-vous sûr de vouloir supprimer la région{' '}
              <span className="font-semibold">{entity.name}</span> ?
            </p>
            <span className="text-red-500 font-medium">
              Cette action est irréversible.
            </span>

            <div className="flex justify-center mt-4 gap-4">
              <CustomBtn
                btn={{
                  btnType: 'deleteBtn',
                  btnText: 'Confirmer',
                  isNormalBtn: true,
                  onClick: () => {
                    onClose && onClose();
                    setLoading(true);
                    handleBodyRegionDeleteAsAdmin(entity.id);
                    setRegionDeleteModal(false);
                    setLoading(false);
                    window.location.reload();
                  },
                }}
              />

              <CustomBtn
                btn={{
                  btnType: 'cancelBtn',
                  btnText: 'Annuler',
                  isNormalBtn: true,
                  onClick: () => {
                    onClose && onClose();
                    setRegionDeleteModal(false);
                  },
                }}
              />
            </div>
          </>
        ) : (
          <>
            {activeEntity?.full_name && (
              <p>
                Êtes-vous sûr de vouloir supprimer le profil de{' '}
                <span className="font-semibold italic">
                  {activeEntity.full_name}
                </span>{' '}
                ?
              </p>
            )}

            {activeEntity?.entityType === 'affliction' && (
              <p>
                Êtes-vous sûr de vouloir supprimer l'affliction{' '}
                <span className="font-semibold italic">
                  {activeEntity.name}
                </span>{' '}
                ?
              </p>
            )}

            {activeEntity?.entityType === 'insurance' && (
              <p>
                Êtes-vous sûr de vouloir supprimer l'organisme{' '}
                <span className="font-semibold italic">
                  {activeEntity.name}
                </span>{' '}
                ?
              </p>
            )}
            <span className="text-red-500 font-medium">
              Cette action est irréversible.
            </span>

            <div className="flex justify-center mt-4 gap-4">
              <>
                <CustomBtn
                  btn={{
                    btnType: 'deleteBtn',
                    btnText: 'Confirmer',
                    isNormalBtn: true,
                    onClick: () => {
                      onClose && onClose();
                      setLoading(true);
                      {
                        activeEntity?.function(entity.id);
                      }
                      setLoading(false);
                      navigate(
                        activeEntity?.redirect
                          ? activeEntity.redirect
                          : '/admin'
                      );
                      window.location.reload();
                    },
                  }}
                />

                <CustomBtn
                  btn={{
                    btnType: 'cancelBtn',
                    btnText: 'Annuler',
                    isNormalBtn: true,
                    onClick: () => onClose && onClose(),
                  }}
                />
              </>
            </div>
          </>
        )}
      </div>
    </BaseModal>
  );
}
