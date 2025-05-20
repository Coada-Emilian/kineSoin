import { useEffect, useState } from 'react';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../@types/interfaces/modelInterfaces';
import { StatusMenu } from '../../../../../utils/componentUtils/pageComponents/constants/adminSection/AdminProfileDetails/StatusMenu.tsx';
import { entityUpdateFunctions } from '../../../../../utils/componentUtils/pageComponents/constants/adminSection/AdminProfileDetails/entityUpdateFunctions.tsx';
import { useAdminProfileDetailsGlobalContext } from '../../../../../utils/contexts/AdminProfileDetailsGlobalContext.tsx';
import CustomBtn from '../../../generalComponents/CustomButton/CustomButtonRefactor.tsx';
import TitleOutputRefactor from '../pageComponents/generalComponents/common/Outputs/new_conponents/GeneralOutputRefactor.tsx';
import StatusButtonsRefactor from '../pageComponents/generalComponents/therapist/StatusButtonRefactor.tsx';
import CommonSectionRefactor from '../pageComponents/sections/CommonSectionRefactor.tsx';
import ImageSectionRefactor from '../pageComponents/sections/ImageSectionRefactor.tsx';
import ProfileSectionRefactor from '../pageComponents/sections/ProfileSectionRefactor.tsx';
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
  // Modal state variables
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false);

  // Form state variables
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [updateEntityForm, setUpdateEntityForm] = useState<FormData | null>();

  const activeEntityUpdateFunction = entityUpdateFunctions().find(
    (entityUpdateFunction) => entityUpdateFunction.entityType === entityType
  );

  const [picture_url, setPictureUrl] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone_number, setPhoneNumber] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [id, setId] = useState<number | null>(null);
  const [entityStatus, setEntityStatus] = useState(
    entity && 'status' in entity ? entity.status : 'inactive'
  );

  useEffect(() => {
    if (entity) {
      'picture_url' in entity && setPictureUrl(entity.picture_url);
      'email' in entity && setEmail(entity.email);
      'prefix' in entity &&
        'phone_number' in entity &&
        setPhoneNumber(entity.prefix + entity.phone_number);
      'name' in entity && setName(entity.name);
      'surname' in entity && setSurname(entity.surname);
      'id' in entity && setId(entity.id);
    }
  }, [entity]);

  const { setIsProfileEditing } = useAdminProfileDetailsGlobalContext();

  return (
    <>
      <form
        // onSubmit={(e) =>
        //   updateFunction &&
        //   handleFormSubmit(
        //     e,
        //     { therapist, therapistStatus, selectedFile, setIsProfileEditing },
        //     updateFunction
        //   )
        // }
        className="flex justify-center"
      >
        <div className="flex flex-col md:m-2 border border-gray-300 text-primaryBlue rounded-xl shadow-2xl w-5/6 md:w-4/6 items-center md:items-start">
          <div className="w-full p-6 bg-primaryBlue rounded-t-xl flex justify-center">
            <TitleOutputRefactor entityType={entityType} />
          </div>

          <div className="bg-primaryTeal p-8 md:p-12 w-full relative mb-8">
            <div className="absolute top-3 md:top-8 left-0 w-full h-full rounded-xl">
              <ImageSectionRefactor
                picture_url={picture_url ? picture_url : mainLogo}
                entityType={entityType}
              />
            </div>
          </div>

          <div className="w-full p-4 md:py-10 md:px-24">
            {entity && (
              <>
                <CommonSectionRefactor
                  entity={entity}
                  entityType={entityType}
                />

                <ProfileSectionRefactor
                  entity={entity}
                  entityType={entityType}
                />
              </>
            )}
          </div>

          <div className="bg-primaryBlue p-3 w-full flex items-center gap-4 justify-center">
            <div className="flex gap-2">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
                >
                  <img
                    src={messageIcon}
                    alt="send mail"
                    className="w-8 md:w-10"
                  />
                </a>
              )}

              {phone_number && (
                <a href={`tel:${phone_number}`}>
                  <img
                    src={phoneIcon}
                    alt="send mail"
                    className="w-8 md:w-10 hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
                  />
                </a>
              )}
            </div>

            <div>
              <p className="text-white italic">{`/ ${name.toLowerCase()}${surname && `.${surname.toLowerCase()}`}`}</p>
            </div>
          </div>

          <div className="bg-primaryTeal p-4 w-full flex flex-col gap-2 md:flex-row justify-around items-center">
            {(entityType === 'therapist' || entityType === 'patient') && (
              <StatusMenu>
                <StatusButtonsRefactor
                  entityType={entityType}
                  id={id}
                  entityStatus={entityStatus}
                />
              </StatusMenu>
            )}

            <div className="flex gap-1">
              {entityType !== 'patient' && (
                <CustomBtn
                  btn={{
                    type: 'modify',
                    text: 'Modifier',
                    style: 'normal',
                    hasBorder: true,
                    onClick: () => {
                      setIsProfileEditing(true);
                    },
                  }}
                />
              )}
              <>
                <CustomBtn
                  btn={{
                    type: 'delete',
                    text: 'Supprimer',
                    style: 'normal',
                    hasBorder: true,
                    onClick: () => {
                      setIsDeleteModalOpen(true);
                    },
                  }}
                />
                <CustomBtn
                  btn={{
                    type: 'cancel',
                    text: 'Annuler',
                    style: 'normal',
                    hasBorder: true,
                    onClick: () => {
                      window.history.back();
                    },
                  }}
                />
              </>
            </div>
          </div>
        </div>
      </form>

      {/* {isDeleteModalOpen && (
        <ConfirmDeleteModal
          patient={patient}
          therapist={therapist}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          affliction={affliction}
          medic={medic}
          insurance={insurance}
        />
      )}

      {isEditPhotoModalOpen && therapist && (
        <EditPhotoModal
          isEditPhotoModalOpen={isEditPhotoModalOpen}
          setIsEditPhotoModalOpen={setIsEditPhotoModalOpen}
          therapist={therapist}
          setSelectedFile={setSelectedFile}
        />
      )} */}
    </>
  );
}
