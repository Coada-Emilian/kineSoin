import type { TherapistModalProps } from '../../../../@types/props/therapistProps';
import BaseModal from '../BaseModal';

export default function TherapistModal({
  isOpen,
  onClose,
  header,
  message,
  patient,
  children,
  isDestructive,
}: TherapistModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-primaryBlue rounded-t-xl py-8 px-6 text-center text-white">
        <p className="text-base md:text-lg">{header}</p>
      </div>

      <div className="relative mb-16 flex flex-col items-center bg-primaryTeal py-8">
        <img
          src={patient?.picture_url}
          alt={patient?.name}
          className="absolute top-4 h-24 w-24 rounded-full border-4 border-white object-cover"
        />
      </div>

      <div className="px-6">
        <h2 className="mb-6 text-center text-xl font-semibold italic text-primaryBlue">
          {message}
        </h2>

        {children}
      </div>

      {isDestructive && (
        <p className="mt-2 text-center text-sm font-medium text-red-600">
          Cette action est définitive et ne peut pas être annulée.
        </p>
      )}
    </BaseModal>
  );
}
