import { useState } from 'react';
import ReactModal from 'react-modal';
import CustomButton from '../../../../standaloneComponents/Button/CustomButton';

interface AddAfflictionModalProps {
  isAddAfflictionModalOpen: boolean;
  setIsAddAfflictionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddAfflictionModal({
  isAddAfflictionModalOpen,
  setIsAddAfflictionModalOpen,
}: AddAfflictionModalProps) {
  return (
    <ReactModal
      isOpen={isAddAfflictionModalOpen}
      onRequestClose={() => setIsAddAfflictionModalOpen(false)}
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
          Ajouter une affliction
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
              className="block w-full text-xs md:text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-primaryBlue file:text-xs md:file:text-sm hover:file:bg-secondaryBlue cursor-pointer"
            />
          </div>

          <p className="text-red-500 text-center text-xs md:text-sm">
            Etape 1 / 3 : Informations personnelles
          </p>

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton btnText="Continuer" btnType="button" normalButton />
            <CustomButton btnText="Annuler" btnType="button" cancelButton />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
