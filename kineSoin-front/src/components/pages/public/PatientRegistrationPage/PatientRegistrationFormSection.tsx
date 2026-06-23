import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { IPatientRegistrationFormData } from '../../../../@types/interfaces/formInterfaces';
import type { FormOrderTypes } from '../../../../@types/types/formTypes';
import { useAppContext } from '../../../../utils/functions/contextUtils/useAppContext';
import { usePatientRegistrationContext } from '../../../../utils/functions/contextUtils/usePatientRegistrationContext';
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
    useState<IPatientRegistrationFormData>({});

  const [patientImage, setPatientImage] = useState<File | null>(null);

  const patientRegisterMutation = usePatientRegistrationFormMutation(
    formOrder,
    patientImage
  );

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
          setFormOrder((prevOrder: FormOrderTypes) => {
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

        setError(null);
      },

      onError: (error) => {
        setError(error.message || 'Une erreur est survenue');
      },
    });
  };

  const registerPatient = usePatientRegistrationMutation();

  useEffect(() => {
    if (formOrder === 'last') {
      console.log('register patient shoots');
      registerPatient.mutate(sentPatientData);
    }
  }, [formOrder]);

  useEffect(() => {
    console.log(errorMessage);
  }, [errorMessage]);

  if (patientRegisterMutation.isPending || registerPatient.isPending) {
    return DNALoader();
  }

  return (
    <section
      className={`${getSectionBackground(formOrder)} min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4`}
    >
      <div className="w-full max-w-md bg-white/85 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Link to="/" className="flex justify-center">
            <img src={mainLogo} alt="Kinesoin" className="w-16 md:w-20" />
          </Link>

          <h2 className="text-xl md:text-2xl font-semibold text-center text-primaryBlue italic">
            Inscription Patient
          </h2>

          <p className="text-center text-sm text-gray-500">
            Créez votre espace patient
          </p>

          {(errorMessage || registerPatient.error) && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-center text-red-600 text-sm">
                {errorMessage} {registerPatient.error?.message}
              </p>
            </div>
          )}

          <div className="mb-2">
            {getFormElement({
              formOrder,
              setPatientImage,
            })}
          </div>

          {formOrder !== 'last' && (
            <div className="flex justify-center mt-2">
              <CustomButton
                btn={{
                  type: 'basic',
                  text: formOrder === 'third' ? 'Inscription' : 'Valider',
                  style: 'normal',
                }}
                type="submit"
              />
            </div>
          )}

          {formOrder !== 'last' && (
            <p className="text-xs md:text-sm text-center text-gray-600">
              Déjà membre ?{' '}
              <Link
                to="/loginPatient"
                className="text-primaryRed font-medium hover:underline"
                onClick={() => {
                  setFormOrder('first');
                }}
              >
                Connectez-vous ici !
              </Link>
            </p>
          )}

          <p className="text-sm text-center text-primaryBlue font-medium mt-2">
            {getStepParagraph(formOrder)}
          </p>
        </form>
      </div>
    </section>
  );
}
