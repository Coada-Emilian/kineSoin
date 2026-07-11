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
  size,
}: TherapistModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} size={size} variant="tight">
      <div className="relative">
        <div className="bg-linear-to-r from-teal-300 to-slate-200 rounded-t-xl p-6 text-center text-slate-800 uppercase font-semibold drop-shadow-sm tracking-wide pb-16 ">
          <p className="text-base md:text-xl bg-linear-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
            {header}
          </p>
        </div>
        <div className="flex justify-center mt-2">
          <img
            src={patient?.picture_url}
            alt={patient?.name}
            className="h-24 w-24 md:h-28 md:w-28 rounded-full border-4 border-slate-100 object-cover absolute top-15"
          />
        </div>

        <div>
          <h2 className="mb-6 text-center italic text-slate-600 pt-16">
            {message}
          </h2>

          {isDestructive && (
            <p className="mt-2 text-center text-sm  text-red-700 px-2">
              Cette action est définitive et ne peut pas être annulée.
            </p>
          )}

          {children}
        </div>
      </div>
    </BaseModal>
  );
}
