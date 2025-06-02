import { useEffect } from 'react';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../@types/interfaces/modelInterfaces';
import { entityUpdateMutations } from '../../../../../utils/constants/admin_section/admin_profile_details/entityUpdateMutations.tsx';
import { StatusMenu } from '../../../../../utils/constants/admin_section/admin_profile_details/StatusMenu.tsx';
import { useAdminProfileDetailsGlobalContext } from '../../../../../utils/contexts/AdminProfileDetailsGlobalContext.tsx';
import { useGlobalContext } from '../../../../../utils/contexts/GlobalContext.tsx';
import DNALoader from '../../../../../utils/DNALoader.tsx';
import CustomBtn from '../../../generalComponents/CustomButton/CustomButtonRefactor.tsx';
import ConfirmDeleteModal from '../../AdminTable/new_components/modals/ConfirmDeleteModal.tsx';
import {
  ImageOutputRefactor,
  TitleOutputRefactor,
} from '../pageComponents/generalComponents/common/Outputs/new_components';
import StatusButtonsRefactor from '../pageComponents/generalComponents/therapist/StatusButtonRefactor.tsx';
import {
  CommonSectionRefactor,
  ProfileSectionRefactor,
} from '../pageComponents/sections/new_components';
import EditPhotoModalRefactor from './EditPhotoModalRefactor.tsx';
import messageIcon from '/icons/message3.png';
import phoneIcon from '/icons/phone-call.png';
import mainLogo from '/logos/Main-Logo.png';

interface AdminProfileDetailsRefactorProps {
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null;
  entityType: string;
}

export default function AdminProfileDetailsRefactor({
  entity,
  entityType,
}: AdminProfileDetailsRefactorProps) {
  const mutationEntry = entityUpdateMutations().find(
    (entry) => entry.entityType === entityType && entry.updateFunction
  );

  const activeMutation = mutationEntry?.updateFunction?.();

  const { navigate } = useGlobalContext();

  const {
    setIsProfileEditing,
    setIsDeleteModalOpen,
    isDeleteModalOpen,
    setEntityStates,
    entityPictureUrl,
    entityEmail,
    entityPhoneNumber,
    entityName,
    entitySurname,
    entityId,
    entityStatus,
    isProfileEditing,
    isEditPhotoModalOpen,
    setSelectedFile,
    setIsEditPhotoModalOpen,
    setPreviewUrl,
    selectedFile,
  } = useAdminProfileDetailsGlobalContext();

  useEffect(() => {
    setEntityStates(entity);
  }, [entity]);

  const handleModifyClick = () => {
    setIsProfileEditing(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCancelClick = () => {
    setIsProfileEditing(false);
    setSelectedFile(null);
    setPreviewUrl(
      entity && 'picture_url' in entity
        ? (entity as { picture_url?: string }).picture_url || null
        : null
    );
  };

  const handleCancelClickToReturn = () => {
    if (entityType === 'therapist') {
      navigate(`/admin/therapists`);
    } else if (entityType === 'patient') {
      navigate(`/admin/patients`);
    } else if (entityType === 'affliction') {
      navigate(`/admin/afflictions`);
    } else if (entityType === 'medic') {
      navigate(`/admin/medics`);
    } else if (entityType === 'insurance') {
      navigate(`/admin/insurance`);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeMutation || !entityId) return;

    const formData = new FormData(e.currentTarget);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    activeMutation.mutate({ id: entityId, formData });

    if (activeMutation.isPending) {
      return DNALoader();
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex justify-center">
        <div className="flex flex-col md:m-2 border border-gray-300 text-primaryBlue rounded-xl shadow-2xl w-5/6 md:w-4/6 items-center md:items-start">
          <div className="w-full p-6 bg-primaryBlue rounded-t-xl flex justify-center">
            <TitleOutputRefactor entityType={entityType} />
          </div>

          <div className="bg-primaryTeal p-8 md:p-12 w-full relative mb-8">
            <div className="absolute top-3 md:top-8 left-0 w-full h-full rounded-xl">
              <ImageOutputRefactor
                picture_url={entityPictureUrl ? entityPictureUrl : mainLogo}
                entityType={entityType}
              />
            </div>
          </div>

          <div className="w-full p-4 md:py-10 md:px-24">
            {entity && (
              <>
                <CommonSectionRefactor entityType={entityType} />

                <ProfileSectionRefactor
                  entity={entity}
                  entityType={entityType}
                />
              </>
            )}
          </div>

          <div className="bg-primaryBlue p-3 w-full flex items-center gap-4 justify-center">
            <div className="flex gap-2">
              {entityEmail && (
                <a
                  href={`mailto:${entityEmail}`}
                  className="hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
                >
                  <img
                    src={messageIcon}
                    alt="send mail"
                    className="w-8 md:w-10"
                  />
                </a>
              )}

              {entityPhoneNumber && (
                <a href={`tel:${entityPhoneNumber}`}>
                  <img
                    src={phoneIcon}
                    alt="send mail"
                    className="w-8 md:w-10 hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
                  />
                </a>
              )}
            </div>

            <div>
              <p className="text-white italic">{`/ ${entityName.toLowerCase()}${entitySurname && `.${entitySurname.toLowerCase()}`}`}</p>
            </div>
          </div>

          <div className="bg-primaryTeal p-4 w-full flex flex-col gap-2 md:flex-row justify-around items-center rounded-b-xl">
            {entityStatus && (
              <StatusMenu>
                <StatusButtonsRefactor
                  entityType={entityType}
                  id={entityId}
                  entityStatus={entityStatus}
                />
              </StatusMenu>
            )}

            <div className="flex gap-1">
              {!isProfileEditing ? (
                <>
                  {entityType !== 'patient' && (
                    <>
                      {' '}
                      <CustomBtn
                        btn={{
                          type: 'modify',
                          text: 'Modifier',
                          style: 'normal',
                          hasBorder: true,
                          onClick: handleModifyClick,
                        }}
                      />
                      <CustomBtn
                        btn={{
                          type: 'delete',
                          text: 'Supprimer',
                          style: 'normal',
                          hasBorder: true,
                          onClick: handleDeleteClick,
                        }}
                      />
                    </>
                  )}
                </>
              ) : (
                <CustomBtn
                  btn={{
                    type: 'active',
                    text: 'Enregistrer',
                    style: 'normal',
                    hasBorder: true,
                  }}
                  type="submit"
                />
              )}

              <>
                <CustomBtn
                  btn={{
                    type: 'cancel',
                    text: 'Annuler',
                    style: 'normal',
                    hasBorder: true,
                    onClick: isProfileEditing
                      ? handleCancelClick
                      : handleCancelClickToReturn,
                  }}
                />
              </>
            </div>
          </div>
        </div>
      </form>

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          entityType={entityType}
          entity={entity}
        />
      )}

      {isEditPhotoModalOpen && entityType === 'therapist' && (
        <EditPhotoModalRefactor
          isOpen={isEditPhotoModalOpen}
          onClose={() => setIsEditPhotoModalOpen(false)}
          therapist={entity as ITherapist}
          setSelectedFile={setSelectedFile}
        />
      )}
    </>
  );
}
