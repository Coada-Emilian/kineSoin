/**
 * @file ImageInput.tsx
 * @description A React functional component that renders an input field for
 * uploading an image. It includes a label and a file input field that allows
 * users to select an image file from their device. The component handles
 * file changes through the provided callback function.
 *
 * @param {Object} props - The component props.
 * @param {function} props.handleFileChange - A callback function that is called
 * when the user selects a file. It receives the event as an argument.
 *
 * @returns {JSX.Element} The rendered ImageInput component, which includes
 * a label and a file input field for image uploads.
 */

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
