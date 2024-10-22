import { useState } from 'react';
import ReactModal from 'react-modal';
import CustomButton from '../../../../standaloneComponents/Button/CustomButton';

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
  const [therapistDiploma, setTherapistDiploma] = useState('');
  const [therapistExperience, setTherapistExperience] = useState('');
  const [therapistSpecialty, setTherapistRepeatedSpecialty] = useState('');
  const [therapistDescription, setTherapistDescription] = useState('');

  const addFormDetails = () => {
    const diploma = therapistDiploma;
    const experience = therapistExperience;
    const specialty = therapistSpecialty;
    const description = therapistDescription;
    // setAddForm({
    //   name: addForm.name,
    //   surname: addForm.surname,
    //   email: '',
    //   password: '',
    //   repeated_password: '',
    //   description: description,
    //   diploma: diploma,
    //   experience: experience,
    //   specialty: specialty,
    //   licence_code: addForm.licence_code,
    //   status: '',
    //   photo: addForm.photo,
    // });
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
          <div>
            <label
              htmlFor="therapist-diploma_input"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              Diplôme
            </label>
            <input
              type="text"
              id="therapist-diploma_input"
              name="diploma"
              className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
              value={therapistDiploma}
              onChange={(e) => setTherapistDiploma(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="therapist-experience_input"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              Experience
            </label>
            <input
              type="text"
              id="therapist-experience_input"
              name="experience"
              className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
              value={therapistExperience}
              onChange={(e) => setTherapistExperience(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="therapist-specialty_input"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              Spécialité
            </label>
            <input
              type="text"
              id="therapist-specialty_input"
              name="specialty"
              className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
              value={therapistSpecialty}
              onChange={(e) => setTherapistRepeatedSpecialty(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="therapist-description_input"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="therapist-description_input"
              placeholder="Description du kinésithérapeute"
              className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
              value={therapistDescription}
              onChange={(e) => setTherapistDescription(e.target.value)}
              required
              rows={5}
              cols={32}
            ></textarea>
          </div>

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
