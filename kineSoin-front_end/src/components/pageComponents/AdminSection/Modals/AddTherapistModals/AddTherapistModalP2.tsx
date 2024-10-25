/**
 * @file AddTherapistModalP2.tsx
 * @description A modal component for collecting additional details about a therapist,
 * including their diploma, experience, specialty, and a description. This modal is
 * the second step in a multi-step form for adding a therapist. It allows users to
 * input relevant information and either proceed to the next step or cancel the action.
 *
 * @interface AddTherapistModalP2Props
 * @param {React.Dispatch<React.SetStateAction<{
 *   name: string;
 *   surname: string;
 *   email: string;
 *   password: string;
 *   repeated_password: string;
 *   description: string;
 *   diploma: string;
 *   experience: string;
 *   specialty: string;
 *   licence_code: string;
 *   status: string;
 *   photo: File | unknown;
 * }>>} setAddForm - A function to update the state of the therapist's form details.
 * @param {boolean} isAddTherapistModalP2Open - A boolean indicating whether the
 * add therapist modal (step 2) is open or closed.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsAddTherapistModalP2Open -
 * A function to update the state of the modal's visibility.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsAddTherapistModalP3Open -
 * A function to open the next step modal in the multi-step form.
 *
 * @returns {JSX.Element} The rendered AddTherapistModalP2 component, containing
 * input fields for additional therapist information and action buttons for continuing
 * or cancelling the form process.
 */

import { useState } from 'react';
import ReactModal from 'react-modal';
import CustomButton from '../../../../standaloneComponents/Button/CustomButton';
import DiplomaInput from '../Components/DiplomaInput';
import ExperienceInput from '../Components/ExperienceInput';
import SpecialtyInput from '../Components/SpecialtyInput';
import DescriptionInput from '../Components/DescriptionInput';

interface AddTherapistModalP2Props {
  setAddForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      surname: string;
      email: string;
      password: string;
      repeated_password: string;
      description: string;
      diploma: string;
      experience: string;
      specialty: string;
      licence_code: string;
      status: string;
      photo: File | unknown;
    }>
  >;
  isAddTherapistModalP2Open: boolean;
  setIsAddTherapistModalP2Open: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddTherapistModalP3Open: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTherapistModalP2({
  setAddForm,
  isAddTherapistModalP2Open,
  setIsAddTherapistModalP2Open,
  setIsAddTherapistModalP3Open,
}: AddTherapistModalP2Props) {
  // State variables to store therapist details
  const [therapistDiploma, setTherapistDiploma] = useState('');
  const [therapistExperience, setTherapistExperience] = useState('');
  const [therapistSpecialty, setTherapistSpecialty] = useState('');
  const [therapistDescription, setTherapistDescription] = useState('');

  // Function to add therapist details to form state and open the next step
  const addFormDetails = () => {
    const diploma = therapistDiploma;
    const experience = therapistExperience;
    const specialty = therapistSpecialty;
    const description = therapistDescription;

    setAddForm((prev) => ({
      ...prev,
      description,
      diploma,
      experience,
      specialty,
    }));
    setIsAddTherapistModalP2Open(false);
    setIsAddTherapistModalP3Open(true);
  };

  return (
    <ReactModal
      isOpen={isAddTherapistModalP2Open}
      onRequestClose={() => setIsAddTherapistModalP2Open(false)}
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
          Ajouter un kinésithérapeute
        </h2>

        <form className="space-y-4">
          <DiplomaInput
            therapistDiploma={therapistDiploma}
            setTherapistDiploma={setTherapistDiploma}
          />

          <ExperienceInput
            therapistExperience={therapistExperience}
            setTherapistExperience={setTherapistExperience}
          />

          <SpecialtyInput
            therapistSpecialty={therapistSpecialty}
            setTherapistSpecialty={setTherapistSpecialty}
          />

          <DescriptionInput
            therapist
            setTherapistDescription={setTherapistDescription}
            therapistDescription={therapistDescription}
          />

          <p className="text-red-500 text-center text-xs md:text-sm">
            Etape 2 / 3 : Etudes
          </p>

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton
              btnText="Continuer"
              btnType="button"
              normalButton
              onClick={addFormDetails}
            />

            <CustomButton
              btnText="Annuler"
              btnType="button"
              cancelButton
              onClick={() => setIsAddTherapistModalP2Open(false)}
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
