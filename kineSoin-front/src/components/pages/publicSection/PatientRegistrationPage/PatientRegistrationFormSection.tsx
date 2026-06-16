import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { IPatientRegistrationData } from '../../../../@types/interfaces/customInterfaces';
import { useAppContext } from '../../../../utils/contexts/AppContext/useAppContext';
import { usePatientRegistrationContext } from '../../../../utils/contexts/PatientRegistrationContext/usePatientRegistrationContext';
import { getFormElement } from '../../../../utils/functions/public/patientRegistrationUtils/getFormElement';
import { getSectionBackground } from '../../../../utils/functions/public/patientRegistrationUtils/getSectionBackground';
import { getStepParagraph } from '../../../../utils/functions/public/patientRegistrationUtils/getStepParagraph';
import { usePatientRegistrationFormMutation } from '../../../../utils/hooks/public/usePatientRegistrationFormMutation';
import { usePatientRegistrationMutation } from '../../../../utils/hooks/public/usePatientRegistrationMutation';
import CustomButton from '../../../ui/buttons/CustomButton';
import DNALoader from '../../../ui/DNALoader';
import mainLogo from '/logos/new-logo.webp';

export default function PatientRegistrationFormSection() {
  const { errorMessage, setError } = useAppContext();

  const { formOrder, setFormOrder } = usePatientRegistrationContext();

  // Sent patient data state
  const [sentPatientData, setSentPatientData] =
    useState<IPatientRegistrationData>({});

  const [patientImage, setPatientImage] = useState<File | null>(null);

  const registerPatient = usePatientRegistrationMutation();

  const patientRegisterMutation = usePatientRegistrationFormMutation(
    formOrder,
    patientImage
  );

  useEffect(() => {
    if (formOrder === 'last') {
      registerPatient.mutate(sentPatientData);
    }
  }, [sentPatientData]);

  if (registerPatient.isPending) {
    return DNALoader();
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    patientRegisterMutation.mutate(formData, {
      onSuccess: (data) => {
        setSentPatientData((prevData) => ({
          ...prevData,
          ...data,
        }));

        if (formOrder !== 'last') {
          setFormOrder((prevOrder) => {
            switch (prevOrder) {
              case 'first':
                return 'second';
              case 'second':
                return 'third';
              case 'third':
                return 'last';
              default:
                return prevOrder;
            }
          });
        }

        setError('');
      },
    });

    if (patientRegisterMutation.isError) {
      setError(
        patientRegisterMutation.error?.message || 'Une erreur est survenue'
      );
    } else {
      setError('');
    }

    if (patientRegisterMutation.isPending) {
      return DNALoader();
    }
  };

  return (
    <section
      className={`${getSectionBackground(formOrder)} md:p-48 xl:p-56 2xl:p-72 bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative`}
    >
      <div
        className={`opacity-90 ${formOrder === 'last' ? 'max-w-10/12' : 'max-w-80'} font-normal text-sm h-fit my-auto lg:text-base w-10/12 md:w-2/3 p-6 text-primaryBlue bg-gradient-to-r from-white to-gray-200 rounded-3xl italic`}
      >
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-center text-primaryBlue mb-2">
            Inscription Patient
          </h2>

          <img src={mainLogo} alt="Kinesoin" className="w-14 mx-auto mb-4" />

          {(errorMessage || registerPatient.error) && (
            <p className="text-center text-red-600 font-medium mb-2">
              {errorMessage} {registerPatient.error?.message}
            </p>
          )}

          <div className="mb-6">
            {getFormElement({
              formOrder,
              setPatientImage,
            })}
          </div>

          <div className="flex items-center justify-center">
            {formOrder !== 'last' && (
              <CustomButton
                btn={{
                  type: 'basic',
                  text: formOrder === 'third' ? 'Inscription' : 'Valider',
                  style: 'normal',
                }}
                type="submit"
              />
            )}
          </div>

          <>
            <div className="text-xs mb-4 text-center mt-4">
              {formOrder !== 'last' && (
                <p>
                  Déjà membre?{' '}
                  <Link
                    to="/loginPatient"
                    className="text-primaryRed"
                    onClick={() => {
                      setFormOrder('first');
                    }}
                  >
                    Connectez-vous ici !
                  </Link>
                </p>
              )}
            </div>

            <div className="text-sm mb-4 text-center mt-4">
              {getStepParagraph(formOrder)}
            </div>
          </>
        </form>
      </div>
    </section>
  );
}
