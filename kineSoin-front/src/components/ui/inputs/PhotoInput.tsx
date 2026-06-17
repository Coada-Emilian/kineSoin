import { useState } from 'react';
import type { FileInputProps } from '../../../@types/props/customProps';
import ImageModal from '../modals/ImageModal';
import checkIcon from '/icons/check.png';
import addIcon from '/icons/plus.png';

export default function PhotoInput({
  setPatientImage,
  setTherapistImage,
  input,
}: FileInputProps) {
  const [fileName, setFileName] = useState<string>(
    'Aucun fichier sélectionné...'
  );

  const [isFileAdded, setIsFileAdded] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="whitespace-nowrap flex flex-col gap-1 w-full text-xs md:text-sm xl:text-md 2xl:text-lg italic mb-4">
      <div className="flex gap-2 items-center text-base ">
        <label className="text-primaryBlue font-medium w-fit">
          {input.labelName}
        </label>

        {isFileAdded && <img src={checkIcon} alt="check" className="w-6" />}
      </div>

      <div
        className={
          'flex rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-gray-300 focus-within:border-secondaryTeal focus-within:ring-2 focus-within:ring-secondaryTeal/40'
        }
      >
        <>
          <input
            type="text"
            className="w-full px-4 py-2.5 text-xs md:text-sm xl:text-base text-gray-800 bg-transparent placeholder:text-gray-400 rounded-l-lg focus:outline-none"
            name={input.name}
            value={fileName}
            onChange={() => {}}
            readOnly
          />

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-3 flex items-center justify-center rounded-r-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <img
              src={addIcon}
              alt="ajouter"
              style={{
                width: '1.25rem',
                height: '1.25rem',
                opacity: 0.8,
              }}
            />
          </button>
        </>
      </div>

      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          setFileName={setFileName}
          setPatientImage={setPatientImage}
          setTherapistImage={setTherapistImage}
          inputName={input.name}
          inputId={input.id}
          fileName={fileName}
          setIsFileAdded={setIsFileAdded}
        />
      )}
    </div>
  );
}
