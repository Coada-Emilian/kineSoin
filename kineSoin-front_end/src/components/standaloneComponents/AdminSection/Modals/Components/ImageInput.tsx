// Purpose: The purpose of this component is to render the image input field of the therapist modal.

interface ImageInputProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageInput({ handleFileChange }: ImageInputProps) {
  return (
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
  );
}
