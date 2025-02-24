// Purpose: Provide the first step of the modal to add a therapist.

import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import CustomButton from '../../../../../generalComponents/CustomButton/CustomButton';
import { IAddForm } from '../../../../../../../@types/types';
import {
  addFirstFormDetails,
  addSecondFormDetails,
  addThirdFormDetails,
} from './utils/addFormDetailsFunctions';
import {
  handleAfflictionSubmit,
  handleInsuranceSubmit,
  handleMedicSubmit,
} from './utils/dataSubmitFunctions';
import { createTherapist } from './utils/createTherapist';
import DNALoader from '../../../../../../../utils/DNALoader';
import FirstAddTherapistModal from './variations/FirstAddTherapistModal';
import SecondAddTherapistModal from './variations/SecondAddTherapistModal';
import ThirdAddTherapistModal from './variations/ThirdAddTherapistModal';
import AddAfflictionModal from './variations/AddAfflictionModal';
import AddMedicModal from './variations/AddMedicModal';
import AddInsuranceModal from './variations/AddInsuranceModal';

interface AdminModalProps {
  setAddForm?: React.Dispatch<React.SetStateAction<IAddForm>>;
  isAddTherapistModalP1Open?: boolean;
  setIsAddTherapistModalP1Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddTherapistModalP2Open?: React.Dispatch<React.SetStateAction<boolean>>;
  isFirstAddTherapistModal?: boolean;
  isSecondAddTherapistModal?: boolean;
  isAddTherapistModalP2Open?: boolean;
  setIsAddTherapistModalP3Open?: React.Dispatch<React.SetStateAction<boolean>>;
  isThirdAddTherapistModal?: boolean;
  isAddTherapistModalP3Open?: boolean;
  addForm?: IAddForm;
  isAdminAfflictionAddModal?: boolean;
  isAddAfflictionModalOpen?: boolean;
  setIsAddAfflictionModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isAdminAddMedicModal?: boolean;
  isAddMedicModalOpen?: boolean;
  setIsAddMedicModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isAdminAddInsuranceModal?: boolean;
  isAddInsuranceModalOpen?: boolean;
  setIsAddInsuranceModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminModal({
  setAddForm,
  isAddTherapistModalP1Open,
  setIsAddTherapistModalP1Open,
  setIsAddTherapistModalP2Open,
  isFirstAddTherapistModal,
  isSecondAddTherapistModal,
  isAddTherapistModalP2Open,
  setIsAddTherapistModalP3Open,
  isThirdAddTherapistModal,
  isAddTherapistModalP3Open,
  addForm,
  isAdminAfflictionAddModal,
  isAddAfflictionModalOpen,
  setIsAddAfflictionModalOpen,
  isAdminAddMedicModal,
  isAddMedicModalOpen,
  setIsAddMedicModalOpen,
  isAdminAddInsuranceModal,
  isAddInsuranceModalOpen,
  setIsAddInsuranceModalOpen,
}: AdminModalProps) {
  // State to store the preview URL of the uploaded photo
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [therapistImageFile, setTherapistImageFile] = useState<File | null>(
    null
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isAdminTherapistFormValid, setIsAdminTherapistFormValid] =
    useState(false);

  useEffect(() => {
    if (isAdminTherapistFormValid) {
      createTherapist({
        setErrorMessage,
        setIsAddTherapistModalP3Open,
        addForm,
        setIsLoading,
      });
    }
  }, [isAdminTherapistFormValid]);

  if (isLoading) {
    return <DNALoader />;
  }

  return (
    <ReactModal
      isOpen={
        isFirstAddTherapistModal
          ? !!isAddTherapistModalP1Open
          : false || isSecondAddTherapistModal
            ? !!isAddTherapistModalP2Open
            : false || isThirdAddTherapistModal
              ? !!isAddTherapistModalP3Open
              : isAdminAfflictionAddModal
                ? !!isAddAfflictionModalOpen
                : isAdminAddMedicModal
                  ? !!isAddMedicModalOpen
                  : isAdminAddInsuranceModal
                    ? !!isAddInsuranceModalOpen
                    : false
      }
      onRequestClose={() => {
        if (isFirstAddTherapistModal && setIsAddTherapistModalP1Open) {
          setIsAddTherapistModalP1Open(false);
        }
        if (isSecondAddTherapistModal && setIsAddTherapistModalP2Open) {
          setIsAddTherapistModalP2Open(false);
        }
        if (isThirdAddTherapistModal && setIsAddTherapistModalP3Open) {
          setIsAddTherapistModalP3Open(false);
        }
        if (isAdminAfflictionAddModal && setIsAddAfflictionModalOpen) {
          setIsAddAfflictionModalOpen(false);
        }
        if (isAdminAddMedicModal && setIsAddMedicModalOpen) {
          setIsAddMedicModalOpen(false);
        }
        if (isAdminAddInsuranceModal && setIsAddInsuranceModalOpen) {
          setIsAddInsuranceModalOpen(false);
        }
      }}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="space-y-4">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          {(isFirstAddTherapistModal ||
            isSecondAddTherapistModal ||
            isThirdAddTherapistModal) &&
            'Ajouter un thérapeute'}
          {isAdminAfflictionAddModal && 'Ajouter une affliction'}
          {isAdminAddMedicModal && 'Ajouter un médecin'}
          {isAdminAddInsuranceModal && "Ajouter un organisme d'assurance"}
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <form
          className="space-y-4"
          onSubmit={
            isFirstAddTherapistModal
              ? (e) =>
                  addFirstFormDetails(e, {
                    therapistImageFile,
                    setErrorMessage,
                    setAddForm,
                    setIsAddTherapistModalP1Open,
                    setIsAddTherapistModalP2Open,
                  })
              : isSecondAddTherapistModal
                ? (e) =>
                    addSecondFormDetails(e, {
                      therapistImageFile,
                      setErrorMessage,
                      setAddForm,
                      setIsAddTherapistModalP2Open,
                      setIsAddTherapistModalP3Open,
                    })
                : isThirdAddTherapistModal
                  ? (e) =>
                      addThirdFormDetails(e, {
                        therapistImageFile,
                        setErrorMessage,
                        setAddForm,
                        setIsAdminTherapistFormValid,
                      })
                  : isAddAfflictionModalOpen
                    ? (e) =>
                        handleAfflictionSubmit(e, {
                          setErrorMessage,
                          setIsAddAfflictionModalOpen,
                        })
                    : isAddMedicModalOpen
                      ? (e) =>
                          handleMedicSubmit(e, {
                            setErrorMessage,
                            setIsAddMedicModalOpen,
                          })
                      : isAddInsuranceModalOpen
                        ? (e) =>
                            handleInsuranceSubmit(e, {
                              setErrorMessage,
                              setIsAddInsuranceModalOpen,
                            })
                        : () => {}
          }
        >
          {(isFirstAddTherapistModal ||
            isSecondAddTherapistModal ||
            isThirdAddTherapistModal) && (
            <>
              {isFirstAddTherapistModal && (
                <FirstAddTherapistModal
                  setPreviewUrl={setPreviewUrl}
                  setTherapistImageFile={setTherapistImageFile}
                  previewUrl={previewUrl}
                />
              )}

              {isSecondAddTherapistModal && <SecondAddTherapistModal />}

              {isThirdAddTherapistModal && <ThirdAddTherapistModal />}

              <p className="text-red-500 text-center text-xs md:text-sm">
                {isFirstAddTherapistModal
                  ? 'Etape 1 / 3 : Informations personnelles'
                  : isSecondAddTherapistModal
                    ? 'Etape 2 / 3 : Études'
                    : 'Etape 3 / 3 : Finition'}
              </p>
            </>
          )}

          {isAdminAfflictionAddModal && <AddAfflictionModal />}

          {isAdminAddMedicModal && <AddMedicModal />}

          {isAdminAddInsuranceModal && <AddInsuranceModal />}

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton
              btnText={`${isFirstAddTherapistModal || isSecondAddTherapistModal ? 'Suivant' : 'Valider'}`}
              btnType="submit"
              normalButton
            />

            <CustomButton
              btnText="Annuler"
              btnType="button"
              cancelButton
              onClick={() => {
                if (isFirstAddTherapistModal && setIsAddTherapistModalP1Open) {
                  setIsAddTherapistModalP1Open(false);
                }
                if (isSecondAddTherapistModal && setIsAddTherapistModalP2Open) {
                  setIsAddTherapistModalP2Open(false);
                }
                if (isThirdAddTherapistModal && setIsAddTherapistModalP3Open) {
                  setIsAddTherapistModalP3Open(false);
                }
                if (isAdminAfflictionAddModal && setIsAddAfflictionModalOpen) {
                  setIsAddAfflictionModalOpen(false);
                }

                if (isAdminAddMedicModal && setIsAddMedicModalOpen) {
                  setIsAddMedicModalOpen(false);
                }

                if (isAdminAddInsuranceModal && setIsAddInsuranceModalOpen) {
                  setIsAddInsuranceModalOpen(false);
                }
              }}
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
