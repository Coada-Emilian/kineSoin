/**
 * @component StandardFileInputRefactor
 *
 * A refactored file input component that allows users to select an image file and preview it. It also provides the ability
 * to open a modal for selecting the file. The file input renders a non-editable text box to show the file name, with an option to
 * trigger the modal to select a file.
 *
 * @param {IFileInput} fileInput - The configuration object that defines the file input properties.
 * @param {React.Dispatch<React.SetStateAction<File | null>>} [setPatientImage] - Optional callback to update the patient's image.
 * @param {React.Dispatch<React.SetStateAction<File | null>>} [setTherapistImage] - Optional callback to update the therapist's image.
 *
 * @returns {JSX.Element} - The rendered file input with file selection functionality.
 *
 * @example
 * <StandardFileInputRefactor
 *   fileInput={{
 *     id: 'image-input',
 *     labelName: 'Upload Image',
 *     name: 'image',
 *   }}
 *   setTherapistImage={setTherapistImage}
 * />
 *
 * @remarks
 * - The component features an input field that only displays the file name and a button to open a modal for selecting a file.
 * - It uses a modal (`ImageModalRefactor`) for file selection, which updates the displayed file name and calls the appropriate callback
 *   to update the state with the selected file.
 * - The file input supports custom handling for both patient and therapist images.
 */

import { useState } from 'react';
import { IFileInput } from '../../../../../@types/interfaces/inputInterfaces';
import ImageModalRefactor from '../../Modals/imageModal/ImageModalRefactor';
import checkIcon from '/icons/check.png';
import addIcon from '/icons/plus.png';

interface StandardFileInputProps {
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setTherapistImage?: React.Dispatch<React.SetStateAction<File | null>>;
  fileInput: IFileInput;
}

export default function StandardFileInputRefactor({
  setPatientImage,
  setTherapistImage,
  fileInput,
}: StandardFileInputProps) {
  // File name state
  const [fileName, setFileName] = useState<string>(
    'Aucun fichier sélectionné...'
  );

  const [isFileAdded, setIsFileAdded] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="mb-4 flex flex-col gap-2 items-start">
      <div className="flex gap-2 items-center text-base ">
        <label className="text-primaryBlue font-medium italic">
          {fileInput.labelName}
        </label>

        {isFileAdded && <img src={checkIcon} alt="check" className="w-6" />}
      </div>

      <div className="flex rounded-md shadow-sm border w-full">
        <>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-tl-md rounded-bl-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 italic text-xxs md:text-xs xl:text-sm 2xl:text-md "
            value={fileName}
            onChange={() => {}}
            readOnly
          />

          <button
            type="button"
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="bg-white rounded-tr-md rounded-br-md"
          >
            <img
              src={addIcon}
              alt="ajouter"
              className="h-6 my-auto px-2 w-auto opacity-90 bg-white"
            />
          </button>
        </>
      </div>

      {isModalOpen && (
        <ImageModalRefactor
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          setFileName={setFileName}
          setPatientImage={setPatientImage}
          setTherapistImage={setTherapistImage}
          inputName={fileInput.name}
          inputId={fileInput.id}
          fileName={fileName}
          setIsFileAdded={setIsFileAdded}
        />
      )}
    </div>
  );
}
