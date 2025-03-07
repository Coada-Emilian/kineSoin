import { Link } from 'react-router-dom';
import mainLogo from '/logos/Main-Logo.png';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../../../../utils/contexts/GlobalContext';
import { usePatientRegisterContext } from '../../../../../../utils/contexts/PatientRegisterContext';
import { registerPatient } from '../../../../../../utils/componentUtils/pageComponents/functions/publicSection/patientRegisterPage/patientRegisterUtils';
import DNALoader from '../../../../../../utils/DNALoader';
import {
  getFormElement,
  getFormOnSubmit,
  getSectionBackground,
  getStepParagraph,
} from '../../../../../../utils/componentUtils/pageComponents/functions/publicSection/patientRegisterPage/patientRegisterFormSectionFunctions';
import CustomButton from '../../../../generalComponents/CustomButton/CustomButton';
import CustomBtn from '../../../../generalComponents/CustomButton/CustomButtonRefactor';

export default function PatientRegisterFormSection() {
  const { errorMessage, setError, isLoading, setLoading, location } =
    useGlobalContext();

  const { formOrder, setFormOrder } = usePatientRegisterContext();

  useEffect(() => {
    setError('');
  }, [location.pathname]);

  // Sent patient data state
  const [sentPatientData, setSentPatientData] = useState({});

  const [patientImage, setPatientImage] = useState<File | null>(null);

  // useEffect hook to register the patient
  useEffect(() => {
    setLoading(true);
    registerPatient({
      formOrder,
      sentPatientData,
      setError,
    }).finally(() => setLoading(false));
  }, [sentPatientData]);

  if (isLoading) {
    return DNALoader();
  }

  return (
    // Render the form section with the corresponding background image and form content
    <section
      className={`${getSectionBackground({ formOrder })} md:p-48 xl:p-56 2xl:p-72  bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative`}
    >
      <div className="opacity-90 max-w-80 font-normal text-sm h-fit my-auto lg:text-base w-10/12 md:w-2/3 text-primaryBlue bg-gradient-to-r from-white to-gray-200 p-6 rounded-3xl italic">
        <form
          onSubmit={(e) => {
            setLoading(true);
            const formSubmitResult = getFormOnSubmit(e, {
              setError,
              setFormOrder,
              setSentPatientData,
              patientImage,
              sentPatientData,
              formOrder,
            });
            if (formSubmitResult) {
              formSubmitResult.finally(() => setLoading(false));
            } else {
              setLoading(false);
            }
          }}
        >
          <h2 className="text-xl font-semibold text-center text-primaryBlue mb-2">
            Inscription Patient
          </h2>

          <img src={mainLogo} alt="Kinesoin" className="w-14 mx-auto mb-4" />

          {errorMessage && (
            <p className="text-center text-red-600 font-medium mb-2">
              {errorMessage}
            </p>
          )}

          <div className="mb-6">
            {getFormElement({
              formOrder,
              setPatientImage,
            })}
          </div>

          <div className="flex items-center">
            {formOrder !== 'last' && (
              <CustomBtn
                details={{
                  btnType: 'basicBtn',
                  btnText: formOrder === 'third' ? 'Inscription' : 'Valider',
                  isNormalBtn: true,
                  isFormBtn: true,
                }}
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
                    Connectez-vous ici
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
