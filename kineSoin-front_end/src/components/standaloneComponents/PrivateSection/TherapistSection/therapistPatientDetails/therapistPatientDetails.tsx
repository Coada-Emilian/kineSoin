import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IUserProfile } from '../../../../../@types/interfaces/customInterfaces';
import { StatusMenu } from '../../../../../utils/constants/adminSection/adminProfileDetails/StatusMenu';
import { useTherapistSectionContext } from '../../../../../utils/contexts/TherapistSectionContext';
import DNALoader from '../../../../../utils/DNALoader';
import { getProfileStatusClassName } from '../../../../../utils/functions/adminSection/adminProfileDetails/getProfileStatusClassName';
import { useFetchPatientDetailsByTherapist } from '../../../../../utils/functions/privateSection/therapistSection/hooks/useFetchPatientDetailsByTherapist';
import { useFetchTherapistsByTherapist } from '../../../../../utils/functions/privateSection/therapistSection/hooks/useFetchTherapistsByTherapist';
import StatusButtonsRefactor from '../../../adminSection/adminProfileDetails/newComponents/StatusButtonRefactor';
import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import {
  AddressOutputRefactor,
  EmailOutputRefactor,
  IdOutputRefactor,
  NameOutputRefactor,
  PhoneNumberOutputRefactor,
} from '../../../generalComponents/standardOutputs';
import InsuranceNameOutput from '../../../generalComponents/standardOutputs/InsuranceNameOutput';
import TherapistOutput from '../../../generalComponents/standardOutputs/TherapistOutput';
import PatientDeleteModal from '../modals/PatientDeleteModal';
import SendMessageModal from '../modals/SendMessageModal';
import TherapistDropdownInput from './TherapistDropdownInput';

export default function TherapistPatientDetails() {
  const { patientId } = useParams();

  const navigate = useNavigate();

  const { patientDetails, setPatientDetails, setSelectedPatient } =
    useTherapistSectionContext();

  const [isProfileEditing, setIsProfileEditing] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);

  const [entityStatus, setEntityStatus] = useState<string>(patientDetails?.status ?? '');

  const [therapists, setTherapists] = useState<IUserProfile[]>([]);

  const { isLoading: isTherapistsLoading, isFetching: isTherapistsFetching } =
    useFetchTherapistsByTherapist({
      setTherapists,
    });

  const { isLoading, isFetching } = useFetchPatientDetailsByTherapist({
    patient_id: patientId ? Number(patientId) : 0,
    setPatientDetails,
  });

  if (isLoading || isFetching || isTherapistsLoading || isTherapistsFetching) {
    return (
      <div className="flex justify-center items-center h-96 w-full">
        <DNALoader />
      </div>
    );
  }

  const transformPatientStatusNames = (status: string | undefined) => {
    switch (status) {
      case 'active':
        return 'ACTIF';
      case 'inactive':
        return 'INACTIF';
      case 'pending':
        return 'EN ATTENTE';
      case 'banned':
        return 'BANNI';
      default:
        return status;
    }
  };

  const transformInsuranceDate = (date: string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR');
  };

  const patientStatus = transformPatientStatusNames(patientDetails?.status);

  const handleModifyClick = () => {
    setIsProfileEditing(true);
  };

  const handleCancelClick = () => {
    setIsProfileEditing(false);
    setEntityStatus(patientDetails?.status || '');
  };

  const handleCancelClickToReturn = () => {
    setIsProfileEditing(false);

    navigate('/therapist/patients');
  };

  const handleDeleteClick = () => {
    if (typeof patientDetails?.id === 'number') {
      const selectedPatient = {
        id: patientDetails.id,
        name: patientDetails?.name ?? '',
        surname: patientDetails?.surname ?? '',
        picture_url: patientDetails?.picture_url ?? '',
      };
      setSelectedPatient(selectedPatient);
      setIsDeleteModalOpen(true);
    }
  };

  const handleSendMessageClick = () => {
    if (typeof patientDetails?.id === 'number') {
      const selectedPatient = {
        id: patientDetails.id,
        name: patientDetails?.name ?? '',
        surname: patientDetails?.surname ?? '',
        picture_url: patientDetails?.picture_url ?? '',
      };
      setSelectedPatient(selectedPatient);
      setIsSendMessageModalOpen(true);
    }
  };

  return (
    <div className=" w-full">
      <form className="flex justify-center">
        <div className="flex flex-col md:m-2 border border-gray-300 text-primaryBlue rounded-xl shadow-2xl w-5/6 md:w-1/2 items-center md:items-start">
          <div className="w-full p-6 bg-primaryBlue rounded-t-xl flex justify-center text-white italic font-medium text-lg md:text-xl">
            Cabinet kinésithérapie Ruffec
          </div>

          <div className="bg-primaryTeal p-8 md:p-12 w-full relative mb-8">
            <div className="absolute top-3 md:top-8 left-0 w-full h-full rounded-xl">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto flex justify-center items-center">
                <img
                  src={patientDetails?.picture_url}
                  alt="profile"
                  className="rounded-full shadow-xl w-full h-full object-cover border-4 border-white"
                />
              </div>
            </div>
          </div>

          <div className="w-full p-4 md:py-10 md:px-24">
            <div className="text-sm md:text-md lg:text-lg xl:text-xl flex items-center justify-between gap-2 w-full">
              <div className="flex gap-2 items-center mb-2 w-full">
                <h4 className="font-bold">Statut: </h4>
                <span
                  className={`${getProfileStatusClassName(patientStatus)}py-1 px-2 rounded-xl font-semibold italic`}
                >
                  {patientStatus}
                </span>
              </div>

              <IdOutputRefactor id={patientDetails?.id ?? null} />
            </div>

            <NameOutputRefactor
              name={patientDetails?.name}
              surname={patientDetails?.surname}
            />

            <AddressOutputRefactor
              city={patientDetails?.city}
              postal_code={patientDetails?.postal_code}
              street_name={patientDetails?.street_name}
              street_number={patientDetails?.street_number}
            />

            <PhoneNumberOutputRefactor
              prefix={patientDetails?.prefix}
              phone_number={patientDetails?.phone_number}
            />

            <EmailOutputRefactor email={patientDetails?.email} />

            {isProfileEditing ? (
              <TherapistDropdownInput
                therapistId={patientDetails?.therapist.id ?? 0}
                therapistFullName={`${patientDetails?.therapist.name} ${patientDetails?.therapist.surname}`}
                therapists={therapists}
              />
            ) : (
              <TherapistOutput
                therapist_name={patientDetails?.therapist.name}
                therapist_surname={patientDetails?.therapist.surname}
              />
            )}

            <InsuranceNameOutput
              insuranceName={patientDetails?.insurance_details.insurance.name}
            />

            <div className="flex-col items-start w-full mb-2 flex gap-1 text-xs md:text-sm lg:text-base xl:text-lg">
              <label className="font-bold">Date de validité:</label>
              <div className="flex">
                <span className="italic font-normal flex gap-2">
                  {transformInsuranceDate(
                    patientDetails?.insurance_details.start_date
                  )}
                  <p>au</p>
                  {transformInsuranceDate(
                    patientDetails?.insurance_details.end_date
                  )}
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-center justify-around mt-4 ">
              {!isProfileEditing && (
                <>
                  {' '}
                  <CustomBtn
                    btn={{
                      type: 'basic',
                      text: 'Envoyez un message',
                      style: 'normal',
                      hasBorder: true,
                      onClick: handleSendMessageClick,
                    }}
                  />
                  <Link
                    to={`/therapist/patient/${patientDetails?.id}/appointments`}
                  >
                    <CustomBtn
                      btn={{
                        type: 'basic',
                        text: 'Gérer rendez-vous',
                        style: 'normal',
                        hasBorder: true,
                      }}
                    />
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="bg-primaryBlue p-4 w-full flex flex-col gap-4 md:flex-row justify-around items-center rounded-b-xl">
            <div className="flex gap-1 items-center ">
              {!isProfileEditing ? (
                <>
                  <>
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
                </>
              ) : (
                <>
                  <StatusMenu>
                    <StatusButtonsRefactor
                      entityType="patient"
                      id={patientDetails?.id}
                      entityStatus={patientDetails?.status ?? ''}
                      setEntityStatus={setEntityStatus}
                    />
                  </StatusMenu>

                  <CustomBtn
                    btn={{
                      type: 'active',
                      text: 'Enregistrer',
                      style: 'normal',
                      hasBorder: true,
                    }}
                    type="submit"
                  />
                </>
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
        <PatientDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}

      {isSendMessageModalOpen && (
        <SendMessageModal
          isOpen={isSendMessageModalOpen}
          onClose={() => setIsSendMessageModalOpen(false)}
        />
      )}
    </div>
  );
}
