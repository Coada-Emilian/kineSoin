import { useEffect, useState } from 'react';
import ConfirmDeleteModal from '../Modals/ConfirmDeleteModal.tsx';
import EditPhotoModal from '../Modals/EditPhotoModal.tsx';
import ImageSection from './pageComponents/sections/ImageSection.tsx';
import ButtonsSection from './pageComponents/sections/ButtonsSection.tsx';
import GeneralOutput from './pageComponents/generalComponents/common/GeneralOutput.tsx';
import CommonSection from './pageComponents/sections/CommonSection.tsx';
import ProfileSection from './pageComponents/generalComponents/common/ProfileSection..tsx';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../@types/standardTypes';
import {
  handleAfflictionUpdateAsAdmin,
  handleInsuranceOrganismUpdateAsAdmin,
  handleMedicUpdateAsAdmin,
  handleTherapistUpdateAsAdmin,
} from '../../../../utils/apiUtils/adminApiUtils.tsx';
import { handleFormSubmit } from './pageComponents/utils/handleFormSubmit.ts';
import { handlePatientStatusChanges } from './pageComponents/utils/handlePatientStatusChange.ts';
import GeneralOutputRefactor from './pageComponents/generalComponents/common/GeneralOutputRefactor.tsx';
import TitleOutputRefactor from './pageComponents/generalComponents/common/GeneralOutputRefactor.tsx';
import CommonSectionRefactor from './pageComponents/sections/CommonSectionRefactor.tsx';
import CustomButton from '../../generalComponents/CustomButton/CustomButton.tsx';

interface AdminProfileDetailsRefactorProps {
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null;
  entityType: string;
}

export default function AdminProfileDetailsRefactor({
  entity,
  entityType,
}: AdminProfileDetailsRefactorProps) {
  // State variables
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // Modal state variables
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false);

  // Form state variables
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [buttonMessage, setButtonMessage] = useState('Changer le statut');
  const [backgroundColor, setBackgroundColor] = useState('bg-white');
  const [entityStatus, setEntityStatus] = useState(
    entity && 'status' in entity ? entity.status : 'inactive'
  );
  const [updateEntityForm, setUpdateEntityForm] = useState<FormData | null>();

  //   const getUpdateFunction = () => {
  //     if (therapist)
  //       return (formData: FormData) =>
  //         handleTherapistUpdateAsAdmin(therapist.id, formData);
  //     if (affliction)
  //       return (formData: FormData) =>
  //         handleAfflictionUpdateAsAdmin(affliction.id, formData);
  //     if (medic)
  //       return (formData: FormData) =>
  //         handleMedicUpdateAsAdmin(formData, medic.id);
  //     if (insurance)
  //       return (formData: FormData) =>
  //         handleInsuranceOrganismUpdateAsAdmin(formData, insurance.id);
  //     return null;
  //   };

  //   const updateFunction = getUpdateFunction();

  const entityDetails = [
    { entityType: 'therapist', entity: entity as ITherapist },
    { entityType: 'patient', entity: entity as IPatient },
    { entityType: 'affliction', entity: entity as IAffliction },
    { entityType: 'medic', entity: entity as IMedic },
    { entityType: 'insurance', entity: entity as IInsurance },
  ];

  const activeEntity = entityDetails.find(
    (entityDetail) => entityDetail.entityType === entityType
  );

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
        <div className="flex flex-col p-8 md:space-x-6  md:m-2 border border-gray-300 text-primaryBlue rounded-xl shadow-2xl md:w-5/6 items-center md:items-start">
          <TitleOutputRefactor entityType={entityType} />
          <div className="w-full">
            {activeEntity && (
              <CommonSectionRefactor
                entity={activeEntity.entity}
                isProfileEditing={isProfileEditing}
                entityType={activeEntity.entityType}
                setUpdateEntityForm={setUpdateEntityForm}
              />
            )}

            {/* {therapist && (
            <ProfileSection
              isTherapistProfileSection
              isProfileEditing={isProfileEditing}
              therapist={therapist}
            />
          )} */}

            {/* {patient && (
                <ProfileSection patient={patient} isPatientProfileSection />
              )} */}

            {/* {affliction && (
                <ProfileSection
                  isAfflictionProfileSection
                  affliction={affliction}
                  isProfileEditing={isProfileEditing}
                />
              )} */}
            {/* 
              {medic && (
                <ProfileSection
                  isMedicProfileSection
                  medic={medic}
                  isProfileEditing={isProfileEditing}
                />
              )} */}

            {/* {insurance && (
                <ProfileSection
                  isInsuranceProfileSection
                  insurance={insurance}
                  isProfileEditing={isProfileEditing}
                />
              )} */}
          </div>
        </div>

        {/* {(therapist || patient) && (
              <ImageSection
                therapist={therapist}
                patient={patient}
                isProfileEditing={isProfileEditing}
                setIsEditPhotoModalOpen={setIsEditPhotoModalOpen}
              />
            )} */}

        {/* <ButtonsSection
            isProfileEditing={isProfileEditing}
            buttonMessage={buttonMessage}
            backgroundColor={backgroundColor}
            setButtonMessage={setButtonMessage}
            setBackgroundColor={setBackgroundColor}
            setTherapistStatus={setTherapistStatus}
            setIsProfileEditing={setIsProfileEditing}
            handlePatientStatusChanges={handlePatientStatusChanges}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            patient={patient}
            therapist={therapist}
            affliction={affliction}
            medic={medic}
            insurance={insurance}
          /> */}
      </form>
      {isProfileEditing ? (
        <CustomButton
          btnText="Annuler"
          cancelButton
          onClick={() => setIsProfileEditing(false)}
        />
      ) : (
        <CustomButton
          btnText="Modifier"
          normalButton
          onClick={() => setIsProfileEditing(true)}
        />
      )}

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
