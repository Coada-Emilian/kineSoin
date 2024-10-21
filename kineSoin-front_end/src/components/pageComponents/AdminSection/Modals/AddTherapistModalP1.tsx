import { useState } from 'react';
import ReactModal from 'react-modal';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';

interface AddTherapistModalP1Props {
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
  isAddTherapistModalP1Open: boolean;
  setIsAddTherapistModalP1Open: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddTherapistModalP2Open: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTherapistModalP1({
  setAddForm,
  isAddTherapistModalP1Open,
  setIsAddTherapistModalP1Open,
  setIsAddTherapistModalP2Open,
}: AddTherapistModalP1Props) {
  const [therapistName, setTherapistName] = useState('');
  const [therapistSurname, setTherapistSurname] = useState('');
  const [therapistLicenceCode, setTherapistLicenceCode] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const addFormDetails = () => {
    const name = therapistName;
    const surname = therapistSurname;
    const licence_code = therapistLicenceCode;
    const photo = file;
    setAddForm({
      name,
      surname,
      email: '',
      password: '',
      repeated_password: '',
      description: '',
      diploma: '',
      experience: '',
      specialty: '',
      licence_code,
      status: '',
      photo,
    });
    setIsAddTherapistModalP1Open(false);
    setIsAddTherapistModalP2Open(true);
  };

  return (
    <ReactModal
      isOpen={isAddTherapistModalP1Open}
      onRequestClose={() => setIsAddTherapistModalP1Open(false)}
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
              htmlFor="therapist-name_input"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              Nom
            </label>
            <input
              type="text"
              id="therapist-name_input"
              name="name"
              className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
              value={therapistName}
              onChange={(e) => setTherapistName(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="therapist-surname_input"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              Prénom
            </label>
            <input
              type="text"
              id="therapist-surname_input"
              name="surname"
              className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
              value={therapistSurname}
              onChange={(e) => setTherapistSurname(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="therapist-licence-code_input"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              Code ADELI
            </label>
            <input
              type="text"
              id="therapist-licence-code_input"
              name="licence_code"
              className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
              value={therapistLicenceCode}
              onChange={(e) => setTherapistLicenceCode(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="therapist-licence-code_input"
              className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
            >
              Charger une photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-xs md:text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-primaryBlue file:text-xs md:file:text-sm hover:file:bg-secondaryBlue cursor-pointer"
            />
          </div>

          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Therapist"
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
          ) : (
            <p className="text-xs md:text-sm text-center">No photo available</p>
          )}

          <p className="text-red-500 text-center text-xs md:text-sm">
            Etape 1 / 3 : Informations personnelles
          </p>

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton
              btnText="Continuer"
              btnType="button"
              normalBtn
              onClick={addFormDetails}
            />
            <CustomButton
              btnText="Annuler"
              btnType="button"
              cancelButton
              onClick={() => setIsAddTherapistModalP1Open(false)}
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
